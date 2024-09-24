<?php

namespace App\Console\Commands;

use App\Models\Platform;
use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class FetchIGDBPlatforms extends Command
{
    protected $signature = 'import:platforms';
    protected $description = 'Fetch platforms data from IGDB and store it in the database';

    public function handle()
    {
        $response = Http::withHeaders(['Client-ID' => Config::get('internet-game-database.id')])
            ->withToken(Config::get('internet-game-database.auth'))
            ->withBody('fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,slug,summary,updated_at,url,versions,websites; limit 500; sort id asc;')
            ->post('https://api.igdb.com/v4/platforms');

        $response = json_decode($response->getBody()->getContents());

        collect($response)->each(function ($platform) {
            if($platform->name == 'PC (Microsoft Windows)'){
               $platform->name  = 'PC';
            }
            Platform::updateOrCreate(
                [
                    'id'               => $platform->id,
                    'abbreviation'     => $platform->abbreviation ?? null,
                    'alternative_name' => $platform->alternative_name ?? null,
                    'generation'       => $platform->generation ?? null,
                    'name'             => $platform->name,
                    'platform_family'  => $platform->platform_family ?? null,
                    'platform_logo'    => $platform->platform_logo ?? null,
                    'slug'             => $platform->slug,

                ]
            );
        });

        return Command::SUCCESS;
    }
}
