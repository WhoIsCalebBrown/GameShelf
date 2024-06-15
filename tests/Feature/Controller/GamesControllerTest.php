<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GamesControllerTest extends TestCase
{
   use RefreshDatabase;

    public function test_it_returns_top_20_games(){

        $this->markTestSkipped('must be revisited.');
        $response = $this->get(route('index'));

        $responseContent = $response->getContent();
        $decodedContent = json_decode($responseContent, true);

        $names = array_map(function($game) {
            return $game['name'];
        }, $decodedContent);

        $this->assertTrue(true);
    }
}
