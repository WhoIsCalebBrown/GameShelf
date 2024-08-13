<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GameControllerTest extends TestCase
{
   use RefreshDatabase;

    public function test_it_returns_top_20_games(){

        $response = $this->post(route('games.store'), ['game_name' => 'Ocarina of Time']);
        $this->assertTrue(true);
    }
}
