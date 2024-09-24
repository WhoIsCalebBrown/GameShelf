<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\GameUser;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GameUserSeeder extends Seeder
{
    public function run(): void
    {
        $gameIds = [81, 2, 12, 21, 31, 37, 53, 62, 66, 86, 92, 94]; // Replace with your desired game IDs

        foreach ($gameIds as $gameId) {
            GameUser::factory()->create([
                'user_id' => 1,
                'game_id' => $gameId,
                'status' => 'owned',
            ]);
        }
    }
}
