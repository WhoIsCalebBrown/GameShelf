<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CoverArtSeeder extends Seeder
{
    public function run(): void
    {
        exec('php artisan fetch:cover-art');
    }
}
