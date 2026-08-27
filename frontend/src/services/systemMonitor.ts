import type { Laptop } from '../types/laptop';
import type { PerformanceMode, SystemMetrics } from '../types/systemMonitor';
import {
  getLaptopCpu,
  getLaptopGpu,
  getLaptopTgp,
  getLaptopRam,
  getLaptopSsd,
} from '../utils/laptopUtils';

// Helper for smooth random fluctuations
function smoothFluctuate(current: number, min: number, max: number, maxDelta: number): number {
  const delta = (Math.random() - 0.5) * maxDelta * 2;
  let val = current + delta;
  if (val < min) val = min + Math.random();
  if (val > max) val = max - Math.random();
  return Number(val.toFixed(1));
}

// Initial state creator for a laptop
export function createInitialMetrics(laptop: Laptop, mode: PerformanceMode = 'balanced'): SystemMetrics {
  const tgp = getLaptopTgp(laptop);
  const ramGb = getLaptopRam(laptop);
  const ssdGb = getLaptopSsd(laptop);
  const cpuName = getLaptopCpu(laptop);
  const gpuName = getLaptopGpu(laptop);

  let cpuBaseUsage = 52;
  let gpuBaseUsage = 64;
  let cpuTempBase = 62;
  let gpuTempBase = 58;
  let fanBaseRpm = 3200;

  if (mode === 'silent') {
    cpuBaseUsage = 32;
    gpuBaseUsage = 28;
    cpuTempBase = 46;
    gpuTempBase = 44;
    fanBaseRpm = 2100;
  } else if (mode === 'performance') {
    cpuBaseUsage = 74;
    gpuBaseUsage = 82;
    cpuTempBase = 74;
    gpuTempBase = 71;
    fanBaseRpm = 4200;
  } else if (mode === 'turbo') {
    cpuBaseUsage = 88;
    gpuBaseUsage = 94;
    cpuTempBase = 84;
    gpuTempBase = 81;
    fanBaseRpm = 5300;
  }

  const cinebench = laptop.benchmarks?.cinebenchR23Multi || (laptop as any).benchmarks?.cinebench_r23_multi || 18500;
  const timespy = laptop.benchmarks?.timeSpyGpu || (laptop as any).benchmarks?.time_spy_gpu || 12500;
  const geekbench = laptop.benchmarks?.geekbench6Multi || (laptop as any).benchmarks?.geekbench_6_multi || 14000;

  return {
    timestamp: new Date().toLocaleTimeString(),
    mode,
    isPaused: false,
    cpu: {
      model: cpuName,
      usagePct: cpuBaseUsage,
      clockGHz: mode === 'turbo' ? 5.2 : mode === 'silent' ? 2.8 : 4.2,
      baseClockGHz: 2.6,
      boostClockGHz: 5.4,
      cores: cpuName.includes('24-Core') ? 24 : cpuName.includes('20-Core') ? 20 : 16,
      threads: cpuName.includes('24-Core') ? 32 : 24,
      cacheMb: 36,
      powerW: Math.round(mode === 'turbo' ? 85 : mode === 'silent' ? 25 : 55),
      tempC: cpuTempBase,
    },
    gpu: {
      model: gpuName,
      usagePct: gpuBaseUsage,
      clockGHz: mode === 'turbo' ? 2.5 : 2.2,
      vramUsedGb: Math.round(ramGb * 0.4),
      vramTotalGb: tgp >= 140 ? 12 : 8,
      powerW: Math.round(tgp * (mode === 'turbo' ? 1.0 : mode === 'silent' ? 0.4 : 0.75)),
      tgpWatts: tgp,
      arch: gpuName.includes('Apple') ? 'Apple Unified GPU' : 'NVIDIA Ada Lovelace Architecture',
      tempC: gpuTempBase,
    },
    ram: {
      totalGb: ramGb,
      usedGb: Number((ramGb * 0.58).toFixed(1)),
      speedMHz: 5600,
      type: 'DDR5 Dual-Channel',
      availableGb: Number((ramGb * 0.42).toFixed(1)),
    },
    storage: {
      capacityGb: ssdGb,
      usedPct: 62,
      type: 'PCIe Gen4 NVMe M.2 SSD',
      readSpeedMBs: mode === 'turbo' ? 7100 : 5400,
      writeSpeedMBs: mode === 'turbo' ? 6400 : 4800,
    },
    thermal: {
      cpuTempC: cpuTempBase,
      gpuTempC: gpuTempBase,
      ambientTempC: 24,
      status: cpuTempBase > 80 ? 'HIGH' : cpuTempBase > 70 ? 'WARM' : 'NORMAL',
      vaporChamber: (laptop as any).thermal?.vapor_chamber || false,
      liquidMetal: (laptop as any).thermal?.liquid_metal || false,
      fanCount: laptop.cooling?.fanCount || 2,
      heatpipeCount: laptop.cooling?.heatpipeCount || 5,
      noiseLevelDb: mode === 'silent' ? 32 : mode === 'turbo' ? 51 : 42,
      architectureDesc: (laptop as any).thermal?.architecture_desc || 'High-CFM Dual Fan Cooling Architecture',
    },
    fan: {
      cpuFanRpm: fanBaseRpm,
      gpuFanRpm: fanBaseRpm - 200,
      maxRpm: 6000,
    },
    benchmark: {
      score: Math.round(cinebench * 0.25 + timespy * 0.45),
      refScore: 10000,
      rating: 'EXCELLENT',
      isRunning: false,
      progress: 0,
      cinebenchR23: cinebench,
      timeSpyGpu: timespy,
      geekbench6: geekbench,
    },
  };
}

// Update loop function (smooth noise interpolation)
export function updateSimulatedMetrics(prev: SystemMetrics): SystemMetrics {
  if (prev.isPaused || prev.benchmark.isRunning) return prev;

  const mode = prev.mode;

  let minCpu = 35, maxCpu = 85;
  let minGpu = 40, maxGpu = 92;
  let minTemp = 50, maxTemp = 78;
  let minFan = 2500, maxFan = 4500;

  if (mode === 'silent') {
    minCpu = 15; maxCpu = 45;
    minGpu = 20; maxGpu = 50;
    minTemp = 38; maxTemp = 56;
    minFan = 1800; maxFan = 2600;
  } else if (mode === 'performance') {
    minCpu = 55; maxCpu = 90;
    minGpu = 60; maxGpu = 95;
    minTemp = 65; maxTemp = 82;
    minFan = 3600; maxFan = 4900;
  } else if (mode === 'turbo') {
    minCpu = 75; maxCpu = 98;
    minGpu = 80; maxGpu = 99;
    minTemp = 74; maxTemp = 89;
    minFan = 4800; maxFan = 5900;
  }

  const nextCpuUsage = smoothFluctuate(prev.cpu.usagePct, minCpu, maxCpu, 3);
  const nextGpuUsage = smoothFluctuate(prev.gpu.usagePct, minGpu, maxGpu, 4);
  const nextCpuTemp = smoothFluctuate(prev.cpu.tempC, minTemp, maxTemp, 1.5);
  const nextGpuTemp = smoothFluctuate(prev.gpu.tempC, minTemp - 4, maxTemp - 3, 1.2);
  const nextCpuFan = Math.round(smoothFluctuate(prev.fan.cpuFanRpm, minFan, maxFan, 80));

  let thermalStatus: 'NORMAL' | 'WARM' | 'HIGH' | 'CRITICAL' = 'NORMAL';
  if (nextCpuTemp >= 88) thermalStatus = 'CRITICAL';
  else if (nextCpuTemp >= 80) thermalStatus = 'HIGH';
  else if (nextCpuTemp >= 68) thermalStatus = 'WARM';

  const usedRam = Number(
    smoothFluctuate(prev.ram.usedGb, prev.ram.totalGb * 0.35, prev.ram.totalGb * 0.85, 0.2).toFixed(1)
  );

  return {
    ...prev,
    timestamp: new Date().toLocaleTimeString(),
    cpu: {
      ...prev.cpu,
      usagePct: nextCpuUsage,
      clockGHz: Number(smoothFluctuate(prev.cpu.clockGHz, 3.2, prev.cpu.boostClockGHz, 0.1).toFixed(2)),
      powerW: Math.round(smoothFluctuate(prev.cpu.powerW, 25, 95, 2)),
      tempC: nextCpuTemp,
    },
    gpu: {
      ...prev.gpu,
      usagePct: nextGpuUsage,
      clockGHz: Number(smoothFluctuate(prev.gpu.clockGHz, 1.8, 2.6, 0.05).toFixed(2)),
      vramUsedGb: Number(smoothFluctuate(prev.gpu.vramUsedGb, 2.0, prev.gpu.vramTotalGb * 0.9, 0.2).toFixed(1)),
      powerW: Math.round(smoothFluctuate(prev.gpu.powerW, 35, prev.gpu.tgpWatts, 3)),
      tempC: nextGpuTemp,
    },
    ram: {
      ...prev.ram,
      usedGb: usedRam,
      availableGb: Number((prev.ram.totalGb - usedRam).toFixed(1)),
    },
    thermal: {
      ...prev.thermal,
      cpuTempC: nextCpuTemp,
      gpuTempC: nextGpuTemp,
      status: thermalStatus,
    },
    fan: {
      ...prev.fan,
      cpuFanRpm: nextCpuFan,
      gpuFanRpm: Math.max(1600, nextCpuFan - 250),
    },
  };
}

/**
 * Future Hardware API Bridge placeholders
 * Ready for Desktop (Tauri/Electron/Native C++) integration
 */
export async function getSystemMetricsBridge(): Promise<Partial<SystemMetrics>> {
  console.log('[Native Hardware Bridge]: Simulated fallback active.');
  return {};
}
