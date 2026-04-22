<?php

use App\Enums\Mention;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificates', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('certificate_number')->unique();
            $table->foreignUuid('registration_id')->unique()->constrained('registrations');
            $table->string('student_full_name');
            $table->date('student_birth_date')->nullable();
            $table->string('student_birth_place')->nullable();
            $table->string('course_title');
            $table->integer('course_total_hours');
            $table->date('training_start_date');
            $table->date('training_end_date');
            $table->date('issue_date');
            $table->integer('attended_hours');
            $table->decimal('final_grade', 5, 2)->nullable();
            $table->enum('mention', array_column(Mention::cases(), 'value'))->nullable();
            $table->text('acquired_skills')->nullable();
            $table->text('pdf_url')->nullable();
            $table->text('verification_url')->nullable();
            $table->foreignUuid('signed_by')->nullable()->constrained('users');
            $table->timestamp('signed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificates');
    }
};
