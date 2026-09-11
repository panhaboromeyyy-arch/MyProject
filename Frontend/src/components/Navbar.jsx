import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.PNG';

export default function Navbar() {
  const navigate = useNavigate();
  const { token, user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.warn('Logout request failed:', error);
    } finally {
      logout();
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-30 border-b border-emerald-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[73px] max-w-[1600px] items-center gap-4 px-4 md:px-6">
        {token && (
          <Link to="/dashboard" className="flex shrink-0 items-center lg:hidden">
            <img src={logo} alt="MNC Resume Studio" className="h-11 w-28 object-contain object-left" />
          </Link>
        )}

        {token && (
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-2.5 text-sm text-slate-400 focus-within:border-emerald-200 focus-within:bg-white">
            <span className="text-base" aria-hidden="true">⌕</span>
            <input className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400" placeholder="Search jobs, skills, or companies..." />
          </label>
        )}

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
          {token ? (
            <>
              <Link to="/jobs" aria-label="Browse jobs" className="hidden h-9 w-9 place-items-center rounded-lg text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700 sm:grid">▦</Link>
              <button type="button" aria-label="Notifications" className="grid h-9 w-9 place-items-center rounded-lg text-lg text-slate-400 transition hover:bg-emerald-50 hover:text-emerald-700">♧</button>
              <Link to="/profile" className="flex items-center gap-2 rounded-xl px-1.5 py-1 transition hover:bg-emerald-50">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-700">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
                <span className="hidden max-w-36 truncate text-xs font-bold text-slate-700 md:block">{user?.name || 'Profile'}</span>
                <span className="hidden text-xs text-slate-400 md:block">⌄</span>
              </Link>
              <button type="button" onClick={handleLogout} className="hidden rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-600 transition hover:bg-rose-100 sm:block">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-emerald-700">Login</Link>
              <Link to="/register" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
