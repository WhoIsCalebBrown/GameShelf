<?php

namespace App\Console\Commands;

use App\Models\Game;
use Carbon\Carbon;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class ImportGamesFromIGDB extends Command
{
    protected $signature = 'import:games';

    protected $description = 'Import games from IGDB';

    private $client;
    private $batchSize = 500;

    public function __construct()
    {
        parent::__construct();
        $this->client = new Client([
            'base_uri' => 'https://api.igdb.com/v4/',
            'headers'  => [
                'Client-ID'     => Config::get('internet-game-database.id'),
                'Authorization' => 'Bearer ' . Config::get('internet-game-database.auth'),
            ],
        ]);
    }

    public function handle(): int
    {
        $response = Http::withHeaders(['Client-ID' => Config::get('internet-game-database.id')])
            ->withToken(Config::get('internet-game-database.auth'))
            ->withBody('fields name, summary, first_release_date, platforms, genres; where rating > 95; sort rating asc; limit 500; ')
            ->post('https://api.igdb.com/v4/games');

        $response = json_decode($response->getBody()->getContents());

        collect($response)->each(function ($game) {
            Game::updateOrCreate(
                ['name' => $game->name],
                [
                    'year'        => Carbon::parse(optional($game)->first_release_date)->year,
                    'description' => optional($game)->summary ?? 'No description available',
                    'genre'       => optional($game)->genres ? $game->genres[0] : '',
                    'platform'    => optional($game)->platforms ? $game->platforms[0] : '',
                ]
            );
        });

        return Command::SUCCESS;
    }

    private function getTotalGames()
    {
        try {
            $response = $this->client->post('games/count', [
                'body' => "fields *;",
            ]);

            $data = json_decode($response->getBody()->getContents(), true);
            return $data['count'];
        } catch (RequestException $e) {
            $this->error('Failed to get total games count: ' . $e->getMessage());
            return 0;
        }
    }

    private function fetchGames($offset)
    {
        try {
            $response = $this->client->post('games', [
                'body' => "fields name, summary, first_release_date, platforms, genres; limit {$this->batchSize}; offset {$offset};",
            ]);

            return json_decode($response->getBody()->getContents(), true);
        } catch (RequestException $e) {
            $this->error('Failed to fetch games: ' . $e->getMessage());
            return null;
        }
    }

    private function saveGames($games): void
    {
        foreach ($games as $game) {
            Game::updateOrCreate(
                ['igdb_id' => $game['id']],
                [
                    'name'         => $game['name'],
                    'summary'      => $game['summary'] ?? null,
                    'release_date' => isset($game['first_release_date']) ? date('Y-m-d', $game['first_release_date']) : null,
                    'platforms'    => isset($game['platforms']) ? implode(',', $game['platforms']) : null,
                    'genres'       => isset($game['genres']) ? implode(',', $game['genres']) : null,
                ]
            );
        }
    }
}

