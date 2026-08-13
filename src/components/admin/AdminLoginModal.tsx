import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Key, X, Shield, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { loginAdmin } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (success) {
      setError(false);
      setPassword('');
      onClose();
    } else {
      setError(true);
    }
  };

  const handleQuickDemo = () => {
    loginAdmin('admin123');
    setError(false);
    setPassword('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-xl bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto shadow-lg shadow-cyan-500/10">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-white font-heading">Admin Portal Login</h3>
          <p className="text-xs text-slate-400">
            Enter your admin passphrase to access content management & student lead CRM.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Passphrase / Key</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Enter admin password..."
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 text-white text-xs pl-10 pr-4 py-3 rounded-xl outline-none"
              />
            </div>
            {error && (
              <p className="text-[11px] text-rose-400 mt-1 font-medium">
                Invalid admin key. Try default: <code className="bg-slate-800 px-1 rounded text-cyan-300">admin123</code>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/20"
          >
            Authenticate & Access
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-800 text-center space-y-2">
          <span className="text-[11px] text-slate-400 block">Quick Demo Access for Testing:</span>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-300 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Login with Presets (admin123)</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
