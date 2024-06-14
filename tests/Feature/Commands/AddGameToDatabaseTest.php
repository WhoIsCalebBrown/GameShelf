<?php

namespace Tests\Feature\Commands;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class AddGameToDatabaseTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_adds_a_game_to_the_database()
    {
        $gameName = 'Lufia & the Fortress of Doom';

        Http::fake([
            '*' => Http::response([
                'results' => [
                    [
                        'name' => 'Lufia & the Fortress of Doom',
                        'year' => '1993',
                        'description' => 'Maxim and the lads beat the sinestrals now what'
                    ]
                ]
            ])
        ]);

        $this->artisan('app:add-game-to-database', ['gameName' => $gameName]);

        $this->assertDatabaseHas('games', ['name' => $gameName]);
    }

    public function test_it_informs_user_when_there_is_no_results()
    {
        $gameName = 'IAmNotARealGame';

        Http::fake([
            '*' => Http::response(['results' => []], 200),
        ]);

        $this->artisan('app:add-game-to-database', ['gameName' => $gameName])
            ->expectsOutput('No results found for the given game name.')
            ->assertExitCode(0);
    }
}
