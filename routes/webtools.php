<?php

use App\Http\Controllers\WebtoolsDashboardController;
use App\Http\Controllers\WebtoolsVideosController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth', 'web'])->group(function(){
    Route::get('/', [WebtoolsDashboardController::class, 'show'] );
    Route::get('/videos', [WebtoolsVideosController::class, 'show']);
});

