import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function PortalLayout() {
  return <div className="min-h-screen bg-[#f7fbfa]"><Navbar /><div className="portal-shell mx-auto flex max-w-[1600px]"><Sidebar /><div className="min-w-0 flex-1"><Outlet /></div></div></div>;
}
