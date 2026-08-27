import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import { BarChart3, Target } from 'lucide-react';
import type { PowerScoreBreakdown } from '../../services/powerScore';
import type { UseCaseScore } from '../../services/useCaseScore';

interface PerformanceChartProps {
  breakdown: PowerScoreBreakdown;
  useCaseScores: UseCaseScore[];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  breakdown,
  useCaseScores,
}) => {
  // Static data array for Component Scores Bar Chart
  const componentData = [
    { name: 'CPU', score: breakdown.cpuScore, fill: '#06b6d4' },
    { name: 'GPU', score: breakdown.gpuScore, fill: '#3b82f6' },
    { name: 'RAM', score: breakdown.ramScore, fill: '#6366f1' },
    { name: 'Storage', score: breakdown.storageScore, fill: '#10b981' },
    { name: 'Thermal', score: breakdown.thermalScore, fill: '#a855f7' },
  ];

  // Static data array for Use Case Radar Chart
  const radarData = useCaseScores.map((u) => ({
    subject: u.category,
    score: u.score * 10,
    fullMark: 100,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 1. Component Performance Index Bar Chart */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
              COMPONENT PERFORMANCE BREAKDOWN
            </h3>
            <p className="text-[10px] text-slate-400 font-mono">Specification Index Scores (0–100)</p>
          </div>
        </div>

        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={componentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11, fill: '#cbd5e1' }} />
              <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fontSize: 10, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                }}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]} isAnimationActive={true} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Use Case Workload Radar Chart */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
              WORKLOAD CAPABILITY PROFILE
            </h3>
            <p className="text-[10px] text-slate-400 font-mono">5-Axis Workload Suitability</p>
          </div>
        </div>

        <div className="h-56 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#1e293b" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={false} />
              <Radar
                name="Suitability"
                dataKey="score"
                stroke="#a855f7"
                fill="#a855f7"
                fillOpacity={0.3}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '0.75rem',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
