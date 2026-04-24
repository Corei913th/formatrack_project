<?php

namespace App\Models;

use App\Enums\FormStatus;
use App\Enums\FundingType;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne as EloquentHasOne;

class RegistrationForm extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'form_number',
        'student_id',
        'session_id',
        'submission_date',
        'validation_date',
        'funding_type',
        'funding_amount',
        'self_funded_amount',
        'total_amount',
        'id_document_url',
        'diploma_document_url',
        'funding_proof_url',
        'photo_url',
        'status',
        'validated_by',
        'validation_notes',
        'rejection_reason',
    ];

    protected function casts(): array
    {
        return [
            'submission_date' => 'date',
            'validation_date' => 'date',
            'funding_type' => FundingType::class,
            'status' => FormStatus::class,
            'funding_amount' => 'decimal:2',
            'self_funded_amount' => 'decimal:2',
            'total_amount' => 'decimal:2',
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

    public function validator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'validated_by');
    }

    public function registration(): EloquentHasOne
    {
        return $this->hasOne(Registration::class, 'form_id');
    }
}
