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
        $comments = Comment::where('game_id', $gameId)
            ->whereNull('parent_id') // Fetch only top-level comments
            ->with(['replies']) // Eager load replies and their users
            ->get();

        return response()->json($comments);
    }
    public function store(Request $request)
    {
        $request->validate([
            'text' => 'required|string|max:255',
            'game_id' => 'required|exists:games,id', // Validate game_id
            'parent_id' => 'nullable|exists:comments,id',
        ]);

        $comment = Comment::create([
            'text' => $request->input('text'),
            'user_id' => Auth::id(),
            'game_id' => $request->input('game_id'), // Ensure game_id is set
            'parent_id' => $request->input('parent_id'),
        ]);

        return response()->json($comment, 201);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
