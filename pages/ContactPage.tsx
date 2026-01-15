
import React from 'react';
import { Link } from 'react-router-dom';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <nav className="h-20 flex items-center px-6 border-b border-white/5 sticky top-0 bg-slate-950/80 backdrop-blur-xl z-50">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-white">CS</div>
          <span className="font-bold text-white group-hover:text-indigo-400 transition-colors">Back to Home</span>
        </Link>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <header className="mb-12">
              <div className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4">Communication Hub</div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Contact & Developer</h1>
              <p className="text-slate-400 leading-relaxed text-lg">
                Have questions regarding the platform, cloud computing integration, or our research? Reach out to the development team at BVCOE Pune.
              </p>
            </header>

            <div className="space-y-8">
              <div className="flex gap-6 items-start p-6 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-indigo-600/10 text-indigo-400 rounded-2xl flex items-center justify-center shrink-0">🛡️</div>
                <div>
                  <h4 className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-1">Project Identifier</h4>
                  <p className="text-white font-bold leading-tight">AI-Based Cyber Threat Detection & Digital Forensics Platform</p>
                </div>
              </div>

              <div className="flex gap-6 items-start p-6 bg-slate-900 border border-slate-800 rounded-3xl border-l-4 border-l-indigo-500">
                <div className="w-12 h-12 bg-indigo-600/10 text-indigo-400 rounded-2xl flex items-center justify-center shrink-0">👨‍💻</div>
                <div>
                  <h4 className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-1">Lead Developer</h4>
                  <p className="text-white font-bold text-xl">Shubham Waghmare</p>
                  <div className="flex gap-4 mt-4">
                    <a href="https://www.linkedin.com/in/shubham-w-4665b1205/" target="_blank" className="text-xs font-bold text-slate-500 hover:text-white transition-colors">LINKEDIN</a>
                    <a href="https://github.com/zeroSlick" target="_blank" className="text-xs font-bold text-slate-500 hover:text-white transition-colors">GITHUB</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start p-6 bg-slate-900 border border-slate-800 rounded-3xl">
                <div className="w-12 h-12 bg-indigo-600/10 text-indigo-400 rounded-2xl flex items-center justify-center shrink-0">🏛️</div>
                <div>
                  <h4 className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mb-1">Institution & Dept</h4>
                  <p className="text-white font-bold">Bharti Vidyapeeth Deemed to be University, College of Engineering Pune</p>
                  <p className="text-slate-400 text-sm mt-1">Department of Computer Science and Engineering</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-[40px] shadow-2xl relative">
            <h3 className="text-2xl font-bold text-white mb-8">Establish Connection</h3>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Operator Name</label>
                <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Digital Address</label>
                <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="email@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Message Payload</label>
                <textarea rows={5} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none" placeholder="Transmission details..."></textarea>
              </div>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-[0.98]">
                Broadcast Transmission
              </button>
            </form>
            <div className="mt-8 text-center text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
              Encrypted Tunnel Alpha-01
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
