export type PerformanceMode = 'silent' | 'balanced' | 'performance' | 'turbo';

export type ThermalStatus = 'NORMAL' | 'WARM' | 'HIGH' | 'CRITICAL';
export type ScoreRating = 'EXCEPTIONAL' | 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'NEEDS IMPROVEMENT';

export interface CPUData {
  model: string;
  usagePct: number;
  clockGHz: number;
  baseClockGHz: number;
  boostClockGHz: number;
  cores: number;
  threads: number;
  cacheMb: number;
  powerW: number;
  tempC: number;
}

export interface GPUData {
  model: string;
  usagePct: number;
  clockGHz: number;
  vramUsedGb: number;
  vramTotalGb: number;
  powerW: number;
  tgpWatts: number;
  arch: string;
  tempC: number;
}

export interface RAMData {
  totalGb: number;
  usedGb: number;
  speedMHz: number;
  type: string;
  availableGb: number;
}

export interface StorageData {
  capacityGb: number;
  usedPct: number;
  type: string;
  readSpeedMBs: number;
  writeSpeedMBs: number;
}

export interface ThermalData {
  cpuTempC: number;
  gpuTempC: number;
  ambientTempC: number;
  status: ThermalStatus;
  vaporChamber: boolean;
  liquidMetal: boolean;
  fanCount: number;
  heatpipeCount: number;
  noiseLevelDb: number;
  architectureDesc: string;
}

export interface FanData {
  cpuFanRpm: number;
  gpuFanRpm: number;
  maxRpm: number;
}

export interface BenchmarkData {
  score: number;
  refScore: number;
  rating: ScoreRating;
  isRunning: boolean;
  progress: number;
  cinebenchR23: number;
  timeSpyGpu: number;
  geekbench6: number;
}

export interface UseCaseScore {
  category: 'Gaming' | 'Programming' | 'Video Editing' | 'AI / ML' | 'Multitasking';
  score: number; // out of 10
  rating: ScoreRating;
  cpuImpactPct: number;
  gpuImpactPct: number;
  ramImpactPct: number;
  recommendedWorkload: string;
  limitations: string;
}

export interface SystemMetrics {
  timestamp: string;
  mode: PerformanceMode;
  cpu: CPUData;
  gpu: GPUData;
  ram: RAMData;
  storage: StorageData;
  thermal: ThermalData;
  fan: FanData;
  benchmark: BenchmarkData;
  isPaused: boolean;
}

export interface MetricHistoryPoint {
  time: string;
  cpuUsage: number;
  gpuUsage: number;
  ramUsage: number;
  cpuTemp: number;
  gpuTemp: number;
  fanRpm: number;
}

export interface DashboardSettings {
  intervalMs: number;
  animationIntensity: 'low' | 'medium' | 'high';
  showSimulatedDataBadge: boolean;
  reducedMotion: boolean;
}
