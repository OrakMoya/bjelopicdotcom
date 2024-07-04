<?php

use App\Http\Controllers\WebtoolsLoginController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/webtools/login', [WebtoolsLoginController::class, 'show'])->name('login');

