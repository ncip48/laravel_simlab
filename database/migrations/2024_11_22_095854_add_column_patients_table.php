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
        Schema::table('patients', function (Blueprint $table) {
            $table->char('province_id')->nullable();
            $table->foreign('province_id')->references('id')->on('reg_provinces')->onDelete('set null');
            $table->char('regency_id')->nullable();
            $table->foreign('regency_id')->references('id')->on('reg_regencies')->onDelete('set null');
            $table->char('district_id')->nullable();
            $table->foreign('district_id')->references('id')->on('reg_districts')->onDelete('set null');
            $table->char('village_id')->nullable();
            $table->foreign('village_id')->references('id')->on('reg_villages')->onDelete('set null');
            $table->string('identity_number');
            $table->string('post_code');
            $table->enum('gender', ["L", "P"]);
            $table->char('birth_place_id')->nullable();
            $table->foreign('birth_place_id')->references('id')->on('reg_regencies')->onDelete('set null');
            $table->date('birth_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('patients', function (Blueprint $table) {
            $table->dropConstrainedForeignId('province_id');
            $table->dropConstrainedForeignId('regency_id');
            $table->dropConstrainedForeignId('district_id');
            $table->dropConstrainedForeignId('village_id');
            $table->dropConstrainedForeignId('birth_place_id');
            $table->dropColumn(['province_id', 'regency_id', 'district_id', 'village_id', 'birth_place_id', 'identity_number', 'post_code', 'gender', 'birth_date']);
        });
    }
};
