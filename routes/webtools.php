<?php

use App\Http\Controllers\WebtoolsDashboardController;
use App\Http\Controllers\WebtoolsLoginController;
use App\Http\Controllers\WebtoolsVideosController;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth'])->group(function(){
    Route::get('/', [WebtoolsDashboardController::class, 'show'] );
    Route::get('/videos', [WebtoolsVideosController::class, 'show']);
});

