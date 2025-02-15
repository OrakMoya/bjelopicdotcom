<?php

use App\Http\Controllers\ContactFormController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\TemporaryUploadController;
use App\Http\Controllers\WebtoolsLoginController;
use App\Http\Middleware\TrackVisitors;
use App\Models\Person;
use Illuminate\Support\Facades\Route;

Route::middleware(TrackVisitors::class)->group(function () {
    Route::get('/', [HomepageController::class, 'show']);
    Route::get('/gallery', [GalleryController::class, 'index']);
    Route::get('/gallery/{video:uuid}', [GalleryController::class, 'show']);
    Route::get('/contact', [ContactFormController::class, 'show']);
});

Route::get('/webtools/login', [WebtoolsLoginController::class, 'show'])->name('login');
Route::get('/webtools/logout', [LoginController::class, 'logout']);
Route::post('/webtools/login', [LoginController::class, 'authenticate']);


Route::get('/f/{sqid}', [TemporaryUploadController::class, 'show']);
Route::get('/f/{sqid}/download', [TemporaryUploadController::class, 'download']);

Route::get('/mailable', function () {
    $person = Person::all()[0];

    return new App\Mail\Birthday(
        $person->birthday_email_text,
        $person->first_name
    );
});

Route::post('/contact', [ContactFormController::class, 'store']);
