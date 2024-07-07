<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateVideoRequest;
use App\Models\Video;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class WebtoolsVideosController extends Controller
{
    public function show(): Response
    {
        $videos = Video::all();
        foreach ($videos as $video) {
            $video->thumbnail_path = Storage::url($video->thumbnail_path);
        }
        return Inertia::render('Webtools/Videos', ['videos' => $videos]);
    }

    public function createVideo(CreateVideoRequest $request): RedirectResponse
    {

        $video = Video::updateOrCreate([
            'title' => $request->title,
            'description' => $request->description,
            'subject' => $request->subject,
            'publication_date' => $request->publication_date,
            'link' => $request->link,
            'user_id' => Auth::id(),
            'uuid' => Str::uuid()
        ]);

        if ($request->thumbnail) {
            $thumbnail = $request->thumbnail;
            $path = Storage::putFile('public/videos/' . $video->uuid, $thumbnail);
            $video->thumbnail_path = $path;
            $video->save();
        }


        return redirect()->back()->with('status', 'Post saved!');
    }
}
