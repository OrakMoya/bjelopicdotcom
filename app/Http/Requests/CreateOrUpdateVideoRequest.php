<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class CreateOrUpdateVideoRequest extends FormRequest
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
            'title' => ['required', 'min:3', 'max:50'],
            'subject' => ['required', 'min:2', 'max:100'],
            'description' => ['nullable', 'min:5', 'max:1000'],
            'publication_date' => ['required', 'date'],
            'thumbnail' => ['nullable', File::image()->min('10kb')->max('8mb')],
            'preview' => ['nullable', 'mimetypes:video/mp4'],
            'preview_deleted' => ['nullable', 'boolean'],
            'poster' => ['nullable', File::image()->min('10kb')->max('8mb'), Rule::dimensions()->maxHeight(4000)->ratio(707 / 1000)],
            'poster_deleted' => ['nullable', 'boolean'],
            'link' => ['required'],
            'collection' => ['nullable', 'min:3', 'max:100'],
            'category' => ['required', 'min:3', 'max:100'],
            'roles' => ['nullable', 'array'],
            'video_hours' => ['required'],
            'video_hours.*.phase' => ['required'],
            'video_hours.*.unit' => ['required'],
            'video_hours.*.amount' => ['required'],
        ];
    }
}
