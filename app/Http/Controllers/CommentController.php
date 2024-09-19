<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index($gameId)
    {
        return Comment::where('game_id', $gameId)->get();
    }

    public function store(Request $request, $gameId)
    {
        $comment = Comment::create([
            'game_id' => $gameId,
            'text' => $request->input('text'),
        ]);

        return response()->json($comment, 201);
    }
}
