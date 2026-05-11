import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Trash2, ExternalLink, Clock, Calendar } from "lucide-react";
import { ViewType } from "../types";

interface HistoryProps {
  onNavigate: (view: ViewType) => void;
}

export default function History({ onNavigate }: HistoryProps) {
  const [links, setLinks] = useState<{url: string, time: number}[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("recently_viewed_detailed");
    if (saved) {
      setLinks(JSON.parse(saved));
    } else {
      // Compatibility with the simple list from Home
      const simple = localStorage.getItem("recently_viewed");
      if (simple) {
        constconst parsed: string[] = JSON.parse(simple);
        const detailed = parsed.map(url => ({ url, time: Date.now() }));
        setLinks(detailed);
        localStorage.setItem("recently_viewed_detailed", JSON.stringify(detailed));
      }
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("recently_viewed");
    localStorage.removeItem("recently_viewed_detailed");
    setLinks([]);
  };
const
  return (
    <div className="min-h-screen bg-black text-text-whitetext-text-whitewhitetext-text-whitetext-text-whitewhitewhitewhite p-6">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate("home")}
            className="p-2 hover:bg-white/10 rounded-xl transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Viewing History</h1>
        </div>
        
        {links.length > 0 && (
          <button 
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-sm font-bold transition-all border border-red-500/20"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        )}
      </header>

      <div className="max-w-2xl mx-auto space-y-4">
        {links.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/20">
            <Clock className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-lg font-medium">No history yet</p>
            <p className="text-sm">Links you visit will appear here</p>
          </div>
        ) : (
          links.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={idx}
              className="glass-morphism p-5 rounded-2xl flex items-center justify-between group hover:border-blue-500/30 transition-all border-white/5"
            >
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="font-bold text-white/90 truncate mb-1">World Informat Studio Portal</h3>
                <p className="text-blue-400 text-xs truncate mb-2">{item.url}</p>
                <div className="flex items-center gap-3 text-[10px] text-white/30 uppercase tracking-widest font-bold">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(item.time).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(item.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </div>
              <button 
                onClick={() => window.open(item.url, '_blank')}
                className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-blue-500 text-white flex items-center justify-center transition-all shadow-lg"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
