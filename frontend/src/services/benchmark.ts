import type { Laptop } from '../types/laptop';
import { calculatePowerScore } from './powerScore';

export function calculateStaticBenchmarkScore(laptop: Laptop): number {
  const breakdown = calculatePowerScore(laptop);
  return breakdown.overallScore * 100;
}
