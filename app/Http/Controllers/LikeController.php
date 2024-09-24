<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function like(Request $request, Comment $comment)
    {
        // Remove dislike if it exists
        $comment->likes()->where('user_id', $request->user()->id)->where('type', 'dislike')->delete();

        // Add like if it doesn't exist
        if (!$comment->likes()->where('user_id', $request->user()->id)->where('type', 'like')->exists()) {
            $comment->likes()->create(['user_id' => $request->user()->id, 'type' => 'like']);
        }

        return response()->json(['likes_count' => $comment->likes()->where('type', 'like')->count()]);
    }

    public function dislike(Request $request, Comment $comment)
    {
        // Remove like if it exists
        $comment->likes()->where('user_id', $request->user()->id)->where('type', 'like')->delete();

        // Add dislike if it doesn't exist
        if (!$comment->likes()->where('user_id', $request->user()->id)->where('type', 'dislike')->exists()) {
            $comment->likes()->create(['user_id' => $request->user()->id, 'type' => 'dislike']);
        }

        return response()->json(['dislikes_count' => $comment->likes()->where('type', 'dislike')->count()]);
    }
}
