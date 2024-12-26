<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormSubmissionEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
        $tooManyAttempts = RateLimiter::tooManyAttempts('submit-contact-form:' . $request->ip(), 1);
        if ($tooManyAttempts) {
            return redirect()->back()->withErrors([
                'submission' => 'Too many attempts. Please try again later.'
            ]);
        }

        $validated = $request->validate([
            'name' => ['required', 'min:2', 'max:255'],
            'email' => ['required', 'email', 'min:5', 'max:255'],
            'message' => ['required', 'min:5', 'max:1000'],
            'sendCopy' => ['required', 'boolean']
        ]);

        $mailer = Mail::to('info@bjelopic.com');

        if ($validated['sendCopy']) {
            $mailer->bcc($validated['email']);
        }

        $mailer->queue(
            new ContactFormSubmissionEmail(
                $validated['name'],
                $validated['email'],
                $validated['message']
            )
        );

        RateLimiter::increment('submit-contact-form:' . $request->ip(), 180);

        return redirect()->back()->with('Success');
    }
}
