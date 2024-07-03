<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GameUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users  = User::all();
        $games  = Game::all();
        $status = ['owned', 'want_to_play', 'completed', 'shelved'];

        // Attach games to users
        foreach ($users as $user) {
            foreach ($games->random(rand(1, 8)) as $game) {
                DB::table('game_user')->insert([
                    'user_id'    => $user->id,
                    'game_id'    => $game->id,
                    'status'     => $status[array_rand($status)], // Random status
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
