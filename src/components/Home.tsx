import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, History, LogOut, User, Home as HomeIcon, ChevronRight } from "lucide-react";
import { ViewType } from "../types";

interface HomeProps {
  onNavigate: (view: ViewType) => void;
  user: any; // Will be properly typed with Firebase
}

export default function Home({ onNavigate, user }: HomeProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recentLinks, setRecentLinks] = useState<string[]>([]);

  // Default blog URL - can be customized
  const blogUrl = "https://www.worldinformat.com"; 

  useEffect(() => {
    const saved = localStorage.getItem("recently_viewed");
    if (saved) setRecentLinks(JSON.parse(saved));
  }, []);

  const saveToHistory = (url: string) => {
    const updated = [url, ...recentLinks.filter(l => l !== url)].slice(0, 20);
    setRecentLinks(updated);
    localStorage.setItem("recently_viewed", JSON.stringify(updated));
  };

  return (
    <div className="relative w-full h-full flex overflow-hidden">
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 bottom-0 w-[280px] glass-morphism z-[101] p-6 flex flex-col"
      >
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <HomeIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-wider text-sm">MENU</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem 
            icon={<HomeIcon className="w-5 h-5" />} 
            label="Home" 
            active 
            onClick={() => { setIsSidebarOpen(false); onNavigate("home"); }} 
          />
          <SidebarItem 
            icon={<History className="w-5 h-5" />} 
            label="History" 
            onClick={() => { setIsSidebarOpen(false); onNavigate("history"); }} 
          />
          {user ? (
            <SidebarItem 
              icon={<User className="w-5 h-5" />} 
              label="Profile" 
              onClick={() => setIsSidebarOpen(false)} 
            />
          ) : (
            <SidebarItem 
              icon={<LogOut className="w-5 h-5" />} 
              label="Login / Sign Up" 
              onClick={() => { setIsSidebarOpen(false); onNavigate("login"); }} 
            />
          )}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 text-xs text-white/40 text-center">
          © 2026 World Informat Studio
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <header className="h-16 flex items-center px-4 glass-morphism border-b-0 shrink-0 z-50">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-white/10 rounded-xl transition-all active:scale-90"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex-1 text-center">
            <span className="text-sm font-bold tracking-[0.3em] ml-[-40px]">WORLD INFORMAT</span>
          </div>

          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <User className="w-5 h-5 text-white/50" />
          </div>
        </header>

        {/* Iframe Section */}
        <main className="flex-1 relative bg-neutral-900 overflow-hidden">
          <iframe 
            src={blogUrl}
            className="w-full h-full border-none"
            title="World Informat Blog"
            onLoad={() => saveToHistory(blogUrl)}
          />
          
          {/* Touch Overlay hint for Xiaomi Optimization */}
          <div className="absolute top-4 right-4 pointer-events-none">
            <div className="glass-morphism px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider opacity-50 border-white/5">
              Redmi 15C Optimized
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
        active ? "bg-blue-500/20 text-blue-400 border border-blue-500/20" : "hover:bg-white/5 text-white/70"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <ChevronRight className={`w-4 h-4 opacity-30 ${active ? "opacity-100" : ""}`} />
    </button>
  );
}
