<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TrainingSession extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'course_id',
        'instructor_id',
        'room_id',
        'start_date',
        'end_date',
        'planned_hours',
        'completed_hours',
        'qr_code_token',
        'qr_code_expires_at',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'qr_code_expires_at' => 'datetime',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class);
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    public function registrationForms(): HasMany
    {
        return $this->hasMany(RegistrationForm::class);
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }
}
