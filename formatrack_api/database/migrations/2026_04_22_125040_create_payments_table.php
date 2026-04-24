<?php

use App\Enums\PaymentMethod;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('registration_id')->constrained('registrations');
            $table->decimal('amount', 10, 2);
            $table->date('payment_date');
            $table->enum('payment_method', array_column(PaymentMethod::cases(), 'value'));
            $table->string('transaction_id')->nullable();
            $table->text('receipt_url')->nullable();
            $table->foreignUuid('received_by')->constrained('users');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
