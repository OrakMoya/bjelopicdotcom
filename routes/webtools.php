<?php

use App\Http\Controllers\ResumableTemporaryUploadController;
use App\Http\Controllers\WebtoolsDashboardController;
use App\Http\Controllers\WebtoolsVideosController;
use App\Http\Controllers\WebtoolsTemporaryUploadController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'web'])->group(function () {
    Route::get('/', [WebtoolsDashboardController::class, 'index']);

    Route::resource('/videos', WebtoolsVideosController::class, ['except' => ['edit', 'show']] );
    Route::get('/videos', [WebtoolsVideosController::class, 'index']);

    Route::resource('/uploads', WebtoolsTemporaryUploadController::class, ['except' => ['edit', 'show', 'create']] );

    Route::get('/uploads/upload/{temporaryUpload}', [ResumableTemporaryUploadController::class, 'show']);
    Route::post('/uploads/upload/{temporaryUpload}', [ResumableTemporaryUploadController::class, 'store']);


});
