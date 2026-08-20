import { useState, useEffect } from 'react';
import { BackgroundVibe } from './components/BackgroundVibe';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterWizard } from './components/FilterWizard';
import { LaptopGrid } from './components/LaptopGrid';
import { DetailModal } from './components/DetailModal';
import { CompareMatrix, FloatingCompareBar } from './components/CompareMatrix';
import { MarketTrendsChart } from './components/MarketTrendsChart';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { Toast } from './components/Toast';

import type { Laptop, UserPreferences, MarketTrendsData } from './types/laptop';
import { fetchLaptops, fetchMarketTrends, compareLaptopsApi, fetchLaptopDetail } from './services/api';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

export function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('reco_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('reco_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

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
    theme
  });

  useEffect(() => {
    setPreferences(prev => ({ ...prev, theme }));
  }, [theme]);

  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [marketTrends, setMarketTrends] = useState<MarketTrendsData | null>(null);

  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [compareLaptops, setCompareLaptops] = useState<Laptop[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchLaptops(preferences)
      .then(data => {
        if (isMounted) {
          setLaptops(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Failed to fetch laptops:', err);
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [preferences]);

  useEffect(() => {
    fetchMarketTrends().then(setMarketTrends).catch(console.error);
  }, []);

  const handlePreferenceChange = (updated: Partial<UserPreferences>) => {
    if (updated.theme && updated.theme !== theme) {
      setTheme(updated.theme);
    }
    setPreferences(prev => ({ ...prev, ...updated }));
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
      theme
    });
  };

  const handleTogglePin = (id: string) => {
    setPinnedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
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

  const handleOpenCompare = async () => {
    if (pinnedIds.length === 0) {
      setToastMessage('Pin at least 1 laptop using the (+) button to open the side-by-side matrix.');
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }
    const data = await compareLaptopsApi(pinnedIds, preferences.unidaysActive);
    setCompareLaptops(data);
    setIsCompareOpen(true);
  };

  const handleSelectLaptopDetail = async (laptop: Laptop) => {
    try {
      const detailed = await fetchLaptopDetail(laptop.id, preferences.unidaysActive);
      setSelectedLaptop(detailed);
    } catch (err) {
      setSelectedLaptop(laptop);
    }
  };

  return (
    <div className={`relative min-h-screen font-sans selection:bg-cyan-500 selection:text-white flex flex-col justify-between transition-colors duration-500 ${
      theme === 'dark' ? 'bg-[#0B0F19] text-slate-100' : 'bg-[#F4F6F8] text-slate-900'
    }`}>
      
      {/* Background Video & Lighting Engine */}
      <BackgroundVibe theme={theme} />

      {/* Foreground UI */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <div>
          {/* Sticky Navbar Header */}
          <Navbar
            preferences={preferences}
            onPreferenceChange={handlePreferenceChange}
            pinnedCount={pinnedIds.length}
            onOpenCompare={handleOpenCompare}
            onToggleChat={() => setIsChatOpen(prev => !prev)}
          />

          {/* Main Body */}
          <main className="space-y-10 pb-24">
            
            {/* Hero Header */}
            <HeroBanner
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
              onOpenSpecMatcher={() => handlePreferenceChange({ activeTab: 'matcher' })}
            />

            <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
              
              {/* Tab 1: Spec Matcher */}
              {(preferences.activeTab === 'matcher' || preferences.activeTab === 'recommendations') && (
                <FilterWizard
                  preferences={preferences}
                  onPreferenceChange={handlePreferenceChange}
                  onResetFilters={handleResetFilters}
                />
              )}

              {/* Tab 2: Recommendations / Laptop Grid */}
              {(preferences.activeTab === 'recommendations' || preferences.activeTab === 'matcher') && (
                <LaptopGrid
                  laptops={laptops}
                  loading={loading}
                  unidaysActive={preferences.unidaysActive}
                  pinnedIds={pinnedIds}
                  onTogglePin={handleTogglePin}
                  onSelectLaptop={handleSelectLaptopDetail}
                />
              )}

              {/* Tab 3: Market Index & Price Forecast Radar */}
              {(preferences.activeTab === 'market' || preferences.activeTab === 'recommendations') && (
                <MarketTrendsChart data={marketTrends} />
              )}
            </div>
          </main>
        </div>

        {/* Footer */}
        <footer className="glass-panel border-t border-slate-200/80 dark:border-slate-800 py-8 px-4 lg:px-8 text-xs text-slate-500 dark:text-slate-400 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span className="font-extrabold text-slate-950 dark:text-white">RECO Platform</span>
              <span>— Intelligent Laptop Recommendation, GPU TGP & Price Forecast Engine</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-bold">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                TGP 2.0 Engine
              </span>
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                UNiDAYS Student Cashback Hub
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Compare Bar */}
      <FloatingCompareBar
        pinnedCount={pinnedIds.length}
        onExpand={handleOpenCompare}
        onClear={() => setPinnedIds([])}
      />

      {/* Toast Notification Alert */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Detail Modal */}
      {selectedLaptop && (
        <DetailModal
          laptop={selectedLaptop}
          unidaysActive={preferences.unidaysActive}
          onClose={() => setSelectedLaptop(null)}
          onTogglePin={handleTogglePin}
          isPinned={pinnedIds.includes(selectedLaptop.id)}
        />
      )}

      {/* Side-by-Side Comparison Matrix Overlay */}
      {isCompareOpen && (
        <CompareMatrix
          laptops={compareLaptops}
          unidaysActive={preferences.unidaysActive}
          onRemovePin={(id) => {
            handleTogglePin(id);
            setCompareLaptops(prev => prev.filter(l => l.id !== id));
          }}
          onClearAll={() => {
            setPinnedIds([]);
            setCompareLaptops([]);
            setIsCompareOpen(false);
          }}
          onClose={() => setIsCompareOpen(false)}
        />
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
