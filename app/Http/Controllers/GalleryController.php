<?php

namespace App\Http\Controllers;

use App\Models\Still;
use App\Models\Video;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use function Termwind\render;

class GalleryController extends Controller
{
    public function index(): Response
    {
        $videos = Video::select(
            [
                'id',
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
                'link',
            ]
        )->with('videoRoles')->orderBy('publication_date', 'DESC')->get();

        $videos_by_collection = [];

        foreach ($videos as $video) {
            $video->encodeURLs();

            $roles = [];
            foreach ($video->videoRoles as $videoRole) {
                array_push($roles, $videoRole->role);
            }

            $video->stillsAvailable = Still::select('id', 'video_id')
                ->where('video_id', $video->id)->count() > 0;

            sort($roles);
            if ($video->stillsAvailable) {
                array_push($roles, 'Stillovi Dostupni');
            }
            $video->roles = $roles;

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
            if (! $pushed) {
                array_push($videos_by_collection, [
                    'collection' => $video->collection,
                    'description' => $video->description,
                    'videos' => [
                        $video,
                    ],
                ]);
            }


            unset($video->id);
            unset($video->videoRoles);
        }

        // Sort by publication date descending
        foreach ($videos_by_collection as &$videos_in_collection) {
            usort($videos_in_collection['videos'], function (Video $a, Video $b) {
                return (int)($a->publication_date < $b->publication_date);
            });
        }
        usort($videos_by_collection, function ($a, $b) {
            return (int)($a['videos'][0]->publication_date < $b['videos'][0]->publication_date);
        });

        return Inertia::render('Subpages/Gallery', ['by_collection' => $videos_by_collection]);
    }

    public function show(Video $video): Response
    {
        $stills = Still::select('video_id', 'path', 'description')
            ->where('video_id', $video->id)
            ->get()->toArray();
        $stills = array_map(function ($still) {
            return [...$still, 'path' => Storage::url($still['path'])];
        }, $stills);
        $video = [
            'title' => $video->title,
            'publication_date' => $video->publication_date,
            'uuid' => $video->uuid
        ];
        return Inertia::render('Subpages/Stills', ['video' => $video, 'stills' => $stills]);
    }
}
