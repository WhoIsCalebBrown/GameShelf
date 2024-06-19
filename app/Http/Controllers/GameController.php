<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\UserGame;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use MarcReichel\IGDBLaravel\Models\Game as IGDBGame;

class GameController extends Controller
{
    public function index()
    {
        $games = Auth::user()->games;
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

    public function destroy(Game $game)
    {
        Auth::user()->games()->detach($game->id);
        return response()->json(['message' => 'Game removed from list']);
    }
}
