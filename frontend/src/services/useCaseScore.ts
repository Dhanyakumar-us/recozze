import type { Laptop } from '../types/laptop';
import type { PerformanceMode, UseCaseScore, SystemMetrics } from '../types/systemMonitor';
import { calculatePowerScore, getScoreRating } from './powerScore';

export function calculateUseCaseScores(
  laptop: Laptop,
  mode: PerformanceMode = 'balanced',
  metrics?: SystemMetrics
): UseCaseScore[] {
  const breakdown = calculatePowerScore(laptop, mode, metrics);
  const { cpuScore, gpuScore, ramScore, storageScore } = breakdown;

  // Normalize scores (0-100 to 0-10)
  const cpu10 = cpuScore / 10;
  const gpu10 = gpuScore / 10;
  const ram10 = ramScore / 10;
  const storage10 = storageScore / 10;

  // 1. Gaming: GPU 50%, CPU 25%, RAM 15%, Storage 10%
  const gamingVal = Number((gpu10 * 0.50 + cpu10 * 0.25 + ram10 * 0.15 + storage10 * 0.10).toFixed(1));
  
  // 2. Programming: CPU 40%, RAM 30%, Storage 20%, GPU 10%
  const progVal = Number((cpu10 * 0.40 + ram10 * 0.30 + storage10 * 0.20 + gpu10 * 0.10).toFixed(1));

  // 3. Video Editing: GPU 35%, CPU 30%, RAM 25%, Storage 10%
  const videoVal = Number((gpu10 * 0.35 + cpu10 * 0.30 + ram10 * 0.25 + storage10 * 0.10).toFixed(1));

  // 4. AI / ML: GPU 50%, RAM 25%, CPU 20%, Storage 5%
  const aiVal = Number((gpu10 * 0.50 + ram10 * 0.25 + cpu10 * 0.20 + storage10 * 0.05).toFixed(1));

  // 5. Multitasking: RAM 40%, CPU 35%, Storage 15%, GPU 10%
  const multiVal = Number((ram10 * 0.40 + cpu10 * 0.35 + storage10 * 0.15 + gpu10 * 0.10).toFixed(1));

  return [
    {
      category: 'Gaming',
      score: gamingVal,
      rating: getScoreRating(gamingVal * 10),
      cpuImpactPct: 25,
      gpuImpactPct: 50,
      ramImpactPct: 15,
      recommendedWorkload: 'AAA Title Gaming, High Frame-rate Esports & Ray Tracing',
      limitations: gpu10 < 7.5 ? 'Lower GPU TGP may require DLSS or reduced resolution' : 'None detected; high-TGP graphics card handles max settings',
    },
    {
      category: 'Programming',
      score: progVal,
      rating: getScoreRating(progVal * 10),
      cpuImpactPct: 40,
      gpuImpactPct: 10,
      ramImpactPct: 30,
      recommendedWorkload: 'Multi-threaded Code Compiling, Docker Containers & Virtual Machines',
      limitations: cpu10 < 7.0 ? 'High core count tasks could take longer during parallel builds' : 'Fast multi-core compilation speeds',
    },
    {
      category: 'Video Editing',
      score: videoVal,
      rating: getScoreRating(videoVal * 10),
      cpuImpactPct: 30,
      gpuImpactPct: 35,
      ramImpactPct: 25,
      recommendedWorkload: '4K/8K Video Timeline Editing, Color Grading & After Effects Rendering',
      limitations: ram10 < 8.0 ? 'Complex 4K timelines benefit from upgrading to 32GB+ RAM' : 'Optimal unified memory bandwidth for heavy exports',
    },
    {
      category: 'AI / ML',
      score: aiVal,
      rating: getScoreRating(aiVal * 10),
      cpuImpactPct: 20,
      gpuImpactPct: 50,
      ramImpactPct: 25,
      recommendedWorkload: 'Local LLM Inference, PyTorch Model Training & CUDA Acceleration',
      limitations: gpu10 < 8.5 ? 'VRAM buffer (8GB) limits large LLM parameter weights' : 'Capable of high-speed local inference & matrix tensor operations',
    },
    {
      category: 'Multitasking',
      score: multiVal,
      rating: getScoreRating(multiVal * 10),
      cpuImpactPct: 35,
      gpuImpactPct: 10,
      ramImpactPct: 40,
      recommendedWorkload: '50+ Browser Tabs, Discord, IDE & Background Data Ingestion',
      limitations: ram10 < 7.5 ? 'High memory utilization under heavy browser tab loads' : 'Smooth multi-monitor workflow switching',
    },
  ];
}
