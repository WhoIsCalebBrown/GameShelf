<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Genre extends Model
{
    use HasFactory;


    protected $guarded = [];

    public function games(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, 'games', 'Genre');
    }

}
