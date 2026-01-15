
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const SidebarItem: React.FC<{ to: string; label: string; icon: string; active: boolean }> = ({ to, label, icon, active }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span className="font-bold text-xs uppercase tracking-widest">{label}</span>
  </Link>
);

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { to: '/app/dashboard', label: 'Dashboard', icon: '📊', roles: [UserRole.SOC, UserRole.SYS] },
    { to: '/app/threats', label: 'Threat Hub', icon: '🎯', roles: [UserRole.SOC, UserRole.INT] },
    { to: '/app/incidents', label: 'Incidents', icon: '🚨', roles: [UserRole.SOC, UserRole.DFIR] },
    { to: '/app/forensics', label: 'Forensics', icon: '🔎', roles: [UserRole.DFIR] },
    { to: '/app/intelligence', label: 'Intel Feed', icon: '📡', roles: [UserRole.INT] },
    { to: '/app/users', label: 'Identity', icon: '👥', roles: [UserRole.SYS] },
  ];

  const filteredMenu = menuItems.filter(item => user && item.roles.includes(user.role));

  const roleColors = {
    [UserRole.SOC]: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    [UserRole.DFIR]: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    [UserRole.SYS]: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    [UserRole.INT]: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 flex flex-col p-4 bg-slate-950/50 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-3 mb-10 px-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg group-hover:rotate-12 transition-transform">CS</div>
          <div className="flex flex-col">
            <h1 className="text-lg font-black tracking-tight text-white leading-none">CyberShield</h1>
            <span className="text-[10px] text-slate-500 font-bold tracking-widest">OPS CENTER</span>
          </div>
        </Link>

        <nav className="flex-1 space-y-1">
          {filteredMenu.map(item => (
            <SidebarItem 
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              active={location.pathname === item.to}
            />
          ))}
        </nav>

        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-6 px-2">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sm uppercase font-bold text-indigo-300">
              {user?.username.slice(0, 2)}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold truncate text-white">{user?.username}</span>
              <span className={`text-[9px] uppercase tracking-[0.2em] px-1.5 py-0.5 rounded border ${user ? roleColors[user.role] : ''} font-black mt-1 w-fit`}>
                {user?.role}
              </span>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-all font-black text-[10px] uppercase tracking-widest"
          >
            <span>🚪</span> DISCONNECT LINK
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        <header className="sticky top-0 z-10 h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black tracking-widest animate-pulse">
              NODE ACTIVE: {user?.role}-SECTOR
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_indigo]"></div>
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            </div>
            <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">{new Date().toLocaleDateString()}</span>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
