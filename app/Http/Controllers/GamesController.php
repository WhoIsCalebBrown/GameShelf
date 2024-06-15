<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MarcReichel\IGDBLaravel\Models\Game;

class GamesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
//        $clientID = Config::get('internet-game-database.id');
//        $clientSecret = Config::get('TWITCH_CLIENT_KEY');
//        $baseURL = Config::get('internet-game-database.url');
//
//        // Use the App Access Token to make a request to the IGDB API
//        $topRatedGames = Http::withHeaders([
//            'client_id' => 'ufmk0ku3xuv2hklnnc8uretj3682rm',
//            'Authorization' => 'Bearer c3cd4yj3l4eybemxdq1pnw5wlqpyf4',
//        ])
//            ->withOptions([
//                'body' => 'fields name, rating, cover.url, first_release_date;
//                       sort rating desc;
//                       limit 20;'
//            ])
//            ->post("$baseURL/games")
//            ->json();
//
//        dd($topRatedGames);

        $topRatedGames = Game::select(['name', 'rating', 'cover.url', 'first_release_date'])
            ->where('rating', '!=', null)
            ->where('first_release_date', '>=', now()->subYears(5))
            ->orderBy('rating', 'desc')
            ->limit(20)
            ->get()
            ->toArray();

        $names = array_map(function($game) {
            return $game['name'];
        }, $topRatedGames);

        return implode("\n", $names);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
