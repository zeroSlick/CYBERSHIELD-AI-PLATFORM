
import React, { useState, useMemo } from 'react';
import { Threat, Severity } from '../types';
import { geminiService } from '../services/geminiService';

const getSeverityColor = (score: number) => {
  if (score >= 9.0) return 'text-rose-500 border-rose-500/20 bg-rose-500/10 shadow-[0_0_12px_rgba(244,63,94,0.3)]';
  if (score >= 7.0) return 'text-orange-500 border-orange-500/20 bg-orange-500/10';
  if (score >= 4.0) return 'text-amber-500 border-amber-500/20 bg-amber-500/10';
  if (score > 0.0) return 'text-sky-400 border-sky-400/20 bg-sky-400/10';
  return 'text-slate-500 border-slate-700/50 bg-slate-800/50';
};

const getPLevelBadge = (score: number) => {
  if (score >= 9.0) return 'P1';
  if (score >= 7.0) return 'P2';
  if (score >= 4.0) return 'P3';
  if (score > 0.0) return 'P4';
  return 'P5';
};

const ThreatDetectionPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [analyzing, setAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);
  const [manualLog, setManualLog] = useState('');
  const [activeThreats, setActiveThreats] = useState<Threat[]>([
    { id: 'T-101', type: 'SQL Injection', severity: Severity.CRITICAL, riskScore: 9.4, confidence: 0.88, timestamp: '2023-11-20T11:15:00Z', sourceIp: '92.118.3.45', targetUser: 'db_admin', status: 'DETECTED' },
    { id: 'T-100', type: 'Phishing Attempt', severity: Severity.HIGH, riskScore: 7.2, confidence: 0.94, timestamp: '2023-11-20T10:30:00Z', sourceIp: '185.23.4.12', targetUser: 'j.smith', status: 'DETECTED' },
  ]);

  const filteredThreats = useMemo(() => {
    return activeThreats.filter(t => {
      const matchesSearch = t.type.toLowerCase().includes(searchTerm.toLowerCase()) || t.sourceIp.includes(searchTerm);
      const matchesSeverity = filterSeverity === 'ALL' || t.severity === filterSeverity;
      return matchesSearch && matchesSeverity;
    });
  }, [searchTerm, filterSeverity, activeThreats]);

  const handleManualAnalyze = async () => {
    if (!manualLog.trim()) return;
    setAnalyzing(true);
    setAiAnalysis(null);
    const result = await geminiService.analyzeThreat(manualLog);
    setAiAnalysis(result);
    setAnalyzing(false);
    
    // Add to local state as a "Analyzed Record"
    if (result) {
      const newThreat: Threat = {
        id: `REC-${Math.floor(Math.random() * 1000)}`,
        type: 'Client Ingested Record',
        severity: result.priorityLevel as any,
        riskScore: result.riskScore,
        confidence: 0.95,
        timestamp: new Date().toISOString(),
        sourceIp: 'MANUAL_INGEST',
        targetUser: 'INGEST_CLIENT',
        status: 'DETECTED'
      };
      setActiveThreats([newThreat, ...activeThreats]);
    }
  };

  const handleRowAnalyze = async (threat: Threat) => {
    setAnalyzing(true);
    setAiAnalysis(null);
    const result = await geminiService.analyzeThreat(threat);
    setAiAnalysis(result);
    setAnalyzing(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight uppercase">SOC Threat Hub</h2>
          <p className="text-slate-500 font-bold text-xs tracking-[0.3em] uppercase mt-1">Real-time Telemetry Ingestion & Analysis</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Manual Ingestor */}
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl uppercase font-black text-slate-500">INGEST</span>
            </div>
            <h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Manual Telemetry Ingestion</h3>
            <textarea 
              value={manualLog}
              onChange={(e) => setManualLog(e.target.value)}
              placeholder="Paste raw server logs, firewall dumps, or client records here for Neural Scanning..."
              className="w-full h-32 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-indigo-300 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all resize-none mb-4"
            />
            <button 
              onClick={handleManualAnalyze}
              disabled={analyzing || !manualLog.trim()}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Neural Scrambling...
                </>
              ) : '⚡ Start Deep Neural Scan'}
            </button>
          </div>

          {/* Records Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
               <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Sector Registry</h3>
               <div className="flex gap-4">
                 <input 
                   type="text" 
                   placeholder="Filter Node..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-[10px] text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                 />
               </div>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-500 text-[10px] uppercase font-black tracking-widest border-b border-slate-800/50">
                  <th className="px-8 py-5">Priority & Node</th>
                  <th className="px-8 py-5">Risk</th>
                  <th className="px-8 py-5">Source</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredThreats.map((threat) => (
                  <tr key={threat.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-black text-[10px] ${getSeverityColor(threat.riskScore)}`}>
                          {getPLevelBadge(threat.riskScore)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{threat.type}</div>
                          <div className="text-[9px] text-slate-500 font-black uppercase">{threat.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                       <span className={`text-xs font-black ${threat.riskScore > 7 ? 'text-rose-500' : 'text-amber-500'}`}>{threat.riskScore.toFixed(1)}</span>
                    </td>
                    <td className="px-8 py-5 text-xs font-mono text-slate-400">{threat.sourceIp}</td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => handleRowAnalyze(threat)}
                        className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:underline"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Output Sidebar */}
        <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-8 flex flex-col h-fit sticky top-24 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-xl shadow-xl shadow-indigo-600/20">🧠</div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">Neural Engine</h3>
          </div>

          {analyzing ? (
            <div className="flex-1 py-20 flex flex-col items-center justify-center text-center space-y-6">
              <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] animate-pulse">De-encrypting Telemetry...</p>
            </div>
          ) : aiAnalysis ? (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-center">
                   <div className="text-[9px] font-black text-slate-600 uppercase mb-1">Priority</div>
                   <div className={`text-xl font-black ${getSeverityColor(aiAnalysis.riskScore)}`}>{aiAnalysis.priorityLevel}</div>
                 </div>
                 <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800 text-center">
                   <div className="text-[9px] font-black text-slate-600 uppercase mb-1">Risk Factor</div>
                   <div className="text-xl font-black text-white">{aiAnalysis.riskScore.toFixed(1)}</div>
                 </div>
               </div>

               <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Technical Briefing</h4>
                 <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950 p-4 rounded-2xl border border-slate-800">{aiAnalysis.summary}</p>
               </div>

               <div className="space-y-4">
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Defensive Protocols</h4>
                 <div className="space-y-2">
                   {aiAnalysis.mitigationSteps.map((step: string, i: number) => (
                     <div key={i} className="flex gap-3 text-[10px] font-mono text-emerald-400 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10">
                       <span className="opacity-50">#0{i+1}</span> {step}
                     </div>
                   ))}
                 </div>
               </div>

               <button 
                onClick={() => setAiAnalysis(null)}
                className="w-full py-3 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors border-t border-slate-800 mt-4"
               >
                 Clear Neural Buffer
               </button>
            </div>
          ) : (
            <div className="py-24 text-center space-y-4 opacity-30">
              <div className="text-5xl">🛰️</div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Awaiting Client Stream</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreatDetectionPage;
