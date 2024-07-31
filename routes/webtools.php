<?php

use App\Http\Controllers\WebtoolsDashboardController;
use App\Http\Controllers\WebtoolsVideosController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'web'])->group(function () {
    Route::get('/', [WebtoolsDashboardController::class, 'index']);

    Route::resource('/videos', WebtoolsVideosController::class, ['except' => ['edit', 'show']] );
    Route::get('/videos', [WebtoolsVideosController::class, 'index']);

});
