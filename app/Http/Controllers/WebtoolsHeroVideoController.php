<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class WebtoolsHeroVideoController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Webtools/HeroVideo', ['heroUrl' => Storage::url('public/hero.webm')]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'video' => ['required', File::types('video/webm')->min('100kb')->max('30mb')]
        ]);

        $video = $request->video;

        Storage::disk('public')->putFileAs('', $video, 'hero.webm');

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(): StreamedResponse
    {
        return Storage::download('public/hero.webm');
    }
}
