<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class GameFactory extends Factory
{
    public function definition(): array
    {
        $platforms = ['Super Nintendo', 'Playstation 5', 'Xbox One', 'GameCube', 'PC', 'Playstation 2', 'Xbox 360'];
        $genres = ['action', 'adventure', 'fps', 'fighter', 'MOBA', 'RTS', 'Shooter'];

        return [
            'name' => $this->faker->sentence(3),
            'year' => $this->faker->numberBetween(1985, date('Y')),
            'description' => $this->faker->text(),
            'genre' => $this->faker->randomElement($genres),
            'platform' => $this->faker->randomElement($platforms),
        ];
    }
}
