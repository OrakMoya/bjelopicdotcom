<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'description', 'subject', 'publication_date', 'link', 'user_id', 'uuid', 'collection'
    ];
}
