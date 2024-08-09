<?php

namespace App\Console\Commands;

use App\Models\Game;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class ImportGamesFromIGDB extends Command
{
    protected $signature = 'import:games';

    protected $description = 'Import games from IGDB';

    public function handle(): int
    {
        $response = Http::withHeaders(['Client-ID' => Config::get('internet-game-database.id')])
            ->withToken(Config::get('internet-game-database.auth'))
            ->withBody('fields name, summary, first_release_date, platforms, genres, id, slug; where rating > 95; sort rating asc; limit 100;')
            ->post('https://api.igdb.com/v4/games');

        $response = json_decode($response->getBody()->getContents());

        collect($response)->each(function ($game) {
            Game::updateOrCreate(
                ['name' => $game->name],
                [
                    'year'        => Carbon::parse(optional($game)->first_release_date)->year,
                    'description' => optional($game)->summary ?? 'No description available',
                    'genre'       => optional($game)->genres ? $game->genres[0] : '',
                    'platforms'    => optional($game)->platforms ? $game->platforms[0] : '',
                    'igdb_id'     => $game->id,
                    'slug'        => $game->slug,
                ]
            );
        });

        return Command::SUCCESS;
    }

}

