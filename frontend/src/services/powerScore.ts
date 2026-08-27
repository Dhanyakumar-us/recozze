import type { Laptop } from '../types/laptop';
import type { PerformanceMode, SystemMetrics, ScoreRating } from '../types/systemMonitor';
import {
  getLaptopTgp,
  getLaptopRam,
  getLaptopSsd,
} from '../utils/laptopUtils';

export interface PowerScoreBreakdown {
  overallScore: number;
  rating: ScoreRating;
  cpuScore: number;
  gpuScore: number;
  ramScore: number;
  storageScore: number;
  thermalScore: number;
}

export function getScoreRating(score: number): ScoreRating {
  if (score >= 90) return 'EXCEPTIONAL';
  if (score >= 80) return 'EXCELLENT';
  if (score >= 70) return 'GOOD';
  if (score >= 60) return 'AVERAGE';
  return 'NEEDS IMPROVEMENT';
}

export function calculatePowerScore(
  laptop: Laptop,
  mode: PerformanceMode = 'balanced',
  metrics?: SystemMetrics
): PowerScoreBreakdown {
  const tgp = getLaptopTgp(laptop);
  const ram = getLaptopRam(laptop);
  const ssd = getLaptopSsd(laptop);

  // 1. CPU Score (0 - 100) based on Cinebench R23 and CPU specs
  const cinebench = laptop.benchmarks?.cinebenchR23Multi || (laptop as any).benchmarks?.cinebench_r23_multi || 18000;
  let rawCpu = (cinebench / 35000) * 100;
  rawCpu = Math.min(100, Math.max(45, rawCpu));

  // 2. GPU Score (0 - 100) based on TGP & 3DMark TimeSpy
  const timeSpy = laptop.benchmarks?.timeSpyGpu || (laptop as any).benchmarks?.time_spy_gpu || 12000;
  let rawGpu = (timeSpy / 22000) * 80 + (tgp / 175) * 20;
  rawGpu = Math.min(100, Math.max(40, rawGpu));

  // 3. RAM Score (0 - 100)
  let rawRam = 60;
  if (ram >= 64) rawRam = 100;
  else if (ram >= 48) rawRam = 96;
  else if (ram >= 32) rawRam = 90;
  else if (ram >= 18) rawRam = 82;
  else if (ram >= 16) rawRam = 75;

  // 4. Storage Score (0 - 100)
  let rawStorage = 70;
  if (ssd >= 2048) rawStorage = 100;
  else if (ssd >= 1024) rawStorage = 90;
  else if (ssd >= 512) rawStorage = 78;

  // 5. Thermal Score (0 - 100) based on noise, surface temp, vapor chamber & liquid metal
  const noise = laptop.cooling?.peakNoiseLevelDb || (laptop as any).thermal?.noise_level_db || 44;
  const temp = laptop.cooling?.maxSurfaceTempC || (laptop as any).thermal?.peak_surface_temp_c || 42;
  const vaporChamber = (laptop as any).thermal?.vapor_chamber || false;
  const liquidMetal = (laptop as any).thermal?.liquid_metal || false;

  let rawThermal = 100 - (noise - 30) * 1.5 - (temp - 30) * 1.2;
  if (vaporChamber) rawThermal += 10;
  if (liquidMetal) rawThermal += 8;
  rawThermal = Math.min(100, Math.max(50, rawThermal));

  // Performance mode multipliers
  let modeMultiplier = 1.0;
  if (mode === 'turbo') modeMultiplier = 1.06;
  else if (mode === 'performance') modeMultiplier = 1.03;
  else if (mode === 'silent') modeMultiplier = 0.90;

  // Dynamic metric influence (if live metrics are provided)
  if (metrics) {
    const cpuLoadPen = (metrics.cpu.usagePct / 100) * 2;
    const gpuLoadPen = (metrics.gpu.usagePct / 100) * 2;
    rawCpu += cpuLoadPen;
    rawGpu += gpuLoadPen;
  }

  const cpuScore = Math.round(Math.min(100, rawCpu * modeMultiplier));
  const gpuScore = Math.round(Math.min(100, rawGpu * modeMultiplier));
  const ramScore = Math.round(Math.min(100, rawRam));
  const storageScore = Math.round(Math.min(100, rawStorage));
  const thermalScore = Math.round(Math.min(100, rawThermal));

  // Weightings: CPU 30%, GPU 30%, RAM 15%, Storage 10%, Thermal 15%
  const weightedScore =
    cpuScore * 0.30 +
    gpuScore * 0.30 +
    ramScore * 0.15 +
    storageScore * 0.10 +
    thermalScore * 0.15;

  const overallScore = Math.min(99, Math.max(55, Math.round(weightedScore)));
  const rating = getScoreRating(overallScore);

  return {
    overallScore,
    rating,
    cpuScore,
    gpuScore,
    ramScore,
    storageScore,
    thermalScore,
  };
}
