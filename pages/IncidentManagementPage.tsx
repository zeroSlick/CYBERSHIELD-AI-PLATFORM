
import React, { useState } from 'react';
import { Incident, IncidentStatus, Severity } from '../types';

const IncidentManagementPage: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([
    { id: 'INC-7742', title: 'Brute Force Attack - VPN Gateway', severity: Severity.CRITICAL, status: IncidentStatus.INVESTIGATING, assignedAnalyst: 'Agent Smith', createdAt: '2023-11-20T10:00:00Z', updatedAt: '2023-11-20T12:00:00Z', relatedThreatIds: ['T-101'] },
    { id: 'INC-7741', title: 'Suspicious DLL Load in System Process', severity: Severity.HIGH, status: IncidentStatus.OPEN, assignedAnalyst: null, createdAt: '2023-11-20T11:30:00Z', updatedAt: '2023-11-20T11:30:00Z', relatedThreatIds: ['T-103'] },
    { id: 'INC-7739', title: 'Unauthorized DB Access Attempt', severity: Severity.HIGH, status: IncidentStatus.CLOSED, assignedAnalyst: 'Agent Brown', createdAt: '2023-11-19T14:30:00Z', updatedAt: '2023-11-20T09:00:00Z', relatedThreatIds: [] },
  ]);

  const updateStatus = (id: string, status: IncidentStatus) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status, updatedAt: new Date().toISOString() } : inc));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Active Incident Response</h2>
          <p className="text-slate-400 mt-1">Real-time triage and responder management.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold text-sm">Download Logs</button>
           <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-indigo-600/20">+ New Incident</button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b border-slate-800">
              <th className="px-6 py-4">Incident ID</th>
              <th className="px-6 py-4">Title & Description</th>
              <th className="px-6 py-4">Severity</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Assignee</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {incidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-mono text-xs font-bold text-slate-400">{incident.id}</td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-white">{incident.title}</div>
                  <div className="text-[10px] text-slate-500 mt-1">Last activity: {new Date(incident.updatedAt).toLocaleTimeString()}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    incident.severity === Severity.CRITICAL ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' :
                    incident.severity === Severity.HIGH ? 'bg-orange-500 text-white' :
                    'bg-amber-500 text-white'
                  }`}>
                    {incident.severity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={incident.status}
                    onChange={(e) => updateStatus(incident.id, e.target.value as IncidentStatus)}
                    className={`text-[11px] font-bold px-3 py-1 rounded-full bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 ${
                      incident.status === IncidentStatus.OPEN ? 'text-sky-400' :
                      incident.status === IncidentStatus.INVESTIGATING ? 'text-amber-400' :
                      'text-emerald-400'
                    }`}
                  >
                    <option value={IncidentStatus.OPEN}>OPEN</option>
                    <option value={IncidentStatus.INVESTIGATING}>INVESTIGATING</option>
                    <option value={IncidentStatus.CLOSED}>CLOSED</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  {incident.assignedAnalyst ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold uppercase">
                        {incident.assignedAnalyst.slice(6, 8)}
                      </div>
                      <span className="text-xs text-slate-300">{incident.assignedAnalyst}</span>
                    </div>
                  ) : (
                    <button className="text-[10px] font-bold text-indigo-400 hover:underline">Claim Incident</button>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-500 hover:text-white transition-colors"></button>
                  <button className="p-2 text-slate-500 hover:text-rose-400 transition-colors ml-2"></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncidentManagementPage;
