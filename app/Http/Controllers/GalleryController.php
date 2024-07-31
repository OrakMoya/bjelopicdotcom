<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function show(): Response
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
            sort($roles);
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
}
