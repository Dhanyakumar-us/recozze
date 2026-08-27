import React from 'react';
import { Gauge, Play, RefreshCw } from 'lucide-react';
import type { BenchmarkData } from '../../types/systemMonitor';
import { MetricTooltip } from './MetricTooltip';

interface BenchmarkPanelProps {
  benchmark: BenchmarkData;
  onRunBenchmark: () => void;
}

export const BenchmarkPanel: React.FC<BenchmarkPanelProps> = ({
  benchmark,
  onRunBenchmark,
}) => {
  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                SYNTHETIC BENCHMARK
              </h3>
              <MetricTooltip content="Empirical stress test combining Cinebench R23, 3DMark TimeSpy GPU, and CPU sustained load testing." />
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Reference Baseline: {benchmark.refScore.toLocaleString()}</p>
          </div>
        </div>

        <span className="px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold tracking-wider uppercase">
          {benchmark.rating}
        </span>
      </div>

      {/* Main Score Display */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">SYNTHETIC INDEX SCORE</span>
          <p className="text-3xl font-black font-display text-white tracking-tight">
            {benchmark.score.toLocaleString()}
          </p>
        </div>

        <div className="text-right font-mono text-xs">
          <span className="text-slate-400">Cinebench R23</span>
          <p className="font-bold text-cyan-400">{benchmark.cinebenchR23.toLocaleString()} pts</p>
          <span className="text-slate-400">TimeSpy GPU</span>
          <p className="font-bold text-blue-400">{benchmark.timeSpyGpu.toLocaleString()} pts</p>
        </div>
      </div>

      {/* Benchmark Execution Button */}
      {benchmark.isRunning ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono text-purple-400 font-bold">
            <span className="flex items-center space-x-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>RUNNING BENCHMARK...</span>
            </span>
            <span>{benchmark.progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${benchmark.progress}%` }}
            />
          </div>
        </div>
      ) : (
        <button
          onClick={onRunBenchmark}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold tracking-wider uppercase shadow-lg shadow-purple-500/20 transition-all cursor-pointer flex items-center justify-center space-x-2 active:scale-98"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>RUN BENCHMARK AGAIN</span>
        </button>
      )}
    </div>
  );
};
