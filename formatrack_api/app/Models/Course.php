<?php

namespace App\Models;

use App\Enums\CourseCategory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @OA\Schema(
 *     schema="Course",
 *     type="object",
 *     @OA\Property(property="id", type="string", format="uuid", example="550e8400-e29b-41d4-a716-446655440000", description="ID unique du cours"),
 *     @OA\Property(property="code", type="string", example="FORM001", description="Code unique du cours"),
 *     @OA\Property(property="title", type="string", example="Formation Laravel Avancée", description="Titre du cours"),
 *     @OA\Property(property="description", type="string", example="Formation complète sur le framework Laravel", description="Description détaillée du cours"),
 *     @OA\Property(property="photo_url", type="string", format="url", example="https://example.com/photo.jpg", description="URL de la photo du cours"),
 *     @OA\Property(property="category", type="string", example="INFORMATIQUE", description="Catégorie du cours"),
 *     @OA\Property(property="total_hours", type="integer", example=40, description="Nombre total d'heures de formation"),
 *     @OA\Property(property="max_students", type="integer", example=20, description="Nombre maximum d'étudiants"),
 *     @OA\Property(property="price", type="number", format="decimal", example=500.00, description="Prix du cours"),
 *     @OA\Property(property="prerequisites", type="string", example="Connaissances de base en PHP", description="Prérequis pour suivre le cours"),
 *     @OA\Property(property="objectives", type="string", example="Maîtriser Laravel et développer des applications web", description="Objectifs pédagogiques du cours"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2024-01-01T00:00:00Z", description="Date de création"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2024-01-01T00:00:00Z", description="Date de dernière modification")
 * )
 */
class Course extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'code',
        'title',
        'description',
        'photo_url',
        'category',
        'total_hours',
        'max_students',
        'price',
        'prerequisites',
        'objectives',
    ];

    protected function casts(): array
    {
        return [
            'category' => CourseCategory::class,
            'price' => 'decimal:2',
        ];
    }

    public function trainingSessions(): HasMany
    {
        return $this->hasMany(TrainingSession::class);
    }
}
