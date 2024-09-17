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
        Schema::create('temporary_uploads', function (Blueprint $table) {
            $table->id();

            $table->string('original_name')->nullable();
            $table->string('path')->nullable();
            $table->dateTime('expiry_datetime')->nullable();
            $table->foreignId('user_id')->references('id')->on('users');

            $table->string('resumable_identifier');
            $table->boolean('ready')->default(false);

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('temporary_uploads');
    }
};
