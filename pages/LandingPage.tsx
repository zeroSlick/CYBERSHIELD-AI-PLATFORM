
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500 selection:text-white overflow-x-hidden flex flex-col">
      {/* Background Grids & Glows */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600 rounded-full blur-[150px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/20">CS</div>
            <span className="text-xl font-bold text-white tracking-tight">CyberShield AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
            <Link to="/" className="text-white">Home</Link>
            <Link to="/heuristics" className="hover:text-white transition-colors">Heuristics</Link>
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/app" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-sm font-bold text-white hover:text-indigo-400 transition-colors">Log In</Link>
                <Link to="/register" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 pt-48 pb-20 px-6 relative flex items-center justify-center">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-8 uppercase tracking-widest animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Neural Threat Detection 2.0
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
            AI-Based Cyber Threat Detection <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-emerald-400">
              & Digital Forensics
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            The ultimate platform for proactive defense. Powered by next-gen neural engines, Supabase backend integration, and secure forensic logging.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-indigo-600/40">
              Deploy Sentinel
            </Link>
            <Link to="/about" className="w-full sm:w-auto px-10 py-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-slate-950 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-white text-sm">CS</div>
            <span className="text-lg font-bold text-white">CyberShield AI</span>
          </div>
          <div className="text-xs font-medium text-slate-600">
            © {new Date().getFullYear()} CyberShield AI Platform. Developed by Shubham Waghmare - BVCOE Pune.
          </div>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/shubham-w-4665b1205/" target="_blank" className="text-slate-500 hover:text-white text-xs font-bold uppercase transition-colors">LinkedIn</a>
            <a href="https://github.com/zeroSlick" target="_blank" className="text-slate-500 hover:text-white text-xs font-bold uppercase transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
