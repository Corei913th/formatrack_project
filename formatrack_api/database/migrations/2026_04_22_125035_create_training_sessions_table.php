<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('training_sessions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('course_id')->constrained('courses')->cascadeOnDelete();
            $table->foreignUuid('instructor_id')->constrained('instructors');
            $table->foreignUuid('room_id')->nullable()->constrained('rooms')->nullOnDelete();
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('planned_hours');
            $table->integer('completed_hours')->default(0);
            $table->uuid('qr_code_token')->nullable();
            $table->timestamp('qr_code_expires_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('training_sessions');
    }
};
