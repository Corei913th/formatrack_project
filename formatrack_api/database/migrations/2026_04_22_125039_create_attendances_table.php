<?php

use App\Enums\AttendanceMethod;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('session_id')->constrained('training_sessions');
            $table->foreignUuid('student_id')->constrained('students');
            $table->date('date');
            $table->integer('hours_attended')->default(0);
            $table->timestamp('check_in_time')->nullable();
            $table->enum('check_method', array_column(AttendanceMethod::cases(), 'value'))->default(AttendanceMethod::MANUAL->value);
            $table->foreignUuid('marked_by')->nullable()->constrained('users');
            $table->timestamps();

            $table->unique(['session_id', 'student_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
