<?php

namespace App\Http\Controllers;

use App\Models\Still;
use App\Models\Video;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class WebtoolsStillsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Video $video): Response
    {
        $stills = Still::select('id', 'video_id', 'path', 'description', 'position')
            ->where('video_id', '=', $video->id)
            ->orderBy('position', 'DESC')
            ->get()->toArray();
        $stills = array_map(function ($row) {
            return [...$row, 'path' => Storage::url($row['path'])];
        }, $stills);
        $video = [
            'id' => $video->id,
            'title' => $video->title,
            'publication_date' => $video->publication_date
        ];
        return Inertia::render('Webtools/Stills', ['video' => $video, 'stills' => $stills]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Video $video, Request $request): RedirectResponse
    {
        $max = Still::where('video_id', $video->id)
            ->max('position') + 1;

        $request->validate([
            'stills.*' => ['required', 'image'],
            'sortByFilename' => ['required']
        ]);
        $stills = [];
        $files = $request->file('stills');

        if ($request->sortByFilename) {
            usort($files, function (UploadedFile $a, UploadedFile $b) use ($request) {
                $direction = $request->sortByFilename;
                if ($direction == 'ASC') {
                    return strcmp($b->getClientOriginalName(), $a->getClientOriginalName());
                }
                return strcmp($a->getClientOriginalName(), $b->getClientOriginalName());
            });
        }

        /** @var UploadedFile $file */
        foreach ($files as $i => $file) {
            $path = Storage::putFile('public/stills/' . $video->id, $file);
            array_push($stills, [
                'video_id' => $video->id,
                'path' => $path,
                'position' => $max + $i,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]);
        }
        Still::insert($stills);
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Still $still): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Still $still): void
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Still $still): RedirectResponse | HttpResponse
    {
        $request->validate(['position' => ['integer', 'required']]);
        $position = $request->position;

        // Moved position
        if ($still->position > $position) {
            Still::where('video_id', $still->video_id)
                ->where('position', $position)
                ->update(['position' => DB::raw('position+1')]);
        } else {
            Still::where('video_id', $still->video_id)
                ->where('position', $position)
                ->update(['position' => DB::raw('position-1')]);
        }
        $still->position = $position;
        $still->save();

        if ($request->acceptsJson()) {
            return response(status: 200);
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Still $still): RedirectResponse
    {
        defer(function () use ($still) {
            Storage::delete($still->path);
        });

        $still->delete();
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function bulkDestroy(Request $request): RedirectResponse
    {
        $stills = Still::select('*')
            ->whereIn('id', $request->selectedStills)
            ->get();
        foreach ($stills as $still) {
            $this->destroy($still);
        }
        return redirect()->back();
    }
}
