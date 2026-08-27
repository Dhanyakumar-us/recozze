import React from 'react';
import { Cpu, Clock, ShieldCheck, Users, Lock } from 'lucide-react';

export const WhyRecozee: React.FC = () => {
  const items = [
    {
      title: 'AI-Powered Matching',
      desc: 'Your needs come first with our multi-factor hardware recommendation algorithm.',
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
    },
    {
      title: 'Save Time & Money',
      desc: 'Find the right laptop faster with automated price drop forecasting.',
      icon: <Clock className="w-5 h-5 text-cyan-400" />,
    },
    {
      title: 'Unbiased Recommendations',
      desc: 'We recommend laptops purely based on your performance and budget requirements.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'Real User Insights',
      desc: 'Make decisions with confidence using real-world benchmark data.',
      icon: <Users className="w-5 h-5 text-purple-400" />,
    },
    {
      title: 'Privacy First',
      desc: 'Keep your search preferences and personal data safe and secure.',
      icon: <Lock className="w-5 h-5 text-amber-400" />,
    },
  ];

  return (
    <section className="w-full py-16 bg-[#050505] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        <div className="text-left space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-blue-400 tracking-wider">
            WHY RECOZEE
          </span>
          <h2 className="text-3xl font-black text-white">RECOZEE ADVANTAGE</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0A0A0A] p-6 rounded-3xl border border-white/10 space-y-4 hover:border-blue-500/40 transition-all duration-300"
            >
              <div className="p-3 rounded-2xl bg-[#050505] border border-white/5 w-fit">
                {item.icon}
              </div>
              <h3 className="text-sm font-bold text-white uppercase font-mono">{item.title}</h3>
              <p className="text-xs font-mono text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
