<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'subject',
        'publication_date',
        'link',
        'user_id',
        'uuid',
        'collection',
        'category'
    ];


    public function setThumbnail(UploadedFile $thumbnail): Video
    {
        Storage::delete($this->thumbnail_path);
        $path = Storage::put('public/videos/' . $this->uuid, $thumbnail);
        $this->thumbnail_path = $path;
        $this->save();
        return $this;
    }

    public function setPreview(UploadedFile $preview): Video
    {
        if ($this->preview_path)
            Storage::delete($this->preview_path);
        $path = Storage::put('public/videos/' . $this->uuid, $preview);
        $this->preview_path = $path;
        $this->save();
        return $this;
    }

    /**
     * Deletes current video's preview
     * @return Video
     */
    public function deletePreview(): Video
    {
        if ($this->preview_path) {
            Storage::delete($this->preview_path);
            $this->preview_path = null;
        }
        $this->save();
        return $this;
    }

    public function setPoster(UploadedFile $poster): Video
    {
        if ($this->poster_path)
            Storage::delete($this->poster_path);
        $path = Storage::putFile('public/videos/' . $this->uuid, $poster);
        $this->poster_path = $path;
        $this->save();
        return $this;
    }

    /**
     * Deletes current video's poster
     * @return Video
     */
    public function deletePoster(): Video
    {
        if ($this->poster_path) {
            Storage::delete($this->poster_path);
            $this->poster_path = null;
        }
        $this->save();
        return $this;
    }


    public function setRoles($roles): Video
    {
        $role_ids = [];
        foreach ($roles as $role_name) {
            $videoRole = VideoRole::query()->where('role', 'LIKE', $role_name)->first();
            array_push($role_ids, $videoRole->id);
        }
        $this->videoRoles()->sync($role_ids);
        return $this;
    }


    public function videoRoles(): BelongsToMany
    {
        return $this->belongsToMany(VideoRole::class, 'video_videoroles', 'video_id', 'videorole_id');
    }
}
