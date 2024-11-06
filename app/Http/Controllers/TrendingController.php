<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Services\IGDBService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrendingController extends Controller
{
    private IGDBService $igdbService;

    public function __construct(IGDBService $igdbService)
    {
        $this->igdbService = $igdbService;
    }
    public function index(Request $request){
        $games = $this->igdbService->getPopularGames();

        $formattedGames = array_map(function ($game) {
            return [
                'id' => $game['id'],
                'name' => $game['name'],
                'cover_url' => 'https:' . $game['cover']['url'],
                'release_date' => Carbon::createFromTimestamp($game['first_release_date'])->format('M d, Y'),
                'summary' => $game['summary']
            ];
        }, $games);

        return Inertia::render('Trending', [
            'games' => $formattedGames,
            'auth' => $request->user()
        ]);
    }
}
