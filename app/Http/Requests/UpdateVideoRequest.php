<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UpdateVideoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['required', 'exists:videos'],
            'title' => ['required', 'min:3', 'max:50'],
            'subject' => ['required', 'min:2', 'max:100'],
            'description' => ['required', 'min:5', 'max:1000'],
            'publication_date' => ['required', 'date'],
            'thumbnail' => ['nullable', File::image()->min('10kb')->max('8mb'), Rule::dimensions()->ratio(16 / 9)],
            'preview' => ['nullable', 'mimetypes:video/mpeg', 'dimensions:ratio=16/9'],
            'poster' => ['nullable', File::image()->min('500kb')->max('8mb'), Rule::dimensions()->maxWidth(2121)->maxHeight(3000)->ratio(707 / 1000)],
            'link' => ['required'],
            'collection' => ['nullable', 'min:3', 'max:100']
        ];
    }
}
