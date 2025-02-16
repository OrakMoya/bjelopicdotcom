<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('telescope:prune')->dailyAt('06:00');
Schedule::command('app:purge-expired-temporary-uploads')->everyMinute();
Schedule::command('app:purge-invalid-temporary-uploads')->everyMinute();
Schedule::command('app:send-birthday-emails')->dailyAt('00:05');
