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
        $videos = Video::select(
            [
                'uuid',
                'title',
                'description',
                'subject',
                'publication_date',
                'preview_path',
                'poster_path',
                'thumbnail_path',
                'collection',
                'category',
                'link'
            ]
        )->orderBy('publication_date', 'DESC')->get();

        $videos_by_collection = [];

        foreach ($videos as $video) {
            if ($video->thumbnail_path)
                $video->thumbnail_path = Storage::url($video->thumbnail_path);
            if ($video->preview_path)
                $video->preview_path = Storage::url($video->preview_path);
            if ($video->poster_path)
                $video->poster_path = Storage::url($video->poster_path);

            $pushed = false;
            if ($video->collection) {
                foreach ($videos_by_collection as &$videos_in_collection) {
                    if ($videos_in_collection && $videos_in_collection['videos'][0]->collection == $video->collection) {
                        array_push($videos_in_collection['videos'], $video);
                        $pushed = true;
                        break;
                    }
                }
            }
            if (!$pushed) {
                array_push($videos_by_collection, [
                    'collection' => $video->collection,
                    'description' => $video->description,
                    'videos' => [
                        $video
                    ]
                ]);
            }
        }

        // Sort by publication date descending
        foreach ($videos_by_collection as &$videos_in_collection) {
            usort($videos_in_collection['videos'], function (Video $a, Video $b) {
                return $a->publication_date < $b->publication_date;
            });
        }
        usort($videos_by_collection, function ($a, $b) {
            return $a['videos'][0]->publication_date < $b['videos'][0]->publication_date;
        });

        $focus = $_GET['focus'] ?? '';


        return Inertia::render('Subpages/Gallery', ['videos' => $videos, 'by_collection' => $videos_by_collection, 'focus' => $focus]);
    }
}
