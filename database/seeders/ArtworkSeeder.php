<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ArtworkSeeder extends Seeder
{
    public function run(): void
    {
        exec('php artisan fetch:artwork');
    }
}
