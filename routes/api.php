<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::get('/games/{gameId}/comments', [CommentController::class, 'index']);
Route::post('/games/{gameId}/comments', [CommentController::class, 'store']);

Route::post('/{likableType}/{likableId}/like', [LikeController::class, 'like']);
Route::delete('/{likableType}/{likableId}/unlike', [LikeController::class, 'unlike']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
