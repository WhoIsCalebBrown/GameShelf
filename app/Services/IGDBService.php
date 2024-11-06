<?php

namespace App\Services;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class IGDBService
{
    private $clientId;
    private $authToken;

    public function __construct()
    {
        $this->clientId = Config::get('internet-game-database.id');
        $this->authToken = Config::get('internet-game-database.auth');
    }

    private function getHeaders(): array
    {
        return [
            'Client-ID' => $this->clientId,
            'Accept' => 'application/json'
        ];
    }

    public function getPopularGames()
    {
        $popularityResponse = Http::withHeaders($this->getHeaders())
            ->withToken($this->authToken)
            ->withBody(
                'fields game_id,value;
                sort value desc;
                limit 20;',
                'text/plain'
            )
            ->post('https://api.igdb.com/v4/popularity_primitives');

        if (!$popularityResponse->successful()) {
            return $popularityResponse->throw();
        }

        $primitives = json_decode($popularityResponse->body(), true);

        $gameIds = array_map(function ($game) {
            return $game['game_id'];
        }, $primitives);

        $gameIdsString = implode(',', $gameIds);

        $gamesResponse = Http::withHeaders($this->getHeaders())
            ->withToken($this->authToken)
            ->withBody(
                "fields id,name,cover.url,first_release_date,summary;
                where id = ($gameIdsString);",
                'text/plain'
            )
            ->post('https://api.igdb.com/v4/games');

        if (!$gamesResponse->successful()) {
            return $gamesResponse->throw();
        }

        return json_decode($gamesResponse->body(), true);
    }
}
