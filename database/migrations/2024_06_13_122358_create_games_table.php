<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->year('year');
            $table->text('description');
            $table->string('genre');
            $table->string('platform');
            $table->integer('igdb_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
