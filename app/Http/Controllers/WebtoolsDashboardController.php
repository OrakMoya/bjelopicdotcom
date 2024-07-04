<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class WebtoolsDashboardController extends Controller
{
    public function show(): Response{
        return Inertia::render('Webtools/Dashboard');
    }
}
