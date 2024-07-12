<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Game extends Model
{
    use HasFactory;
    use Searchable;

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function coverArts(): HasMany
    {
        return $this->hasMany(CoverArt::class);
    }

    public function toSearchableArray()
    {
        $array = $this->toArray();

        // Ensure the primary key is used as the objectID
        $array['objectID'] = (string) $this->id;

        return $array;
    }
    public function searchableAs(): string
    {
        return 'games_index';
    }

    protected $fillable = ['name', 'year', 'description', 'genre'];


    //Caleb when you come here next go to react command palette file and get it to search the input box on keystroke have nice day - past caleb

}
