<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Video;

class VideoHour extends Model
{
    protected $fillable = [
        'video_id',
        'unit',
        'amount',
        'phase'
    ];

    protected $table = 'video_hours';

    /**
     * @return BelongsTo<Video,VideoHour>
     */
    public function video(): BelongsTo
    {
        return $this->belongsTo(Video::class, 'video_id', 'id');
    }
}
