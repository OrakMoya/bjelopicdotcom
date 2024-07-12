<?php

use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HeroController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\WebtoolsLoginController;
use App\Http\Middleware\TrackVisitors;
use Illuminate\Support\Facades\Route;


Route::middleware(TrackVisitors::class)->group(function () {
    Route::get('/', [HeroController::class, 'show']);
    Route::get('/gallery', [GalleryController::class, 'show']);
});


Route::get('/webtools/login', [WebtoolsLoginController::class, 'show'])->name('login');
Route::get('/webtools/logout', [LoginController::class, 'logout']);
Route::post('/webtools/login', [LoginController::class, 'authenticate']);
