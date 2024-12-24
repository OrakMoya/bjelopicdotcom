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
        Schema::create('stills', function (Blueprint $table) {
            $table->id();

            $table->foreignId('video_id')->references('id')->on('videos')->onDelete('cascade');

            $table->string('path');
            $table->string('description')->default('');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stills');
    }
};
