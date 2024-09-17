<?php

namespace App\Http\Requests;

use Auth;
use Illuminate\Foundation\Http\FormRequest;

class CreateTemporaryUploadRequest extends FormRequest
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
            'expiry_date' => 'nullable|required_if:expires,true|date',
            'expiry_hours' => 'nullable|required_if:expires,true|integer|between:0,23',
            'expiry_minutes' => 'nullable|required_if:expires,true|integer|between:0,59',
            'expiry_seconds' => 'nullable|required_if:expires,true|integer|between:0,59',
            'expires' => 'required|boolean',
            'resumable_identifier' => 'required|string',
        ];
    }

    public function messages()
    {
        return [
            'resumable_identifier' => 'A file is required',
        ];
    }
}
