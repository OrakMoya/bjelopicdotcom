<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{

    public function show(): Response
    {
        $videos = Video::orderBy('created_at', 'DESC')->get();
        foreach ($videos as $video) {
            $video->thumbnail_path = Storage::url($video->thumbnail_path);

            if ($video->poster_path)
                $video->poster_path = Storage::url($video->poster_path);

            if ($video->preview_path)
                $video->preview_path = Storage::url($video->preview_path);
        }

        return Inertia::render('Home', ['videos' => $videos]);
    }
}