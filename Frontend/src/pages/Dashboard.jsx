import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const recommendedJobs = [
  {
    title: 'Backend Developer (Intern)',
    company: 'MNC Bank',
    location: 'Phnom Penh, Cambodia',
    type: 'Internship',
    pay: '$300–$500/mo',
    icon: '✣',
    iconClass: 'bg-emerald-700',
  },
  {
    title: 'IT Support Specialist',
    company: 'TrueTech Solutions',
    location: 'Phnom Penh, Cambodia',
    type: 'Full-time',
    pay: '$400–$700/mo',
    icon: 'T',
    iconClass: 'bg-violet-600',
  },
  {
    title: 'Junior Software Engineer',
    company: 'Amazon (Cambodia)',
    location: 'Phnom Penh, Cambodia',
    type: 'Full-time',
    pay: '$600–$900/mo',
    icon: 'a',
    iconClass: 'bg-slate-800',
  },
];

const recentApplications = [
  {
    title: 'Backend Developer (Intern)',
    company: 'MNC Bank',
    status: 'Under Review',
    tone: 'bg-amber-50 text-amber-700',
    date: 'Sep 11, 2026',
  },
  {
    title: 'IT Support Specialist',
    company: 'TrueTech Solutions',
    status: 'Applied',
    tone: 'bg-blue-50 text-blue-700',
    date: 'Sep 8, 2026',
  },
  {
    title: 'Junior Software Engineer',
    company: 'Amazon (Cambodia)',
    status: 'Interview',
    tone: 'bg-emerald-50 text-emerald-700',
    date: 'Sep 5, 2026',
  },
];

function SectionHeading({ title, to }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4">
      <h2 className="text-lg font-extrabold text-slate-800">{title}</h2>
      <Link to={to} className="text-xs font-bold text-emerald-600 transition hover:text-emerald-800">
        View all →
      </Link>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f7fbfa] p-4 md:p-6">
      <div className="mx-auto max-w-[1320px] space-y-5">
        <section className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-r from-[#e4f5ef] via-[#f8fdfb] to-[#e7f4f0] p-6 shadow-sm md:p-8">
          <div className="absolute -right-10 -top-14 h-40 w-40 rounded-full bg-emerald-100/60 blur-2xl" />
          <div className="relative z-10 max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">MNC Resume Studio</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#19324d] md:text-4xl">
              Good morning, {firstName}! 👋
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 md:text-base">
              Your dream career is closer than you think. Keep growing, keep applying, and keep moving forward.
            </p>
          </div>
          <div className="absolute bottom-5 right-7 hidden rotate-[-7deg] text-right font-serif text-base italic text-emerald-700/80 md:block">
            Good things<br />take time ♡
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_repeat(3,minmax(0,.8fr))]">
          <article className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full bg-emerald-50">
                <div className="grid h-20 w-20 place-items-center rounded-full border-[8px] border-emerald-500 bg-white text-xl font-extrabold text-slate-800">
                  80%
                </div>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-600">Your resume</p>
                <h2 className="mt-1 text-lg font-extrabold text-slate-800">Almost ready</h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">Add more details to make your resume stand out.</p>
                <Link to="/resume" className="mt-3 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700">
                  Continue →
                </Link>
              </div>
            </div>
          </article>

          <Link to="/jobs" className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-lg text-emerald-700">💼</span>
            <h2 className="mt-4 text-sm font-extrabold text-slate-800">Find Jobs</h2>
            <p className="mt-1 text-xs leading-5 text-slate-400">Explore new career opportunities.</p>
            <span className="mt-4 block text-xs font-bold text-emerald-600 transition group-hover:translate-x-1">Explore →</span>
          </Link>

          <Link to="/applications" className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-lg text-emerald-700">📋</span>
            <h2 className="mt-4 text-sm font-extrabold text-slate-800">My Applications</h2>
            <p className="mt-1 text-xs leading-5 text-slate-400">Track your application progress.</p>
            <span className="mt-4 block text-xs font-bold text-emerald-600 transition group-hover:translate-x-1">Track →</span>
          </Link>

          <Link to="/resume" className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-lg text-emerald-700">✎</span>
            <h2 className="mt-4 text-sm font-extrabold text-slate-800">Build Resume</h2>
            <p className="mt-1 text-xs leading-5 text-slate-400">Create or update your resume.</p>
            <span className="mt-4 block text-xs font-bold text-emerald-600 transition group-hover:translate-x-1">Build →</span>
          </Link>
        </section>

        <section>
          <SectionHeading title="Recommended Jobs" to="/jobs" />
          <div className="grid gap-4 md:grid-cols-3">
            {recommendedJobs.map((job) => (
              <Link key={job.title} to="/jobs" className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
                <div className="flex items-start gap-3">
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${job.iconClass} text-lg font-extrabold text-white`}>{job.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-extrabold text-slate-800">{job.title}</h3>
                    <p className="mt-0.5 text-xs font-medium text-slate-500">{job.company}</p>
                  </div>
                  <span className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600">→</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-slate-400">
                  <span>⌖ {job.location}</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">{job.type}</span>
                </div>
                <p className="mt-3 text-xs font-bold text-slate-500">{job.pay}</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading title="Recent Applications" to="/applications" />
          <div className="grid gap-3 md:grid-cols-3">
            {recentApplications.map((application) => (
              <Link key={application.title} to="/applications" className="group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:border-emerald-200 hover:shadow-md">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-700 text-sm font-extrabold text-white">M</span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-xs font-extrabold text-slate-800">{application.title}</h3>
                  <p className="mt-0.5 truncate text-[10px] text-slate-400">{application.company}</p>
                  <span className={`mt-2 inline-flex rounded-full px-2 py-1 text-[9px] font-bold ${application.tone}`}>{application.status}</span>
                </div>
                <span className="hidden text-[9px] text-slate-400 sm:block">{application.date}</span>
              </Link>
            ))}
          </div>
        </section>

        <p className="pb-4 text-center text-xs text-slate-400">Better skills. Better opportunities. A brighter future. ♡</p>
      </div>
    </main>
  );
}
