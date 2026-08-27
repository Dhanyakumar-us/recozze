import React from 'react';
import { Sparkles, Scale, Tag, Star, Laptop as LaptopIcon } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const items = [
    {
      title: 'AI Recommendations',
      subtitle: 'Personalized for you',
      icon: <Sparkles className="w-5 h-5 text-blue-400" />,
    },
    {
      title: 'Smart Comparison',
      subtitle: 'Compare laptops easily',
      icon: <Scale className="w-5 h-5 text-purple-400" />,
    },
    {
      title: 'Best Prices',
      subtitle: 'Find the best value',
      icon: <Tag className="w-5 h-5 text-emerald-400" />,
    },
    {
      title: 'Verified Reviews',
      subtitle: 'Real user insights',
      icon: <Star className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'Latest Laptops',
      subtitle: 'Stay up to date',
      icon: <LaptopIcon className="w-5 h-5 text-cyan-400" />,
    },
  ];

  return (
    <div className="w-full py-8 border-b border-slate-800/60 bg-[#080B14]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3.5 rounded-2xl glass-panel border border-slate-800/60 hover:border-slate-700 hover:scale-[1.02] transition-all duration-300 group cursor-default"
            >
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 group-hover:bg-slate-800/80 transition-colors">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
