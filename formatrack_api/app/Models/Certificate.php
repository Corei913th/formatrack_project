<?php

namespace App\Models;

use App\Enums\Mention;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certificate extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'certificate_number',
        'registration_id',
        'student_full_name',
        'student_birth_date',
        'student_birth_place',
        'course_title',
        'course_total_hours',
        'training_start_date',
        'training_end_date',
        'issue_date',
        'attended_hours',
        'final_grade',
        'mention',
        'acquired_skills',
        'pdf_url',
        'verification_url',
        'signed_by',
        'signed_at',
    ];

    protected function casts(): array
    {
        return [
            'student_birth_date' => 'date',
            'training_start_date' => 'date',
            'training_end_date' => 'date',
            'issue_date' => 'date',
            'signed_at' => 'datetime',
            'mention' => Mention::class,
            'final_grade' => 'decimal:2',
        ];
    }

    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class);
    }

    public function signer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'signed_by');
    }
}
