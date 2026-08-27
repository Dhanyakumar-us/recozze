import { useState, useEffect } from 'react';
import { BackgroundVibe } from './components/BackgroundVibe';
import { Navbar, type PageTab } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { TrustStrip } from './components/TrustStrip';
import { FilterWizard } from './components/FilterWizard';
import { LaptopGrid } from './components/LaptopGrid';
import { BentoGrid } from './components/BentoGrid';
import { WhyRecozee } from './components/WhyRecozee';
import { RecentlyViewed } from './components/RecentlyViewed';
import { DetailModal } from './components/DetailModal';
import { CompareMatrix, FloatingCompareBar } from './components/CompareMatrix';
import { MarketTrendsChart } from './components/MarketTrendsChart';
import { ApiStatusDashboard } from './components/ApiStatusDashboard';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { CommandPalette } from './components/CommandPalette';
import { Toast } from './components/Toast';

import type { Laptop, UserPreferences, MarketTrendsData, CurrencyRates } from './types/laptop';
import { fetchLaptops, fetchMarketTrends, compareLaptopsApi, fetchLaptopDetail, fetchCurrencyRates, trackEventApi, connectRealtimeWebSocket } from './services/api';
import { ShieldCheck, Zap, Sparkles, Scale, Bot, Laptop as LaptopIcon, TrendingUp, Home } from 'lucide-react';

export function App() {
  const [theme] = useState<'dark' | 'light'>('dark');
  const [activePage, setActivePage] = useState<PageTab>('home');

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  // Connect WebSocket for real-time recommendations pipeline stream
  useEffect(() => {
    const ws = connectRealtimeWebSocket();
    return () => {
      if (ws) ws.close();
    };
  }, []);

  const [preferences, setPreferences] = useState<UserPreferences>({
    workload: 'student',
    budgetMin: 40000,
    budgetMax: 350000,
    minRamGb: 8,
    minSsdGb: 512,
    tgpTier: 'all',
    batteryTargetHours: 4,
    unidaysActive: true,
    searchQuery: '',
    activeTab: 'recommendations',
    theme: 'dark',
    currency: 'INR',
  });

  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [marketTrends, setMarketTrends] = useState<MarketTrendsData | null>(null);
  const [currencyRates, setCurrencyRates] = useState<CurrencyRates | null>(null);

  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('reco_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareLaptops, setCompareLaptops] = useState<Laptop[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global Ctrl+K / Cmd+K key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchLaptops(preferences)
      .then((data) => {
        if (isMounted) {
          setLaptops(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch laptops:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [preferences]);

  useEffect(() => {
    fetchMarketTrends().then(setMarketTrends).catch(console.error);
    fetchCurrencyRates().then(setCurrencyRates).catch(console.error);
  }, []);

  const handlePreferenceChange = (updated: Partial<UserPreferences>) => {
    trackEventApi('filter_change', undefined, updated);
    setPreferences((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setPreferences({
      workload: 'student',
      budgetMin: 40000,
      budgetMax: 350000,
      minRamGb: 8,
      minSsdGb: 512,
      tgpTier: 'all',
      batteryTargetHours: 4,
      unidaysActive: true,
      searchQuery: '',
      activeTab: preferences.activeTab,
      theme: 'dark',
      currency: preferences.currency || 'INR',
    });
  };

  const handleTogglePin = (id: string) => {
    setPinnedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 3) {
          setToastMessage('You can pin a maximum of 3 laptops in the comparison matrix.');
          setTimeout(() => setToastMessage(null), 4000);
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('reco_favorites', JSON.stringify(next));
      return next;
    });
  };

  const handleOpenCompare = async () => {
    if (pinnedIds.length === 0) {
      setToastMessage('Pin at least 1 laptop using the (+) button to open the comparison matrix.');
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }
    const data = await compareLaptopsApi(pinnedIds, preferences.unidaysActive);
    setCompareLaptops(data);
    setIsCompareOpen(true);
  };

  const handleSelectLaptopDetail = async (laptop: Laptop) => {
    try {
      const savedRecent = localStorage.getItem('reco_recently_viewed');
      const recentIds: string[] = savedRecent ? JSON.parse(savedRecent) : [];
      const updatedRecent = [laptop.id, ...recentIds.filter((id) => id !== laptop.id)].slice(0, 6);
      localStorage.setItem('reco_recently_viewed', JSON.stringify(updatedRecent));

      const detailed = await fetchLaptopDetail(laptop.id, preferences.unidaysActive);
      setSelectedLaptop(detailed);
    } catch {
      setSelectedLaptop(laptop);
    }
  };

  return (
    <div className="relative min-h-screen font-sans selection:bg-blue-500 selection:text-white flex flex-col justify-between bg-[#050505] text-slate-100">
      
      {/* Deep Black Background Lighting & Engineering Grid Engine */}
      <BackgroundVibe theme={theme} />

      {/* Foreground UI */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <div>
          {/* Sticky Navbar Header */}
          <Navbar
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
            activePage={activePage}
            onPageChange={setActivePage}
            pinnedCount={pinnedIds.length}
            favoritesCount={favoriteIds.length}
            onOpenCompare={handleOpenCompare}
            onToggleChat={() => setIsChatOpen((prev) => !prev)}
            onOpenSearch={() => setIsSearchOpen(true)}
          />

          {/* Main Body Sections - Divided Page Views */}
          <main className="pb-28">
            {activePage === 'home' && (
              <div className="space-y-16 animate-fadeIn">
                <HeroBanner
                  preferences={preferences}
                  onPreferenceChange={handlePreferenceChange}
                  onOpenSpecMatcher={() => {
                    setActivePage('finder');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <TrustStrip />
                <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
                  <BentoGrid />
                </div>
                <WhyRecozee />
              </div>
            )}

            {activePage === 'finder' && (
              <div className="pt-24 max-w-7xl mx-auto px-4 lg:px-8 space-y-16 animate-fadeIn">
                {/* AI Finder Page Header */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>6-STEP INTUITIVE SPECIFICATION ENGINE</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                    AI Laptop Requirement Matcher
                  </h1>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                    Set your precise workload, gaming TGP wattage targets, RAM/SSD capacity, and budget to compute real-time match scores.
                  </p>
                </div>

                <FilterWizard
                  preferences={preferences}
                  onPreferenceChange={handlePreferenceChange}
                  onResetFilters={handleResetFilters}
                />

                <div className="pt-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                      <span>Matched Recommendations ({laptops.length} Devices)</span>
                    </h2>
                  </div>
                  <LaptopGrid
                    laptops={laptops}
                    loading={loading}
                    unidaysActive={preferences.unidaysActive}
                    currency={preferences.currency}
                    currencyRates={currencyRates?.rates}
                    pinnedIds={pinnedIds}
                    favoriteIds={favoriteIds}
                    onTogglePin={handleTogglePin}
                    onToggleFavorite={handleToggleFavorite}
                    onSelectLaptop={handleSelectLaptopDetail}
                  />
                </div>
              </div>
            )}

            {activePage === 'catalog' && (
              <div className="pt-24 max-w-7xl mx-auto px-4 lg:px-8 space-y-16 animate-fadeIn">
                {/* Catalog Header */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <LaptopIcon className="w-4 h-4" />
                    <span>HARDWARE SHOWROOM & DEVICE DATABASE</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                    Full Laptop Catalog
                  </h1>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                    Explore high-performance laptops across Lenovo Legion, ASUS ROG, Apple MacBook Pro, Acer Predator, and Dell XPS.
                  </p>
                </div>

                <LaptopGrid
                  laptops={laptops}
                  loading={loading}
                  unidaysActive={preferences.unidaysActive}
                  currency={preferences.currency}
                  currencyRates={currencyRates?.rates}
                  pinnedIds={pinnedIds}
                  favoriteIds={favoriteIds}
                  onTogglePin={handleTogglePin}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectLaptop={handleSelectLaptopDetail}
                />

                <RecentlyViewed
                  allLaptops={laptops}
                  unidaysActive={preferences.unidaysActive}
                  currency={preferences.currency}
                  currencyRates={currencyRates?.rates}
                  pinnedIds={pinnedIds}
                  favoriteIds={favoriteIds}
                  onTogglePin={handleTogglePin}
                  onToggleFavorite={handleToggleFavorite}
                  onSelectLaptop={handleSelectLaptopDetail}
                />
              </div>
            )}

            {activePage === 'trends' && (
              <div className="pt-24 max-w-7xl mx-auto px-4 lg:px-8 space-y-12 animate-fadeIn">
                {/* Market Trends Header */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <TrendingUp className="w-4 h-4" />
                    <span>HARDWARE MARKET RADAR & PRICE INDEX</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                    Component Pricing & Market Analytics
                  </h1>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed">
                    Real-time market analytics tracking RAM/SSD price index movements, TGP wattage pricing curves, and optimal buy windows.
                  </p>
                </div>

                <MarketTrendsChart data={marketTrends} />
              </div>
            )}

            {activePage === 'api-status' && (
              <div className="pt-24 px-4 lg:px-8">
                <ApiStatusDashboard />
              </div>
            )}
          </main>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-4 lg:px-8 text-xs text-slate-400 relative z-10 bg-[#050505]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="font-black text-white text-lg tracking-wider">RECOZEE</span>
              <span className="text-[11px] text-slate-500 font-mono">
                — AI Product Discovery & Hardware Recommendation Engine 2026
              </span>
            </div>

            <div className="flex items-center gap-6 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                <Zap className="w-3.5 h-3.5" />
                TGP 2.0 Engine
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                UNiDAYS Student Perks
              </span>
              <span>© 2026 RecoZee. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Bottom Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A] border-t border-white/10 p-2 flex items-center justify-around text-[10px] font-mono">
        <button
          onClick={() => {
            setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 ${activePage === 'home' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActivePage('finder');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 ${activePage === 'finder' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Finder</span>
        </button>

        <button
          onClick={() => {
            setActivePage('catalog');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 ${activePage === 'catalog' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          <LaptopIcon className="w-4 h-4" />
          <span>Catalog</span>
        </button>

        <button
          onClick={() => {
            setActivePage('trends');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 ${activePage === 'trends' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Trends</span>
        </button>

        <button
          onClick={handleOpenCompare}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-white relative"
        >
          <Scale className="w-4 h-4 text-purple-400" />
          <span>Compare</span>
          {pinnedIds.length > 0 && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[9px]">
              {pinnedIds.length}
            </span>
          )}
        </button>
      </div>

      {/* Floating Compare Dock */}
      <FloatingCompareBar
        pinnedCount={pinnedIds.length}
        onExpand={handleOpenCompare}
        onClear={() => setPinnedIds([])}
      />

      {/* Fullscreen Black Command Palette (Ctrl + K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        laptops={laptops}
        onSelectLaptop={handleSelectLaptopDetail}
        unidaysActive={preferences.unidaysActive}
      />

      {/* Toast Notification Alert */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Detail Modal */}
      {selectedLaptop && (
        <DetailModal
          laptop={selectedLaptop}
          unidaysActive={preferences.unidaysActive}
          currency={preferences.currency}
          currencyRates={currencyRates?.rates}
          onClose={() => setSelectedLaptop(null)}
          onTogglePin={handleTogglePin}
          onToggleFavorite={handleToggleFavorite}
          isPinned={pinnedIds.includes(selectedLaptop.id)}
          isFavorite={favoriteIds.includes(selectedLaptop.id)}
        />
      )}

      {/* Side-by-Side Comparison Matrix Overlay */}
      {isCompareOpen && (
        <CompareMatrix
          laptops={compareLaptops}
          unidaysActive={preferences.unidaysActive}
          onRemovePin={(id) => {
            handleTogglePin(id);
            setCompareLaptops((prev) => prev.filter((l) => l.id !== id));
          }}
          onClearAll={() => {
            setPinnedIds([]);
            setCompareLaptops([]);
            setIsCompareOpen(false);
          }}
          onClose={() => setIsCompareOpen(false)}
        />
      )}

      {/* Floating AI Hardware Advisor Chatbot Trigger */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-2xl shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-300 border border-blue-400/30 backdrop-blur-md group cursor-pointer"
          title="Open AI Hardware & Discount Advisor Chatbot"
        >
          <div className="relative flex items-center">
            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <span className="font-semibold tracking-wide">AI Hardware Advisor</span>
          <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
        </button>
      )}

      {/* AI Hardware Advisor Drawer */}
      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        unidaysActive={preferences.unidaysActive}
      />
    </div>
  );
}

export default App;
