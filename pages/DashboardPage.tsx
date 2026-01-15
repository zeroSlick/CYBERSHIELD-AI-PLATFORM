
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [alertsCount, setAlertsCount] = useState(342);
  const [logs, setLogs] = useState<{ id: string; msg: string; type: string; time: string }[]>([]);

  const severityData = [
    { name: 'P1 - Critical', value: 8, color: '#f43f5e' },
    { name: 'P2 - High', value: 24, color: '#f97316' },
    { name: 'P3 - Medium', value: 45, color: '#eab308' },
    { name: 'P4 - Low', value: 89, color: '#38bdf8' },
    { name: 'P5 - Info', value: 176, color: '#64748b' },
  ];

  const dailyThreats = [
    { day: 'Mon', count: 45 }, { day: 'Tue', count: 52 }, { day: 'Wed', count: 38 },
    { day: 'Thu', count: 65 }, { day: 'Fri', count: 82 }, { day: 'Sat', count: 24 }, { day: 'Sun', count: 18 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = {
        id: Math.random().toString(36),
        msg: `${user?.role} Event: Access at node ${Math.floor(Math.random() * 255)} established.`,
        type: Math.random() > 0.8 ? 'WARNING' : 'INFO',
        time: new Date().toLocaleTimeString()
      };
      setLogs(prev => [newLog, ...prev.slice(0, 5)]);
      setAlertsCount(c => c + (Math.random() > 0.8 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, [user]);

  // Role-specific Metric Mapping
  const getMetrics = () => {
    switch (user?.role) {
      case UserRole.SOC:
        return [
          { label: 'Active Alerts', value: alertsCount, icon: '', color: 'text-rose-400' },
          { label: 'Avg Triage', value: '4.2m', icon: '⏱', color: 'text-indigo-400' },
          { label: 'Node Health', value: '98%', icon: '', color: 'text-emerald-400' },
          { label: 'Pending P1', value: 12, icon: '', color: 'text-orange-400' },
        ];
      case UserRole.SYS:
        return [
          { label: 'Active Users', value: 18, icon: '', color: 'text-indigo-400' },
          { label: 'Sys Uptime', value: '99.98%', icon: '', color: 'text-emerald-400' },
          { label: 'Disk Space', value: '2.4TB', icon: '', color: 'text-sky-400' },
          { label: 'Backups', value: 'Sync', icon: '', color: 'text-amber-400' },
        ];
      default:
        return [
          { label: 'Sector Load', value: 'Normal', icon: '', color: 'text-slate-400' },
          { label: 'Identity', value: user?.role, icon: '', color: 'text-indigo-400' },
          { label: 'Access Log', value: 'Secure', icon: '', color: 'text-emerald-400' },
          { label: 'Clearance', value: 'Verif', icon: '', color: 'text-sky-400' },
        ];
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-black tracking-tight text-white uppercase">{user?.role} VIEWPORT</h2>
        <p className="text-slate-500 font-bold text-xs tracking-[0.3em] uppercase">Sector-Specific Operational Intelligence</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getMetrics().map((stat, i) => (
          <div key={i} className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-xl hover:border-indigo-500/30 transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className={`text-2xl`}>{stat.icon}</span>
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Active</span>
            </div>
            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
            <div className={`text-[10px] font-black uppercase tracking-widest ${stat.color}`}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-8">Role Telemetry Stream</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyThreats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 10, fontWeight: 'bold' }} />
                  <Tooltip cursor={{ fill: '#1e293b' }} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Neural Activity Log</h3>
            <div className="space-y-4">
              {logs.map(log => (
                <div key={log.id} className="flex gap-4 p-3 bg-slate-950/50 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                  <span className="text-[9px] font-black text-indigo-500 shrink-0">{log.time}</span>
                  <p className="text-xs text-slate-300 font-mono italic">{log.msg}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] text-center">
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-6 text-left">Sector Distribution</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={severityData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {severityData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
               {severityData.slice(0, 4).map(s => (
                 <div key={s.name} className="flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-tighter">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></div>
                   {s.name}
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-2xl shadow-indigo-600/20">
             <h3 className="text-white font-black uppercase text-xs tracking-widest mb-2">Pending Clearances</h3>
             <p className="text-indigo-100 text-xs font-medium leading-relaxed mb-6">There are 3 new access requests for the {user?.role} sector awaiting verification.</p>
             <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-50 transition-colors">Review Queue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
