import React, { useState } from 'react';
import { Stethoscope, Lock, Mail, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleAuth = (e, role) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin(role);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hospital-50 p-6">
      <div className="max-w-md w-full animate-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-hospital-600 text-white rounded-3xl shadow-xl shadow-hospital-200 mb-6 transform hover:rotate-6 transition-transform">
            <Stethoscope size={48} />
          </div>
          <h1 className="text-4xl font-black text-hospital-950 tracking-tight">RenalAI</h1>
          <p className="text-hospital-600 font-medium">Precision AI Diagnostics</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-hospital-200/50 border border-white">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Doctor Login</h2>
          <p className="text-slate-500 text-sm mb-8">Access the secure diagnostic dashboard.</p>

          <form onSubmit={(e) => handleAuth(e, 'doctor')} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  defaultValue="dr.smith@hospital.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-hospital-100 transition-all text-slate-700"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  defaultValue="password"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-hospital-100 transition-all text-slate-700"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-hospital-600 hover:bg-hospital-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-hospital-200 transition-all flex items-center justify-center space-x-2 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? (
                <div className="h-6 w-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Doctor Dashboard</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-4 text-slate-400 font-bold tracking-widest">OR</span></div>
            </div>

            <button 
              type="button"
              onClick={(e) => handleAuth(e, 'patient')}
              className="w-full bg-white border-2 border-hospital-200 text-hospital-700 py-4 rounded-2xl font-bold text-lg hover:bg-hospital-50 transition-all flex items-center justify-center space-x-2"
            >
              <span>Patient Self-Portal</span>
              <Activity size={20} className="text-hospital-500" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-center space-x-2 text-slate-400">
            <ShieldCheck size={16} />
            <span className="text-[10px] uppercase font-bold tracking-widest">End-to-End Encrypted</span>
          </div>
        </div>

        <p className="text-center mt-10 text-slate-400 text-sm">
          Protected by RenalAI Bio-Security Protocol v2.0
        </p>
      </div>
    </div>
  );
};

export default Login;
