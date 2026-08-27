import type { Laptop } from '../types/laptop';
import { calculatePowerScore, getScoreRating } from './powerScore';

export interface UseCaseScore {
  category: 'Gaming' | 'Programming' | 'Video Editing' | 'AI / ML' | 'Multitasking';
  score: number; // out of 10
  rating: 'EXCEPTIONAL' | 'EXCELLENT' | 'GOOD' | 'AVERAGE' | 'NEEDS IMPROVEMENT';
  cpuImpactPct: number;
  gpuImpactPct: number;
  ramImpactPct: number;
  storageImpactPct: number;
  recommendedWorkload: string;
  limitations: string;
}

export function calculateUseCaseScores(laptop: Laptop): UseCaseScore[] {
  const breakdown = calculatePowerScore(laptop);
  const { cpuScore, gpuScore, ramScore, storageScore } = breakdown;

  // Scale 0-100 down to 0-10
  const cpu10 = cpuScore / 10;
  const gpu10 = gpuScore / 10;
  const ram10 = ramScore / 10;
  const storage10 = storageScore / 10;

  // 1. Gaming: GPU 50%, CPU 30%, RAM 10%, Storage 10%
  const gamingVal = Number((gpu10 * 0.50 + cpu10 * 0.30 + ram10 * 0.10 + storage10 * 0.10).toFixed(1));

  // 2. Programming: CPU 40%, RAM 30%, Storage 20%, GPU 10%
  const progVal = Number((cpu10 * 0.40 + ram10 * 0.30 + storage10 * 0.20 + gpu10 * 0.10).toFixed(1));

  // 3. Video Editing: GPU 35%, CPU 30%, RAM 25%, Storage 10%
  const videoVal = Number((gpu10 * 0.35 + cpu10 * 0.30 + ram10 * 0.25 + storage10 * 0.10).toFixed(1));

  // 4. AI / ML: GPU 50%, RAM 25%, CPU 20%, Storage 5%
  const aiVal = Number((gpu10 * 0.50 + ram10 * 0.25 + cpu10 * 0.20 + storage10 * 0.05).toFixed(1));

  // 5. Multitasking: RAM 40%, CPU 35%, Storage 20%, GPU 5%
  const multiVal = Number((ram10 * 0.40 + cpu10 * 0.35 + storage10 * 0.20 + gpu10 * 0.05).toFixed(1));

  return [
    {
      category: 'Gaming',
      score: gamingVal,
      rating: getScoreRating(gamingVal * 10),
      cpuImpactPct: 30,
      gpuImpactPct: 50,
      ramImpactPct: 10,
      storageImpactPct: 10,
      recommendedWorkload: 'AAA High-FPS Gaming, Ray Tracing & Esports Titles',
      limitations: gpu10 < 7.5 ? 'Lower GPU TGP may require DLSS or reduced graphics settings' : 'Handles high-resolution 1440p/4K gaming smoothly',
    },
    {
      category: 'Programming',
      score: progVal,
      rating: getScoreRating(progVal * 10),
      cpuImpactPct: 40,
      gpuImpactPct: 10,
      ramImpactPct: 30,
      storageImpactPct: 20,
      recommendedWorkload: 'Multi-threaded Code Compiling, Docker Containers & IDE Workflows',
      limitations: cpu10 < 7.0 ? 'Parallel compilation builds may take longer' : 'High core count speeds up multi-project compilation',
    },
    {
      category: 'Video Editing',
      score: videoVal,
      rating: getScoreRating(videoVal * 10),
      cpuImpactPct: 30,
      gpuImpactPct: 35,
      ramImpactPct: 25,
      storageImpactPct: 10,
      recommendedWorkload: '4K/8K Video Timeline Editing, Color Grading & After Effects Rendering',
      limitations: ram10 < 8.0 ? 'Complex 4K timelines benefit from upgrading to 32GB+ RAM' : 'Optimal hardware encoder throughput for fast video export',
    },
    {
      category: 'AI / ML',
      score: aiVal,
      rating: getScoreRating(aiVal * 10),
      cpuImpactPct: 20,
      gpuImpactPct: 50,
      ramImpactPct: 25,
      storageImpactPct: 5,
      recommendedWorkload: 'Local LLM Inference, PyTorch Model Training & CUDA Acceleration',
      limitations: gpu10 < 8.0 ? 'VRAM buffer limits large LLM parameter weights' : 'High VRAM bandwidth for local AI inference & model fine-tuning',
    },
    {
      category: 'Multitasking',
      score: multiVal,
      rating: getScoreRating(multiVal * 10),
      cpuImpactPct: 35,
      gpuImpactPct: 5,
      ramImpactPct: 40,
      storageImpactPct: 20,
      recommendedWorkload: '50+ Browser Tabs, Background Database Ingestion & Multi-Display Work',
      limitations: ram10 < 7.5 ? 'RAM capacity may bottleneck heavy browser tab loads' : 'Smooth multi-application context switching',
    },
  ];
}
