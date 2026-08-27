import React from 'react';
import type { Laptop } from '../../types/laptop';

import { calculatePowerScore } from '../../services/powerScore';
import { calculateUseCaseScores } from '../../services/useCaseScore';
import { getSpecDetails } from '../../services/powerDashboard';

import { DashboardHeader } from './DashboardHeader';
import { PowerGauge } from './PowerGauge';
import { CPUPerformanceCard } from './CPUPerformanceCard';
import { GPUPerformanceCard } from './GPUPerformanceCard';
import { RAMPerformanceCard } from './RAMPerformanceCard';
import { StoragePerformanceCard } from './StoragePerformanceCard';
import { UseCasePanel } from './UseCasePanel';
import { ThermalPanel } from './ThermalPanel';
import { EstimatedPerformancePanel } from './EstimatedPerformancePanel';
import { PerformanceChart } from './PerformanceChart';
import { LaptopDetails } from './LaptopDetails';
import { RecoInsight } from './RecoInsight';
import { ComparisonPanel } from './ComparisonPanel';
import { getLaptopImage } from '../../utils/laptopUtils';

interface PowerDashboardProps {
  selectedLaptop: Laptop;
  allLaptops: Laptop[];
  onSelectLaptop: (laptop: Laptop) => void;
  onBackToLaptop: () => void;
  onOpenCompare: () => void;
  onOpenChat: () => void;
}

export const PowerDashboard: React.FC<PowerDashboardProps> = ({
  selectedLaptop,
  allLaptops,
  onSelectLaptop,
  onBackToLaptop,
  onOpenCompare,
  onOpenChat,
}) => {
  // Static calculations from dataset specifications
  const powerBreakdown = calculatePowerScore(selectedLaptop);
  const useCaseScores = calculateUseCaseScores(selectedLaptop);
  const specDetails = getSpecDetails(selectedLaptop);

  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100 relative overflow-hidden font-sans selection:bg-cyan-500 selection:text-slate-950 pt-20 pb-16">
      {/* Background Cyber Tech Grid Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/30 via-slate-950 to-[#05070D] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Header Bar */}
      <DashboardHeader
        laptop={selectedLaptop}
        allLaptops={allLaptops}
        onSelectLaptop={onSelectLaptop}
        onBackToLaptop={onBackToLaptop}
        onOpenCompare={onOpenCompare}
        onOpenChat={onOpenChat}
      />

      {/* Main Dashboard Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8 animate-in fade-in zoom-in-95 duration-500">
        {/* Top 3-Column Core Specification Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: System Component Cards (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                SPECIFICATION INDEX
              </h2>
              <span className="text-[10px] font-mono text-slate-500">STATIC METRICS</span>
            </div>

            <CPUPerformanceCard
              cpuName={specDetails.cpuName}
              score={powerBreakdown.cpuScore}
              specs={specDetails}
            />
            <GPUPerformanceCard
              gpuName={specDetails.gpuName}
              score={powerBreakdown.gpuScore}
              specs={specDetails}
            />
            <RAMPerformanceCard
              ramGb={specDetails.ramGb}
              score={powerBreakdown.ramScore}
              specs={specDetails}
            />
            <StoragePerformanceCard
              storageGb={specDetails.storageGb}
              score={powerBreakdown.storageScore}
              specs={specDetails}
            />
          </div>

          {/* CENTER COLUMN: Power Score Gauge & Laptop Showcase (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col items-center">
            {/* Overall Power Score Gauge */}
            <div className="w-full">
              <PowerGauge breakdown={powerBreakdown} />
            </div>

            {/* Laptop Product Showcase Box */}
            <div className="w-full p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center relative overflow-hidden group">
              <div className="relative w-full h-48 sm:h-56 mb-4 flex items-center justify-center">
                <img
                  src={getLaptopImage(selectedLaptop)}
                  alt={selectedLaptop.name}
                  className="max-h-full max-w-full object-contain rounded-2xl drop-shadow-[0_20px_30px_rgba(6,182,212,0.25)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <span className="px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-widest mb-1">
                {selectedLaptop.brand}
              </span>
              <h3 className="text-lg font-bold font-display text-white line-clamp-1">
                {selectedLaptop.name}
              </h3>

              <div className="mt-3 grid grid-cols-2 gap-2 w-full text-xs font-mono pt-3 border-t border-slate-800/80">
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-left">
                  <span className="text-[9px] text-slate-500 uppercase block">CPU</span>
                  <span className="font-bold text-slate-300 line-clamp-1">{specDetails.cpuName}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-left">
                  <span className="text-[9px] text-slate-500 uppercase block">GPU</span>
                  <span className="font-bold text-cyan-400 line-clamp-1">{specDetails.gpuName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Performance by Use Case (4 Cols) */}
          <div className="lg:col-span-4">
            <UseCasePanel scores={useCaseScores} />
          </div>
        </div>

        {/* MIDDLE SECTION: Static Recharts Charts & Panels */}
        <PerformanceChart breakdown={powerBreakdown} useCaseScores={useCaseScores} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ThermalPanel specs={specDetails} />
          <EstimatedPerformancePanel specs={specDetails} overallScore={powerBreakdown.overallScore} />
        </div>

        {/* RECO INSIGHT Analysis */}
        <RecoInsight
          breakdown={powerBreakdown}
          ramGb={specDetails.ramGb}
          gpuName={specDetails.gpuName}
        />

        {/* Side-by-Side Laptop Comparison Panel */}
        <ComparisonPanel laptopA={selectedLaptop} allLaptops={allLaptops} />

        {/* Hardware Specifications Record */}
        <LaptopDetails laptop={selectedLaptop} />
      </main>
    </div>
  );
};
