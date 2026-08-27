import type { Laptop } from '../types/laptop';
import type { PerformanceMode, SystemMetrics } from '../types/systemMonitor';
import { getLaptopTgp } from '../utils/laptopUtils';
import { calculatePowerScore } from './powerScore';

export function simulateBenchmarkStep(
  prev: SystemMetrics,
  progress: number
): SystemMetrics {
  const isHighLoad = progress > 15 && progress < 90;
  
  const targetCpuUsage = isHighLoad ? Math.min(100, Math.round(88 + Math.random() * 11)) : 50;
  const targetGpuUsage = isHighLoad ? Math.min(100, Math.round(90 + Math.random() * 9)) : 45;
  const targetCpuTemp = isHighLoad ? Math.min(92, Math.round(76 + (progress / 100) * 14)) : 62;
  const targetGpuTemp = isHighLoad ? Math.min(88, Math.round(72 + (progress / 100) * 12)) : 58;
  const targetFanRpm = isHighLoad ? Math.min(6000, Math.round(4800 + (progress / 100) * 1000)) : 3200;

  return {
    ...prev,
    timestamp: new Date().toLocaleTimeString(),
    cpu: {
      ...prev.cpu,
      usagePct: targetCpuUsage,
      tempC: targetCpuTemp,
      powerW: isHighLoad ? 95 : 45,
    },
    gpu: {
      ...prev.gpu,
      usagePct: targetGpuUsage,
      tempC: targetGpuTemp,
      powerW: isHighLoad ? prev.gpu.tgpWatts : Math.round(prev.gpu.tgpWatts * 0.5),
    },
    thermal: {
      ...prev.thermal,
      cpuTempC: targetCpuTemp,
      gpuTempC: targetGpuTemp,
      status: targetCpuTemp > 85 ? 'HIGH' : targetCpuTemp > 75 ? 'WARM' : 'NORMAL',
    },
    fan: {
      ...prev.fan,
      cpuFanRpm: targetFanRpm,
      gpuFanRpm: Math.max(1600, targetFanRpm - 200),
    },
    benchmark: {
      ...prev.benchmark,
      isRunning: true,
      progress,
    },
  };
}

export function finalizeBenchmark(
  laptop: Laptop,
  mode: PerformanceMode,
  metrics: SystemMetrics
): SystemMetrics {
  const tgp = getLaptopTgp(laptop);
  const cinebench = laptop.benchmarks?.cinebenchR23Multi || (laptop as any).benchmarks?.cinebench_r23_multi || 18500;
  const timeSpy = laptop.benchmarks?.timeSpyGpu || (laptop as any).benchmarks?.time_spy_gpu || 12500;

  // Realistic score calculation based on components
  let rawScore = Math.round(cinebench * 0.22 + timeSpy * 0.42 + tgp * 15);
  
  if (mode === 'turbo') rawScore = Math.round(rawScore * 1.08);
  else if (mode === 'performance') rawScore = Math.round(rawScore * 1.04);
  else if (mode === 'silent') rawScore = Math.round(rawScore * 0.88);

  const breakdown = calculatePowerScore(laptop, mode, metrics);

  return {
    ...metrics,
    timestamp: new Date().toLocaleTimeString(),
    benchmark: {
      ...metrics.benchmark,
      score: rawScore,
      refScore: 10000,
      rating: breakdown.rating,
      isRunning: false,
      progress: 100,
    },
    cpu: { ...metrics.cpu, usagePct: 52, tempC: 62 },
    gpu: { ...metrics.gpu, usagePct: 60, tempC: 58 },
    thermal: { ...metrics.thermal, cpuTempC: 62, gpuTempC: 58, status: 'NORMAL' },
    fan: { ...metrics.fan, cpuFanRpm: 3400, gpuFanRpm: 3200 },
  };
}
