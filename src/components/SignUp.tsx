import React, { useState } from "react";
import { motion } from "motion/react";
import { User, Phone, Calendar, Users, FileText, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { ViewType, UserProfile } from "../types";

interface SignUpProps {
  onNavigate: (view: ViewType) => void;
  onSignUp: (profile: Omit<UserProfile, "createdAt" | "email">, email: string, pass: string) => Promise<void>;
}

export default function SignUp({ onNavigate, onSignUp }: SignUpProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [form, setForm] = useState<Omit<UserProfile, "createdAt" | "email">>({
    fullName: "",
    mobile: "",
    birthday: "",
    gender: "male",
    bio: ""
  });

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSignUp(form, email, password);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg glass-morphism rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden"
      >
        {/* Stepper info */}
        <div className="flex justify-between items-center mb-10">
          <button onClick={() => onNavigate("login")} className="p-2 -ml-2 text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 1 ? "w-8 bg-blue-500" : "w-1.5 bg-white/20"}`} />
            <div className={`h-1.5 rounded-full transition-all duration-500 ${step === 2 ? "w-8 bg-blue-500" : "w-1.5 bg-white/20"}`} />
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Create Profile</h2>
          <p className="text-white/40 text-sm mt-1">Join the World Informat community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {step === 1 ? (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup
                  label="Full Name"
                  icon={<User className="w-5 h-5" />}
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={(val) => setForm({ ...form, fullName: val })}
                />
                <InputGroup
                  label="Mobile Number"
                  icon={<Phone className="w-5 h-5" />}
                  placeholder="+880 1XXX-XXXXXX"
                  type="tel"
                  value={form.mobile}
                  onChange={(val) => setForm({ ...form, mobile: val })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup
                  label="Email Address"
                  icon={<FileText className="w-5 h-5" />}
                  placeholder="name@email.com"
                  type="email"
                  value={email}
                  onChange={setEmail}
                />
                <InputGroup
                  label="Password"
                  icon={<Users className="w-5 h-5" />}
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={setPassword}
                />
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
              >
                Next Step <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Birthday</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="date"
                      required
                      value={form.birthday}
                      onChange={(e) => setForm({ ...form, birthday: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none invert-[1] hue-rotate-[180deg]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Gender</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <select
                      value={form.gender}
                      onChange={(e) => setForm({ ...form, gender: e.target.value as any })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">Bio / About Me</label>
                  <span className="text-[10px] text-white/20 italic">(Optional/Skippable)</span>
                </div>
                <div className="relative">
                  <textarea
                    placeholder="Tell us about yourself..."
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-h-[100px] resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Studio Profile"}
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}

function InputGroup({ label, icon, placeholder, type = "text", value, onChange }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
          {icon}
        </div>
        <input
          type={type}
          required={type !== "password"} // Make password optional if it's already set or social? Actually always required for this flow
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
        />
      </div>
    </div>
  );
}
