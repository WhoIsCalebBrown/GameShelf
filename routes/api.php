<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentController;


Route::get('/games/{gameId}/comments', [CommentController::class, 'getComments']);
Route::post('/games/{gameId}/comments', [CommentController::class, 'store'])->middleware('auth:sanctum');

Route::post('/comments/{comment}/like', [LikeController::class, 'like']);
Route::delete('/comments/{comment}/unlike', [LikeController::class, 'unlike']);
Route::post('/comments/{comment}/dislike', [LikeController::class, 'dislike']);
Route::delete('/comments/{comment}/undislike', [LikeController::class, 'undislike']);

