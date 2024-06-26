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

        return Inertia::render('Home', [
            'games' => $currentUser->games,
            'auth' => $request->user(),
        ]);
    }
}
