import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Monitor, Battery, Flame, Gamepad2 } from 'lucide-react';
import type { MarketTrendsData } from '../types/laptop';

interface MarketTrendsChartProps {
  data: MarketTrendsData | null;
}

export const MarketTrendsChart: React.FC<MarketTrendsChartProps> = () => {
  const perfMetrics = [
    { label: 'RTX 4060 GPU Power (TGP 140W)', score: 94, icon: <Zap className="w-4 h-4 text-blue-400" /> },
    { label: 'Intel Core i7 / Ryzen 7 Multi-Core', score: 91, icon: <Cpu className="w-4 h-4 text-cyan-400" /> },
    { label: '165Hz QHD Color Accurate Display', score: 97, icon: <Monitor className="w-4 h-4 text-indigo-400" /> },
    { label: 'Triple-Fan Vapor Chamber Thermals', score: 88, icon: <Flame className="w-4 h-4 text-amber-400" /> },
    { label: 'Real-World Cyberpunk 2077 FPS (1080p Ultra)', score: 92, icon: <Gamepad2 className="w-4 h-4 text-purple-400" /> },
    { label: 'All-Day Battery Efficiency (80Wh+)', score: 84, icon: <Battery className="w-4 h-4 text-emerald-400" /> },
  ];

  return (
    <section className="w-full py-16 px-6 lg:px-12 rounded-3xl bg-[#0A0A0A] border border-white/10 relative overflow-hidden my-12">
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Header */}
        <div className="space-y-3 text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
            BENCHMARK & DATA RADAR
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            PERFORMANCE <br />
            <span className="text-blue-500">WITHOUT THE GUESSWORK.</span>
          </h2>
          <p className="text-sm text-slate-400 max-w-xl">
            Real-world TGP wattage benchmarks, thermal stress tests, and verified display color accuracy scores.
          </p>
        </div>

        {/* Animated Horizontal Graphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {perfMetrics.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-[#101010] border border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between font-mono text-xs text-white">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#050505]">{item.icon}</div>
                  <span className="font-bold">{item.label}</span>
                </div>
                <span className="font-extrabold text-blue-400 text-sm">{item.score}</span>
              </div>

              {/* Blue Progress Bar Indicator */}
              <div className="w-full h-3 bg-[#050505] rounded-full overflow-hidden border border-white/5 relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.score}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
