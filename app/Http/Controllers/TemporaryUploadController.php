<?php

namespace App\Http\Controllers;

use App\Models\TemporaryFile;
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
        $temporary_file = TemporaryFile::find(Sqid::decode($sqid))->first();
        if (!$temporary_file) abort(404);

        $temporary_file['size'] = $this->human_filesize(Storage::disk('local')->size($temporary_file->path));
        $temporary_file['sqid'] = $sqid;
        return Inertia::render('TemporaryUpload', ['temporary_file' => $temporary_file]);
    }


    public function download(string $sqid): StreamedResponse
    {
        $temporary_file = TemporaryFile::find(Sqid::decode($sqid))->first();
        if (!$temporary_file) abort(404);

        return Storage::disk('local')->download($temporary_file->path, $temporary_file->original_name);
    }
}
