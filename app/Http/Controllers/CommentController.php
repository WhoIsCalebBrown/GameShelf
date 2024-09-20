<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CommentController extends Controller
{
    public function index($gameId)
    {
        return Comment::where('game_id', $gameId)->get();
    }

    public function getComments($gameId)
    {
        $comments = Comment::with('user')->where('game_id', $gameId)->get();
        return response()->json($comments);
    }
    public function store(Request $request, $gameId)
    {

        Log::info("TEST");

        $user = auth::user();
        Log::info($user);

        $request->validate([
            'text' => 'required|string|max:255',
        ]);

        $comment = Comment::create([
            'text' => $request->input('text'),
            'game_id' => $gameId,
            'user_id' => auth::id(),
        ]);

        return response()->json($comment, 201);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
