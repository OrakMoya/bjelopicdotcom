<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function authenticate(LoginRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if (Auth::attempt($validated, $request->remember_me)) {
            $request->session()->regenerate();
            return redirect()->intended('webtools');
        }

        return back()->withErrors([
            'email' => 'Incorrect email or password'
        ])->onlyInput('email');
    }
}
