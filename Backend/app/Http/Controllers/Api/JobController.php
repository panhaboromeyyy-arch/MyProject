<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = Job::query()->latest();
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('company_name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }
        return response()->json($query->paginate(10));
    }

    public function show($id){ return response()->json(Job::findOrFail($id)); }

    public function store(Request $request){
        abort_unless($request->user()?->role === 'admin', 403);
        $data=$request->validate(['title'=>'required|string|max:255','description'=>'required|string','company_name'=>'required|string|max:255','location'=>'nullable|string|max:255','employment_type'=>'nullable|string|max:100','work_mode'=>'nullable|string|max:100','salary'=>'nullable|string|max:100']);
        $job = Job::create($data);
        ActivityLog::create(['user_id'=>$request->user()->id,'action'=>'job_created','description'=>'Created job: '.$job->title,'ip_address'=>$request->ip()]);
        return response()->json($job,201);
    }
    public function update(Request $request,$id){
        abort_unless($request->user()?->role === 'admin', 403);
        $job=Job::findOrFail($id);$data=$request->validate(['title'=>'sometimes|required|string|max:255','description'=>'sometimes|required|string','company_name'=>'sometimes|required|string|max:255','location'=>'nullable|string|max:255','employment_type'=>'nullable|string|max:100','work_mode'=>'nullable|string|max:100','salary'=>'nullable|string|max:100']);$job->update($data);
        ActivityLog::create(['user_id'=>$request->user()->id,'action'=>'job_updated','description'=>'Updated job: '.$job->title,'ip_address'=>$request->ip()]);
        return response()->json($job);
    }
    public function destroy(Request $request,$id){abort_unless($request->user()?->role === 'admin',403);$job = Job::findOrFail($id);
        $title = $job->title;
        if ($job->applications()->exists()) {
            return response()->json(['message' => 'This job has applications and cannot be deleted yet.'], 422);
        }
        $job->delete();
        ActivityLog::create(['user_id'=>$request->user()->id,'action'=>'job_deleted','description'=>'Deleted job: '.$title,'ip_address'=>$request->ip()]);
        return response()->json(['message'=>'Job deleted.']);}
}
