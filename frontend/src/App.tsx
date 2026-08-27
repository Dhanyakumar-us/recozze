import { useState, useEffect } from 'react';
import { Navbar, type PageTab } from './components/Navbar';
import { ShowcaseHero } from './components/ShowcaseHero';
import { StorySection } from './components/StorySection';
import { SpecShowcase } from './components/SpecShowcase';
import { CategoryExperience } from './components/CategoryExperience';
import { FeaturedShowcase } from './components/FeaturedShowcase';
import { RecommendationWizard } from './components/RecommendationWizard';
import { LaptopGrid } from './components/LaptopGrid';
import { DetailModal } from './components/DetailModal';
import { CompareMatrix, FloatingCompareBar } from './components/CompareMatrix';
import { MarketTrendsChart } from './components/MarketTrendsChart';
import { ChatbotDrawer } from './components/ChatbotDrawer';
import { CommandPalette } from './components/CommandPalette';
import { Toast } from './components/Toast';
import { PowerDashboard } from './components/powerDashboard/PowerDashboard';

import type { Laptop, UserPreferences, MarketTrendsData } from './types/laptop';
import { fetchLaptops, fetchMarketTrends, compareLaptopsApi, connectRealtimeWebSocket } from './services/api';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [powerLaptop, setPowerLaptop] = useState<Laptop | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

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
    theme: 'light',
    currency: 'INR',
  });

  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [marketTrends, setMarketTrends] = useState<MarketTrendsData | null>(null);

  const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null);
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);
  const [compareLaptops, setCompareLaptops] = useState<Laptop[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Global Ctrl+K key listener
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
  }, []);

  const handlePreferenceChange = (updated: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updated }));
  };

  const handleTogglePin = (id: string) => {
    setPinnedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= 3) {
          setToastMessage('Maximum 3 laptops allowed in comparison matrix.');
          setTimeout(() => setToastMessage(null), 4000);
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  // Sync compareLaptops from pinnedIds
  useEffect(() => {
    if (pinnedIds.length > 0) {
      compareLaptopsApi(pinnedIds, preferences.unidaysActive).then(setCompareLaptops).catch(console.error);
    } else {
      setCompareLaptops([]);
    }
  }, [pinnedIds, preferences.unidaysActive]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-ambient-light selection:bg-blue-600 selection:text-white">
      {/* Minimal Navbar */}
      <Navbar
        preferences={preferences}
        onPreferenceChange={handlePreferenceChange}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        pinnedCount={pinnedIds.length}
        onOpenCompare={() => setIsCompareOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Content Area based on Tab */}
      <main>
        {activeTab === 'home' && (
          <>
            {/* 1 & 2. Full-Screen Editorial Hero */}
            <ShowcaseHero
              heroLaptop={laptops[0]}
              onFindMatch={() => setActiveTab('match')}
              onExploreCatalog={() => setActiveTab('catalog')}
              onSelectLaptop={setSelectedLaptop}
            />

            {/* 3, 5 & 6. RECO Storytelling Sequence */}
            <StorySection
              laptops={laptops}
              onStartWizard={() => setActiveTab('match')}
            />

            {/* 7. Product Experience / Spec Storytelling */}
            {laptops[0] && (
              <SpecShowcase
                featuredLaptop={laptops[0]}
                onSelectLaptop={setSelectedLaptop}
              />
            )}

            {/* 8. Product Category Story ("CHOOSE YOUR EXPERIENCE") */}
            <CategoryExperience
              onSelectCategory={(workload) => {
                handlePreferenceChange({ workload });
                setActiveTab('catalog');
              }}
            />

            {/* 9. Curated Showcase Panels */}
            <FeaturedShowcase
              laptops={laptops}
              onSelectCategory={(workload) => {
                handlePreferenceChange({ workload });
                setActiveTab('catalog');
              }}
              onSelectLaptop={setSelectedLaptop}
            />

            {/* 10. Recommendation Wizard Component */}
            <RecommendationWizard
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
              laptops={laptops}
              onSelectLaptop={setSelectedLaptop}
              onPinLaptop={handleTogglePin}
            />

            {/* Market Trends Section */}
            {marketTrends && <MarketTrendsChart data={marketTrends} />}

            {/* Full Laptop Catalog Explorer */}
            <LaptopGrid
              laptops={laptops}
              loading={loading}
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
              pinnedIds={pinnedIds}
              onPinLaptop={handleTogglePin}
              onSelectLaptop={setSelectedLaptop}
              onAnalyzePower={(lap) => {
                setPowerLaptop(lap);
                setActiveTab('power');
              }}
            />
          </>
        )}

        {activeTab === 'catalog' && (
          <div className="pt-24">
            <LaptopGrid
              laptops={laptops}
              loading={loading}
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
              pinnedIds={pinnedIds}
              onPinLaptop={handleTogglePin}
              onSelectLaptop={setSelectedLaptop}
              onAnalyzePower={(lap) => {
                setPowerLaptop(lap);
                setActiveTab('power');
              }}
            />
          </div>
        )}

        {activeTab === 'match' && (
          <div className="pt-24">
            <RecommendationWizard
              preferences={preferences}
              onPreferenceChange={handlePreferenceChange}
              laptops={laptops}
              onSelectLaptop={setSelectedLaptop}
              onPinLaptop={handleTogglePin}
            />
          </div>
        )}

        {activeTab === 'power' && laptops.length > 0 && (
          <PowerDashboard
            selectedLaptop={powerLaptop || laptops[0]}
            allLaptops={laptops}
            onSelectLaptop={(lap) => setPowerLaptop(lap)}
          />
        )}

        {activeTab === 'compare' && (
          <div className="pt-24 min-h-[70vh] px-6 max-w-7xl mx-auto">
            <CompareMatrix
              compareLaptops={compareLaptops}
              isOpen={true}
              onClose={() => setActiveTab('home')}
              onRemovePin={handleTogglePin}
            />
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      <DetailModal
        laptop={selectedLaptop}
        unidaysActive={preferences.unidaysActive}
        onClose={() => setSelectedLaptop(null)}
        onPin={handleTogglePin}
        isPinned={selectedLaptop ? pinnedIds.includes(selectedLaptop.id) : false}
        onAnalyzePower={(lap) => {
          setPowerLaptop(lap);
          setActiveTab('power');
        }}
      />

      {/* Compare Matrix Drawer */}
      <CompareMatrix
        compareLaptops={compareLaptops}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemovePin={handleTogglePin}
      />

      {/* Floating Compare Dock */}
      <FloatingCompareBar
        pinnedCount={pinnedIds.length}
        onOpenCompare={() => setIsCompareOpen(true)}
      />

      {/* Ask AI Floating Chat Drawer */}
      <ChatbotDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        unidaysActive={preferences.unidaysActive}
      />

      {/* Command Palette Search Overlay */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        laptops={laptops}
        onSelectLaptop={setSelectedLaptop}
        unidaysActive={preferences.unidaysActive}
      />

      {/* Toast Notification */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
}
