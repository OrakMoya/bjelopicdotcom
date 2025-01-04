<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOrUpdateVideoRequest;
use App\Http\Requests\DeleteVideoRequest;
use App\Models\Video;
use App\Models\VideoHour;
use App\Models\VideoRole;
use App\Services\VideoService;
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
        $videos = Video::query()
            ->with('videoRoles')
            ->with('videoHours')
            ->orderBy('publication_date', 'DESC')
            ->get();
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
        $available_production_phases = VideoHour::select('phase')->distinct()->pluck('phase')->toArray();

        return Inertia::render(
            'Webtools/Videos',
            [
                'videos' => $videos,
                'collections' => $collections,
                'available_roles' => $available_roles,
                'available_production_phases' => $available_production_phases
            ]
        );
    }

    public function store(CreateOrUpdateVideoRequest $request, VideoService $videoService): RedirectResponse
    {
        $request->validate(['thumbnail' => 'required']);

        $videoService->createVideo($request->validated());

        return redirect()->back()->with('status', 'Video saved!');
    }
    /**
     * @return RedirectResponse
     */
    public function update(CreateOrUpdateVideoRequest $request, Video $video, VideoService $videoService): RedirectResponse
    {
        $videoService->updateVideo($video, $request->validated());

        return redirect()->back()->with('status', 'Video saved!');
    }
    /**
     * @return RedirectResponse
     */
    public function destroy(Video $video): RedirectResponse
    {
        if (Storage::directoryExists('public/videos/' . $video->uuid)) {
            Storage::deleteDirectory('public/videos/' . $video->uuid);
        }

        $video->delete();

        return redirect()->back()->with('status', 'Video deleted!');
    }
}
