<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateVideoRequest;
use App\Http\Requests\DeleteVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
use App\Models\Video;
use App\Models\VideoRole;
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
        $videos = Video::query()->orderBy('publication_date', 'DESC')->get();
        foreach ($videos as &$video) {
            $video->thumbnail_path = Storage::url($video->thumbnail_path);
            if ($video->preview_path)
                $video->preview_path = Storage::url($video->preview_path);
            if ($video->poster_path)
                $video->poster_path = Storage::url($video->poster_path);

            $roles = [];
            foreach ($video->videoRoles()->orderBy('role', 'DESC')->get() as $videoRole) {
                array_push($roles, $videoRole->role);
            }
            $video->roles = $roles;
        }
        $collections = Video::select('collection')->distinct()->whereNotNull('collection')->pluck('collection')->toArray();
        $available_roles = VideoRole::query()->select('id', 'role')->get();


        return Inertia::render('Webtools/Videos', ['videos' => $videos, 'collections' => $collections, 'available_roles' => $available_roles]);
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
            'uuid' => Str::uuid(),
            'collection' => $request->collection,
            'category' => $request->category,
        ]);


        $thumbnail = $request->thumbnail;
        $path = Storage::putFile('public/videos/' . $video->uuid, $thumbnail);
        $video->thumbnail_path = $path;


        if ($request->thumbnail)
            $video->setThumbnail($request->thumbnail);
        if ($request->preview)
            $video->setPreview($request->preview);
        if ($request->poster)
            $video->setPoster($request->poster);

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
                'uuid' => Str::uuid(),
                'collection' => $request->collection,
                'category' => $request->category,
            ]
        );

        if ($request->thumbnail)
            $video->setThumbnail($request->thumbnail);
        if ($request->preview)
            $video->setPreview($request->preview);
        if ($request->poster)
            $video->setPoster($request->poster);

        if ($request->roles)
            $video->setRoles($request->roles);


        $video->save();
        return redirect()->back()->with('status', 'Post saved!');
    }

    public function deleteVideo(DeleteVideoRequest $deleteVideoRequest)
    {
        $video = Video::find($deleteVideoRequest->id);

        if (Storage::directoryExists('public/videos/' . $video->uuid))
            Storage::deleteDirectory('public/videos/' . $video->uuid);

        $video->delete();
        return redirect()->back()->with('status', 'Video deleted!');
    }
}
