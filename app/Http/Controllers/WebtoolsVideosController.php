<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WebtoolsVideosController extends Controller
{
    public function show()
    {
        return Inertia::render('Webtools/Videos');
    }
}
