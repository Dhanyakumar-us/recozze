import React, { useState, useEffect, useCallback } from 'react';
import type { Laptop } from '../../types/laptop';
import type { PerformanceMode, SystemMetrics, MetricHistoryPoint, DashboardSettings } from '../../types/systemMonitor';

import { createInitialMetrics, updateSimulatedMetrics } from '../../services/systemMonitor';
import { calculatePowerScore } from '../../services/powerScore';
import { calculateUseCaseScores } from '../../services/useCaseScore';
import { simulateBenchmarkStep, finalizeBenchmark } from '../../services/benchmark';

import { DashboardHeader } from './DashboardHeader';
import { PowerGauge } from './PowerGauge';
import { CPUCard } from './CPUCard';
import { GPUCard } from './GPUCard';
import { RAMCard } from './RAMCard';
import { StorageCard } from './StorageCard';
import { UseCasePanel } from './UseCasePanel';
import { ThermalPanel } from './ThermalPanel';
import { FanSpeedPanel } from './FanSpeedPanel';
import { BenchmarkPanel } from './BenchmarkPanel';
import { PerformanceChart } from './PerformanceChart';
import { LaptopDetailsPanel } from './LaptopDetailsPanel';
import { RecommendationPanel } from './RecommendationPanel';
import { SettingsPanel } from './SettingsPanel';
import { getLaptopCpu, getLaptopGpu, getLaptopImage } from '../../utils/laptopUtils';

interface PowerDashboardProps {
  selectedLaptop: Laptop;
  allLaptops: Laptop[];
  onSelectLaptop: (laptop: Laptop) => void;
}

export const PowerDashboard: React.FC<PowerDashboardProps> = ({
  selectedLaptop,
  allLaptops,
  onSelectLaptop,
}) => {
  const [mode, setMode] = useState<PerformanceMode>('balanced');
  const [metrics, setMetrics] = useState<SystemMetrics>(() =>
    createInitialMetrics(selectedLaptop, 'balanced')
  );

  const [history, setHistory] = useState<MetricHistoryPoint[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<DashboardSettings>({
    intervalMs: 2000,
    animationIntensity: 'medium',
    showSimulatedDataBadge: true,
    reducedMotion: false,
  });

  // Re-initialize metrics when selected laptop or mode changes
  useEffect(() => {
    setMetrics(createInitialMetrics(selectedLaptop, mode));
    setHistory([]);
  }, [selectedLaptop.id, mode]);

  // Live telemetry loop
  useEffect(() => {
    if (metrics.isPaused || metrics.benchmark.isRunning) return;

    const interval = setInterval(() => {
      setMetrics((prev) => {
        const next = updateSimulatedMetrics(prev);
        
        // Append history point
        setHistory((prevHist) => {
          const newPoint: MetricHistoryPoint = {
            time: next.timestamp.split(' ')[0],
            cpuUsage: next.cpu.usagePct,
            gpuUsage: next.gpu.usagePct,
            ramUsage: Math.round((next.ram.usedGb / next.ram.totalGb) * 100),
            cpuTemp: next.thermal.cpuTempC,
            gpuTemp: next.thermal.gpuTempC,
            fanRpm: next.fan.cpuFanRpm,
          };
          const updated = [...prevHist, newPoint];
          return updated.slice(-20); // Keep last 20 points (~40-60s)
        });

        return next;
      });
    }, settings.intervalMs);

    return () => clearInterval(interval);
  }, [metrics.isPaused, metrics.benchmark.isRunning, settings.intervalMs]);

  // Benchmark execution runner
  const handleRunBenchmark = useCallback(() => {
    if (metrics.benchmark.isRunning) return;

    setMetrics((prev) => ({
      ...prev,
      benchmark: { ...prev.benchmark, isRunning: true, progress: 0 },
    }));

    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      const progress = Math.min(100, step * 10);

      setMetrics((prev) => simulateBenchmarkStep(prev, progress));

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setMetrics((prev) => finalizeBenchmark(selectedLaptop, mode, prev));
        }, 400);
      }
    }, 400);
  }, [metrics.benchmark.isRunning, selectedLaptop, mode]);

  const handleRefresh = () => {
    setMetrics(createInitialMetrics(selectedLaptop, mode));
  };

  const handleTogglePause = () => {
    setMetrics((prev) => ({ ...prev, isPaused: !prev.isPaused }));
  };

  const powerBreakdown = calculatePowerScore(selectedLaptop, mode, metrics);
  const useCaseScores = calculateUseCaseScores(selectedLaptop, mode, metrics);

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
        mode={mode}
        onChangeMode={setMode}
        lastUpdated={metrics.timestamp}
        isPaused={metrics.isPaused}
        onTogglePause={handleTogglePause}
        onRefresh={handleRefresh}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Dashboard Layout */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Top 3-Column Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: System Component Cards (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                SYSTEM COMPONENTS
              </h2>
              <span className="text-[10px] font-mono text-slate-500">HARDWARE METRICS</span>
            </div>

            <CPUCard cpu={metrics.cpu} />
            <GPUCard gpu={metrics.gpu} />
            <RAMCard ram={metrics.ram} />
            <StorageCard storage={metrics.storage} />
          </div>

          {/* CENTER COLUMN: Power Score Gauge & Laptop Showcase (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col items-center">
            {/* Overall Power Score Semicircular Gauge */}
            <div className="w-full">
              <PowerGauge breakdown={powerBreakdown} />
            </div>

            {/* Laptop Product Showcase Box */}
            <div className="w-full p-6 rounded-3xl bg-slate-900/60 border border-cyan-500/20 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center relative overflow-hidden group">
              {/* Animated Scan Line Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-12 animate-pulse pointer-events-none" />

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
                  <span className="font-bold text-slate-300 line-clamp-1">{getLaptopCpu(selectedLaptop)}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-left">
                  <span className="text-[9px] text-slate-500 uppercase block">GPU</span>
                  <span className="font-bold text-cyan-400 line-clamp-1">{getLaptopGpu(selectedLaptop)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Performance by Use Case (4 Cols) */}
          <div className="lg:col-span-4">
            <UseCasePanel scores={useCaseScores} />
          </div>
        </div>

        {/* BOTTOM SECTION GRID: Telemetry, Thermals, Fans & Benchmark */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ThermalPanel thermal={metrics.thermal} />
          <FanSpeedPanel fan={metrics.fan} />
          <BenchmarkPanel benchmark={metrics.benchmark} onRunBenchmark={handleRunBenchmark} />
        </div>

        {/* Live Telemetry Chart */}
        <PerformanceChart history={history} />

        {/* Dynamic RECO Diagnostic Insight */}
        <RecommendationPanel metrics={metrics} breakdown={powerBreakdown} />

        {/* Selected Laptop Specifications Table */}
        <LaptopDetailsPanel laptop={selectedLaptop} />
      </main>

      {/* Working Settings Panel Modal */}
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={(upd) => setSettings((prev) => ({ ...prev, ...upd }))}
        onReset={handleRefresh}
      />
    </div>
  );
};
