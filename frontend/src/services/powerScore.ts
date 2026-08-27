import type { Laptop } from '../types/laptop';
import {
  calculateCpuScore,
  calculateGpuScore,
  calculateRamScore,
  calculateStorageScore,
  calculateThermalScore,
} from './powerDashboard';

export interface PowerScoreBreakdown {
  overallScore: number;
  rating: 'EXCEPTIONAL' | 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'NEEDS IMPROVEMENT';
  cpuScore: number;
  gpuScore: number;
  ramScore: number;
  storageScore: number;
  thermalScore: number;
}

export function getScoreRating(score: number): PowerScoreBreakdown['rating'] {
  if (score >= 90) return 'EXCEPTIONAL';
  if (score >= 80) return 'EXCELLENT';
  if (score >= 70) return 'GOOD';
  if (score >= 60) return 'AVERAGE';
  return 'NEEDS IMPROVEMENT';
}

export function calculatePowerScore(laptop: Laptop): PowerScoreBreakdown {
  const cpuScore = calculateCpuScore(laptop);
  const gpuScore = calculateGpuScore(laptop);
  const ramScore = calculateRamScore(laptop);
  const storageScore = calculateStorageScore(laptop);
  const thermalScore = calculateThermalScore(laptop);

  // Exact Weighted Formula: CPU 30%, GPU 30%, RAM 15%, Storage 10%, Thermal 15%
  const weighted =
    cpuScore * 0.30 +
    gpuScore * 0.30 +
    ramScore * 0.15 +
    storageScore * 0.10 +
    thermalScore * 0.15;

  const overallScore = Math.round(Math.min(100, Math.max(0, weighted)));

  return {
    overallScore,
    rating: getScoreRating(overallScore),
    cpuScore,
    gpuScore,
    ramScore,
    storageScore,
    thermalScore,
  };
}
