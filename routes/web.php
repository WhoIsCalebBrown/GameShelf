<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;




/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Route::get('/', [GamesController::class, 'index'])->name('index');

Route::get('/', function () {
    return Inertia::render('Home');
});


Route::prefix('games')->name('games.')->group(function (){
    Route::get('/games', [GameController::class, 'index'])->name('index');
    Route::post('/games', [GameController::class, 'store'])->name('store');
    Route::put('/games/{game}', [GameController::class, 'update'])->name('update');
    Route::delete('/games/{game}', [GameController::class, 'destroy'])->name('delete');
});
