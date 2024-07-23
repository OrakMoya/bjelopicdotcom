<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class WebtoolsLoginController extends Controller
{
    public function show()
    {
        return Inertia::render('Webtools/Login');
    }
}
