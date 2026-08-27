import React, { useState, useEffect } from 'react';
import { Search, Bot, Sparkles, GraduationCap, Sun, Moon } from 'lucide-react';
import type { UserPreferences } from '../types/laptop';

export type PageTab = 'home' | 'catalog' | 'compare' | 'match' | 'power';

interface NavbarProps {
  preferences: UserPreferences;
  onPreferenceChange: (updated: Partial<UserPreferences>) => void;
  activeTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  pinnedCount: number;
  onOpenCompare: () => void;
  onOpenSearch: () => void;
  onOpenChat: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  preferences,
  onPreferenceChange,
  activeTab,
  onSelectTab,
  pinnedCount,
  onOpenCompare,
  onOpenSearch,
  onOpenChat,
  theme,
  onToggleTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'navbar-glass py-3.5 shadow-sm' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center space-x-2 text-left group focus:outline-none"
        >
          <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white font-display">
            RECO<span className="text-blue-600 dark:text-blue-400">.</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-semibold tracking-widest text-slate-400 dark:text-slate-500 uppercase border-l border-slate-200 dark:border-slate-800 pl-2.5 ml-1">
            SHOWROOM
          </span>
        </button>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 sm:space-x-2 bg-slate-100/60 dark:bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/50">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              activeTab === 'home'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Discover
          </button>
          <button
            onClick={() => onSelectTab('catalog')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
              activeTab === 'catalog'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Laptops
          </button>
          <button
            onClick={() => {
              if (pinnedCount > 0) {
                onOpenCompare();
              } else {
                onSelectTab('compare');
              }
            }}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center space-x-1.5 ${
              activeTab === 'compare'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>Compare</span>
            {pinnedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                {pinnedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onSelectTab('power')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center space-x-1.5 ${
              activeTab === 'power'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-cyan-400'
            }`}
          >
            <Sparkles className="w-3 h-3 text-cyan-400 fill-cyan-400" />
            <span>Power Dashboard</span>
          </button>
          <button
            onClick={() => onSelectTab('match')}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center space-x-1 ${
              activeTab === 'match'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            <span>Find Your Match</span>
          </button>
        </nav>

        {/* Right: Actions (Search, AI, Theme, UNiDAYS) */}
        <div className="flex items-center space-x-2.5">
          <button
            onClick={() =>
              onPreferenceChange({ unidaysActive: !preferences.unidaysActive })
            }
            title="UNiDAYS Student Savings Mode"
            className={`hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              preferences.unidaysActive
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>UNiDAYS {preferences.unidaysActive ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200/60 dark:border-slate-700/60 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline font-medium">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-mono text-slate-400 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={onOpenChat}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xs cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600" />
            <span className="hidden sm:inline">Ask AI</span>
          </button>

          <button
            onClick={onToggleTheme}
            title="Toggle theme"
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
