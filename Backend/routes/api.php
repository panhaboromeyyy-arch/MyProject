<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ResumeController;
use App\Http\Controllers\Api\ApplicationController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Dynamic Resume Endpoints
Route::apiResource('resumes', ResumeController::class);

// Job Application Endpoints
Route::apiResource('applications', ApplicationController::class);

Route::get('/resumes/{id}/download', [ResumeController::class, 'download']);