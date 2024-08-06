<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ImportGamesFromIGDBCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_adds_games_from_IGDB_to_our_database(): void
    {
        $gameName = "Snickers Oogabooga";

        Http::fake([
            'https://api.igdb.com/v4/games' => Http::response([
                [
                    "first_release_date" => 1474416000,
                    "genres"             => [
                        0 => 34,
                    ],
                    "name"               => $gameName,
                    "platforms"          => [
                        0 => 46,
                    ],
                    "summary"            => "A cross media collaboration project between Sunrise & Broccolli.",
                ],
            ]),
        ]);

        $this->artisan("import:games");

        $this->assertDatabaseHas('games', [
            'name' => $gameName,
        ]);
        $this->assertDatabaseCount('games', 1);
    }

    public function test_it_adds_games_from_IGBD_that_have_no_genre(): void
    {
        $gameName = "Snickers Oogabooga";

        Http::fake([
            'https://api.igdb.com/v4/games' => Http::response([
                [
                    "first_release_date" => 1474416000,
                    "name"               => $gameName,
                    "platforms"          => [
                        0 => 46,
                    ],
                    "summary"            => "A cross media collaboration project between Sunrise & Broccolli.",
                ],
            ]),
        ]);

        $this->artisan("import:games");

        $this->assertDatabaseHas('games', [
            'name' => $gameName,
        ]);
        $this->assertDatabaseCount('games', 1);
    }

    public function test_it_adds_games_from_IGBD_that_have_no_platform(): void
    {
        $gameName = "Snickers Oogabooga";

        Http::fake([
            'https://api.igdb.com/v4/games' => Http::response([
                [
                    "first_release_date" => 1474416000,
                    "genres"             => [
                        0 => 34,
                    ],
                    "name"               => $gameName,
                    "summary"            => "A cross media collaboration project between Sunrise & Broccolli.",
                ],
            ]),
        ]);

        $this->artisan("import:games");

        $this->assertDatabaseHas('games', [
            'name' => $gameName,
        ]);
        $this->assertDatabaseCount('games', 1);
    }
}
