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

    private $client;

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

    public function handle()
    {
        $response = Http::withHeaders(['Client-ID' => Config::get('internet-game-database.id')])
            ->withToken(Config::get('internet-game-database.auth'))
            ->withBody('fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,slug,summary,updated_at,url,versions,websites; limit 500; sort id asc;')
            ->post('https://api.igdb.com/v4/platforms');

        $response = json_decode($response->getBody()->getContents());

//        Log::info($response);
        collect($response)->each(function ($platform) {
//            dd($platform);
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
//                    'websites'         => $platform->websites ?? []
//                    'summary'  => $platform->summary ?? null,
//                    'url'      => $platform->url ?? null,
//                    'versions' => $platform->versions ?? [],
                ],
                [
                ]
            );
        });

        return Command::SUCCESS;
    }
}
