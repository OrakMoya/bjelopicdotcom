<?php

namespace App\Services;

use App\Models\TemporaryUpload;
use Carbon\Carbon;
use Illuminate\Http\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TemporaryUploadService
{

    public function createTemporaryUploadEntry(array $attributes): TemporaryUpload
    {
        $expiry_datetime = null;
        if ($attributes['expires']) {
            $expiry_datetime = $attributes['expiry_date'] . ' ' .
                sprintf("%02d", $attributes['expiry_hours']) . ':' .
                sprintf("%02d", $attributes['expiry_minutes']) . ':' .
                sprintf("%02d", $attributes['expiry_seconds']);
        }


        $temporaryUpload = new TemporaryUpload();
        $temporaryUpload->user_id = Auth::id();
        $temporaryUpload->expiry_datetime = $expiry_datetime;
        $temporaryUpload->ready = false;
        $temporaryUpload->resumable_identifier = $attributes['resumable_identifier'];
        $temporaryUpload->save();

        return $temporaryUpload;
    }


    public function handlePartialUploadChunk(TemporaryUpload $temporaryUpload, string $filename, string $identifier, int $chunkNumber, int $totalChunks, UploadedFile $chunk): TemporaryUpload
    {
        Storage::disk('local')->putFileAs('uploads/incomplete/' . $identifier, $chunk, $filename . '.part.' . $chunkNumber);

        if ($chunkNumber == $totalChunks) {
            $this->mergeChunks(
                $filename,
                $totalChunks,
                $identifier,
                $temporaryUpload
            );
        }

        $temporaryUpload->touch();

        return $temporaryUpload;
    }

    private function mergeChunks(string $fileName, int $totalChunks, string $identifier, TemporaryUpload $temporaryUpload): void
    {
        $path = 'app/uploads/incomplete/' . $identifier;
        $outputFilePath = storage_path($path . '/' . $fileName);
        $output = fopen($outputFilePath, 'wb');

        for ($i = 1; $i <= $totalChunks; $i++) {
            $chunkPath =  storage_path($path . '/' . $fileName . '.part.' . $i);
            $chunk = fopen($chunkPath, 'rb');
            stream_copy_to_stream($chunk, $output);
            fclose($chunk);
            unlink($chunkPath);
        }
        fclose($output);


        $stored_path = Storage::disk('local')->putFile('uploads', new File($outputFilePath));
        $temporaryUpload->path = $stored_path;
        $temporaryUpload->original_name = $fileName;
        $temporaryUpload->ready = true;
        $temporaryUpload->save();
        Storage::disk('local')->deleteDirectory('uploads/incomplete/' . $identifier);
    }

    public function chunkExists(string $filename, int $chunkNumber, string $identifier): bool
    {
        $chunkPath = 'uploads/incomplete/' . $identifier . '/' . $filename . '.part.' . $chunkNumber;
        return Storage::disk('local')->exists($chunkPath);
    }
}
