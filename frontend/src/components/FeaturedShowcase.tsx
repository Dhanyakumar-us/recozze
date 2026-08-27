import React from 'react';
import { Zap, Monitor, Cpu, GraduationCap } from 'lucide-react';
import type { Laptop, WorkloadType } from '../types/laptop';
import {
  getLaptopImage,
  getLaptopPrice,
  getLaptopCpu,
  getLaptopGpu,
  getLaptopTgp,
  getLaptopRam,
  getLaptopWeight,
  getLaptopBatteryHours,
} from '../utils/laptopUtils';

interface FeaturedShowcaseProps {
  laptops: Laptop[];
  onSelectCategory: (workload: WorkloadType) => void;
  onSelectLaptop: (laptop: Laptop) => void;
}

export const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({
  laptops,
  onSelectCategory,
  onSelectLaptop,
}) => {
  const gamingLaptop =
    laptops.find((l) => getLaptopTgp(l) >= 130) || laptops[0];
  const creatorLaptop =
    laptops.find(
      (l) =>
        l.specs?.display?.resolution?.includes('OLED') ||
        l.specs?.display?.resolution?.includes('4K')
    ) ||
    laptops[1] ||
    laptops[0];
  const devLaptop =
    laptops.find((l) => getLaptopRam(l) >= 32) || laptops[2] || laptops[0];
  const studentLaptop =
    laptops.find(
      (l) => getLaptopWeight(l) <= 1.6 || getLaptopBatteryHours(l) >= 10
    ) ||
    laptops[3] ||
    laptops[0];

  const showcases = [
    {
      tag: 'FOR THE GAMER',
      title: 'UNLOCKED GPU WATTAGE & MAXIMUM FRAME RATES.',
      subtitle: 'Don’t fall for low-wattage slim gaming GPUs. Get true desktop-grade graphic power.',
      laptop: gamingLaptop,
      workload: 'gaming' as WorkloadType,
      btnText: 'EXPLORE GAMING →',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      highlight: `${gamingLaptop ? getLaptopTgp(gamingLaptop) : 140}W TGP Power limit`,
    },
    {
      tag: 'FOR THE CREATOR',
      title: 'PIXEL-PERFECT COLOR & RETINA DISPLAY ACCURACY.',
      subtitle: 'Designed for colorists, 3D artists, and video editors demanding absolute fidelity.',
      laptop: creatorLaptop,
      workload: 'creator' as WorkloadType,
      btnText: 'EXPLORE CREATOR →',
      icon: <Monitor className="w-5 h-5 text-indigo-500" />,
      highlight: 'Color-Accurate Studio Display',
    },
    {
      tag: 'FOR THE DEVELOPER',
      title: 'LIGHTNING FAST COMPILES & MASSIVE MEMORY.',
      subtitle: 'Run Docker containers, local LLMs, and multi-thread build pipelines without lag.',
      laptop: devLaptop,
      workload: 'coding' as WorkloadType,
      btnText: 'EXPLORE DEVELOPER →',
      icon: <Cpu className="w-5 h-5 text-blue-500" />,
      highlight: `${devLaptop ? getLaptopRam(devLaptop) : 32}GB Dual-Channel Memory`,
    },
    {
      tag: 'FOR THE STUDENT',
      title: 'ALL-DAY BATTERY & UNiDAYS STUDENT SAVINGS.',
      subtitle: 'Ultralight weight for campus portability paired with verified student cashback.',
      laptop: studentLaptop,
      workload: 'student' as WorkloadType,
      btnText: 'EXPLORE STUDENT →',
      icon: <GraduationCap className="w-5 h-5 text-emerald-500" />,
      highlight: `${studentLaptop ? getLaptopBatteryHours(studentLaptop) : 12}h Battery & UNiDAYS Discount`,
    },
  ];

  return (
    <section className="py-24 px-6 sm:px-8 max-w-7xl mx-auto space-y-24">
      <div className="text-center space-y-3">
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
          05 / CURATED CATEGORY SHOWCASE
        </span>
        <h2 className="text-4xl sm:text-6xl font-black font-display text-slate-900 dark:text-white">
          TAILORED FOR YOUR <span className="text-gradient-dark">LIFE.</span>
        </h2>
      </div>

      <div className="space-y-16">
        {showcases.map((item, idx) => {
          if (!item.laptop) return null;
          const isEven = idx % 2 === 0;

          return (
            <div
              key={idx}
              className={`showcase-panel rounded-3xl overflow-hidden p-8 sm:p-12 flex flex-col ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12`}
            >
              <div className="w-full lg:w-1/2 relative group overflow-hidden rounded-2xl bg-slate-900">
                <img
                  src={getLaptopImage(item.laptop)}
                  alt={item.laptop.name}
                  className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 backdrop-blur-md bg-black/60 px-3.5 py-1.5 rounded-full text-xs font-bold text-white flex items-center space-x-2">
                  {item.icon}
                  <span>{item.highlight}</span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-6">
                <span className="text-xs font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                  {item.tag}
                </span>

                <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-white leading-tight">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.subtitle}
                </p>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-sm font-bold text-slate-900 dark:text-white">
                    <span>{item.laptop.name}</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      ₹{getLaptopPrice(item.laptop).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {getLaptopCpu(item.laptop)} • {getLaptopGpu(item.laptop)} ({getLaptopTgp(item.laptop)}W TGP) • {getLaptopRam(item.laptop)}GB RAM
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => onSelectCategory(item.workload)}
                    className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-md flex items-center space-x-2 group cursor-pointer"
                  >
                    <span>{item.btnText}</span>
                  </button>
                  <button
                    onClick={() => onSelectLaptop(item.laptop)}
                    className="px-6 py-3 rounded-full bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs border border-slate-300 dark:border-slate-700 transition-all cursor-pointer"
                  >
                    View Specs
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
