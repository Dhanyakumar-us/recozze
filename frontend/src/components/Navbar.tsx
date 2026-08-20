import React, { useState, useEffect } from 'react';
import { Cpu, Search, GraduationCap, Scale, Zap, SlidersHorizontal, TrendingDown, LayoutGrid, Sun, Moon } from 'lucide-react';
import type { UserPreferences } from '../types/laptop';

interface NavbarProps {
  preferences: UserPreferences;
  onPreferenceChange: (updated: Partial<UserPreferences>) => void;
  pinnedCount: number;
  onOpenCompare: () => void;
  onToggleChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  preferences,
  onPreferenceChange,
  pinnedCount,
  onOpenCompare,
  onToggleChat
}) => {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (pinnedCount > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 600);
      return () => clearTimeout(timer);
    }
  }, [pinnedCount]);

  const tabs = [
    { id: 'recommendations', label: 'Recommendations', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'matcher', label: 'Spec Matcher', icon: <SlidersHorizontal className="w-4 h-4" /> },
    { id: 'market', label: 'Market Index', icon: <TrendingDown className="w-4 h-4" /> },
    { id: 'compare', label: 'Compare Matrix', icon: <Scale className="w-4 h-4" /> }
  ];

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800 px-4 lg:px-8 py-3 transition-colors duration-300 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Sliding Pill Navigation Bar */}
        <div className="flex items-center justify-between w-full md:w-auto gap-6">
          {/* Animated Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              onPreferenceChange({ activeTab: 'recommendations' });
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative p-2.5 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 group-hover:border-cyan-500 transition-all duration-300">
              <Cpu className="w-6 h-6 text-cyan-600 dark:text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              <Zap className="w-3.5 h-3.5 text-amber-500 absolute -top-1 -right-1 animate-pulse fill-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-slate-950 dark:text-white">
                  RECO
                </span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-sm">
                  TGP 2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">Intelligent Laptop & Price Forecast Engine</p>
            </div>
          </div>

          {/* Sliding Segmented Tab Indicator Pill Bar */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-200/80 dark:bg-slate-900 p-1.5 rounded-full border border-slate-300/80 dark:border-slate-800 shadow-inner relative">
            {tabs.map((t) => {
              const active = preferences.activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    if (t.id === 'compare') {
                      onOpenCompare();
                    } else {
                      onPreferenceChange({ activeTab: t.id as any });
                    }
                  }}
                  className={`relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    active
                      ? 'text-white dark:text-slate-950 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                  {t.id === 'compare' && pinnedCount > 0 && (
                    <span
                      className={`ml-1 px-2 py-0.2 rounded-full text-[10px] font-bold ${
                        active
                          ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950'
                          : 'bg-cyan-600 dark:bg-cyan-400 text-white dark:text-slate-950'
                      } ${bounce ? 'animate-bounce' : ''}`}
                    >
                      {pinnedCount}
                    </span>
                  )}
                  {/* Sliding Pill Indicator */}
                  {active && (
                    <span className="absolute inset-0 bg-cyan-600 dark:bg-cyan-400 rounded-full z-[-1] shadow-sm animate-slide-up" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-sm hidden xl:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search RTX 4070, Legion, 140W TGP..."
              value={preferences.searchQuery}
              onChange={(e) => onPreferenceChange({ searchQuery: e.target.value })}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 rounded-full text-slate-950 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-sans"
            />
          </div>
        </div>

        {/* Action Controls & UNiDAYS Switcher */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          
          {/* Sun / Moon Theme Toggle */}
          <button
            onClick={() =>
              onPreferenceChange({
                theme: preferences.theme === 'dark' ? 'light' : 'dark'
              })
            }
            className="p-2.5 rounded-full bg-slate-200/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-cyan-500 transition-all active:scale-95 shadow-sm"
            title={`Switch to ${preferences.theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {preferences.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600" />
            )}
          </button>

          {/* Global UNiDAYS Student Mode Toggle */}
          <button
            onClick={() => onPreferenceChange({ unidaysActive: !preferences.unidaysActive })}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold border transition-all active:scale-95 ${
              preferences.unidaysActive
                ? 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 shadow-sm'
                : 'bg-slate-200/80 dark:bg-slate-900 border-slate-300/80 dark:border-slate-800 text-slate-500 dark:text-slate-400'
            }`}
            title="Toggle Verified UNiDAYS Student Pricing & Perks App-Wide"
          >
            <GraduationCap className={`w-4 h-4 ${preferences.unidaysActive ? 'text-emerald-600 dark:text-emerald-400 animate-bounce' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">UNiDAYS Student</span>
            <span
              className={`w-8 h-4 rounded-full p-0.5 transition-colors relative ${
                preferences.unidaysActive ? 'bg-emerald-500' : 'bg-slate-400 dark:bg-slate-700'
              }`}
            >
              <span
                className={`block w-3 h-3 rounded-full bg-white transition-transform ${
                  preferences.unidaysActive ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </span>
          </button>

          {/* Pinned Compare Counter Badge */}
          <button
            onClick={onOpenCompare}
            className="relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-slate-200/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 text-slate-950 dark:text-slate-100 hover:border-cyan-500 transition-all active:scale-95 shadow-sm"
          >
            <Scale className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">Compare</span>
            {pinnedCount > 0 && (
              <span
                className={`flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold bg-cyan-600 dark:bg-cyan-400 text-white dark:text-slate-950 ${
                  bounce ? 'animate-bounce' : ''
                }`}
              >
                {pinnedCount}
              </span>
            )}
          </button>

          {/* AI Advisor Trigger */}
          <button
            onClick={onToggleChat}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 hover:bg-cyan-700 dark:hover:bg-cyan-400 transition-all active:scale-95 shadow-sm"
          >
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span className="hidden sm:inline">AI Advisor</span>
          </button>

        </div>
      </div>
    </nav>
  );
};
