import React, { useState } from 'react';
import { X, Thermometer, Gauge, GraduationCap, TrendingDown, ShieldCheck, Flame, Volume2, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { Laptop } from '../types/laptop';

interface DetailModalProps {
  laptop: Laptop | null;
  unidaysActive: boolean;
  onClose: () => void;
  onTogglePin: (id: string) => void;
  isPinned: boolean;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  laptop,
  unidaysActive,
  onClose
}) => {
  if (!laptop) return null;

  const [activeTab, setActiveTab] = useState<'thermals' | 'benchmarks' | 'student' | 'forecast'>('thermals');
  const displayPrice = unidaysActive ? laptop.studentPriceInr : laptop.currentBestPriceInr;
  const savings = laptop.msrpInr - displayPrice;
  const forecast = laptop.forecast;

  const chartData = forecast
    ? forecast.six_month_forecast.map(item => ({
        month: item.month,
        price: item.projected_price
      }))
    : laptop.priceHistory.map(item => ({
        month: item.date,
        price: item.price
      }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border-slate-200 dark:border-slate-800/80 overflow-hidden shadow-2xl my-8 text-slate-900 dark:text-white">
        
        {/* Header Bar */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800/80 flex items-start justify-between gap-4 bg-slate-50 dark:bg-[#12141A]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#415FFF] dark:text-cyan-400 font-bold">
                {laptop.brand} • {laptop.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50">
                ⚡ {laptop.specs.tgpWatts}W TGP
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold mt-1">
              {laptop.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {laptop.specs.cpu} • {laptop.specs.gpu} • {laptop.specs.ramGb}GB RAM
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Top Spec & Pricing Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50 dark:bg-[#12141A] p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="md:col-span-5 h-48 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
              <img src={laptop.image} alt={laptop.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-slate-900/90 text-white border border-slate-700">
                Power Rating: {laptop.powerRating10}/10
              </div>
            </div>

            <div className="md:col-span-7 space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">
                  ₹{displayPrice.toLocaleString('en-IN')}
                </span>
                {unidaysActive && savings > 0 && (
                  <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                    UNiDAYS Price (Saved ₹{savings.toLocaleString('en-IN')})
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Display Panel</span>
                  <span className="font-bold">{laptop.specs.display.size_inches}" {laptop.specs.display.panel_type} ({laptop.specs.display.refresh_rate_hz}Hz)</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Battery & Weight</span>
                  <span className="font-bold">{laptop.specs.batteryWh}Wh ({laptop.specs.batteryHours}h) • {laptop.specs.weightKg}kg</span>
                </div>
              </div>

              {/* Multi-Retailer Live Comparison Table */}
              <div className="pt-2">
                <span className="text-[11px] uppercase font-mono font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                  Live Multi-Retailer Comparison Table
                </span>
                <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                  <a
                    href={laptop.retailerPrices.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#415FFF] transition-all text-center block"
                  >
                    <span className="text-[10px] text-[#415FFF] dark:text-cyan-400 font-bold block">Official Store</span>
                    <span className="font-bold">₹{laptop.retailerPrices.officialStore.toLocaleString('en-IN')}</span>
                  </a>
                  <a
                    href={laptop.retailerPrices.amazonUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 transition-all text-center block"
                  >
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold block">Amazon India</span>
                    <span className="font-bold">₹{laptop.retailerPrices.amazonIn.toLocaleString('en-IN')}</span>
                  </a>
                  <a
                    href={laptop.retailerPrices.flipkartUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 transition-all text-center block"
                  >
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold block">Flipkart</span>
                    <span className="font-bold">₹{laptop.retailerPrices.flipkart.toLocaleString('en-IN')}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Pros & Cons List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-3xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Key Hardware Pros
              </span>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                {laptop.pros.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-3xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 space-y-2">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" />
                Considerations & Cons
              </span>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                {laptop.cons.map((c, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tab Pill Navigation */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-semibold gap-2">
            <button
              onClick={() => setActiveTab('thermals')}
              className={`pb-3 px-4 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'thermals'
                  ? 'border-[#415FFF] text-[#415FFF] dark:text-cyan-300 font-bold'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Thermometer className="w-4 h-4" />
              Thermal Architecture & Noise
            </button>

            <button
              onClick={() => setActiveTab('benchmarks')}
              className={`pb-3 px-4 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'benchmarks'
                  ? 'border-[#415FFF] text-[#415FFF] dark:text-cyan-300 font-bold'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Gauge className="w-4 h-4" />
              Synthetic Benchmarks
            </button>

            <button
              onClick={() => setActiveTab('student')}
              className={`pb-3 px-4 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'student'
                  ? 'border-[#415FFF] text-[#415FFF] dark:text-cyan-300 font-bold'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              UNiDAYS Student Hub
            </button>

            <button
              onClick={() => setActiveTab('forecast')}
              className={`pb-3 px-4 border-b-2 flex items-center gap-2 transition-all ${
                activeTab === 'forecast'
                  ? 'border-[#415FFF] text-[#415FFF] dark:text-cyan-300 font-bold'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TrendingDown className="w-4 h-4" />
              Price Forecast & Buy/Wait
            </button>
          </div>

          {/* Tab 1: Thermals */}
          {activeTab === 'thermals' && (
            <div className="space-y-4">
              <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                  Cooling Architecture Breakdown
                </h4>
                <p className="text-sm text-slate-800 dark:text-slate-200">
                  {laptop.cooling.architecture}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] block">Cooling Fans</span>
                  <span className="text-lg font-bold text-[#415FFF] dark:text-cyan-400">{laptop.cooling.fanCount} Fans</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] block">Heat Pipes</span>
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{laptop.cooling.heatpipeCount} Pipes</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] block">Peak Surface Temp</span>
                  <span className="text-lg font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                    <Flame className="w-4 h-4 text-amber-500" />
                    {laptop.cooling.maxSurfaceTempC}°C
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] block">Acoustic Noise</span>
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                    <Volume2 className="w-4 h-4 text-emerald-500" />
                    {laptop.cooling.peakNoiseLevelDb} dB
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                {laptop.cooling.vaporChamber && (
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                    ✓ Full Vapor Chamber Module
                  </span>
                )}
                {laptop.cooling.liquidMetal && (
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                    ✓ Conductonaut Liquid Metal Compound
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Benchmarks */}
          {activeTab === 'benchmarks' && (
            <div className="space-y-4">
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Cinebench R23 Multi-Core (CPU)</span>
                    <span className="font-bold">{laptop.benchmarks.cinebenchR23Multi.toLocaleString()} pts</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 dark:bg-purple-500 rounded-full"
                      style={{ width: `${Math.min(100, (laptop.benchmarks.cinebenchR23Multi / 35000) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600 dark:text-slate-400">3DMark Time Spy GPU</span>
                    <span className="font-bold">{laptop.benchmarks.timeSpyGpu.toLocaleString()} pts</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#415FFF] dark:bg-cyan-500 rounded-full"
                      style={{ width: `${Math.min(100, (laptop.benchmarks.timeSpyGpu / 20000) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Geekbench 6 Multi-Core</span>
                    <span className="font-bold">{laptop.benchmarks.geekbench6Multi.toLocaleString()} pts</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full"
                      style={{ width: `${Math.min(100, (laptop.benchmarks.geekbench6Multi / 22000) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: UNiDAYS Student Hub */}
          {activeTab === 'student' && (
            <div className="space-y-4">
              <div className="p-5 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-300">Verified UNiDAYS Student Privileges</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Verification method: <span className="font-mono font-bold text-slate-900 dark:text-white">{laptop.studentBenefits.verificationMethod}</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/40 font-mono">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold block">Instant Student Cashback</span>
                    <span className="font-bold">₹{laptop.studentBenefits.cashbackInr.toLocaleString('en-IN')} Direct Bank Credit</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/40 font-mono">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold block">Accidental Damage Protection</span>
                    <span className="font-bold">{laptop.studentBenefits.extendedWarrantyMonths} Months ADP Included</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs uppercase font-mono font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    Free Bundled Accessories:
                  </span>
                  <ul className="text-xs space-y-1">
                    {laptop.studentBenefits.bundledPerks.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Price Forecast */}
          {activeTab === 'forecast' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-xs">
                <div>
                  <span className="font-bold text-amber-800 dark:text-amber-300">Recommendation Status: </span>
                  <span className="font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-200 dark:bg-amber-500/20 text-amber-900 dark:text-white">
                    {laptop.buyRecommendation.status}
                  </span>
                </div>
                <span className="font-mono text-slate-500 dark:text-slate-400">Target: {laptop.buyRecommendation.target_sale}</span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                "{laptop.buyRecommendation.reasoning}"
              </p>

              {/* Price Line Chart */}
              <div className="h-56 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94A3B8" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#94A3B8" tick={{ fontSize: 10 }} domain={['auto', 'auto']} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#12141A', borderColor: '#415FFF', borderRadius: '16px', fontSize: '12px', color: '#F7F8FA' }}
                      formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Price']}
                    />
                    <Line type="monotone" dataKey="price" stroke="#415FFF" strokeWidth={3} dot={{ fill: '#12141A', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
