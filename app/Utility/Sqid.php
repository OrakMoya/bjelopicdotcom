<?php

namespace App\Utility;

use Config;
use Sqids\Sqids;

final class Sqid
{
    public static function encode(?int $number): string
    {
        if (is_null($number)) {
            return '';
        }
        return resolve(Sqids::class)->encode([$number]);
    }

    public static function decode(string $sqid): array
    {
        if (strlen($sqid) < Config::get('app.sqid_minimum_length'))
            $sqid = '';
        return resolve(Sqids::class)->decode($sqid);
    }
}
