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
        if (Schema::hasTable('video_videoroles')) {
            Schema::rename('video_videoroles', 'video_videorole');
        }
        Schema::table('video_videorole', function (Blueprint $table) {
            $table->dropForeign(['video_id']);
            $table->dropForeign(['videorole_id']);

            $table->foreign('video_id')->references('id')->on('videos')->onDelete('cascade');
            $table->foreign('videorole_id')->references('id')->on('videoroles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('video_videorole')) {
            Schema::rename('video_videorole', 'video_videoroles');
        }
        Schema::table('video_videorole', function (Blueprint $table) {
            $table->dropForeign(['video_id']);
            $table->dropForeign(['videorole_id']);

            $table->foreign('video_id')->references('id')->on('videos');
            $table->foreign('videorole_id')->references('id')->on('videoroles');
        });
    }
};
