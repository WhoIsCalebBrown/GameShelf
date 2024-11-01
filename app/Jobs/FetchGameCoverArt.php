<?php

namespace App\Jobs;

use App\Models\Artwork;
use App\Models\CoverArt;
use App\Models\Game;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;

class FetchGameCoverArt implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected int $gameId;
    protected int $igdbId;

    public function __construct($gameId, $igdbId)
    {
        $this->gameId = $gameId;
        $this->igdbId = $igdbId;
    }

    public function handle() : void
    {
        $response = Http::withHeaders(['Client-ID' => Config::get('internet-game-database.id')])
            ->withToken(Config::get('internet-game-database.auth'))
            ->withBody('fields game, image_id, url, height, width; where game = ' . $this->igdbId . ';')
            ->post('https://api.igdb.com/v4/covers');

        if ($response->successful()) {
            $artworkData = $response->json();

            foreach ($artworkData as $coverArt) {
                CoverArt::create([
                    'game_id' => $this->gameId,
                    'height' => $coverArt['height'],
                    'image_id' => $coverArt['image_id'],
                    'url' => $coverArt['url'],
                    'width' => $coverArt['width'],
                ]);
            }
        } else {
            Log::error('Failed to fetch cover art for game ID: ' . $this->gameId);
        }
    }
}
