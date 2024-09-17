<?php

namespace App\Http\Controllers;

use App\Http\Requests\ResumableChunkTemporaryUploadRequest;
use App\Models\TemporaryUpload;
use App\Services\TemporaryUploadService;
use Illuminate\Http\Request;

class ResumableTemporaryUploadController extends Controller
{
    public function store(TemporaryUpload $temporaryUpload, ResumableChunkTemporaryUploadRequest $request, TemporaryUploadService $temporaryUploadService)
    {

        $temporaryUploadService->handlePartialUploadChunk(
            $temporaryUpload,
            $request->resumableFilename,
            $request->resumableIdentifier,
            $request->resumableChunkNumber,
            $request->resumableTotalChunks,
            $request->file('file')
        );

        return response(status: 200);
    }

    public function show(Request $request, TemporaryUploadService $temporaryUploadService)
    {
        if($temporaryUploadService->chunkExists(
            $request->resumableFilename,
            $request->resumableChunkNumber,
            $request->resumableIdentifier
        )){
            return response(status: 200);

        }
        return response(status:204);
    }

}
