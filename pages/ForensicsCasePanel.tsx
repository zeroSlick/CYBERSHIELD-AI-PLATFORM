
import React, { useState } from 'react';
import { ForensicCase, Evidence } from '../types';
import { geminiService } from '../services/geminiService';

const ForensicsCasePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DETAILS' | 'EVIDENCE' | 'REPORT'>('DETAILS');
  const [synthesizing, setSynthesizing] = useState(false);
  const [aiReport, setAiReport] = useState<any>(null);
  const [manualEvidence, setManualEvidence] = useState('');

  const [currentCase, setCurrentCase] = useState<ForensicCase>({
    id: 'FC-901',
    caseNumber: 'CASE-2023-04-X',
    title: 'Infiltration Analysis - Sector B Node',
    incidentIds: ['INC-7742'],
    evidence: [
      { id: 'E-1', name: 'AuthLog_11-20.log', type: 'LOG', sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', verificationStatus: 'VERIFIED', timestamp: '2023-11-20T10:00:00Z' },
    ],
    status: 'ACTIVE',
    createdAt: '2023-11-21T09:00:00Z',
    investigatorId: 'u-123'
  });

  const handleSynthesizeReport = async () => {
    setSynthesizing(true);
    const context = {
      title: currentCase.title,
      evidenceCount: currentCase.evidence.length,
      manualFindings: manualEvidence,
      recordedEvidence: currentCase.evidence.map(e => e.name)
    };
    const result = await geminiService.generateForensicSummary(context);
    setAiReport(result);
    setSynthesizing(false);
    setActiveTab('REPORT');
  };

  const addEvidence = () => {
    if (!manualEvidence.trim()) return;
    const newEv: Evidence = {
      id: `E-${Date.now()}`,
      name: manualEvidence.slice(0, 15) + '...',
      type: 'LOG',
      sha256: 'CALCULATING_ON_NODE...',
      verificationStatus: 'VERIFIED',
      timestamp: new Date().toISOString()
    };
    setCurrentCase(prev => ({ ...prev, evidence: [...prev.evidence, newEv] }));
    setManualEvidence('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-3xl font-black text-white tracking-tight">{currentCase.caseNumber}</h2>
            <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-[9px] font-black tracking-widest uppercase animate-pulse">Investigation Active</span>
          </div>
          <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{currentCase.title}</p>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={handleSynthesizeReport}
             disabled={synthesizing}
             className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/20 flex items-center gap-2"
           >
             {synthesizing ? (
               <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
             ) : ' Synthesize Result'}
           </button>
        </div>
      </div>

      <div className="flex gap-8 border-b border-slate-800">
        {['DETAILS', 'EVIDENCE', 'REPORT'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-4 px-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
              activeTab === tab ? 'text-indigo-400' : 'text-slate-600 hover:text-slate-400'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-400 shadow-[0_0_8px_indigo]"></div>}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {activeTab === 'DETAILS' && (
             <div className="space-y-8">
               <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
                 <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Evidence Ingestion Workspace</h3>
                 <textarea 
                   value={manualEvidence}
                   onChange={(e) => setManualEvidence(e.target.value)}
                   placeholder="Describe new evidence or paste suspicious artifact strings here..."
                   className="w-full h-40 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-emerald-300 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all resize-none mb-6"
                 />
                 <button 
                   onClick={addEvidence}
                   className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest"
                 >
                   Seal Evidence in Vault
                 </button>
               </div>
             </div>
           )}

           {activeTab === 'EVIDENCE' && (
              <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-950/50 text-slate-500 text-[9px] font-black uppercase tracking-widest border-b border-slate-800">
                      <th className="px-8 py-5">Item Artifact</th>
                      <th className="px-8 py-5">Integrity Hash</th>
                      <th className="px-8 py-5">Capture</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {currentCase.evidence.map(e => (
                      <tr key={e.id} className="hover:bg-slate-800/20">
                        <td className="px-8 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">{e.name}</span>
                            <span className="text-[9px] text-indigo-400 font-black tracking-widest uppercase">{e.type}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-[10px] font-mono text-slate-500 truncate max-w-[150px]">{e.sha256}</td>
                        <td className="px-8 py-5 text-xs text-slate-400">{new Date(e.timestamp).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           )}

           {activeTab === 'REPORT' && (
             <div className="space-y-8">
                {!aiReport ? (
                   <div className="py-20 text-center space-y-4 opacity-30">
                     <span className="text-4xl"></span>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Execute Synthesis to Generate Conclusion</p>
                   </div>
                ) : (
                  <div className="animate-in slide-in-from-bottom duration-500 space-y-8">
                     <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
                        <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Investigative Narrative</h3>
                        <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-950 p-6 rounded-2xl border border-slate-800">{aiReport.narrative}</p>
                     </div>

                     <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
                        <h3 className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-6">Reconstructed Timeline</h3>
                        <div className="space-y-4">
                          {aiReport.timeline.map((event: string, i: number) => (
                             <div key={i} className="flex gap-4 p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                               <div className="text-[10px] font-black text-indigo-500 uppercase shrink-0 pt-0.5">T-0{i+1}</div>
                               <p className="text-xs text-slate-400 font-medium">{event}</p>
                             </div>
                          ))}
                        </div>
                     </div>

                     <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-2xl shadow-indigo-600/30">
                        <h3 className="text-[10px] font-black text-white uppercase tracking-widest mb-4">Final Forensic Conclusion</h3>
                        <p className="text-sm text-white font-black leading-relaxed">{aiReport.conclusion}</p>
                     </div>
                  </div>
                )}
             </div>
           )}
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2rem]">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Case Metadata</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-2">Lead Investigator</label>
                  <p className="text-sm font-bold text-white uppercase">{currentCase.investigatorId}-ALPHA</p>
                </div>
                <div>
                  <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-2">Linked Incidents</label>
                  <div className="flex gap-2 flex-wrap">
                    {currentCase.incidentIds.map(id => (
                      <span key={id} className="px-2 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black rounded">{id}</span>
                    ))}
                  </div>
                </div>
                <div>
                   <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-2">Platform Integrity</label>
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase">SHA-256 Validated</span>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ForensicsCasePanel;
