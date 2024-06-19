<?php

namespace Tests\Unit\Models\CoverArt;

use App\Models\CoverArt;
use App\Models\Game;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class CoverArtTest extends TestCase
{
    use DatabaseTransactions;

    public function test_it_has_game(): void
    {
        $game = Game::factory()->create([
            'name' => 'Super Mario Bros.'
        ]);

        $coverArt = CoverArt::factory()->create([
            'game_id' => $game->getKey(),
            'url'     => 'https://example.com/super-mario-bros.jpg'
        ]);

        $this->assertEquals($game->getKey(), $coverArt->game->getKey());
    }
}
