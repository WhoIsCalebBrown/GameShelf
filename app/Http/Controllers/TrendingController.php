<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrendingController extends Controller
{
    public function __invoke(Request $request){

        $games = Game::with(['platforms', 'artworks', 'coverArts'])->get();

        return Inertia::render('Trending', [
            'auth' => $request->user(),
            'games' => $games
        ]);
    }
}
