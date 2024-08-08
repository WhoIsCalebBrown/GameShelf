<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use MarcReichel\IGDBLaravel\Models\Game as IGDBGame;

class GameController extends Controller
{
    public function show(Game $game)
    {
        $game->load(['platform', 'artworks']);
        return Inertia::render('Game', [
            'game' => $game,
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
        $games    = Game::search($gameName)->get();

        if (count($games) < 1) {
            IGDBGame::fuzzySearch(
                [
                    'name',
                    'involved_companies.company.name',
                ],
                $gameName
            )->get();
        }
//        dd($games);
        return response()->json($games);
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
            'user_id'    => Auth::id(),
            'game_id'    => $request->game_id,
            'status'     => 'owned',
            'created_at' => now(),
            'updated_at' => now(),
        ]);


        return response()->json(['message' => 'Game added to collection'], 200);
    }

}
