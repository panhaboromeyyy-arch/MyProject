import { useEffect, useState } from 'react';
import api from '../../api/api';

const statuses=['applied','under_review','shortlisted','interview','accepted','rejected'];
const date=v=>v?new Date(v).toLocaleString():'—';
export default function ApplicationManagement(){
 const [apps,setApps]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState(''),[filter,setFilter]=useState('all');
 const load=async()=>{setLoading(true);setError('');try{const r=await api.get('/admin/applications');setApps(Array.isArray(r.data)?r.data:[])}catch(e){setError(e.response?.data?.message||'Could not load applications.')}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 const change=async(a,status)=>{try{await api.patch(`/applications/${a.id}`,{status});await load()}catch(e){setError(e.response?.data?.message||'Could not update application status.')}};
 const viewResume=async id=>{try{const r=await api.get(`/applications/${id}/resume`,{responseType:'blob'});const url=URL.createObjectURL(r.data);window.open(url,'_blank');setTimeout(()=>URL.revokeObjectURL(url),60000)}catch(e){setError(e.response?.data?.message||'Could not open the resume.')}};
 const list=filter==='all'?apps:apps.filter(a=>a.status===filter);
 return <div className="page-content"><section className="hero-banner"><div><span className="eyebrow">ADMIN · APPLICATIONS</span><h1>Application Management</h1><p>Review candidates and update application progress.</p></div><div className="hero-leaf">📄</div></section>
 {error&&<div className="error-box">{error}</div>}
 <div className="card admin-table"><div className="table-toolbar"><div className="filter-row admin-filter">{['all',...statuses].map(s=><button key={s} className={filter===s?'active':''} onClick={()=>setFilter(s)}>{s==='all'?'All':s.replaceAll('_',' ')}</button>)}</div><span>{list.length} applications</span></div>
 {loading?<div className="loading-card">Loading applications…</div>:<div className="table-scroll"><table><thead><tr><th>Applicant</th><th>Job</th><th>Applied</th><th>Resume</th><th>Status</th></tr></thead><tbody>{list.length?list.map(a=><tr key={a.id}><td><b>{a.user?.name||'Unknown'}</b><small>{a.user?.email||''}</small></td><td><b>{a.job?.title||'Unknown job'}</b><small>{a.job?.company_name||''}</small></td><td>{date(a.created_at)}</td><td><button className="btn btn-secondary btn-small" onClick={()=>viewResume(a.id)}>View</button></td><td><select className="status-select" value={a.status||'applied'} onChange={e=>change(a,e.target.value)}>{statuses.map(s=><option key={s} value={s}>{s.replaceAll('_',' ')}</option>)}</select></td></tr>):<tr><td colSpan="5">No applications found.</td></tr>}</tbody></table></div>}</div></div>
}
