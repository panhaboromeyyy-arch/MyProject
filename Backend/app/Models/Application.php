<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'applicant_name',
        'applicant_email',
        'job_title',
        'cover_letter',
        'resume_file_path',
    ];
}
