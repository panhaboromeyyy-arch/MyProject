<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use Illuminate\Http\Request;

class ResumeController extends Controller
{
    // GET: Fetch all saved resumes
    public function index()
    {
        return response()->json(Resume::latest()->get());
    }

    // POST: Save a new resume
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string',
            'email' => 'nullable|string',
            'phone' => 'nullable|string',
            'title' => 'nullable|string',
            'address' => 'nullable|string',
            'summary' => 'nullable|string',
            'template_style' => 'nullable|string',
            'theme_color' => 'nullable|string',
            'skills' => 'nullable|array',
            'experience' => 'nullable|array',
            'education' => 'nullable|array',
        ]);

        $resume = Resume::create($validated);

        return response()->json([
            'message' => 'Resume saved successfully!',
            'data' => $resume
        ], 201);
    }

    // GET: Fetch single resume by ID
    public function show($id)
    {
        $resume = Resume::findOrFail($id);
        return response()->json($resume);
    }

    // DELETE: Delete a resume by ID
    public function destroy($id)
    {
        $resume = Resume::findOrFail($id);
        $resume->delete();

        return response()->json(['message' => 'Resume deleted successfully!']);
    }
}