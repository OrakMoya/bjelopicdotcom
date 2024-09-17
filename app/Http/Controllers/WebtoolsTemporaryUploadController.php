<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTemporaryUploadRequest;
use App\Models\TemporaryUpload;
use App\Services\TemporaryUploadService;
use App\Utility\Sqid;
use Auth;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;


class WebtoolsTemporaryUploadController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {

        $temporaryUploads = TemporaryUpload::select(['id', 'user_id', 'original_name', 'expiry_datetime', 'ready'])
            ->where('ready', '=', '1')
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
    public function store(CreateTemporaryUploadRequest $request, TemporaryUploadService $temporaryUploadService)
    {
        $temporaryUpload = $temporaryUploadService->createTemporaryUploadEntry($request->validated());


        return response()->json($temporaryUpload->id);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id):  RedirectResponse
    {
        $temporaryFile = TemporaryUpload::find($id);
        Storage::disk('local')->delete($temporaryFile->path);
        $temporaryFile->delete();

        return redirect()->back()->with('status', 'Temporary File destroyed!');
    }
}
