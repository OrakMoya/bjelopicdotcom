<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ResumableChunkTemporaryUploadRequest extends FormRequest
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
            'resumableChunkNumber' => ['required', 'integer'],
            'resumableTotalChunks' => ['required', 'integer'],
            'resumableIdentifier' => ['required', 'string'],
            'resumableFilename' => ['required', 'string'],
            'file' => ['required', 'file'],
        ];
    }
}
