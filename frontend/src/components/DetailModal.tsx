import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, XCircle, Heart, Plus, Check, ExternalLink, Monitor, Battery, Cpu, HardDrive } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { Laptop, CurrencyType } from '../types/laptop';
import { formatPrice } from '../services/api';
import { MatchBreakdownCard } from './MatchScoreBadge';

interface DetailModalProps {
  laptop: Laptop | null;
  unidaysActive: boolean;
  currency?: CurrencyType;
  currencyRates?: Record<string, number>;
  onClose: () => void;
  onTogglePin: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  isPinned: boolean;
  isFavorite?: boolean;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  laptop,
  unidaysActive,
  currency = 'INR',
  currencyRates,
  onClose,
  onTogglePin,
  onToggleFavorite,
  isPinned,
  isFavorite = false,
}) => {
  if (!laptop) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'thermals' | 'benchmarks' | 'student' | 'forecast'>('overview');
  const displayPriceInr = unidaysActive ? laptop.studentPriceInr : laptop.currentBestPriceInr;
  const matchPct = laptop.calculatedMatchPct || 94;
  const forecast = laptop.forecast;

  const chartData = forecast
    ? forecast.six_month_forecast.map((item) => ({
        month: item.month,
        price: item.projected_price,
      }))
    : laptop.priceHistory.map((item) => ({
        month: item.date,
        price: item.price,
      }));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-5xl bg-[#0A0A0A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl my-8 text-white"
        >
          {/* Header Bar */}
          <div className="p-6 border-b border-white/10 flex items-start justify-between gap-4 bg-[#050505]">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-blue-400 font-bold">
                {laptop.brand} • {laptop.category}
              </span>
              <h2 className="text-2xl font-black text-white mt-0.5">{laptop.name}</h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#101010] text-slate-400 hover:text-white transition-colors cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 space-y-8 max-h-[80vh] overflow-y-auto">
            
            {/* Cinematic Presentation Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#101010] p-6 sm:p-8 rounded-3xl border border-white/10">
              
              {/* Large Image Box */}
              <div className="md:col-span-6 h-64 sm:h-72 rounded-2xl bg-[#050505] flex items-center justify-center p-6 border border-white/5 relative">
                <img src={laptop.image} alt={laptop.name} className="max-h-full object-contain" />
              </div>

              {/* Specs & Pricing */}
              <div className="md:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-slate-400 block">{laptop.brand}</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">{laptop.name}</h3>
                  <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    {matchPct}% MATCH
                  </div>
                </div>

                <div className="text-3xl font-black font-mono text-white">
                  {formatPrice(displayPriceInr, currency, currencyRates)}
                </div>

                {/* HUD Spec Pills */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-[#050505] border border-white/5 flex items-center gap-2 text-slate-300">
                    <Monitor className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{laptop.specs.gpu}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#050505] border border-white/5 flex items-center gap-2 text-slate-300">
                    <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{laptop.specs.ramGb}GB RAM</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#050505] border border-white/5 flex items-center gap-2 text-slate-300">
                    <HardDrive className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{laptop.specs.ssdStorageGb}GB SSD</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#050505] border border-white/5 flex items-center gap-2 text-slate-300">
                    <Battery className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{laptop.specs.display.refresh_rate_hz}Hz Panel</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onTogglePin(laptop.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                      isPinned
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-[#050505] border-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    {isPinned ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    <span>{isPinned ? 'PINNED' : 'ADD TO COMPARE'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onToggleFavorite) onToggleFavorite(laptop.id);
                    }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                      isFavorite
                        ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                        : 'bg-[#050505] border-white/10 text-slate-300 hover:text-rose-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`} />
                    <span>{isFavorite ? 'SAVED' : 'SAVE LAPTOP'}</span>
                  </button>

                  <a
                    href={laptop.retailerPrices.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-6 py-3 rounded-2xl text-xs font-extrabold bg-blue-600 hover:bg-blue-500 text-white transition-all ml-auto cursor-pointer"
                  >
                    <span>BUY DIRECT</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Horizontal Specification Panels */}
            <div className="flex border-b border-white/10 text-xs font-mono font-bold gap-4 overflow-x-auto">
              {['overview', 'thermals', 'benchmarks', 'student', 'forecast'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-3 px-4 border-b-2 uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <MatchBreakdownCard score={matchPct} laptopName={laptop.name} />

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-6 rounded-3xl bg-[#101010] border border-white/10 space-y-3">
                    <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-2 uppercase">
                      <CheckCircle2 className="w-4 h-4" /> Pros & Advantages
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                      {laptop.pros.map((p, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 rounded-3xl bg-[#101010] border border-white/10 space-y-3">
                    <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-2 uppercase">
                      <XCircle className="w-4 h-4" /> Considerations & Cons
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                      {laptop.cons.map((c, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Thermals & Display */}
            {activeTab === 'thermals' && (
              <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-[#101010] border border-white/10 space-y-2">
                  <h4 className="text-xs uppercase font-mono text-slate-400 font-bold">Cooling System</h4>
                  <p className="text-sm text-slate-200">{laptop.cooling.architecture}</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-center">
                  <div className="p-4 rounded-2xl bg-[#101010] border border-white/10">
                    <span className="text-slate-400 text-[10px] block">Fans</span>
                    <span className="text-lg font-bold text-blue-400">{laptop.cooling.fanCount} Fans</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#101010] border border-white/10">
                    <span className="text-slate-400 text-[10px] block">Heatpipes</span>
                    <span className="text-lg font-bold text-cyan-400">{laptop.cooling.heatpipeCount} Pipes</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#101010] border border-white/10">
                    <span className="text-slate-400 text-[10px] block">Peak Temp</span>
                    <span className="text-lg font-bold text-amber-400">{laptop.cooling.maxSurfaceTempC}°C</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#101010] border border-white/10">
                    <span className="text-slate-400 text-[10px] block">Noise</span>
                    <span className="text-lg font-bold text-emerald-400">{laptop.cooling.peakNoiseLevelDb} dB</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Benchmarks */}
            {activeTab === 'benchmarks' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="p-6 rounded-3xl bg-[#101010] border border-white/10 space-y-3">
                  <div className="flex justify-between text-slate-300 font-bold">
                    <span>Cinebench R23 Multi-Core</span>
                    <span className="text-blue-400">{laptop.benchmarks.cinebenchR23Multi.toLocaleString()} pts</span>
                  </div>
                  <div className="w-full h-3 bg-[#050505] rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (laptop.benchmarks.cinebenchR23Multi / 35000) * 100)}%` }} />
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#101010] border border-white/10 space-y-3">
                  <div className="flex justify-between text-slate-300 font-bold">
                    <span>3DMark Time Spy GPU</span>
                    <span className="text-cyan-400">{laptop.benchmarks.timeSpyGpu.toLocaleString()} pts</span>
                  </div>
                  <div className="w-full h-3 bg-[#050505] rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${Math.min(100, (laptop.benchmarks.timeSpyGpu / 20000) * 100)}%` }} />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Student Perks */}
            {activeTab === 'student' && (
              <div className="p-6 rounded-3xl bg-[#101010] border border-white/10 space-y-3 text-xs font-mono">
                <h4 className="text-sm font-bold text-blue-400">UNiDAYS Student Privileges</h4>
                <p className="text-slate-300">Method: {laptop.studentBenefits.verificationMethod}</p>
                <div className="p-4 rounded-2xl bg-[#050505] border border-white/5 font-bold text-blue-400 text-sm">
                  ₹{laptop.studentBenefits.cashbackInr.toLocaleString('en-IN')} Cashback Direct Bank Credit
                </div>
              </div>
            )}

            {/* Tab 5: Forecast */}
            {activeTab === 'forecast' && (
              <div className="p-6 rounded-3xl bg-[#101010] border border-white/10 space-y-4">
                <div className="h-56 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                      <XAxis dataKey="month" stroke="#737373" tick={{ fontSize: 10 }} />
                      <YAxis stroke="#737373" tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#050505', borderColor: '#3B82F6', borderRadius: '12px', fontSize: '12px', color: '#FFF' }}
                        formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Price']}
                      />
                      <Line type="monotone" dataKey="price" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#050505', r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
