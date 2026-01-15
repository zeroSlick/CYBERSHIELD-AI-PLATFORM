
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const generateCaptcha = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (captchaInput.toUpperCase() !== captcha.toUpperCase()) {
      setError('Captcha verification failed. Please try again.');
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }

    try {
      await login(email, password);
      navigate('/app/dashboard');
    } catch (err: any) {
      console.error("Login error:", err);
      // Handle common Supabase error messages
      if (err.message === 'Invalid login credentials') {
        setError('Invalid email or password. Please verify your credentials.');
      } else if (err.message.includes('Email not confirmed')) {
        setError('Access Denied: Please check your inbox and confirm your email address before logging in.');
      } else {
        setError(err.message || 'Access Denied: Check your clearance level.');
      }
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-emerald-600 rounded-full blur-[120px]"></div>
      </div>

      <Link to="/" className="mb-8 flex items-center gap-3 group transition-all hover:scale-105 z-20">
         <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">CS</div>
         <span className="text-lg font-bold text-white tracking-tight">Return to Base</span>
      </Link>

      <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-xl shadow-indigo-600/20">🛡️</div>
          <h1 className="text-2xl font-bold text-white tracking-tight text-center">Operator Authentication</h1>
          <p className="text-slate-400 mt-1 text-xs text-center">Secure Entry Protocol Alpha-9</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Registered Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              placeholder="operator@shield.ai"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Secure Passphrase</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">Security Verification</label>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center font-mono text-lg tracking-widest text-indigo-400 select-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                {captcha}
              </div>
              <button 
                type="button" 
                onClick={() => setCaptcha(generateCaptcha())}
                className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs text-slate-400"
                title="Refresh Captcha"
              >
                
              </button>
            </div>
            <input 
              type="text" 
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm font-mono uppercase"
              placeholder="Enter Code Above"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
          >
            {isLoading ? 'Verifying Neural Pattern...' : 'Establish Secure Connection'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-slate-500 text-xs">
            New Operator? <Link to="/register" className="text-indigo-400 font-bold hover:underline">Apply for Clearance</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
