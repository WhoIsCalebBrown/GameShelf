<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['game_id', 'text'];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

}
