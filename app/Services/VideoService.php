<?php

namespace App\Services;

use App\Models\Video;
use App\Models\VideoHour;
use App\Models\VideoRole;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class VideoService
{
    /**
     * @param array<string,mixed> $attributes
     */
    public function createVideo(array $attributes): Video
    {
        $video = new Video(
            [
                'title' => $attributes['title'],
                'description' => $attributes['description'] ? $attributes['description'] : '',
                'subject' => $attributes['subject'],
                'publication_date' => $attributes['publication_date'],
                'link' => $attributes['link'],
                'user_id' => Auth::id(),
                'uuid' => Str::uuid(),
                'collection' => $attributes['collection'],
                'category' => $attributes['category'],
            ]
        );

        if ($attributes['thumbnail']) {
            $this->setVideoThumbnail($video, $attributes['thumbnail']);
        }

        if ($attributes['preview']) {
            $this->setVideoPreview($video, $attributes['preview']);
        }

        if ($attributes['poster']) {
            $this->setVideoPoster($video, $attributes['poster']);
        }

        $video->save();
        if (isset($attributes['roles']))
            $this->setVideoRoles($video, $attributes['roles']);
        if (isset($attributes['video_hours']))
            $this->setVideoHours($video, $attributes['video_hours']);

        return $video;
    }



    /**
     * @param array<string,mixed> $attributes
     */
    public function updateVideo(Video $video, array $attributes): Video
    {
        $video->update(
            [
                'title' => $attributes['title'],
                'description' => $attributes['description'] ? $attributes['description'] : '',
                'subject' => $attributes['subject'],
                'publication_date' => $attributes['publication_date'],
                'link' => $attributes['link'],
                'user_id' => Auth::id(),
                'uuid' => Str::uuid(),
                'collection' => $attributes['collection'],
                'category' => $attributes['category'],
            ]
        );

        if ($attributes['thumbnail']) {
            $this->setVideoThumbnail($video, $attributes['thumbnail']);
        }
        if ($attributes['preview']) {
            $this->setVideoPreview($video, $attributes['preview']);
        } else if ($attributes['preview_deleted']) {
            $this->deleteVideoPreview($video);
        }

        if ($attributes['poster']) {
            $this->setVideoPoster($video, $attributes['poster']);
        } else if ($attributes['poster_deleted']) {
            $this->deleteVideoPoster($video);
        }

        $video->save();
        if (isset($attributes['roles']))
            $this->setVideoRoles($video, $attributes['roles']);
        if (isset($attributes['video_hours']))
            $this->setVideoHours($video, $attributes['video_hours']);

        return $video;
    }

    private function setVideoThumbnail(Video $video, UploadedFile $thumbnail): string|bool
    {
        if ($video->thumbnail_path) {
            Storage::delete($video->thumbnail_path);
        }
        $path = Storage::put('public/videos/' . $video->uuid, $thumbnail);
        $video->thumbnail_path = $path;

        return $path;
    }

    private function setVideoPreview(Video $video, UploadedFile $preview): string|bool
    {
        if ($video->preview_path) {
            Storage::delete($video->preview_path);
        }
        $path = Storage::put('public/videos/' . $video->uuid, $preview);
        $video->preview_path = $path;

        return $path;
    }

    private function deleteVideoPreview(Video $video): bool
    {

        if ($video->preview_path) {
            Storage::delete($video->preview_path);
            $video->preview_path = null;
        }

        return true;
    }

    private function setVideoPoster(Video $video, UploadedFile $poster): string|false
    {

        if ($video->poster_path) {
            Storage::delete($video->poster_path);
        }
        $path = Storage::putFile('public/videos/' . $video->uuid, $poster);
        $video->poster_path = $path;

        return $path;
    }

    private function deleteVideoPoster(Video $video): bool
    {

        if ($video->poster_path) {
            Storage::delete($video->poster_path);
            $video->poster_path = null;
        }

        return true;
    }
    /**
     * @param array<int,mixed> $roles
     * @return void
     */
    private function setVideoRoles(Video $video, array $roles): void
    {

        $role_ids = [];
        foreach ($roles as $role_name) {
            $videoRole = VideoRole::query()->where('role', 'LIKE', $role_name)->first();
            array_push($role_ids, $videoRole->id);
        }
        $video->videoRoles()->sync($role_ids);
    }

    private function setVideoHours(Video $video, array $hours): void
    {
        DB::table('video_hours')->where('video_id', $video->id)->delete();

        $max_id = VideoHour::max('id');
        $to_insert = [];
        foreach ($hours as $i => $hour) {
            array_push($to_insert, [
                'id' => $max_id + $i + 1,
                'video_id' => $video->id,
                'phase' => $hour['phase'],
                'amount' => $hour['amount'],
                'unit' => $hour['unit']
            ]);
        }

        DB::table('video_hours')->insert($to_insert);
    }
}
