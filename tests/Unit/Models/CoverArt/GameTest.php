<?php

namespace Tests\Unit\Models\CoverArt;

use App\Models\CoverArt;
use App\Models\Game;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class GameTest extends TestCase
{
    use DatabaseTransactions;

    public function test_it_has_cover_arts(): void
    {
        $game = Game::factory()->create([
            'name' => 'Super Mario Bros.'
        ]);

        $coverArt = CoverArt::factory()->create([
            'game_id' => $game->getKey(),
            'url'     => 'https://example.com/super-mario-bros.jpg'
        ]);

        $this->assertEquals($coverArt->game_id, $game->coverArts()->first()->getKey());
    }

    public function test_it_returns_list_of_similar_games()
    {
        $games = Game::factory()->count(2)->sequence(
            ['name' => 'Super Mario Bros.'],
            ['name' => 'Legend of Zelda'],
            ['name' => 'Metroid'],
            ['name' => 'Castlevania'],
            ['name' => 'Final Fantasy'],
        )->create();

        $response = $this->get(route('games.searchWithScout', ['game_name' => 'mario']));
        $response = json_decode($response->content());
        $this->assertEquals(200, $response->getStatusCode());


    }
}
