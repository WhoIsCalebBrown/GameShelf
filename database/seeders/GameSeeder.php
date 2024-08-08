<?php

namespace Database\Seeders;

use App\Models\Game;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $response = Http::withHeaders(['Client-ID' => Config::get('internet-game-database.id')])
            ->withToken(Config::get('internet-game-database.auth'))
            ->withBody('fields name, summary, first_release_date, platforms, genres, id; where rating > 95; sort rating asc; limit 500;')
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
                    'igdb_id'     => $game->id,
                ]
            );
        });

    }
}
