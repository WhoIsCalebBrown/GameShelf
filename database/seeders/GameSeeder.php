<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    public function run(): void
    {
        exec('php artisan import:games');

    }
}
