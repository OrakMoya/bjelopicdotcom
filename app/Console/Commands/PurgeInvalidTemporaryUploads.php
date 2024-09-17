<?php

namespace App\Console\Commands;

use App\Models\TemporaryUpload;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class PurgeInvalidTemporaryUploads extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:purge-invalid-temporary-uploads';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clears the Temporary Uploads table and incomplete uploads of files that probably won\'t get uploaded.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $thirtyMinutesAgo = Carbon::now()->subMinutes(30);

        TemporaryUpload::select('ready', 'updated_at')
            ->where(
                'ready',
                false
            )
            ->where('updated_at', '<', $thirtyMinutesAgo)
            ->delete();

        $incompleteDirectories = Storage::disk('local')->directories('uploads/incomplete');
        foreach ($incompleteDirectories as $directory) {
            $chunks = Storage::disk('local')->files($directory);
            $mostRecentChunk = "";

            foreach ($chunks as $file) {
                $mTime = filemtime(storage_path('app/' . $file));
                if ($mostRecentChunk < $mTime) $mostRecentChunk = $mTime;
            }

            $mostRecentChunkTimestamp = date("Y-m-d H:i:s", $mostRecentChunk);

            if ($mostRecentChunkTimestamp < $thirtyMinutesAgo) {
                Storage::disk('local')->deleteDirectory($directory);
            }
        }
    }
}
