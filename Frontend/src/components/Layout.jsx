import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-slate-100 py-4 text-center text-sm text-slate-500">
        © 2026 Dynamic Digital Resume & Application Portal. All rights reserved.
      </footer>
    </div>
  );
}