import React from 'react';
import { Cpu, Zap, Monitor, Flame } from 'lucide-react';
import type { Laptop } from '../types/laptop';
import {
  getLaptopPrice,
  getLaptopGpu,
  getLaptopTgp,
  getLaptopRam,
  getLaptopSsd,
  getLaptopWeight,
  getLaptopRefreshHz,
  getLaptopResolution,
  getLaptopScreenSize,
  getLaptopBatteryHours,
  getLaptopMatchScore,
} from '../utils/laptopUtils';

interface SpecShowcaseProps {
  featuredLaptop?: Laptop;
  onSelectLaptop?: (laptop: Laptop) => void;
}

export const SpecShowcase: React.FC<SpecShowcaseProps> = ({
  featuredLaptop,
  onSelectLaptop,
}) => {
  const laptop = featuredLaptop;
  if (!laptop) return null;

  return (
    <section className="py-28 px-6 sm:px-8 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        <div className="space-y-4 max-w-3xl">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
            PRODUCT ARCHITECTURE & SPECIFICATIONS
          </span>
          <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight leading-tight">
            ENGINEERED FOR <br />
            <span className="text-blue-400">UNCOMPROMISING PERFORMANCE.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Inside the {laptop.name}. Every component is balanced for maximum power efficiency and thermal endurance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 1. PERFORMANCE */}
          <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-md space-y-6 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
            <div>
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 w-fit mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                GRAPHICS & TGP WATTAGE
              </p>
              <h3 className="text-3xl font-black font-display mt-2 text-white line-clamp-1">
                {getLaptopGpu(laptop)}
              </h3>
              <p className="text-2xl font-extrabold text-blue-400 mt-1">
                {getLaptopTgp(laptop)}W TGP
              </p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-700/60 pt-4">
              Full TGP power limit allows the GPU to reach maximum sustained boost clock frequencies in heavy AAA gaming sessions.
            </p>
          </div>

          {/* 2. MEMORY & STORAGE */}
          <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-md space-y-6 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
            <div>
              <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 w-fit mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                HIGH-SPEED MEMORY
              </p>
              <h3 className="text-4xl font-black font-display mt-2 text-white">
                {getLaptopRam(laptop)} GB
              </h3>
              <p className="text-xl font-bold text-indigo-400 mt-1">
                {getLaptopSsd(laptop) >= 1000
                  ? `${getLaptopSsd(laptop) / 1000} TB`
                  : `${getLaptopSsd(laptop)} GB`}{' '}
                NVMe SSD
              </p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-700/60 pt-4">
              DDR5 dual-channel RAM ensures zero bottlenecks when compiling large code bases or rendering multi-layer timeline video.
            </p>
          </div>

          {/* 3. DISPLAY */}
          <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-md space-y-6 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
            <div>
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit mb-6">
                <Monitor className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                VISUAL CLARITY
              </p>
              <h3 className="text-4xl font-black font-display mt-2 text-white">
                {getLaptopRefreshHz(laptop)} Hz
              </h3>
              <p className="text-xl font-bold text-cyan-400 mt-1">
                {getLaptopScreenSize(laptop)}" {getLaptopResolution(laptop)}
              </p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-700/60 pt-4">
              Fluid refresh rate paired with wide color gamut for color-accurate photo editing and low-latency gaming.
            </p>
          </div>

          {/* 4. THERMALS & PORTABILITY */}
          <div className="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-md space-y-6 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
            <div>
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                THERMALS & WEIGHT
              </p>
              <h3 className="text-4xl font-black font-display mt-2 text-white">
                {getLaptopWeight(laptop)} KG
              </h3>
              <p className="text-xl font-bold text-emerald-400 mt-1">
                {laptop.cooling?.heatpipeCount || 4} Heat Pipes • {getLaptopBatteryHours(laptop)}h Battery
              </p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-700/60 pt-4">
              Dual-fan liquid metal cooling maintains surface temperatures below {laptop.cooling?.maxSurfaceTempC || 42}°C under heavy stress.
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900/50 via-slate-800 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">
              FEATURED RECOMMENDATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              {laptop.name}
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              Workload Fit Score: <strong className="text-emerald-400">{getLaptopMatchScore(laptop)}%</strong> • Price: <strong>₹{getLaptopPrice(laptop).toLocaleString('en-IN')}</strong>
            </p>
          </div>
          {onSelectLaptop && (
            <button
              onClick={() => onSelectLaptop(laptop)}
              className="px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg hover:scale-105 shrink-0 cursor-pointer"
            >
              EXPLORE DETAILS →
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
