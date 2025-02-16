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
    return new App\Mail\BirthdayEmail($person);

    /*
    return new App\Mail\ContactFormSubmissionEmail(
        "Mate Pušić",
        "mate@bjelopic.com",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus dolor eros, ac gravida metus consectetur non. Pellentesque feugiat scelerisque risus, eget vulputate nisi rhoncus vel. Vivamus imperdiet felis metus, eu volutpat ligula consequat sit amet. Phasellus imperdiet aliquam felis, vitae tempus lacus efficitur eget. Curabitur rutrum egestas risus ut imperdiet. Sed egestas leo iaculis nunc elementum, sit amet volutpat metus ornare. Quisque eleifend velit justo, et varius sem finibus eget.\nUt venenatis dolor euismod, accumsan neque id, imperdiet turpis. Mauris fermentum nisi sit amet magna varius finibus. Mauris felis neque, semper quis interdum non, vulputate eu mauris."
    );
    */
});

Route::post('/contact', [ContactFormController::class, 'store']);
