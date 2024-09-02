<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTemporaryUploadRequest;
use App\Models\TemporaryUpload;
use App\Utility\Sqid;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;


class WebtoolsTemporaryUploadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $temporaryUploads = TemporaryUpload::select(['id', 'user_id', 'original_name', 'expiry_datetime'])
            ->with('user')
            ->get();
        foreach ($temporaryUploads as $upload) {
            $upload['user'] = $upload->user;
            $upload['sqid'] = Sqid::encode($upload->id);
        }
        return Inertia::render('Webtools/Uploads', ['temporary_uploads' => $temporaryUploads]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateTemporaryUploadRequest $request)
    {
        $file = $request->file('file');

        $expiry_datetime = null;
        if ($request->expires) {
            $expiry_datetime = $request->expiry_date . ' ' .
                sprintf("%02d", $request->expiry_hours) . ':' .
                sprintf("%02d", $request->expiry_minutes) . ':' .
                sprintf("%02d", $request->expiry_seconds);
        }


        $temporaryUpload = new TemporaryUpload();
        $temporaryUpload->user_id=Auth::id();
        $temporaryUpload->original_name = $file->getClientOriginalName();
        $temporaryUpload->expiry_datetime = $expiry_datetime;
        $temporaryUpload->path = Storage::disk('local')->put('uploads',  $file);
        $temporaryUpload->save();


        return redirect()->back()->with('status', 'Success!');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): void
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $temporaryFile = TemporaryUpload::find($id);
        Storage::disk('local')->delete($temporaryFile->path);
        $temporaryFile->delete();

        return redirect()->back()->with('status', 'Temporary File destroyed!');
    }
}
