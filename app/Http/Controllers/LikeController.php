<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class LikeController extends Controller
{
    public function like($likableType, $likableId): JsonResponse
    {
        $like = Like::firstOrCreate([
            'user_id' => Auth::id(),
            'likable_id' => $likableId,
            'likable_type' => "App\\Models\\" . ucfirst($likableType)
        ]);

        return response()->json($like, 201);
    }

    public function unlike($likableType, $likableId): JsonResponse
    {
        Like::where([
            'user_id' => Auth::id(),
            'likable_id' => $likableId,
            'likable_type' => "App\\Models\\" . ucfirst($likableType)
        ])->delete();

        return response()->json(null, 204);
    }
}
