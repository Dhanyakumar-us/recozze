import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Scale, DollarSign, Activity, GraduationCap, Gamepad2 } from 'lucide-react';

export const BentoGrid: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Title Header */}
        <div className="text-left space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-400">
            SYSTEM ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            THE RECOZEE SYSTEM
          </h2>
        </div>

        {/* Asymmetric Black Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: AI MATCHING (Large Span 2) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="md:col-span-2 bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 flex flex-col justify-between space-y-6 relative overflow-hidden group"
          >
            <div className="p-3 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20 w-fit">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-2 uppercase tracking-wide">AI MATCHING</h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Personalized recommendations tailored to your exact workloads, thermal tolerances, and budget bounds.
              </p>
            </div>
          </motion.div>

          {/* Card 2: SMART COMPARISON */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4 group"
          >
            <div className="p-3 rounded-2xl bg-cyan-600/10 text-cyan-400 border border-cyan-500/20 w-fit">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 uppercase tracking-wide">SMART COMPARISON</h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Compare what actually matters: TGP wattage, fan noise, display brightness, and Cinebench scores.
              </p>
            </div>
          </motion.div>

          {/* Card 3: PERFORMANCE */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4 group"
          >
            <div className="p-3 rounded-2xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 w-fit">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 uppercase tracking-wide">PERFORMANCE</h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Understand real-world capability with verified hardware benchmarks.
              </p>
            </div>
          </motion.div>

          {/* Card 4: VALUE */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4 group"
          >
            <div className="p-3 rounded-2xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 w-fit">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 uppercase tracking-wide">VALUE</h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Find the best laptop for your money with automated price drop radar.
              </p>
            </div>
          </motion.div>

          {/* Card 5: STUDENT MODE */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4 group"
          >
            <div className="p-3 rounded-2xl bg-purple-600/10 text-purple-400 border border-purple-500/20 w-fit">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 uppercase tracking-wide">STUDENT MODE</h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Optimized recommendations for students with instant UNiDAYS cashback.
              </p>
            </div>
          </motion.div>

          {/* Card 6: GAMING MODE (Medium Span 2) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="md:col-span-2 bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 flex flex-col justify-between space-y-4 group"
          >
            <div className="p-3 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20 w-fit">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1 uppercase tracking-wide">GAMING MODE</h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">
                Performance-first recommendations filtered by high TGP graphics cards and high refresh panels.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
