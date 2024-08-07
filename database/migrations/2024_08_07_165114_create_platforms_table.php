<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('platforms', function (Blueprint $table) {
            $table->id();
            $table->string('abbreviation')->nullable();
            $table->string('alternative_name')->nullable();
            $table->integer('generation')->nullable();
            $table->string('name');
            $table->unsignedBigInteger('platform_family')->nullable();
            $table->unsignedBigInteger('platform_logo')->nullable();
            $table->string('slug');
            $table->text('summary')->nullable();
            $table->string('url')->nullable();
            $table->json('versions')->nullable();
            $table->json('websites')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('platforms');
    }
};
