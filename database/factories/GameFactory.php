<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Games>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
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
