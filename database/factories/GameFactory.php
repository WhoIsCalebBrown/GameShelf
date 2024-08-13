<?php

namespace Database\Factories;

use App\Models\Game;
use Illuminate\Database\Eloquent\Factories\Factory;

class GameFactory extends Factory
{
    protected $model = Game::class;

    public function definition(): array
    {
        $platforms = ['Super Nintendo', 'Playstation 5', 'Xbox One', 'GameCube', 'PC', 'Playstation 2', 'Xbox 360'];
        $genres = ['action', 'adventure', 'fps', 'fighter', 'MOBA', 'RTS', 'Shooter'];

        return [
            'name' => $this->faker->words(3, true),
            'year' => $this->faker->numberBetween(1985, date('Y')),
            'description' => $this->faker->text(),
            'genre' => $this->faker->randomElement($genres),
            'platform' => $this->faker->randomElement($platforms),
        ];
    }
}
