import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { Lock, Sparkles, ShieldCheck, KeyRound, ArrowRight, UserCheck } from 'lucide-react';
import trustedLogo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

export const AdminPage: React.FC = () => {
  const { isAdminLoggedIn, loginAdmin } = useApp();
  const [username, setUsername] = useState('admin@admissionsuggestion.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your administrator password');
      return;
    }
    const success = loginAdmin(password);
    if (!success) {
      setError('Invalid password. Default demo passcode is "admin123"');
    } else {
      setError('');
    }
  };

  if (isAdminLoggedIn) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-[85vh] bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A3FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00A3FF] to-blue-700 text-white shadow-lg shadow-blue-500/25 mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold text-white font-heading">
              Admin Control Portal
            </h1>
            <p className="text-xs text-slate-400">
              Authorized access to live banners, webinars, inquiries & ticker.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 font-heading">
                Admin Email
              </label>
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#00A3FF] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5 font-heading">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#00A3FF] transition-colors"
                required
              />
            </div>

            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-400/20 text-[11px] text-blue-300">
              <span className="font-bold">Demo Passcode:</span> <code className="bg-slate-800 px-1.5 py-0.5 rounded text-white font-mono">admin123</code>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00A3FF] to-blue-600 text-white font-bold text-xs hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 font-heading"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Sign In to Dashboard</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              ← Return to Public Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
