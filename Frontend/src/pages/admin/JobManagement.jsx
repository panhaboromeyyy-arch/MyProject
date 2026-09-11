import { useEffect, useState } from 'react';
import api from '../../api/api';
import Icon from '../../components/Icon';

const empty = { title:'', company_name:'', description:'', location:'Phnom Penh, Cambodia', employment_type:'Full-time', work_mode:'On-site', salary:'' };

export default function JobManagement() {
  const [jobs, setJobs] = useState([]); const [form, setForm] = useState(empty); const [editing, setEditing] = useState(null); const [open, setOpen] = useState(false); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const load = async () => { setLoading(true); setError(''); try { const r=await api.get('/admin/jobs'); setJobs(Array.isArray(r.data)?r.data:[]); } catch(e){setError(e.response?.data?.message||'Could not load jobs.')} finally{setLoading(false)} };
  useEffect(()=>{load()},[]);
  const submit=async e=>{e.preventDefault();setError('');try{if(editing) await api.put(`/jobs/${editing}`,form); else await api.post('/jobs',form);setOpen(false);setEditing(null);setForm(empty);await load()}catch(e){setError(e.response?.data?.message||'Could not save job.')}};
  const edit=j=>{setEditing(j.id);setForm({...empty,...j});setOpen(true)};
  const del=async id=>{if(!window.confirm('Delete this job?'))return;try{await api.delete(`/jobs/${id}`);await load()}catch(e){setError(e.response?.data?.message||'Could not delete job.')}};
  return <div className="page-content">
    <section className="hero-banner"><div><span className="eyebrow">ADMIN · JOBS</span><h1>Job Management</h1><p>Create, update, and remove opportunities shown to candidates.</p></div><button className="btn btn-primary" onClick={()=>{setEditing(null);setForm(empty);setOpen(true)}}><Icon name="plus" size={14}/> Add Job</button></section>
    {error&&<div className="error-box">{error}</div>}
    <div className="card admin-table">{loading?<div className="loading-card">Loading jobs…</div>:<div className="table-scroll"><table><thead><tr><th>Job</th><th>Company</th><th>Type</th><th>Applications</th><th>Actions</th></tr></thead><tbody>{jobs.length?jobs.map(j=><tr key={j.id}><td><b>{j.title}</b><small>{j.location} · {j.work_mode}</small></td><td>{j.company_name}</td><td><span className="status applied">{j.employment_type}</span></td><td>{j.applications_count??0}</td><td><button title="Edit" className="icon-action" onClick={()=>edit(j)}><Icon name="edit" size={14}/></button><button title="Delete" className="icon-danger" onClick={()=>del(j.id)}><Icon name="trash" size={14}/></button></td></tr>):<tr><td colSpan="5">No jobs found.</td></tr>}</tbody></table></div>}</div>
    {open&&<div className="modal-backdrop"><form className="modal" onSubmit={submit}><button type="button" className="modal-close" onClick={()=>setOpen(false)}>×</button><h2>{editing?'Edit Job':'Add Job'}</h2>{[['title','Job title'],['company_name','Company'],['location','Location'],['salary','Salary']].map(([n,l])=><label key={n}>{l}<input value={form[n]??''} onChange={e=>setForm({...form,[n]:e.target.value})} required={n!=='salary'}/></label>)}<div className="form-grid"><label>Type<select value={form.employment_type} onChange={e=>setForm({...form,employment_type:e.target.value})}><option>Full-time</option><option>Part-time</option><option>Internship</option></select></label><label>Work mode<select value={form.work_mode} onChange={e=>setForm({...form,work_mode:e.target.value})}><option>On-site</option><option>Remote</option><option>Hybrid</option></select></label></div><label>Description<textarea rows="6" value={form.description??''} onChange={e=>setForm({...form,description:e.target.value})} required/></label><button className="btn btn-primary full">Save Job</button></form></div>}
  </div>;
}
