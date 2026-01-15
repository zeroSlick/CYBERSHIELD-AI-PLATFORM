
import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <nav className="h-20 flex items-center px-6 border-b border-white/5 sticky top-0 bg-slate-950/80 backdrop-blur-xl z-50">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-white">CS</div>
          <span className="font-bold text-white group-hover:text-indigo-400 transition-colors">Back to Home</span>
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <header className="mb-16">
          <div className="text-indigo-400 font-bold uppercase tracking-widest text-xs mb-4">Mission Statement</div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">Project Overview</h1>
          <p className="text-xl text-slate-400 leading-relaxed italic">
            "Bridging the gap between reactive security and proactive defense through AI-driven telemetry analysis."
          </p>
        </header>

        <div className="space-y-12 text-lg text-slate-300 leading-relaxed">
          <p>
            The <strong>AI-Based Cyber Threat Detection & Digital Forensics Platform</strong> is designed to provide intelligent, real-time detection and investigation of modern cyber threats. The platform leverages artificial intelligence and heuristic analysis to identify malicious activities, network anomalies, and potential zero-day attacks that traditional security systems may fail to detect.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
              <h3 className="text-white font-bold text-xl mb-4">Unified Operations</h3>
              <p className="text-sm text-slate-400">
                This system integrates threat detection, incident management, and digital forensics into a single secure platform. It enables security analysts and investigators to analyze system logs, network traffic, and digital evidence while maintaining data integrity through cryptographic verification.
              </p>
            </div>
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
              <h3 className="text-white font-bold text-xl mb-4">Secure Integrity</h3>
              <p className="text-sm text-slate-400">
                The platform supports role-based access control to ensure secure and controlled usage by administrators, analysts, and forensic investigators. By automating threat detection and forensic reporting, the system reduces response time and improves investigation accuracy.
              </p>
            </div>
          </div>

          <p>
            By leveraging advanced cryptographic hashing (SHA-256), the platform ensures that digital evidence remains tamper-proof throughout the lifecycle of an investigation. Every log captured and every forensic image taken is verified against its initial state, providing a court-ready chain of custody.
          </p>

          <div className="p-8 bg-indigo-600/5 border border-indigo-600/20 rounded-3xl mt-12">
            <h4 className="text-white font-bold mb-4">Academic & Research Purpose</h4>
            <p className="text-sm text-slate-400 italic">
              This project is developed for academic and research purposes, demonstrating the practical application of AI in cybersecurity and digital forensics. It showcases how neural networks can assist human operators in making faster, more accurate decisions during high-pressure security incidents.
            </p>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-800 text-center">
          <Link to="/contact" className="text-indigo-400 font-bold hover:underline underline-offset-4">Learn about the Development Team &rarr;</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
