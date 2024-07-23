<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class VideoRole extends Model
{
    use HasFactory;

    protected $table = 'videoroles';

    public function videos(): BelongsToMany
    {
        return $this->belongsToMany(Video::class, 'video_videoroles', 'videorole_id', 'video_id');
    }
}
