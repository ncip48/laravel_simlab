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
        Schema::create('imltds', function (Blueprint $table) {
            $table->id();
            $table->string('blood_bag');
            $table->tinyInteger('hiv');
            $table->integer('nilai_hiv');
            $table->tinyInteger('hbsag');
            $table->integer('nilai_hbsag');
            $table->tinyInteger('hcv');
            $table->integer('nilai_hcv');
            $table->tinyInteger('tp');
            $table->integer('nilai_tp');
            $table->timestamps();
            $table->softDeletes();
            $table->integer('created_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imltds');
    }
};
