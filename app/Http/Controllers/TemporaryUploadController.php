<?php

namespace App\Http\Controllers;

use App\Models\TemporaryUpload;
use App\Utility\Sqid;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class TemporaryUploadController extends Controller
{
    private function human_filesize($bytes, $decimals = 2): string
    {
        $factor = floor((strlen($bytes) - 1) / 3);
        if ($factor > 0) $sz = 'KMGT';
        return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$sz[$factor - 1] . 'B';
    }

    /**
     * Display the specified resource.
     */
    public function show(string $sqid): Response
    {
        $temporaryUpload = TemporaryUpload::find(Sqid::decode($sqid))->first();
        if (!$temporaryUpload) abort(404);

        $temporaryUpload['size'] = $this->human_filesize(Storage::disk('local')->size($temporaryUpload->path));
        $temporaryUpload['sqid'] = $sqid;
        return Inertia::render('ViewTemporaryUpload', ['temporary_upload' => $temporaryUpload]);
    }


    public function download(string $sqid): StreamedResponse
    {
        $temporaryUpload = TemporaryUpload::find(Sqid::decode($sqid))->first();
        if (!$temporaryUpload) abort(404);

        return Storage::disk('local')->download($temporaryUpload->path, $temporaryUpload->original_name);
    }
}
