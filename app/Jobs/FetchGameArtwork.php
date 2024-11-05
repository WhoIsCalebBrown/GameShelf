<?php

namespace App\Jobs;

use App\Models\Artwork;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Log;

class FetchGameArtwork implements ShouldQueue
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
            ->withBody('fields game,image_id,url,height,width; where game = ' . $this->igdbId . ';')
            ->post('https://api.igdb.com/v4/artworks');

        if ($response->successful()) {
            $artworkData = $response->json();

            foreach ($artworkData as $artwork) {
                Artwork::updateOrCreate([
                    'game_id' => $this->gameId,
                    'height' => $artwork['height'] ?? $artwork[0]->height,
                    'image_id' => $artwork['image_id'] ?? $artwork[0]->image_id,
                    'url' => $artwork['url'] ?? $artwork[0]->url,
                    'width' => $artwork['width'] ?? $artwork[0]->width,
                ]);
            }
        } else{
            Log::error('Failed to fetch artwork for game ID: ' . $this->gameId);
        }
    }
}
