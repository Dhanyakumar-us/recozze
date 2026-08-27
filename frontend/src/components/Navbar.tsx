import React, { useState, useEffect } from 'react';
import { Search, Heart, Scale, GraduationCap, Menu, X, ShieldCheck, CheckCircle2, Loader2, Bot, Sparkles, Home, Laptop, TrendingUp, Activity } from 'lucide-react';
import type { UserPreferences, StudentVerifyResult } from '../types/laptop';
import { verifyStudentApi } from '../services/api';

export type PageTab = 'home' | 'finder' | 'catalog' | 'trends' | 'api-status';

interface NavbarProps {
  preferences: UserPreferences;
  onPreferenceChange: (updated: Partial<UserPreferences>) => void;
  activePage: PageTab;
  onPageChange: (page: PageTab) => void;
  pinnedCount: number;
  favoritesCount?: number;
  onOpenCompare: () => void;
  onOpenCommandPalette?: () => void;
  onOpenSearch?: () => void;
  onOpenFavorites?: () => void;
  onToggleChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  preferences,
  onPreferenceChange,
  activePage,
  onPageChange,
  pinnedCount,
  favoritesCount = 0,
  onOpenCompare,
  onOpenCommandPalette,
  onOpenSearch,
  onOpenFavorites,
  onToggleChat,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [studentEmail, setStudentEmail] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<StudentVerifyResult | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTriggerSearch = () => {
    if (onOpenSearch) onOpenSearch();
    else if (onOpenCommandPalette) onOpenCommandPalette();
  };

  const handleStudentVerify = async () => {
    if (!studentEmail.trim() || verifying) return;
    setVerifying(true);
    try {
      const res = await verifyStudentApi(studentEmail);
      setVerifyResult(res);
      if (res.verified) {
        onPreferenceChange({ unidaysActive: true });
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setVerifying(false);
    }
  };

  const navLinks: { id: PageTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'finder', label: 'AI Finder', icon: Sparkles },
    { id: 'catalog', label: 'Catalog', icon: Laptop },
    { id: 'trends', label: 'Market Trends', icon: TrendingUp },
    { id: 'api-status', label: 'API Health', icon: Activity },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full px-4 lg:px-8 py-4 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo Treatment */}
          <div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => {
              onPageChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="relative flex items-center justify-center">
              <span className="font-black text-xl tracking-wider text-white group-hover:text-blue-400 transition-colors">
                RECOZEE
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-500 ml-2 animate-pulse shadow-[0_0_8px_#3B82F6]" />
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#101010]/80 p-1.5 rounded-full border border-white/10">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onPageChange(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={handleTriggerSearch}
              className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#101010] border border-white/10 text-xs text-slate-400 hover:text-white hover:border-blue-500/50 transition-all duration-200 cursor-pointer group"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              <span>Search anything...</span>
              <kbd className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-900 text-slate-400 border border-slate-800">
                Ctrl K
              </kbd>
            </button>

            {/* UNiDAYS Student Badge */}
            <button
              onClick={() => onPreferenceChange({ unidaysActive: !preferences.unidaysActive })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                preferences.unidaysActive
                  ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                  : 'bg-[#101010] border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Toggle Student Pricing"
            >
              <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden xl:inline">Student</span>
            </button>

            {/* Favorites */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-full bg-[#101010] border border-white/10 text-slate-300 hover:text-rose-400 hover:border-rose-500/40 transition-all cursor-pointer"
              title="Saved Favorites"
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* AI Hardware Advisor Chatbot Trigger */}
            {onToggleChat && (
              <button
                onClick={onToggleChat}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/40 text-blue-300 hover:text-white hover:border-blue-400 transition-all cursor-pointer shadow-md shadow-blue-900/20"
                title="AI Hardware & Discount Advisor Chatbot"
              >
                <Bot className="w-3.5 h-3.5 text-blue-400" />
                <span>AI Chat</span>
                <Sparkles className="w-3 h-3 text-cyan-400" />
              </button>
            )}

            {/* Compare Badge Trigger */}
            <button
              onClick={onOpenCompare}
              className="relative flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compare</span>
              {pinnedCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-white text-blue-600 font-mono">
                  {pinnedCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={handleTriggerSearch}
              className="p-2 rounded-full bg-[#101010] border border-white/10 text-slate-300"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-[#101010] border border-white/10 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 bg-[#0A0A0A] rounded-2xl p-4 space-y-2">
            {onToggleChat && (
              <button
                onClick={() => {
                  onToggleChat();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20"
              >
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  <span>AI Hardware Advisor Chatbot</span>
                </div>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </button>
            )}
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onPageChange(link.id);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Student Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Student Verification Hub</h3>
                  <p className="text-xs text-slate-400">Academic Email Auth</p>
                </div>
              </div>
              <button
                onClick={() => setShowVerifyModal(false)}
                className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your college email ending in <span className="font-mono text-blue-400 font-bold">.edu</span> or <span className="font-mono text-blue-400 font-bold">.ac.in</span> to verify student discounts.
            </p>

            <div className="space-y-3">
              <input
                type="email"
                placeholder="e.g. alex@stanford.edu or student@iitb.ac.in"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStudentVerify()}
                className="w-full px-4 py-3 bg-[#101010] border border-white/10 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />

              <button
                onClick={handleStudentVerify}
                disabled={verifying || !studentEmail.trim()}
                className="w-full py-3 rounded-2xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {verifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify Student Status</span>
                  </>
                )}
              </button>
            </div>

            {verifyResult && (
              <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
                verifyResult.verified
                  ? 'bg-blue-950/40 border-blue-500/40 text-blue-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}>
                <div className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{verifyResult.verified ? 'Student Status Verified!' : 'Verification Pending'}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
