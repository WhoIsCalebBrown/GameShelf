<?php

namespace Database\Factories;

use App\Models\CoverArt;
use Illuminate\Database\Eloquent\Factories\Factory;

class CoverArtFactory extends Factory
{
    protected $model = CoverArt::class;

    public function definition(): array
    {
        return [
            'url' => 'https://via.placeholder.com/150',
        ];
    }
}
