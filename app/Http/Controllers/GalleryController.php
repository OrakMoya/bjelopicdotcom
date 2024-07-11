<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function show(): Response
    {
        $videos = Video::select(['uuid', 'title', 'description', 'subject', 'publication_date', 'preview_path', 'poster_path', 'thumbnail_path'])->orderBy('publication_date', 'DESC')->get();
        foreach($videos as $video){
            if($video->thumbnail_path)
                $video->thumbnail_path = Storage::url($video->thumbnail_path);
            if($video->preview_path)
                $video->preview_path = Storage::url($video->preview_path);
            if($video->poster_path)
                $video->poster_path = Storage::url($video->poster_path);
        }
        return Inertia::render('Subpages/Gallery', ['videos' => $videos]);
    }
}
