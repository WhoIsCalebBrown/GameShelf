<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Platform extends Model
{
    use HasFactory;

    protected $casts = [
        'websites' => 'array',
    ];

    protected $guarded = [];

    public function games(): BelongsToMany
    {
        return $this->belongsToMany(Platform::class, 'games', 'platform' );
    }


}
