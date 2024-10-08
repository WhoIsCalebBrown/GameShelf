<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         $this->call(UserSeeder::class);
         $this->call(GameSeeder::class);
         $this->call(PlatformSeeder::class);
         $this->call(GameUserSeeder::class);
         $this->call(CoverArtSeeder::class);
         $this->call(ArtworkSeeder::class);
    }
}
