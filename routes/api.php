<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentController;

use Inertia\Inertia;

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


Route::get('/games/{gameId}/comments', [CommentController::class, 'getComments']);

Route::post('/games/{gameId}/comments', [CommentController::class, 'store'])->middleware('auth:sanctum');

Route::post('/{likableType}/{likableId}/like', [LikeController::class, 'like']);
Route::delete('/{likableType}/{likableId}/unlike', [LikeController::class, 'unlike']);
