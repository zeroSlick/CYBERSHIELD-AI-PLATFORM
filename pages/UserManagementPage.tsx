
import React, { useState } from 'react';
import { User, UserRole, AuditLog } from '../types';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 'u-1', username: 'admin', email: 'admin@shield.ai', role: UserRole.ADMIN, isActive: true, lastLogin: '2023-11-20T10:00:00Z' },
    { id: 'u-2', username: 'jsmith', email: 'j.smith@shield.ai', role: UserRole.ANALYST, isActive: true, lastLogin: '2023-11-20T08:30:00Z' },
    { id: 'u-3', username: 'rdoe', email: 'r.doe@shield.ai', role: UserRole.INVESTIGATOR, isActive: false, lastLogin: '2023-11-18T16:45:00Z' },
  ]);

  const auditLogs: AuditLog[] = [
    { id: 'L-1', timestamp: '2023-11-20T14:30:05Z', userId: 'admin', action: 'LOGIN', resource: 'SYSTEM', details: 'Successful authentication from 10.0.0.1' },
    { id: 'L-2', timestamp: '2023-11-20T14:35:12Z', userId: 'admin', action: 'UPDATE', resource: 'USER:rdoe', details: 'Disabled account due to inactivity' },
    { id: 'L-3', timestamp: '2023-11-20T15:00:00Z', userId: 'jsmith', action: 'CREATE', resource: 'INCIDENT:7742', details: 'Escalated brute force threat' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Identity & Access Control</h2>
          <p className="text-slate-400 mt-1">Manage personnel clearance levels and monitor platform activity.</p>
        </div>
        <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]">
          + Provision New Operator
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Authorized Operators</h3>
            <span className="text-xs font-bold text-slate-500 uppercase">{users.length} TOTAL</span>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                <th className="px-6 py-4">Operator</th>
                <th className="px-6 py-4">Clearance</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Last Sync</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-slate-800/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-indigo-400 border border-slate-700">
                        {u.username[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{u.username}</div>
                        <div className="text-[10px] text-slate-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      u.role === UserRole.ADMIN ? 'bg-indigo-500/10 text-indigo-400' :
                      u.role === UserRole.INVESTIGATOR ? 'bg-emerald-500/10 text-emerald-500' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-xs font-medium ${u.isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                      {u.isActive ? 'Active' : 'Revoked'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">{new Date(u.lastLogin).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-500 hover:text-white font-bold text-xs uppercase tracking-tighter">Edit Credentials</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-lg font-bold text-white">System Audit Trail</h3>
            <p className="text-xs text-slate-500 mt-1 uppercase font-bold tracking-widest">Real-time log</p>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {auditLogs.map(log => (
              <div key={log.id} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:bottom-[-24px] before:bg-slate-800 last:before:hidden">
                <div className="absolute left-[-2px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-700 border-2 border-slate-950"></div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-indigo-400 uppercase">{log.action}</span>
                    <span className="text-[10px] text-slate-600 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    <span className="text-indigo-300 font-bold">@{log.userId}</span> accessed <span className="font-mono text-slate-400 bg-slate-800 px-1 rounded">{log.resource}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 italic mt-1">{log.details}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="p-4 bg-slate-800/50 hover:bg-slate-800 text-xs font-bold text-slate-400 text-center border-t border-slate-800 transition-colors">
            DOWNLOAD FULL LOG ARCHIVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
