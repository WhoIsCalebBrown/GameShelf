<?php

namespace App\Providers\database\seeders;

use App\Models\Platform;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class PlatformSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $response = Http::withHeaders(['Client-ID' => Config::get('internet-game-database.id')])
            ->withToken(Config::get('internet-game-database.auth'))
            ->withBody('fields abbreviation,alternative_name,category,checksum,created_at,generation,name,platform_family,platform_logo,slug,summary,updated_at,url,versions,websites; limit 500; sort id asc;')
            ->post('https://api.igdb.com/v4/platforms');

        $response = json_decode($response->getBody()->getContents());

        collect($response)->each(function ($platform) {
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
                ],
            );
        });
    }
}
