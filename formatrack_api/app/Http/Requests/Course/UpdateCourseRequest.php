<?php

namespace App\Http\Requests\Course;

use App\Enums\CourseCategory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * @OA\Schema(
 *     schema="UpdateCourseRequest",
 *     type="object",
 *     @OA\Property(property="code", type="string", maxLength=20, example="FORM001", description="Code unique du cours"),
 *     @OA\Property(property="title", type="string", maxLength=255, example="Formation Laravel Avancée", description="Titre du cours"),
 *     @OA\Property(property="description", type="string", example="Formation complète sur le framework Laravel", description="Description détaillée du cours"),
 *     @OA\Property(property="photo_url", type="string", format="url", example="https://example.com/photo.jpg", description="URL de la photo du cours"),
 *     @OA\Property(property="category", type="string", enum={"INFORMATIQUE", "LANGUES", "MANAGEMENT", "COMPTABILITE", "MARKETING", "DESIGN", "DEVELOPPEMENT_PERSONNEL", "AUTRE"}, example="INFORMATIQUE", description="Catégorie du cours"),
 *     @OA\Property(property="total_hours", type="integer", minimum=1, example=40, description="Nombre total d'heures de formation"),
 *     @OA\Property(property="max_students", type="integer", minimum=1, example=20, description="Nombre maximum d'étudiants"),
 *     @OA\Property(property="price", type="number", format="decimal", minimum=0, example=500.00, description="Prix du cours"),
 *     @OA\Property(property="prerequisites", type="string", example="Connaissances de base en PHP", description="Prérequis pour suivre le cours"),
 *     @OA\Property(property="objectives", type="string", example="Maîtriser Laravel et développer des applications web", description="Objectifs pédagogiques du cours")
 * )
 */
class UpdateCourseRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $courseId = $this->route('course')->id;

        return [
            'code' => [
                'sometimes',
                'required',
                'string',
                'max:20',
                Rule::unique('courses', 'code')->ignore($courseId),
                'regex:/^[A-Z0-9_-]+$/'
            ],
            'title' => [
                'sometimes',
                'required',
                'string',
                'max:255'
            ],
            'description' => [
                'nullable',
                'string'
            ],
            'photo_url' => [
                'nullable',
                'url',
                'max:500'
            ],
            'category' => [
                'sometimes',
                'required',
                Rule::enum(CourseCategory::class)
            ],
            'total_hours' => [
                'sometimes',
                'required',
                'integer',
                'min:1',
                'max:1000'
            ],
            'max_students' => [
                'sometimes',
                'required',
                'integer',
                'min:1',
                'max:100'
            ],
            'price' => [
                'sometimes',
                'required',
                'numeric',
                'min:0',
                'max:99999.99'
            ],
            'prerequisites' => [
                'nullable',
                'string'
            ],
            'objectives' => [
                'nullable',
                'string'
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'code.required' => 'Le code du cours est obligatoire',
            'code.unique' => 'Ce code de cours existe déjà',
            'code.regex' => 'Le code doit contenir uniquement des lettres majuscules, chiffres, tirets et underscores',
            'title.required' => 'Le titre du cours est obligatoire',
            'title.max' => 'Le titre ne peut pas dépasser 255 caractères',
            'photo_url.url' => 'L\'URL de la photo doit être valide',
            'category.required' => 'La catégorie du cours est obligatoire',
            'total_hours.required' => 'Le nombre total d\'heures est obligatoire',
            'total_hours.min' => 'Le nombre d\'heures doit être au minimum de 1',
            'total_hours.max' => 'Le nombre d\'heures ne peut pas dépasser 1000',
            'max_students.required' => 'Le nombre maximum d\'étudiants est obligatoire',
            'max_students.min' => 'Le nombre d\'étudiants doit être au minimum de 1',
            'max_students.max' => 'Le nombre d\'étudiants ne peut pas dépasser 100',
            'price.required' => 'Le prix du cours est obligatoire',
            'price.min' => 'Le prix ne peut pas être négatif',
            'price.max' => 'Le prix ne peut pas dépasser 99999.99'
        ];
    }
}
