import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, X, ArrowRight, Laptop as LaptopIcon, MessageSquare } from 'lucide-react';
import type { Laptop } from '../types/laptop';
import { chatAdvisorApi } from '../services/api';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  laptops: Laptop[];
  onSelectLaptop: (laptop: Laptop) => void;
  unidaysActive: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  laptops,
  onSelectLaptop,
  unidaysActive,
}) => {
  const [query, setQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const samplePrompts = [
    'Best laptop for coding',
    'Best laptop under ₹60K',
    'Gaming laptop under ₹80,000',
    'RTX 4060 laptops',
    'Best laptop for students',
    'Compare ASUS vs Lenovo',
  ];

  const filteredLaptops = query.trim()
    ? laptops.filter((l) => {
        const q = query.toLowerCase();
        const text = `${l.name} ${l.brand} ${l.specs.cpu} ${l.specs.gpu} ${l.category}`.toLowerCase();
        return text.includes(q);
      })
    : laptops.slice(0, 4);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setAiAnswer(null);
    }
  }, [isOpen]);

  const handleAskAi = async (promptQuery: string) => {
    setQuery(promptQuery);
    setLoadingAi(true);
    try {
      const res = await chatAdvisorApi(promptQuery, unidaysActive);
      setAiAnswer(res.response);
    } catch (err) {
      console.warn(err);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredLaptops.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredLaptops.length) % (filteredLaptops.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredLaptops[selectedIndex]) {
        onSelectLaptop(filteredLaptops[selectedIndex]);
        onClose();
      } else if (query.trim()) {
        handleAskAi(query);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-3xl bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-white"
          >
            {/* Header Title & Search Input */}
            <div className="p-6 border-b border-white/10 space-y-4 bg-[#050505]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
                  RECOZEE OS COMMAND CENTER
                </span>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white bg-[#101010] border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-2xl font-black text-white tracking-tight">
                WHAT ARE YOU LOOKING FOR?
              </h2>

              <div className="flex items-center gap-3 px-4 py-3 bg-[#101010] border border-white/10 rounded-2xl">
                <Search className="w-5 h-5 text-blue-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setAiAnswer(null);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="⌕ Search laptops, specs, or ask anything..."
                  className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Prompt Suggestions */}
            <div className="p-4 border-b border-white/5 bg-[#050505]/50">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block mb-2">
                SUGGESTED COMMANDS
              </span>
              <div className="flex flex-wrap gap-2">
                {samplePrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => handleAskAi(p)}
                    className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#101010] text-slate-300 hover:text-white hover:border-blue-500/40 border border-white/10 transition-all cursor-pointer"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              {loadingAi && (
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono flex items-center gap-3 animate-pulse">
                  <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
                  <span>RecoZee Hardware AI is processing query...</span>
                </div>
              )}

              {aiAnswer && (
                <div className="p-5 rounded-2xl bg-[#050505] border border-blue-500/30 text-xs text-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold font-mono">
                    <MessageSquare className="w-4 h-4" />
                    <span>RECOZEE HARDWARE ADVISOR</span>
                  </div>
                  <p className="leading-relaxed font-mono">{aiAnswer}</p>
                </div>
              )}

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-3">
                  {query ? 'MATCHING DEVICES' : 'FEATURED LAPTOPS'}
                </span>

                <div className="space-y-2">
                  {filteredLaptops.map((laptop, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={laptop.id}
                        onClick={() => {
                          onSelectLaptop(laptop);
                          onClose();
                        }}
                        className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all border ${
                          isSelected
                            ? 'bg-blue-600/10 border-blue-500 text-white'
                            : 'bg-[#101010] border-white/5 hover:border-white/20 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#050505] border border-white/10 flex items-center justify-center shrink-0">
                            <LaptopIcon className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white line-clamp-1">{laptop.name}</h4>
                            <p className="text-[11px] font-mono text-slate-400">
                              {laptop.specs.cpu} • {laptop.specs.gpu} • ₹{laptop.currentBestPriceInr.toLocaleString('en-IN')}
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer Navigation Info */}
            <div className="px-6 py-3 border-t border-white/10 bg-[#050505] flex items-center justify-between text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span>RecoZee OS v2.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
