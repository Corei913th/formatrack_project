<?php

namespace App\Http\Requests\Instructor;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInstructorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $instructorId = $this->route('instructor');
        $userId = null;

        if ($instructorId) {
            $instructor = \App\Models\Instructor::with('user')->find($instructorId);
            $userId = $instructor?->user?->id;
        }

        return [
            'first_name'  => ['sometimes', 'string', 'max:255'],
            'last_name'   => ['sometimes', 'string', 'max:255'],
            'email'       => ['sometimes', 'email', "unique:users,email,{$userId}"],
            'phone'       => ['nullable', 'string', 'max:20'],
            'is_active'   => ['sometimes', 'boolean'],
            'specialties' => ['nullable', 'string'],
            'hourly_rate' => ['nullable', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.email'          => 'L\'adresse email doit être valide.',
            'email.unique'         => 'Cette adresse email est déjà utilisée.',
            'hourly_rate.numeric'  => 'Le taux horaire doit être un nombre.',
            'hourly_rate.min'      => 'Le taux horaire ne peut pas être négatif.',
        ];
    }
}
