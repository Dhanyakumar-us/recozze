import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, HardDrive, Monitor, Zap } from 'lucide-react';
import type { UserPreferences } from '../types/laptop';

interface HeroBannerProps {
  preferences: UserPreferences;
  onPreferenceChange: (updated: Partial<UserPreferences>) => void;
  onOpenSpecMatcher: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenSpecMatcher,
}) => {
  const handleScrollToGrid = () => {
    const el = document.getElementById('discover-laptops');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const hudPills = [
    { label: 'RTX 4060', icon: <Zap className="w-3 h-3 text-blue-400" />, pos: 'top-6 -left-6 md:top-10 md:-left-10' },
    { label: '16 GB RAM', icon: <Cpu className="w-3 h-3 text-cyan-400" />, pos: 'top-20 -right-6 md:top-28 md:-right-8' },
    { label: '1 TB SSD', icon: <HardDrive className="w-3 h-3 text-purple-400" />, pos: 'bottom-20 -left-6 md:bottom-28 md:-left-8' },
    { label: '165 Hz', icon: <Monitor className="w-3 h-3 text-emerald-400" />, pos: 'bottom-8 -right-6 md:bottom-12 md:-right-8' },
  ];

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-28 pb-16 px-4 lg:px-8 overflow-hidden bg-[#050505]">
      
      {/* Background Radial Spotlights & Light Beams */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-px h-96 bg-gradient-to-b from-transparent via-blue-500/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Headlines & Actions */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101010] border border-white/10 text-xs font-mono font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>NEXT-GEN AI HARDWARE DISCOVERY 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
              FIND YOUR <br />
              <span className="text-blue-500 drop-shadow-[0_0_25px_rgba(59,130,246,0.4)]">
                PERFECT LAPTOP.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
              Stop searching through hundreds of laptops. Let RecoZee find the one that fits your needs.
            </p>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={onOpenSpecMatcher}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-extrabold transition-all duration-300 shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>FIND MY LAPTOP</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleScrollToGrid}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#101010] border border-white/10 hover:border-slate-700 text-slate-300 hover:text-white text-sm font-semibold transition-all duration-300 cursor-pointer"
            >
              <span>EXPLORE DEVICES</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Premium Floating Hardware Visual */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          
          {/* Subtle Ambient Light Behind Laptop */}
          <div className="absolute w-72 h-72 rounded-full bg-blue-600/20 blur-3xl" />

          {/* Main Floating Showcase Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-md p-4 rounded-3xl bg-[#0A0A0A] border border-white/10 shadow-2xl shadow-black group"
          >
            <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-[#050505] flex items-center justify-center p-6 border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80"
                alt="ASUS ROG Strix G16 Showcase"
                className="max-h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Spec HUD Labels */}
              {hudPills.map((pill, idx) => (
                <motion.div
                  key={idx}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.5 }}
                  className={`absolute ${pill.pos} flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#101010]/90 backdrop-blur-md border border-white/10 text-xs font-mono font-bold text-white shadow-xl z-20`}
                >
                  {pill.icon}
                  <span>{pill.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 px-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider block">
                  ASUS ROG STRIX G16
                </span>
                <span className="text-xs text-slate-400">Flagship Recommendation</span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                94% Match
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
