<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['game_id', 'user_id','parent_id', 'text', 'created_at'];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function replies()
    {
        return $this->hasMany(Comment::class, 'parent_id')->with('replies.user');
    }

    public function likes()
    {
        return $this->morphMany(Like::class, 'likable');
    }




}
