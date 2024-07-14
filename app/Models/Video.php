<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * 
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $subject
 * @property string|null $poster_path
 * @property string|null $preview_path
 * @property string|null $thumbnail_path
 * @property string $link
 * @property string $publication_date
 * @property string|null $collection
 * @property int $user_id
 * @property string $uuid
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $category
 * @method static \Illuminate\Database\Eloquent\Builder|Video newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Video newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Video query()
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereCollection($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video wherePosterPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video wherePreviewPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video wherePublicationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereThumbnailPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Video whereUuid($value)
 * @mixin \Eloquent
 */
class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'subject', 'publication_date', 'link', 'user_id', 'uuid', 'collection', 'category'
    ];
}
