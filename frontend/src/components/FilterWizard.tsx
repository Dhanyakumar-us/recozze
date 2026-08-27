import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, RefreshCw, Zap, BatteryCharging, Gamepad2, Code, GraduationCap, Palette, Briefcase, Layers } from 'lucide-react';
import type { UserPreferences } from '../types/laptop';

interface FilterWizardProps {
  preferences: UserPreferences;
  onPreferenceChange: (updated: Partial<UserPreferences>) => void;
  onResetFilters: () => void;
}

export const FilterWizard: React.FC<FilterWizardProps> = ({
  preferences,
  onPreferenceChange,
  onResetFilters,
}) => {
  const [step, setStep] = useState(1);
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([
    'ASUS',
    'Lenovo',
    'HP',
    'Dell',
    'Acer',
    'MSI',
    'Apple',
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const workloads = [
    { id: 'gaming', title: 'Gaming', icon: <Gamepad2 className="w-5 h-5 text-blue-400" /> },
    { id: 'coding', title: 'Coding', icon: <Code className="w-5 h-5 text-cyan-400" /> },
    { id: 'student', title: 'College', icon: <GraduationCap className="w-5 h-5 text-emerald-400" /> },
    { id: 'creator', title: 'Design', icon: <Palette className="w-5 h-5 text-purple-400" /> },
    { id: 'business', title: 'Business', icon: <Briefcase className="w-5 h-5 text-amber-400" /> },
    { id: 'all', title: 'Everything', icon: <Layers className="w-5 h-5 text-indigo-400" /> },
  ];

  const brandOptions = ['ASUS', 'Lenovo', 'HP', 'Dell', 'Acer', 'MSI', 'Apple'];

  const toggleBrand = (b: string) => {
    setSelectedBrands((prev) =>
      prev.includes(b) ? prev.filter((item) => item !== b) : [...prev, b]
    );
  };

  const handleCompleteWizard = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPreferenceChange({ searchQuery: customPrompt });
      const el = document.getElementById('discover-laptops');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 2200);
  };

  return (
    <section className="w-full py-16 px-4 lg:px-8 bg-[#0A0A0A] border border-white/10 rounded-3xl relative overflow-hidden my-12">
      {/* Background Subtle Blueprint Grid */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
            INTELLIGENT AI MATCHING
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            YOUR LAPTOP. <br />
            <span className="text-blue-500">YOUR RULES.</span>
          </h2>
          <p className="text-sm text-slate-400">Tell RecoZee what matters to you.</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 font-mono text-xs text-slate-500">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <React.Fragment key={num}>
              <button
                onClick={() => setStep(num)}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all cursor-pointer ${
                  step === num
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : step > num
                    ? 'bg-blue-950 text-blue-400 border border-blue-800'
                    : 'bg-[#101010] text-slate-500 border border-white/10'
                }`}
              >
                0{num}
              </button>
              {num < 6 && <span className="w-6 sm:w-12 h-px bg-white/10" />}
            </React.Fragment>
          ))}
        </div>

        {/* Processing Screen overlay */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 rounded-3xl bg-[#050505] border border-blue-500/30 text-center space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-center gap-3 text-blue-400 font-mono font-bold text-sm uppercase tracking-widest">
                <Sparkles className="w-5 h-5 animate-spin" />
                <span>RECOZEE AI ENGINE</span>
              </div>

              <h3 className="text-xl font-extrabold text-white">ANALYZING YOUR REQUIREMENTS</h3>

              <div className="max-w-md mx-auto space-y-2 text-left font-mono text-xs text-slate-300">
                <div className="flex justify-between border-b border-white/5 py-1">
                  <span>Budget Requirements</span>
                  <span className="text-blue-400">✓</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-1">
                  <span>Performance Thresholds</span>
                  <span className="text-blue-400">✓</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-1">
                  <span>Portability Factor</span>
                  <span className="text-blue-400">✓</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-1">
                  <span>GPU & TGP Requirements</span>
                  <span className="text-blue-400">✓</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-1">
                  <span>Primary Use Case</span>
                  <span className="text-blue-400">✓</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-xs font-mono font-bold text-blue-400 animate-pulse">
                  MATCHING DEVICES...
                </span>
              </div>

              <button
                onClick={() => {
                  setIsProcessing(false);
                }}
                className="text-[11px] font-mono text-slate-500 underline hover:text-slate-300"
              >
                Skip Animation
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Steps */}
        {!isProcessing && (
          <div className="p-8 rounded-3xl bg-[#101010] border border-white/10 space-y-8">
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">
                  01. What are you buying it for?
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {workloads.map((w) => {
                    const isSelected = preferences.workload === w.id;
                    return (
                      <button
                        key={w.id}
                        onClick={() => onPreferenceChange({ workload: w.id as any })}
                        className={`p-5 rounded-2xl border text-left flex flex-col justify-between space-y-4 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600/10 border-blue-500 text-white shadow-lg shadow-blue-500/10'
                            : 'bg-[#0A0A0A] border-white/10 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="p-2.5 rounded-xl bg-slate-900 w-fit">{w.icon}</div>
                        <span className="font-bold text-sm text-white">{w.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">
                  02. What's your budget?
                </h3>
                <div className="space-y-4 max-w-xl mx-auto text-center pt-4">
                  <span className="text-4xl font-extrabold font-mono text-blue-400 block">
                    ₹{preferences.budgetMax.toLocaleString('en-IN')}
                  </span>
                  <input
                    type="range"
                    min="30000"
                    max="350000"
                    step="5000"
                    value={preferences.budgetMax}
                    onChange={(e) => onPreferenceChange({ budgetMax: Number(e.target.value) })}
                    className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-mono text-slate-500">
                    <span>₹30,000</span>
                    <span>₹3,50,000+</span>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">
                  03. Performance Level?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'balanced', label: 'Balanced', desc: 'Sufficient for daily tasks & casual gaming' },
                    { id: 'performance', label: 'Performance', desc: 'High TGP GPU & heavy multitasking' },
                    { id: 'extreme', label: 'Extreme', desc: 'Max TGP graphics & flagship multi-core CPUs' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onPreferenceChange({ tgpTier: p.id as any })}
                      className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-blue-500/50 text-left space-y-2 cursor-pointer"
                    >
                      <Zap className="w-5 h-5 text-blue-400" />
                      <h4 className="font-bold text-white text-sm">{p.label}</h4>
                      <p className="text-xs text-slate-400">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">
                  04. Portability Preference?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: 'perf', label: 'Performance First', desc: 'Max cooling, slightly heavier chassis' },
                    { id: 'balanced', label: 'Balanced', desc: 'Ideal blend of power and battery life' },
                    { id: 'ultra', label: 'Ultra Portable', desc: 'Thin & light with all-day battery' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onPreferenceChange({ batteryTargetHours: p.id === 'ultra' ? 8 : 4 })}
                      className="p-5 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-blue-500/50 text-left space-y-2 cursor-pointer"
                    >
                      <BatteryCharging className="w-5 h-5 text-cyan-400" />
                      <h4 className="font-bold text-white text-sm">{p.label}</h4>
                      <p className="text-xs text-slate-400">{p.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">
                  05. Preferred Brands?
                </h3>
                <div className="flex flex-wrap gap-3">
                  {brandOptions.map((b) => {
                    const isSelected = selectedBrands.includes(b);
                    return (
                      <button
                        key={b}
                        onClick={() => toggleBrand(b)}
                        className={`px-5 py-3 rounded-2xl font-bold text-xs border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-600 border-blue-500 text-white'
                            : 'bg-[#0A0A0A] border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {b} {isSelected && '✓'}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-white">
                  06. Anything else you need?
                </h3>
                <p className="text-xs text-slate-400">Enter custom natural language constraints below:</p>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder='e.g. "I need something for Python, gaming and college under ₹80k."'
                  className="w-full p-4 rounded-2xl bg-[#0A0A0A] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 h-28"
                />
              </div>
            )}

            {/* Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  ← Back
                </button>
              ) : (
                <button
                  onClick={onResetFilters}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset
                </button>
              )}

              {step < 6 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleCompleteWizard}
                  className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  <span>FIND MY MATCH →</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
