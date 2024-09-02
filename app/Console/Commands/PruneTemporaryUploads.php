<?php

namespace App\Console\Commands;

use App\Models\TemporaryUpload;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PruneTemporaryUploads extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:prune-temporary-uploads';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $temporaryUploads = TemporaryUpload::select('path', 'expiry_datetime', 'user_id', 'original_name', 'id')
            ->with('user')
            ->where('expiry_datetime', '<=', Carbon::now()->toDateTimeString())->get();
        foreach ($temporaryUploads as $temporaryUpload) {
            $logline =
                'Pruning temporary upload "' . $temporaryUpload->original_name . '"'
                . ' with id ' . $temporaryUpload->id
                . PHP_EOL . 'set to expire after ' . $temporaryUpload->expiry_datetime
                . PHP_EOL . 'created by user with id ' . $temporaryUpload->user->id
                . ' (' . $temporaryUpload->user->name . ')';
            Log::info($logline);
            $this->info($logline);

            Storage::disk('local')->delete($temporaryUpload->path);
            $temporaryUpload->delete();
        }
    }
}
