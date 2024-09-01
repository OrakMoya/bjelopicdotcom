<?php

namespace App\Http\Controllers;

use App\Models\TemporaryFile;
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
        $uploads = TemporaryFile::select(['id', 'user_id', 'original_name', 'expiry_datetime'])->with('user')->get();
        foreach ($uploads as $upload) {
            $upload['user'] = $upload->user;
            $upload['sqid'] = Sqid::encode($upload->id);
        }
        return Inertia::render('Webtools/Uploads', ['uploads' => $uploads]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $file = $request->file('file');

        $temporary_file = TemporaryFile::updateOrCreate([
            'user_id' => Auth::id(),
            'original_name' => $file->getClientOriginalName(),
            'expiry_datetime' => null,
        ]);

        $temporary_file->path = Storage::disk('local')->put('uploads',  $file);
        $temporary_file->save();


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
        $temporaryFile = TemporaryFile::find($id);
        Storage::disk('local')->delete($temporaryFile->path);
        $temporaryFile->delete();

        return redirect()->back()->with('status', 'Temporary File destroyed!');
    }
}
