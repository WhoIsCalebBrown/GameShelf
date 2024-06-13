<?php

namespace App\Console\Commands;

use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Config;

class AddGameToDatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:add-game-to-database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(String $gameName)
    {
        $apiKey = Config::get('retro-spirit.key');
        $baseURL = Config::get('retro-spirit.url');

        $client = new Client();
        $response = $client->get("$baseURL/api/search/games/$gameName?key=$apiKey");
    }
}
