<?php

use App\Enums\FormStatus;
use App\Enums\FundingType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registration_forms', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('form_number')->unique();
            $table->foreignUuid('student_id')->constrained('students');
            $table->foreignUuid('session_id')->constrained('training_sessions');
            $table->date('submission_date')->useCurrent();
            $table->date('validation_date')->nullable();
            $table->enum('funding_type', array_column(FundingType::cases(), 'value'));
            $table->decimal('funding_amount', 10, 2)->default(0);
            $table->decimal('self_funded_amount', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2);
            $table->text('id_document_url')->nullable();
            $table->text('diploma_document_url')->nullable();
            $table->text('funding_proof_url')->nullable();
            $table->text('photo_url')->nullable();
            $table->enum('status', array_column(FormStatus::cases(), 'value'))->default(FormStatus::DRAFT->value);
            $table->foreignUuid('validated_by')->nullable()->constrained('users');
            $table->text('validation_notes')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->timestamps();

            $table->unique(['student_id', 'session_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registration_forms');
    }
};
