
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

const IntelligenceFeedPage: React.FC = () => {
  const [indicatorSearch, setIndicatorSearch] = useState('');
  const [lookingUp, setLookingUp] = useState(false);
  const [lookupResult, setLookupResult] = useState<string | null>(null);

  const feeds = [
    { ip: '192.168.4.12', score: 98, country: 'CN', status: 'MALICIOUS', tags: ['C2', 'RAT'] },
    { ip: '45.1.22.8', score: 85, country: 'RU', status: 'MALICIOUS', tags: ['SPAM'] },
    { ip: '103.2.4.99', score: 92, country: 'UA', status: 'MALICIOUS', tags: ['BRUTEFORCE'] },
  ];

  const handleLookup = async () => {
    if (!indicatorSearch.trim()) return;
    setLookingUp(true);
    const result = await geminiService.lookupIndicator(indicatorSearch);
    setLookupResult(result);
    setLookingUp(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">Intelligence Lookup</h2>
          <p className="text-slate-500 font-bold text-xs tracking-[0.3em] uppercase mt-1">Global Malicious IP & Indicator Correlation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Lookup Hub */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-2xl">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 text-center">Neural Intel Lookup (Google Cloud Grounded)</h3>
            <div className="flex gap-4">
              <input 
                type="text" 
                value={indicatorSearch}
                onChange={(e) => setIndicatorSearch(e.target.value)}
                placeholder="Search IP, Domain, or SHA-256 Hash..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-indigo-400 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
              />
              <button 
                onClick={handleLookup}
                disabled={lookingUp || !indicatorSearch.trim()}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all"
              >
                {lookingUp ? 'Correlating...' : 'Lookup'}
              </button>
            </div>
            
            {lookupResult && (
              <div className="mt-8 p-6 bg-slate-950 rounded-2xl border border-slate-800 animate-in slide-in-from-top duration-500">
                <div className="flex items-center gap-2 mb-4">
                   <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Findings for "{indicatorSearch}"</h4>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                  {lookupResult}
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden">
            <div className="p-6 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Malicious Registry</h3>
               <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Live Sync: Active</span>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/20 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                  <th className="px-8 py-5">IOC Indicator</th>
                  <th className="px-8 py-5">Risk</th>
                  <th className="px-8 py-5">Origin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {feeds.map((feed, i) => (
                  <tr key={i} className="hover:bg-slate-800/20 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-white group-hover:text-rose-500 transition-colors">{feed.ip}</span>
                        <div className="flex gap-1 mt-1">
                          {feed.tags.map(t => <span key={t} className="text-[8px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded font-black tracking-widest">{t}</span>)}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                       <span className={`text-sm font-black ${feed.score > 80 ? 'text-rose-500' : 'text-amber-500'}`}>{feed.score}/100</span>
                    </td>
                    <td className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">{feed.country} NODE</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
             <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Threat Vectors</h3>
             <div className="space-y-4">
                {[
                  { label: 'Ransomware Group A', val: 'Active', color: 'text-rose-500' },
                  { label: 'C2 Sector CN-9', val: 'Monitored', color: 'text-amber-500' },
                  { label: 'Zero-Day CVE-2024', val: 'Patched', color: 'text-emerald-500' }
                ].map(v => (
                  <div key={v.label} className="flex justify-between items-center p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{v.label}</span>
                    <span className={`text-[10px] font-black uppercase ${v.color}`}>{v.val}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceFeedPage;
