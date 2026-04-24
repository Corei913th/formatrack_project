<?php

namespace App\Models;

use App\Enums\PaymentStatus;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne as EloquentHasOne;

class Registration extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'registration_number',
        'student_id',
        'session_id',
        'form_id',
        'registration_date',
        'attended_hours',
        'total_amount',
        'paid_amount',
        'payment_status',
        'final_grade',
        'is_admitted',
    ];

    protected function casts(): array
    {
        return [
            'registration_date' => 'date',
            'payment_status' => PaymentStatus::class,
            'total_amount' => 'decimal:2',
            'paid_amount' => 'decimal:2',
            'final_grade' => 'decimal:2',
            'is_admitted' => 'boolean',
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function trainingSession(): BelongsTo
    {
        return $this->belongsTo(TrainingSession::class, 'session_id');
    }

    public function form(): BelongsTo
    {
        return $this->belongsTo(RegistrationForm::class, 'form_id');
    }

    public function certificate(): EloquentHasOne
    {
        return $this->hasOne(Certificate::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }
}
