<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
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
            if ($video->preview_path)
                $video->preview_path = Storage::url($video->preview_path);
            if ($video->poster_path)
                $video->poster_path = Storage::url($video->poster_path);
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

        $thumbnail = $request->thumbnail;
        $path = Storage::putFile('public/videos/' . $video->uuid, $thumbnail);
        $video->thumbnail_path = $path;

        if ($request->poster) {
            $poster = $request->poster;
            $path = Storage::putFile('public/videos/' . $video->uuid, $poster);
            $video->poster_path = $path;
        }

        $video->save();

        return redirect()->back()->with('status', 'Post saved!');
    }

    public function updateVideo(UpdateVideoRequest $request)
    {
        $video = Video::updateOrCreate(
            ['id' => $request->id],
            [
                'title' => $request->title,
                'description' => $request->description,
                'subject' => $request->subject,
                'publication_date' => $request->publication_date,
                'link' => $request->link,
                'user_id' => Auth::id(),
                'uuid' => Str::uuid()
            ]
        );

        if ($request->thumbnail) {
            Storage::delete($video->thumbnail_path);
            $thumbnail = $request->thumbnail;
            $path = Storage::put('public/videos' . $video->uuid, $thumbnail);
            $video->thumbnail_path = $path;
        }

        if ($request->preview) {
            if ($video->preview_path)
                Storage::delete($video->preview_path);
            $preview = $request->preview;
            $path = Storage::put('public/videos' . $video->uuid, $preview);
            $video->preview_path = $path;
        }

        if ($request->poster) {
            if ($video->poster_path)
                Storage::delete($video->poster_path);
            $poster = $request->poster;
            $path = Storage::put('public/videos' . $video->uuid, $poster);
            $video->poster_path = $path;
        }

        $video->save();
        return redirect()->back()->with('status', 'Post saved!');
    }
}