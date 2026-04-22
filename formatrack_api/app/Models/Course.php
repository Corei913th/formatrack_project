<?php

namespace App\Models;

use App\Enums\CourseCategory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasFactory, HasUuids;

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
