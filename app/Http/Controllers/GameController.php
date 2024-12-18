<?php

namespace App\Http\Controllers;

use App\Jobs\FetchGameArtwork;
use App\Jobs\FetchGameCoverArt;
use App\Models\Artwork;
use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use MarcReichel\IGDBLaravel\Exceptions\MissingEndpointException;
use MarcReichel\IGDBLaravel\Models\Game as IGDBGame;

class GameController extends Controller
{
    public function show(Game $game, Request $request)
    {
        $game->load([
            'platforms',
            'artworks',
            'coverArts',
            'genres',
            'comments.user',
            'comments.replies.user',
            // Load likes count
            'comments' => function ($query) {
                $query->withCount('likes');
            },
            'comments.replies' => function ($query) {
                $query->withCount('likes');
            }
        ]);

        return Inertia::render('Game', [
            'game' => $game,
            'auth' => $request->user(),
        ]);
    }

    public function index()
    {
        $games = Auth::user()->games;
        return response()->json($games);
    }


    public function searchWithScout(Request $request)
    {
        $gameName = $request->input('game_name');
        $games = Game::search($gameName)->get();

        $InternetGames = IGDBGame::search($gameName)->get();

        $transformedIgdbGames = $InternetGames->map(function ($igdbGame) {
            $game = Game::create([
                'name' => $igdbGame->name,
                'year' => date('Y', strtotime($igdbGame->first_release_date)) ?? 2000,
                'description' => $igdbGame->summary ?? 'No description available',
                'genre' => $igdbGame->genres[0] ?? 'Unknown',
                'platforms' => $igdbGame->platforms[0] ?? 'Unknown',
                'igdb_id' => $igdbGame->id,
                'slug' => $igdbGame->slug,
            ]);

            try {
                FetchGameArtwork::dispatch($game->id, $igdbGame->id);
                FetchGameCoverArt::dispatch($game->id, $igdbGame->id);
            } catch (\Exception $e) {
                Log::error('Job failed: ' . $e->getMessage());
            }

            return $game;
        });

        $mergedGames = $games->concat($transformedIgdbGames)
            ->unique('name')
            ->values();

        return response()->json($mergedGames);
    }

    public function store(Request $request)
    {
        $game = IGDBGame::search("$request->game_name")->get();
        Auth::user()->games()->attach($game, ['status' => $request->status]);
        return response()->json(['message' => 'Game added to list']);
    }

    public function update(Request $request, Game $game)
    {
        Auth::user()->games()->updateExistingPivot($game->id, ['status' => $request->status]);
        return response()->json(['message' => 'Game status updated']);
    }

    public
    function destroy(Game $game)
    {
        Auth::user()->games()->detach($game->id);
        return response()->json(['message' => 'Game removed from list']);
    }

    public function addToCollection(Request $request)
    {
        $request->validate([
            'game_id' => 'required|exists:games,id', // Adjust based on your game data
        ]);

        DB::table('game_user')->insert([
            'user_id' => Auth::id(),
            'game_id' => $request->game_id,
            'status' => 'owned',
            'created_at' => now(),
            'updated_at' => now(),
        ]);


        return response()->json(['message' => 'Game added to collection'], 200);
    }

}
