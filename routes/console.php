<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Schedule::command('telescope:prune')->dailyAt('06:00');
Schedule::command('telescope:prune')->hourlyAt(57);
