import React from 'react';
import { Sparkles, AlertCircle, CheckCircle2, Cpu } from 'lucide-react';
import type { SystemMetrics } from '../../types/systemMonitor';
import type { PowerScoreBreakdown } from '../../services/powerScore';

interface RecommendationPanelProps {
  metrics: SystemMetrics;
  breakdown: PowerScoreBreakdown;
}

export const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  metrics,
  breakdown,
}) => {
  const getDynamicInsight = () => {
    const { overallScore } = breakdown;
    const { cpuTempC, status } = metrics.thermal;

    if (status === 'CRITICAL' || cpuTempC > 85) {
      return {
        icon: AlertCircle,
        color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
        title: 'Thermal Throttling Alert',
        message:
          'High temperature detected (>85°C). Consider switching to Turbo mode to elevate fan curves or elevate laptop rear for airflow.',
      };
    }

    if (overallScore >= 90) {
      return {
        icon: CheckCircle2,
        color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
        title: 'Exceptional Workstation Class Performance',
        message:
          'Your laptop is performing at peak capacity with an unlocked TGP and multi-core CPU index. Ideal for 4K video editing, local LLM inference, and AAA gaming.',
      };
    }

    if (overallScore >= 80) {
      return {
        icon: Sparkles,
        color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        title: 'Great All-Around Power Evaluation',
        message:
          'Excellent CPU and GPU thermal balance. Handles modern workload tasks effortlessly with stable acoustic noise levels.',
      };
    }

    if (metrics.ram.usedGb / metrics.ram.totalGb > 0.8) {
      return {
        icon: Cpu,
        color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        title: 'Memory Capacity Utilization High',
        message:
          'RAM usage is exceeding 80%. Upgrading or expanding RAM capacity will improve multi-container programming and heavy multitasking.',
      };
    }

    return {
      icon: Sparkles,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      title: 'Stable System Operational State',
      message:
        'Laptop is running cleanly within thermal limits. Toggle Performance or Turbo mode for demanding rendering or esports matches.',
    };
  };

  const insight = getDynamicInsight();
  const IconComp = insight.icon;

  return (
    <div className={`p-5 rounded-2xl border backdrop-blur-xl ${insight.color} flex items-start space-x-4`}>
      <div className="p-2.5 rounded-xl bg-slate-950/60 border border-current shrink-0">
        <IconComp className="w-5 h-5" />
      </div>

      <div className="space-y-1">
        <div className="flex items-center space-x-2 font-mono">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            RECO INSIGHT DIAGNOSTIC
          </span>
        </div>
        <h4 className="text-sm font-bold text-white font-display">{insight.title}</h4>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">{insight.message}</p>
      </div>
    </div>
  );
};
