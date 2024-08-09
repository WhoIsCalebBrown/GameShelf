<?php

namespace App\Console\Commands;

use App\Models\Game;
use App\Models\Artwork;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class FetchArtworkForGames extends Command
{
    protected $signature = 'fetch:artwork';
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

        $this->info('Cover Art fetching completed.');

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
            ->post('https://api.igdb.com/v4/artworks');

        if ($response->successful()) {
            $artworkData = $response->json();

            // Create new artwork records for the game
            foreach ($artworkData as $artwork) {
                Artwork::updateOrCreate([
                    'game_id' => $game->id,
                    'height' => $artwork['height'] ?? $artwork[0]->height,
                    'image_id' => $artwork['image_id'] ?? $artwork[0]->image_id,
                    'url' => $artwork['url'] ?? $artwork[0]->url,
                    'width' => $artwork['width'] ?? $artwork[0]->width,
                ]);
            }
        } else {
            $this->error('Failed to fetch artwork for game ID: ' . $game->igdb_id);
        }
    }
}
