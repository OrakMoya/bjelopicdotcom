<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomepageController extends Controller
{
    public function show(): Response
    {
        $videos = Video::select(['title', 'thumbnail_path', 'link', 'uuid'])
            ->orderBy('publication_date', 'DESC')->get();
        foreach ($videos as $video) {
            $video->encodeURLs();
        }

        return Inertia::render(
            'Hero/Home',
            [
                'videos' => $videos,
                'heroUrl' =>
                Storage::fileExists('public/hero.webm') ? Storage::url('public/hero.webm') : 'hero.webm'
            ]
        );
    }
}
