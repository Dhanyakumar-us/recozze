import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, RefreshCw, Cpu, Database, Key, Server, Lock } from 'lucide-react';
import type { ApiStatusResult } from '../types/laptop';
import { fetchApiStatus } from '../services/api';

export const ApiStatusDashboard: React.FC = () => {
  const [status, setStatus] = useState<ApiStatusResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const loadStatus = async () => {
    setLoading(true);
    try {
      const res = await fetchApiStatus();
      setStatus(res);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Failed to load API status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, []);

  const apiItems = [
    {
      id: 'gemini_ai',
      name: 'Google Gemini AI Engine',
      category: 'Generative AI Advisor',
      keyName: 'GEMINI_API_KEY',
      icon: Cpu,
      active: status?.gemini_ai,
      desc: 'Powers natural language hardware recommendation responses & spec analysis.',
    },
    {
      id: 'groq_ai',
      name: 'Groq Llama 3 Fast AI',
      category: 'Generative AI Advisor',
      keyName: 'GROQ_API_KEY',
      icon: Cpu,
      active: status?.groq_ai,
      desc: 'High-speed LPU inference engine for sub-second chatbot advice.',
    },
    {
      id: 'openai_ai',
      name: 'OpenAI GPT-4o Engine',
      category: 'Generative AI Advisor',
      keyName: 'OPENAI_API_KEY',
      icon: Cpu,
      active: status?.openai_ai,
      desc: 'Fallback LLM for complex multi-product reasoning & benchmark breakdown.',
    },
    {
      id: 'exchange_rate_api',
      name: 'ExchangeRate API',
      category: 'Multi-Currency Engine',
      keyName: 'EXCHANGE_RATE_API_KEY',
      icon: Server,
      active: status?.exchange_rate_api,
      desc: 'Live real-time forex rates for INR, USD, EUR, GBP, and AED conversions.',
    },
    {
      id: 'rapidapi',
      name: 'RapidAPI Salvage Engine',
      category: 'Live Retailer Scraper',
      keyName: 'RAPIDAPI_KEY',
      icon: Key,
      active: status?.rapidapi,
      desc: 'Scrapes live inventory & salvage listings from partner auto & retailer APIs.',
    },
    {
      id: 'serpapi',
      name: 'SerpAPI Google Shopping',
      category: 'Live Retailer Scraper',
      keyName: 'SERPAPI_KEY',
      icon: Key,
      active: status?.serpapi,
      desc: 'Real-time price monitoring across Amazon India, Flipkart & Vijay Sales.',
    },
    {
      id: 'keepa_api',
      name: 'Keepa Amazon Tracker',
      category: 'Historical Price Index',
      keyName: 'KEEPA_API_KEY',
      icon: Key,
      active: status?.keepa_api,
      desc: 'Tracks 180-day historical price fluctuations & drop alerts.',
    },
    {
      id: 'firebase_auth',
      name: 'Firebase Academic Auth',
      category: 'Student Verification',
      keyName: 'FIREBASE_API_KEY',
      icon: Lock,
      active: status?.firebase_auth,
      desc: 'Validates college .edu and .ac.in credentials for student discounts.',
    },
    {
      id: 'supabase_key',
      name: 'Supabase Secret Service Role',
      category: 'Cloud Database',
      keyName: 'SUPABASE_SECRET_KEY',
      icon: Database,
      active: status?.supabase_key,
      desc: 'Service role secret key for Supabase cloud database & user profiles.',
    },
    {
      id: 'database_url',
      name: 'PostgreSQL / Supabase URL',
      category: 'Cloud Database',
      keyName: 'DATABASE_URL',
      icon: Database,
      active: status?.database_url,
      desc: 'Direct relational database connection string for persistent storage.',
    },
  ];

  const activeCount = apiItems.filter((i) => i.active).length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-4 h-4" />
              <span>RECO SYSTEM INFRASTRUCTURE</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              API Connection & Environment Health
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
              Real-time telemetry monitor checking FastAPI environment key loads, AI provider bindings, and database connection URLs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-slate-400 block font-mono">ACTIVE ENGINES</span>
                <span className="text-xl font-bold font-mono text-emerald-400">
                  {activeCount} / {apiItems.length}
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold font-mono text-sm">
                {Math.round((activeCount / apiItems.length) * 100)}%
              </div>
            </div>

            <button
              onClick={loadStatus}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-blue-600/20 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Status</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {apiItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`relative rounded-2xl p-5 border transition-all duration-300 ${
                item.active
                  ? 'bg-slate-900/60 border-emerald-500/30 hover:border-emerald-500/60 shadow-lg shadow-emerald-950/20'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl border ${
                      item.active
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{item.name}</h3>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                </div>

                {item.active ? (
                  <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    CONNECTED
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-mono font-bold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
                    <XCircle className="w-3.5 h-3.5" />
                    NOT SET
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.desc}</p>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Env Variable:</span>
                <span className="text-slate-200 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {item.keyName}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Info Box */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-blue-400" />
          <span>FastAPI Backend Environment File Location: <code className="text-slate-200">backend/.env</code></span>
        </div>
        {lastUpdated && <span>Last synced: {lastUpdated}</span>}
      </div>
    </div>
  );
};
