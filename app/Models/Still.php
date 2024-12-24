<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Still extends Model
{
    /**
     * @return BelongsTo<Video,Still>
     */
    public function video(): BelongsTo{
        return $this->belongsTo(Video::class, 'video_id', 'id');
    }
}
