<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->string('applicant_name');
            $table->string('applicant_email');
            $table->string('job_title');
            $table->text('cover_letter')->nullable();
            $table->string('resume_file_path')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropColumn([
                'applicant_name',
                'applicant_email',
                'job_title',
                'cover_letter',
                'resume_file_path',
            ]);
        });
    }
};
