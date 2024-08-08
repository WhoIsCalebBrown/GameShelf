<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke(Request $request)
    {
        $currentUser = auth::user();
        $games = $currentUser->games()->with(['platform', 'artworks'])->get();

        return Inertia::render('Home', [
            'games' => $games,
            'auth' => $request->user(),
        ]);
    }
}
