<?php

namespace App\Http\Controllers;

use App\Models\Games;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke(Request $request)
    {

        $miyagi = User::first()->games;


        return Inertia::render('Home', [
            'games' => $miyagi,
        ]);
    }
}
