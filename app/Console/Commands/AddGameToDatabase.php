<?php

namespace App\Console\Commands;

use App\Models\Game;
use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class AddGameToDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:add-game-to-database {gameName}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add a game to the database from the API';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $gameName = $this->argument('gameName');
            $apiKey = Config::get('retro-spirit.key');
            $baseURL = Config::get('retro-spirit.url');

            $client = new Client();
            $response = $client->get("$baseURL/api/search/games/$gameName?key=$apiKey");

            $body = $response->getBody();
            $contents = $body->getContents();
            $data = json_decode($contents, true);

            if (isset($data["results"]["0"])) {
                $game = new Game();
                $game->name = $data["results"]["0"]["name"];
                $game->year = $data["results"]["0"]["year"];
                $game->description = $data["results"]["0"]["description"];
                $game->save();
            } else {
                $this->info('No results found for the given game name.');
            }
        } catch (\Exception $e) {
            $this->error('An error occurred while adding the game to the database: ' . $e->getMessage());
        }
    }
}
