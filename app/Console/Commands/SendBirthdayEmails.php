<?php

namespace App\Console\Commands;

use App\Mail\BirthdayEmail;
use App\Models\Person;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendBirthdayEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-birthday-emails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send today\'s birthday emails.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        Log::info('Sending birthday emails.');
        $people = Person::select()
            ->where('send_birthday_email', 1)
            ->whereNotNull('email')
            ->whereMonth('birthday', Carbon::today()->month)
            ->whereDay('birthday', Carbon::today()->day)
            ->get();
        Log::info('Sending ' . sizeof($people) . ' birthday emails.');

        foreach ($people as $person) {
            Log::info(
                'Sending birthday email to '
                    . $person->first_name . ' ' . $person->last_name
                    . ' who has a birthday on ' . $person->birthday
                    . '.',
                ['id' => $person->id]
            );

            Mail::to($person->email)
                ->send(
                    new BirthdayEmail(
                        $person
                    )
                );
        }
        Log::info('Birthday emails sent.');
    }
}
