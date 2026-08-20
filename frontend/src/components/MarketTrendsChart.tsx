import React from 'react';
import { TrendingDown, Calendar, AlertCircle, Sparkles } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import type { MarketTrendsData } from '../types/laptop';

interface MarketTrendsChartProps {
  data: MarketTrendsData | null;
}

export const MarketTrendsChart: React.FC<MarketTrendsChartProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="glass-panel p-6 rounded-3xl border-slate-200 dark:border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-[#415FFF]/10 text-[#415FFF]">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Component Market Index & Sales Price Radar</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tracks DRAM, NAND Flash SSD, and GPU Silicon cost trends to predict optimum buying windows
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-[#415FFF]/10 border border-[#415FFF]/30 text-[#415FFF] dark:text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-[#415FFF]" />
          Live Hardware Signal
        </div>
      </div>

      {/* Component Index Area Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 h-64 w-full">
          <h4 className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-bold mb-2">
            Component Pricing Indices (Base 100)
          </h4>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.component_index}>
              <defs>
                <linearGradient id="colorNand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorDram" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorGpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#415FFF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#415FFF" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94A3B8" tick={{ fontSize: 10 }} />
              <YAxis stroke="#94A3B8" tick={{ fontSize: 10 }} domain={[70, 130]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#12141A', borderColor: '#415FFF', borderRadius: '16px', fontSize: '12px', color: '#F7F8FA' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="nand_flash_index" name="NAND Flash SSD Index" stroke="#10B981" fillOpacity={1} fill="url(#colorNand)" strokeWidth={2} />
              <Area type="monotone" dataKey="gpu_silicon_index" name="GPU Silicon Cost Index" stroke="#415FFF" fillOpacity={1} fill="url(#colorGpu)" strokeWidth={2} />
              <Area type="monotone" dataKey="dram_index" name="DRAM Memory Index" stroke="#F59E0B" fillOpacity={1} fill="url(#colorDram)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Market Takeaway & Festival Sales */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#415FFF]" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">
                Market Intelligence Signal
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              NAND Flash SSD spot prices have dropped <span className="text-emerald-600 dark:text-emerald-400 font-bold">15% since Q4</span>, lowering 1TB SSD laptop baseline costs across Lenovo LOQ & ASUS TUF lines.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Upcoming Festival Sales Calendar
            </h4>

            <div className="space-y-2">
              {data.upcoming_sales.map((sale, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between gap-3 hover:border-[#415FFF]/50 transition-all">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{sale.name}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{sale.dates} • {sale.best_category}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono font-bold text-[11px] shrink-0">
                    {sale.expected_discount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
