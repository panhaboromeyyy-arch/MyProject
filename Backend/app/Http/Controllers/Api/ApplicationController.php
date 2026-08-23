<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Application::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $application = Application::create($this->validatedData($request));

        return response()->json([
            'message' => 'Application submitted successfully',
            'application' => $application,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Application::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $application = Application::findOrFail($id);
        $application->update($this->validatedData($request, true));

        return response()->json([
            'message' => 'Application updated successfully',
            'application' => $application->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $application = Application::findOrFail($id);

        if ($application->resume_file_path) {
            Storage::disk('public')->delete($application->resume_file_path);
        }

        $application->delete();

        return response()->json(['message' => 'Application deleted successfully']);
    }

    private function validatedData(Request $request, bool $updating = false): array
    {
        $rules = [
            'applicant_name' => [$updating ? 'sometimes' : 'required', 'string', 'max:255'],
            'applicant_email' => [$updating ? 'sometimes' : 'required', 'email', 'max:255'],
            'job_title' => [$updating ? 'sometimes' : 'required', 'string', 'max:255'],
            'cover_letter' => ['nullable', 'string'],
            'resume_file' => ['nullable', 'file', 'mimes:pdf,doc,docx', 'max:2048'],
        ];

        $validated = $request->validate($rules);

        if ($request->hasFile('resume_file')) {
            $validated['resume_file_path'] = $request->file('resume_file')->store('applications', 'public');
        }

        unset($validated['resume_file']);

        return $validated;
    }
}
