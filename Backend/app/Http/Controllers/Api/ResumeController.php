<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // Added Storage facade

class ResumeController extends Controller
{
    public function index()
    {
        return response()->json(Resume::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name'   => 'required|string|max:255',
            'email'       => 'required|email|unique:resumes,email',
            'phone'       => 'required|string',
            'title'       => 'required|string',
            'summary'     => 'required|string',
            'skills'      => 'nullable',
            'experience'  => 'nullable',
            'education'   => 'nullable',
            'resume_file' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('resume_file')) {
            $path = $request->file('resume_file')->store('resumes', 'public');
            $validated['file_path'] = $path;
        }

        foreach (['skills', 'experience', 'education'] as $field) {
            if (isset($validated[$field]) && is_string($validated[$field])) {
                $validated[$field] = json_decode($validated[$field], true);
            }
        }

        $resume = Resume::create($validated);

        return response()->json([
            'message' => 'Resume created successfully',
            'data'    => $resume
        ], 201);
    }

    public function show($id)
    {
        $resume = Resume::find($id);
        if (!$resume) {
            return response()->json(['message' => 'Resume not found'], 404);
        }
        return response()->json($resume, 200);
    }

    public function update(Request $request, $id)
    {
        $resume = Resume::find($id);
        if (!$resume) {
            return response()->json(['message' => 'Resume not found'], 404);
        }

        $resume->update($request->all());

        return response()->json([
            'message' => 'Resume updated successfully',
            'data'    => $resume
        ], 200);
    }

    public function destroy($id)
    {
        $resume = Resume::find($id);
        if (!$resume) {
            return response()->json(['message' => 'Resume not found'], 404);
        }

        $resume->delete();
        return response()->json(['message' => 'Resume deleted successfully'], 200);
    }

    // New Download Method
    public function download($id)
    {
        $resume = Resume::find($id);

        if (!$resume || !$resume->file_path) {
            return response()->json(['message' => 'File not found'], 404);
        }

        return Storage::disk('public')->download($resume->file_path);
    }
}