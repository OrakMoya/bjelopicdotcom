<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormSubmissionEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Inertia\Inertia;
use Inertia\Response;

class ContactFormController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Subpages/Contact');
    }

    public function store(Request $request): RedirectResponse
    {
        $tooManyAttempts = RateLimiter::tooManyAttempts('submit-contact-form:' . $request->ip(), Config::get('app.contact_form_spm'));
        if ($tooManyAttempts) {
            return redirect()->back()->withErrors([
                'submission' => 'Too many attempts. Please try again later.'
            ]);
        }

        $validated = $request->validate([
            'name' => ['required', 'min:2', 'max:255'],
            'email' => ['required', 'email', 'min:5', 'max:255'],
            'message' => ['required', 'min:5', 'max:1000'],
            'turnstile_token' => ['required', 'max:2048']
        ]);

        $turnstile_response = Http::post('https://challenges.cloudflare.com/turnstile/v0/siteverify',
            [
                'secret' => Config::get('app.turnstile_secretkey'),
                'response' => $validated['turnstile_token'],
                'remoteip' => $request->ip()
            ]
        )->json();

        if($turnstile_response['success'] != true){
            return redirect()->back()->withErrors('Invalid turnstile result');
        }

        $mailer = Mail::to(Config::get('app.contact_form_target'));

        $mailer->queue(
            new ContactFormSubmissionEmail(
                $validated['name'],
                $validated['email'],
                $validated['message']
            )
        );

        RateLimiter::increment('submit-contact-form:' . $request->ip(), 60);

        return redirect()->back()->with('Success');
    }
}
