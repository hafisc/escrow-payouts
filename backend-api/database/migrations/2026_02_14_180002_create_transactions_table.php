<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('milestone_id')->constrained('milestones')->onDelete('cascade');
            $table->string('reference_id')->unique();
            $table->enum('type', ['inbound', 'outbound']); // Inbound (Client -> Escrow), Outbound (Escrow -> Freelancer)
            $table->decimal('amount', 12, 2);
            $table->string('status')->default('pending'); // Payment gateway status e.g., pending, settlement, failure
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
