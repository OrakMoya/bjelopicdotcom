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
        Schema::create('video_hours', function (Blueprint $table) {
            $table->id();
            $table->foreignId('video_id')->references('id')->on('videos')->onDelete('cascade');

            $table->string('phase');
            $table->integer('amount');
            $table->string('unit');

            $table->unique(['video_id', 'phase']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('video_hours');
    }
};
