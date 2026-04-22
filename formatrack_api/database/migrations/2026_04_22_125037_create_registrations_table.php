<?php

use App\Enums\PaymentStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('registration_number')->unique();
            $table->foreignUuid('student_id')->constrained('students');
            $table->foreignUuid('session_id')->constrained('training_sessions');
            $table->foreignUuid('form_id')->unique()->nullable()->constrained('registration_forms');
            $table->date('registration_date')->useCurrent();
            $table->integer('attended_hours')->default(0);
            $table->decimal('total_amount', 10, 2);
            $table->decimal('paid_amount', 10, 2)->default(0);
            $table->enum('payment_status', array_column(PaymentStatus::cases(), 'value'))->default(PaymentStatus::PENDING->value);
            $table->decimal('final_grade', 5, 2)->nullable();
            $table->boolean('is_admitted')->default(false);
            $table->timestamps();

            $table->unique(['student_id', 'session_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
