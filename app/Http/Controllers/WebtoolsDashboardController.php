<?php

namespace App\Http\Controllers;

use App\Models\Visitor;
use Date;
use Inertia\Inertia;
use Inertia\Response;

class WebtoolsDashboardController extends Controller
{
    public function show(): Response
    {

        // Select unique visitors for every day of past 1 month of days
        $database_result =
            Visitor::select(
                Visitor::raw('SUBSTR(visited_at, 1, 10) as date'),
                Visitor::raw('count(*) as total')
            )
                ->whereDate('visited_at', '>', Date::now()->subtract('month', 1))
                ->groupBy('date')
                ->distinct('ip_address')
                ->get();
        $max = 0;
        foreach ($database_result as $visitor_count) {
            if ($visitor_count->total > $max) {
                $max = $visitor_count->total;
            }
        }

        $distinct_visitor_count_by_date = [];
        $distinct_visitor_count_by_date['max'] = $max;
        $distinct_visitor_count_by_date['data'] = $database_result->toArray();
        $distinct_visitor_count_by_date['count'] = count($distinct_visitor_count_by_date);

        return Inertia::render('Webtools/Dashboard', ['distinct_visitor_count_by_date' => $distinct_visitor_count_by_date]);
    }
}
