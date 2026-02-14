<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // We'll handle authentication middleware instead
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string|min:10',
            'total_budget' => 'required|numeric|min:50000', // Example minimum e.g., 50k IDR
            'milestones' => 'nullable|array',
            'milestones.*.title' => 'required|string|max:255',
            'milestones.*.amount' => 'required|numeric|min:10000',
        ];
    }
}
