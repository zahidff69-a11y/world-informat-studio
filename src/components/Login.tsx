import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, LogIn, Chrome, Facebook, ArrowLeft, Loader2 } from "lucide-react";
import { ViewType } from "../types";

interface LoginProps {
  onNavigate: (view: ViewType) => void;
  onLogin: (email: string, pass: string) => Promise<void>;
  onSocialLogin: (provider: "google" | "facebook") => Promise<void>;
}

export default function Login({ onNavigate, onLogin, onSocialLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-black via-zinc-950 to-blue-950/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-morphism rounded-3xl p-8 space-y-8 relative overflow-hidden"
      >
        {/* Design Accents */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full" />

        <div className="text-center relative">
          <button 
            onClick={() => onNavigate("home")}
            className="absolute left-0 top-0 p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h2>
          <p className="text-white/50 text-sm italic">Access your World Informat portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Email / Phone</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Login <LogIn className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="relative flex items-center gap-4 text-white/20 text-[10px] uppercase tracking-widest font-bold">
          <div className="flex-1 h-[1px] bg-white/10" />
          OR CONTINUE WITH
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onSocialLogin("google")}
            className="flex items-center justify-center gap-2 p-4 glass-morphism rounded-2xl hover:bg-white/10 transition-all active:scale-95 border-white/5"
          >
            <Chrome className="w-5 h-5 text-red-500" />
            <span className="text-xs font-bold">Google</span>
          </button>
          <button 
            onClick={() => onSocialLogin("facebook")}
            className="flex items-center justify-center gap-2 p-4 glass-morphism rounded-2xl hover:bg-white/10 transition-all active:scale-95 border-white/5"
          >
            <Facebook className="w-5 h-5 text-blue-500 fill-blue-500" />
            <span className="text-xs font-bold">Facebook</span>
          </button>
        </div>

        <div className="text-center pt-4">
          <p className="text-sm text-white/40">
            New here?{" "}
            <button 
              onClick={() => onNavigate("signup")}
              className="text-blue-400 font-bold hover:underline"
            >
              Switch to Sign-Up
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
