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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();

            $table->string('title');
            $table->text('description');
            $table->string('subject');
            $table->string('poster_path')->nullable();
            $table->string('preview_path')->nullable();
            $table->string('thumbnail_path')->nullable();
            $table->string('link');
            $table->date('publication_date');
            $table->string('collection')->nullable();

            $table->foreignId('user_id')->references('id')->on('users');
            $table->uuid();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
