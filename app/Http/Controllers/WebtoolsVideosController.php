<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrUpdateVideoRequest;
use App\Http\Requests\DeleteVideoRequest;
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
    public function index(): Response
    {
        $videos = Video::query()->with('videoRoles')->orderBy('publication_date', 'DESC')->get();
        foreach ($videos as &$video) {
            $video->encodeURLs();

            $roles = [];
            foreach ($video->videoRoles as $videoRole) {
                array_push($roles, $videoRole->role);
            }
            sort($roles);
            $video->roles = $roles;
        }

        $collections = Video::select('collection')->distinct()->whereNotNull('collection')->pluck('collection')->toArray();
        $available_roles = VideoRole::query()->select('id', 'role')->get();

        return Inertia::render('Webtools/Videos', ['videos' => $videos, 'collections' => $collections, 'available_roles' => $available_roles]);
    }

    public function store(CreateOrUpdateVideoRequest $request): RedirectResponse
    {
        $request->validate(['thumbnail' => 'required']);

        $video = Video::updateOrCreate([
            'title' => $request->title,
            'description' => $request->description ? $request->description : '',
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

        if ($request->thumbnail) {
            $video->storeThumbnail($request->thumbnail);
        }
        if ($request->preview) {
            $video->storePreview($request->preview);
        }
        if ($request->poster) {
            $video->storePoster($request->poster);
        }


        if ($request->roles) {
            $video->storeRoles($request->roles);
        }

        $video->save();

        return redirect()->back()->with('status', 'Video saved!');
    }

    public function update(CreateOrUpdateVideoRequest $request, Video $video)
    {
        $video->update(
            [
                'title' => $request->title,
                'description' => $request->description ? $request->description : '',
                'subject' => $request->subject,
                'publication_date' => $request->publication_date,
                'link' => $request->link,
                'user_id' => Auth::id(),
                'uuid' => Str::uuid(),
                'collection' => $request->collection,
                'category' => $request->category,
            ]
        );

        if ($request->thumbnail) {
            $video->storeThumbnail($request->thumbnail);
        }
        if ($request->preview) {
            $video->storePreview($request->preview);
        }
        if ($request->poster) {
            $video->storePoster($request->poster);
        }

        if ($request->roles) {
            $video->storeRoles($request->roles);
        }

        $video->save();

        return redirect()->back()->with('status', 'Video saved!');
    }

    public function destroy(Video $video)
    {
        if (Storage::directoryExists('public/videos/' . $video->uuid)) {
            Storage::deleteDirectory('public/videos/' . $video->uuid);
        }

        $video->delete();

        return redirect()->back()->with('status', 'Video deleted!');
    }
}
