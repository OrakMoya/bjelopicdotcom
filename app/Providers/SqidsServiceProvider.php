<?php

namespace App\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Sqids\Sqids;

class SqidsServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $pad = Config::get('app.sqid_minimum_length');
        $alphabet = Config::get('app.sqid_alphabet');
        $this->app->singleton(Sqids::class, function () use ($pad, $alphabet) {
            return new Sqids($alphabet, $pad);
        });
    }
}
