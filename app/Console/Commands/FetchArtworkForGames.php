<?php

namespace App\Console\Commands;

use App\Models\Game;
use App\Models\Artwork;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class FetchArtworkForGames extends Command
{
    protected $signature = 'fetch:artwork-for-games';
    protected $description = 'Fetch artwork for games that have none';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        $games = Game::doesntHave('artworks')->get();

        foreach ($games as $game) {
            $this->fetchArtworkForGame($game);
        }

        $this->info('Artwork fetching completed.');

        return 0;
    }

    /**
     * Fetch artwork for a specific game.
     *
     * @param  \App\Models\Game  $game
     * @return void
     */
    protected function fetchArtworkForGame(Game $game)
    {
        // Fetch artwork data from an external API
        $response = Http::withHeaders(['Client-ID' => Config::get('internet-game-database.id')])
            ->withToken(Config::get('internet-game-database.auth'))
            ->withBody('fields game,image_id,url, height, width; where game = ' . $game->igdb_id . ';')
            ->post('https://api.igdb.com/v4/covers');

//        $response = json_decode($response->getBody()->getContents());

        if ($response->successful()) {
            $artworkData = $response->json();

            // Create new artwork records for the game
            foreach ($artworkData as $data) {
                Artwork::create([
                    'game_id' => $game->id,
                    'height' => $data['height'],
                    'image_id' => $data['image_id'],
                    'url' => $data['url'],
                    'width' => $data['width'],
                ]);
            }
        } else {
            $this->error('Failed to fetch artwork for game ID: ' . $game->igdb_id);
        }
    }
}
