<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class ImportPlatformsFromIGDBCommandTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_adds_games_from_IGDB_to_our_database(): void
    {
        $gameName = "Snickers Oogabooga";

        Http::fake([
            'https://api.igdb.com/v4/platforms' => Http::response([
                [
                    'id' => 3,
                    'abbreviation' => 'Linux',
                    'alternative_name' => 'GNU/Linux',
                    'category' => 4,
                    'created_at' => 1297639288,
                    'name' => 'Linux',
                    'platform_logo' => 380,
                    'platform_family' => 4,
                    'slug' => 'linux',
                    'summary' => 'Linux is a free and open-source (FOSS/FLOSS) Operating System. In a more precise and complex definition, Linux is an open-source OS kernel on which a large variety of Operating Systems (known as Linux distributions) are built.',
                    'updated_at' => 1718027289,
                    'url' => 'https://www.igdb.com/platforms/linux',
                    'versions' => [
                        44,
                    ],
                    'websites' => [
                        1,
                    ],
                    'checksum' => '056b13ba-5c14-b883-e10a-28b3e66ff97f',
                ]
            ]),
        ]);

        $this->artisan("import:games");

        $this->assertDatabaseHas('games', [
            'name' => $gameName,
        ]);
        $this->assertDatabaseCount('games', 1);
    }
}
