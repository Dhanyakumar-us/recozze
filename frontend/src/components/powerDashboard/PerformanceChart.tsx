import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Activity } from 'lucide-react';
import type { MetricHistoryPoint } from '../../types/systemMonitor';
import { MetricTooltip } from './MetricTooltip';

interface PerformanceChartProps {
  history: MetricHistoryPoint[];
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({ history }) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                REAL-TIME TELEMETRY HISTORY
              </h3>
              <MetricTooltip content="Live stream of simulated CPU usage %, GPU usage %, and CPU temperature °C over the last 60 seconds." />
            </div>
            <p className="text-[10px] text-slate-400 font-mono">60-Second Telemetry Stream</p>
          </div>
        </div>

        {/* Legend Pills */}
        <div className="flex items-center space-x-3 text-[10px] font-mono">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" />
            <span className="text-slate-300">CPU Usage</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
            <span className="text-slate-300">GPU Usage</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="text-slate-300">Temp °C</span>
          </div>
        </div>
      </div>

      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.5} />
            <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 9, fill: '#64748b' }} />
            <YAxis domain={[0, 100]} stroke="#64748b" tick={{ fontSize: 9, fill: '#64748b' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: '#334155',
                borderRadius: '0.75rem',
                fontSize: '11px',
                fontFamily: 'monospace',
              }}
            />
            <Line
              type="monotone"
              dataKey="cpuUsage"
              name="CPU Usage %"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="gpuUsage"
              name="GPU Usage %"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="cpuTemp"
              name="CPU Temp °C"
              stroke="#f43f5e"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
