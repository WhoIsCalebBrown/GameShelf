<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Platform extends Model
{
    use HasFactory;

    protected $casts = [
        'websites' => 'array',
    ];

    protected $guarded = [];

    public function games(): HasMany
    {
        return $this->hasMany(Game::class);
    }

}
