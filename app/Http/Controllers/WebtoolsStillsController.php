<?php

namespace App\Http\Controllers;

use App\Models\Still;
use App\Models\Video;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
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
        $stills = Still::select('id', 'video_id', 'path', 'description', 'priority')
            ->where('video_id', '=', $video->id)
            ->orderBy('priority')
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
        $request->validate([
            'stills.*' => ['required', 'image']
        ]);
        $stills = [];
        /** @var UploadedFile $file */
        foreach ($request->file('stills') as $file) {
            $path = Storage::putFile('public/stills/' . $video->id, $file);
            array_push($stills, [
                'video_id' => $video->id,
                'path' => $path,
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
    public function update(Request $request, Still $still): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Still $still): RedirectResponse
    {
        Storage::delete($still->path);
        $still->delete();
        return redirect()->back();
    }
}
