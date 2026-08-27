import React, { useState } from 'react';
import { Sparkles, RefreshCw, Award } from 'lucide-react';
import type { Laptop, UserPreferences, WorkloadType } from '../types/laptop';
import {
  getLaptopImage,
  getLaptopPrice,
  getLaptopCpu,
  getLaptopGpu,
  getLaptopTgp,
  getLaptopRam,
  getLaptopSsd,
  getLaptopMatchScore,
} from '../utils/laptopUtils';

interface RecommendationWizardProps {
  preferences: UserPreferences;
  onPreferenceChange: (updated: Partial<UserPreferences>) => void;
  laptops: Laptop[];
  onSelectLaptop: (laptop: Laptop) => void;
  onPinLaptop: (id: string) => void;
}

export const RecommendationWizard: React.FC<RecommendationWizardProps> = ({
  preferences,
  onPreferenceChange,
  laptops,
  onSelectLaptop,
  onPinLaptop,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const steps = [
    { id: 1, label: '01 PURPOSE' },
    { id: 2, label: '02 BUDGET' },
    { id: 3, label: '03 PERFORMANCE' },
    { id: 4, label: '04 MEMORY' },
    { id: 5, label: '05 PREFERENCES' },
    { id: 6, label: '06 YOUR MATCH' },
  ];

  const workloads: { id: WorkloadType; title: string; desc: string; icon: string }[] = [
    { id: 'gaming', title: 'AAA Gaming', desc: 'Max GPU TGP & High FPS', icon: '🎮' },
    { id: 'coding', title: 'Software Dev', desc: 'Fast Compiles & Multi-threading', icon: '💻' },
    { id: 'creator', title: 'Video & 3D Creator', desc: 'Color OLED & Heavy VRAM', icon: '🎨' },
    { id: 'student', title: 'Student & Campus', desc: 'Portability & Long Battery', icon: '🎓' },
    { id: 'business', title: 'Executive Business', desc: 'Sleek CNC & Silent Fans', icon: '💼' },
    { id: 'budget', title: 'Value & AI Workstation', desc: 'Max performance per dollar', icon: '⚡' },
  ];

  const budgetTiers = [
    { label: 'Value Entry', min: 40000, max: 65000, desc: 'Under ₹65,000' },
    { label: 'Mainstream Performance', min: 65000, max: 100000, desc: '₹65,000 – ₹1,00,000' },
    { label: 'High Performance', min: 100000, max: 160000, desc: '₹1,00,000 – ₹1,60,000' },
    { label: 'Flagship Elite', min: 160000, max: 350000, desc: '₹1,60,000+' },
  ];

  const tgpOptions = [
    { id: 'all', title: 'Any Wattage', desc: 'Show all GPU power profiles' },
    { id: 'thin_light', title: 'Thin & Light (45W)', desc: 'Optimized for quiet acoustics' },
    { id: 'balanced', title: 'Balanced (90W–115W)', desc: 'Solid thermal efficiency' },
    { id: 'unlocked', title: 'Unlocked (140W–175W)', desc: 'Max frame rate GPU boost' },
  ];

  const ramOptions = [8, 16, 32, 64];

  const handleCalculateMatch = () => {
    setIsAnalyzing(true);
    setCurrentStep(6);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1200);
  };

  const topMatch = laptops[0];

  return (
    <section className="py-24 px-6 sm:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
          INTERACTIVE MATCHMAKING
        </span>
        <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-slate-900 dark:text-white">
          TELL RECO <span className="text-gradient-accent">WHAT YOU NEED.</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Answer 5 quick preference questions to reveal your highest-scoring laptop match.
        </p>
      </div>

      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto gap-2">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => setCurrentStep(step.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              currentStep === step.id
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : currentStep > step.id
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>

      <div className="showcase-panel p-8 sm:p-12 rounded-3xl min-h-[440px] flex flex-col justify-between">
        {currentStep === 1 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                What will you primary use your laptop for?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select your primary workload to tune the recommendation scoring formula.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {workloads.map((w) => {
                const isSelected = preferences.workload === w.id;
                return (
                  <button
                    key={w.id}
                    onClick={() => onPreferenceChange({ workload: w.id })}
                    className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 dark:border-blue-500 shadow-md ring-2 ring-blue-600/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="text-3xl mb-3">{w.icon}</div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {w.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">{w.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                What is your budget ceiling?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Choose a target price range or adjust the budget slider.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {budgetTiers.map((tier, idx) => {
                const isSelected =
                  preferences.budgetMin === tier.min && preferences.budgetMax === tier.max;
                return (
                  <button
                    key={idx}
                    onClick={() =>
                      onPreferenceChange({ budgetMin: tier.min, budgetMax: tier.max })
                    }
                    className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 dark:border-blue-500 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                      {tier.label}
                    </span>
                    <h4 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                      {tier.desc}
                    </h4>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Custom Budget: ₹{preferences.budgetMin.toLocaleString('en-IN')}</span>
                <span>₹{preferences.budgetMax.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="40000"
                max="350000"
                step="5000"
                value={preferences.budgetMax}
                onChange={(e) =>
                  onPreferenceChange({ budgetMax: Number(e.target.value) })
                }
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                How much GPU TGP Wattage do you need?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                TGP (Total Graphics Power) dictates actual frame rates in heavy workloads.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tgpOptions.map((opt) => {
                const isSelected = preferences.tgpTier === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => onPreferenceChange({ tgpTier: opt.id as any })}
                    className={`p-6 rounded-2xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 dark:border-blue-500 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {opt.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                Minimum RAM Capacity
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Select your required system memory threshold.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ramOptions.map((ram) => {
                const isSelected = preferences.minRamGb === ram;
                return (
                  <button
                    key={ram}
                    onClick={() => onPreferenceChange({ minRamGb: ram })}
                    className={`p-8 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white'
                    }`}
                  >
                    <span className="text-3xl font-black font-display">{ram} GB</span>
                    <p className={`text-[10px] uppercase font-bold mt-1 ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                      RAM
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 5 && (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                Battery Target & Student Discount
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Final parameters before RECO calculates your match.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    UNiDAYS Student Savings Mode
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Apply verified student rates and cashback perks across all matching models.
                  </p>
                </div>
                <button
                  onClick={() =>
                    onPreferenceChange({ unidaysActive: !preferences.unidaysActive })
                  }
                  className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center cursor-pointer ${
                    preferences.unidaysActive ? 'bg-emerald-500 justify-end' : 'bg-slate-300 dark:bg-slate-700 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>Battery Target: {preferences.batteryTargetHours} Hours</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="14"
                  value={preferences.batteryTargetHours}
                  onChange={(e) =>
                    onPreferenceChange({ batteryTargetHours: Number(e.target.value) })
                  }
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-8">
            {isAnalyzing ? (
              <div className="py-20 text-center space-y-4">
                <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                <h3 className="text-2xl font-bold font-display text-slate-900 dark:text-white">
                  ANALYZING RECO ALGORITHM...
                </h3>
                <p className="text-xs text-slate-500">
                  Calculating GPU TGP, thermal heat pipes, Cinebench scores & student discounts.
                </p>
              </div>
            ) : topMatch ? (
              <div className="space-y-8">
                <div className="flex items-center space-x-3 text-emerald-600 dark:text-emerald-400">
                  <Award className="w-6 h-6" />
                  <span className="text-xs font-bold tracking-widest uppercase">
                    YOUR #1 MATCH REVEALED
                  </span>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-1/2 rounded-2xl overflow-hidden bg-slate-900 h-64 sm:h-72">
                    <img
                      src={getLaptopImage(topMatch)}
                      alt={topMatch.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                      <span>{getLaptopMatchScore(topMatch)}% Workload Match Score</span>
                    </div>

                    <h3 className="text-3xl font-black font-display text-slate-900 dark:text-white">
                      {topMatch.name}
                    </h3>

                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ₹{getLaptopPrice(topMatch, preferences.unidaysActive).toLocaleString('en-IN')}
                    </p>

                    <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <p>• <strong>CPU:</strong> {getLaptopCpu(topMatch)}</p>
                      <p>• <strong>GPU:</strong> {getLaptopGpu(topMatch)} ({getLaptopTgp(topMatch)}W TGP)</p>
                      <p>• <strong>Memory:</strong> {getLaptopRam(topMatch)}GB RAM • {getLaptopSsd(topMatch)}GB SSD</p>
                      <p>• <strong>Why it fits:</strong> Perfect match for {preferences.workload} demands with optimal thermals.</p>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        onClick={() => onSelectLaptop(topMatch)}
                        className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md cursor-pointer"
                      >
                        EXPLORE DETAILS →
                      </button>
                      <button
                        onClick={() => onPinLaptop(topMatch.id)}
                        className="px-6 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-white font-bold text-xs cursor-pointer"
                      >
                        Pin to Compare
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-slate-500 py-12">No laptop matching current filters.</p>
            )}
          </div>
        )}

        <div className="flex justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800">
          <button
            disabled={currentStep === 1}
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            className="px-5 py-2 rounded-full text-xs font-bold text-slate-500 disabled:opacity-30 cursor-pointer hover:text-slate-900 dark:hover:text-white"
          >
            ← Previous
          </button>

          {currentStep < 5 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(5, prev + 1))}
              className="px-6 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs cursor-pointer hover:scale-105 transition-transform"
            >
              Next Step →
            </button>
          ) : currentStep === 5 ? (
            <button
              onClick={handleCalculateMatch}
              className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md cursor-pointer flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>REVEAL MY MATCH</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentStep(1)}
              className="px-5 py-2 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
            >
              Restart Quiz
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
