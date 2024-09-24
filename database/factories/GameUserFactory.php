<?php

namespace Database\Factories;

use App\Models\Game;
use App\Models\GameUser;
use Illuminate\Database\Eloquent\Factories\Factory;

class GameUserFactory extends Factory
{
    protected $model = GameUser::class;

    public function definition(): array
    {

        return [
            'user_id' => $this->faker->numberBetween(1, 100), // Assuming user IDs range from 1 to 100
            'game_id' => $this->faker->numberBetween(1, 100), // Assuming game IDs range from 1 to 100
            'status' => $this->faker->randomElement(['owned']), // Example statuses
        ];
    }
}
