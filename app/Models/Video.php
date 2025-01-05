<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use App\Models\VideoHour;

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
        'category',
    ];

    public function encodeURLs(): void
    {
        if ($this->thumbnail_path)
            $this->attributes['thumbnail_url'] = Storage::url($this->thumbnail_path);
        if ($this->preview_path)
            $this->attributes['preview_url'] = Storage::url($this->preview_path);
        if ($this->poster_path)
            $this->attributes['poster_url'] = Storage::url($this->poster_path);
    }
    /**
     * @return BelongsToMany<VideoRole,Video>
     */
    public function videoRoles(): BelongsToMany
    {
        return $this->belongsToMany(VideoRole::class, 'video_videorole', 'video_id', 'videorole_id');
    }
    /**
     * @return HasMany<Still,Video>
     */
    public function stills(): HasMany
    {
        return $this->hasMany(Still::class, 'video_id', 'id');
    }

    public function videoHours(): HasMany
    {
        return $this->hasMany(VideoHour::class, 'video_id', 'id')->orderBy('id');
    }
}
