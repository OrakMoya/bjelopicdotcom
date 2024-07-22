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
        Schema::create('video_videoroles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('video_id')->references('id')->on('videos');
            $table->foreignId('videorole_id')->references('id')->on('videoroles');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('video_videoroles');
    }
};
