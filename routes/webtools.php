<?php

use App\Http\Controllers\ResumableTemporaryUploadController;
use App\Http\Controllers\WebtoolsDashboardController;
use App\Http\Controllers\WebtoolsHeroVideoController;
use App\Http\Controllers\WebtoolsPeopleController;
use App\Http\Controllers\WebtoolsStillsController;
use App\Http\Controllers\WebtoolsVideosController;
use App\Http\Controllers\WebtoolsTemporaryUploadController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'web'])->group(function () {
    Route::get('/', [WebtoolsDashboardController::class, 'index']);

    Route::get('/hero', [WebtoolsHeroVideoController::class, 'index']);
    Route::get('/hero/current', [WebtoolsHeroVideoController::class, 'show']);
    Route::post('/hero', [WebtoolsHeroVideoController::class, 'store']);

    Route::resource('/videos', WebtoolsVideosController::class, ['except' => ['edit', 'show']]);
    Route::get('/videos', [WebtoolsVideosController::class, 'index']);

    Route::resource('/uploads', WebtoolsTemporaryUploadController::class, ['except' => ['edit', 'show', 'create']]);

    Route::get('/uploads/upload/{temporaryUpload}', [ResumableTemporaryUploadController::class, 'show']);
    Route::post('/uploads/upload/{temporaryUpload}', [ResumableTemporaryUploadController::class, 'store']);

    Route::get('/videos/{video}/stills', [WebtoolsStillsController::class, 'index']);
    Route::post('/videos/{video}/stills', [WebtoolsStillsController::class, 'store']);
    Route::patch('/videos/stills/{still}', [WebtoolsStillsController::class, 'update']);
    Route::delete('/videos/stills/custom', [WebtoolsStillsController::class, 'bulkDestroy']);
    Route::delete('/videos/stills/{still}', [WebtoolsStillsController::class, 'destroy']);


    Route::get('/people', [WebtoolsPeopleController::class, 'index']);
    Route::post('/people', [WebtoolsPeopleController::class, 'store']);
    Route::get('/people/{person}', [WebtoolsPeopleController::class, 'edit']);
    Route::patch('/people/{person}', [WebtoolsPeopleController::class, 'update']);
});
