<?php

namespace App\Http\Controllers;

use App\Models\Person;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class WebtoolsPeopleController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(): Response
    {
        $people = Person::all();
        return Inertia::render('Webtools/People', ['people' => $people]);
    }

    /**
     * Show the form for creating a new resource.
     * @return void
     */
    public function create(): void
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     * @return void
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'min:2', 'max:255'],
            'last_name' => ['required', 'min:2', 'max:255'],
            'email' => ['nullable', 'email', 'unique:people'],
            'phone_number' => ['nullable'],
            'birthday' => ['nullable', 'date', 'before_or_equal:' . today()]
        ]);

        $person = Person::create($validated);
        Log::info('Created person ' . $person->first_name . ' ' . $person->last_name . ' with id ' . $person->id);
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     * @return void
     */
    public function show(Person $person): void
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Person $person): Response
    {
        return Inertia::render('Webtools/Person', ['person' => $person]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Person $person): RedirectResponse
    {
        $validated = $request->validate([
            'first_name' => ['required', 'min:2', 'max:255'],
            'last_name' => ['required', 'min:2', 'max:255'],
            'email' => ['nullable', 'email'],
            'phone_number' => ['nullable'],
            'birthday' => ['nullable', 'date', 'before_or_equal:' . today()],
            'send_birthday_email' => ['required', 'boolean'],
            'birthday_email_text' => ['string', 'min:10', 'nullable'],
        ]);

        $person->update($validated);

        Log::info('Updated person ' . $person->first_name . ' ' . $person->last_name . ' with id ' . $person->id);

        return redirect()->back()->with('status', 'Updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Person $person): RedirectResponse
    {
        Log::info('Deleting person ' . $person->first_name . ' ' . $person->last_name . ' with id ' . $person->id);
        $person->delete();

        return redirect()->back()->with('status', 'Deleted!');
    }
}
