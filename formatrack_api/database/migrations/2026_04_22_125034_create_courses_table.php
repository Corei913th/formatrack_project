<?php

use App\Enums\CourseCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('code')->unique();
            $table->string('title');
            $table->text('description')->nullable();
            $table->text('photo_url')->nullable();
            $table->enum('category', array_column(CourseCategory::cases(), 'value'));
            $table->integer('total_hours');
            $table->integer('max_students');
            $table->decimal('price', 10, 2);
            $table->text('prerequisites')->nullable();
            $table->text('objectives')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
