<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('telescope:prune')->dailyAt('06:00');
