<?php

namespace App\Console\Commands;

use App\Models\Genre;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class FetchIGDBGenres extends Command
{
    protected $signature = 'import:genres';
    protected $description = 'Fetch platforms data from IGDB and store it in the database';

    public function handle()
    {
        $response = Http::withHeaders(['Client-ID' => Config::get('internet-game-database.id')])
            ->withToken(Config::get('internet-game-database.auth'))
            ->withBody('fields name, slug, url; limit 500; sort id asc;')
            ->post('https://api.igdb.com/v4/genres');

        $response = json_decode($response->getBody()->getContents());

        collect($response)->each(function ($genre) {
            Genre::updateOrCreate(
                [
                    'id'   => $genre->id,
                    'name' => $genre->name,
                    'slug' => $genre->slug,
                    'url'  => $genre->url,
                ]
            );
        });

        return Command::SUCCESS;
    }
}
