<?php

namespace App\Console\Commands;

use App\Models\Artwork;
use App\Models\CoverArt;
use App\Models\Game;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class FetchCoverArtForGames extends Command
{
    protected $signature = 'fetch:cover-art';
    protected $description = 'Fetch cover-art for games that have none';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(): int
    {
        $games = Game::doesntHave('coverArts')->get();

        foreach ($games as $game) {
            $this->fetchCoverArtForGame($game);
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
    protected function fetchCoverArtForGame(Game $game): void
    {
        // Fetch artwork data from an external API
        $response = Http::withHeaders(['Client-ID' => Config::get('internet-game-database.id')])
            ->withToken(Config::get('internet-game-database.auth'))
            ->withBody('fields game, image_id, url, height, width; where game = ' . $game->igdb_id . ';')
            ->post('https://api.igdb.com/v4/covers');

        if ($response->successful()) {
            $artworkData = $response->json();

            // Create new artwork records for the game
            foreach ($artworkData as $coverArt) {
                CoverArt::create([
                    'game_id' => $game->id,
                    'height' => $coverArt['height'],
                    'image_id' => $coverArt['image_id'],
                    'url' => $coverArt['url'],
                    'width' => $coverArt['width'],
                ]);
            }
        } else {
            $this->error('Failed to fetch artwork for game ID: ' . $game->igdb_id);
        }
    }
}
