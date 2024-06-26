<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        dump($request->all());

        if ($request->hasFile('profile_photo')) {
            $newPhoto = $request->file('profile_photo');
            $newPhotoHash = hash_file('sha256', $newPhoto->getRealPath());

            if ($user->profile_photo) {
                // Get the path to the current photo
                $currentPhotoPath = storage_path('app/public/' . $user->profile_photo);

                // Check if the current photo exists and calculate its hash
                if (file_exists($currentPhotoPath)) {
                    $currentPhotoHash = hash_file('sha256', $currentPhotoPath);

                    // If the hashes match, use the old photo
                    if ($newPhotoHash === $currentPhotoHash) {
                        $newPhotoPath = $user->profile_photo;
                    } else {
                        // Delete the old photo and upload the new one
                        Storage::disk('public')->delete($user->profile_photo);
                        $newPhotoPath = $newPhoto->store('profile_photos', 'public');
                    }
                } else {
                    // If the current photo does not exist (for some reason), upload the new one
                    $newPhotoPath = $newPhoto->store('profile_photos', 'public');
                }
            } else {
                // If there is no current photo, upload the new one
                $newPhotoPath = $newPhoto->store('profile_photos', 'public');
            }

            $user->profile_photo = $newPhotoPath;
        }

        // Handle name and email update
        if ($request->filled('name')) {
            if($user->name !== $request->input('name')) {
                $user->name = $request->input('name');
            }
        }

        if ($request->filled('email')) {
            if ($user->email !== $request->input('email')) {
                $user->email = $request->input('email');
                $user->email_verified_at = null; // Mark email as unverified if it has changed
            }
        }

        $user->save();

        return Redirect::route('profile.edit')->with('status', 'Profile updated successfully.');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
