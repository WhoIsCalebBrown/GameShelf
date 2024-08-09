<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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

    public function artworks(): HasMany
    {
        return $this->hasMany(Artwork::class);
    }

    public function platforms(): BelongsTo
    {
        return $this->belongsTo(Platform::class, 'platforms', 'id');
    }

    public function genres(): BelongsTo
    {
        return $this->belongsTo(Genre::class, 'genre', 'id');
    }



    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function toSearchableArray()
    {
        $array = $this->toArray();

        // Ensure the primary key is used as the objectID
        $array['objectID'] = (string)$this->id;

        return $array;
    }

    public function searchableAs(): string
    {
        return 'games_index';
    }

    protected $fillable = ['name', 'year', 'description', 'genre', 'igdb_id', 'slug', 'platforms'];


    //Caleb when you come here next go to react command palette file and get it to search the input box on keystroke have nice day - past caleb
    // Thanks - Future Caleb
}
