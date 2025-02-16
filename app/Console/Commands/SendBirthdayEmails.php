<?php

namespace App\Console\Commands;

use App\Mail\BirthdayEmail;
use App\Models\Person;
use Carbon\Carbon;
use Illuminate\Console\Command;
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
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $people = Person::select()
            ->where('send_birthday_email', 1)
            ->whereNotNull('email')
            ->whereMonth('birthday', Carbon::today()->month)
            ->whereDay('birthday', Carbon::today()->day)
            ->get();

        foreach ($people as $person) {
            Mail::to($person->email)
                ->send(
                    new BirthdayEmail(
                        $person
                    )
                );
        }
    }
}
