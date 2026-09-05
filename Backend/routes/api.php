<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ResumeController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AuthController;

// Public auth endpoints
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (Requires Bearer Token)
Route::middleware('auth:sanctum')->group(function () {
    
    // User info & Logout
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // Dynamic Resume Endpoints
    Route::apiResource('resumes', ResumeController::class);
    Route::get('/resumes/{id}/download', [ResumeController::class, 'download']);

    // Job Application Endpoints
    Route::apiResource('applications', ApplicationController::class);
});