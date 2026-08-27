import React, { useState } from 'react';
import { Gamepad2, Code2, Palette, GraduationCap, Briefcase, Cpu, ArrowUpRight } from 'lucide-react';
import type { WorkloadType } from '../types/laptop';

interface CategoryExperienceProps {
  onSelectCategory: (workload: WorkloadType) => void;
}

interface CategoryItem {
  id: WorkloadType;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  bgImage: string;
  keyStats: string;
}

export const CategoryExperience: React.FC<CategoryExperienceProps> = ({
  onSelectCategory,
}) => {
  const [hoveredId, setHoveredId] = useState<WorkloadType | null>('gaming');

  const categories: CategoryItem[] = [
    {
      id: 'gaming',
      title: 'GAMING',
      subtitle: 'MAX TGP & HIGH REFRESH',
      description:
        'Unlocked GPU wattage (140W–175W), vapor chamber thermals, and high FPS 144Hz–240Hz displays for competitive AAA gaming.',
      icon: <Gamepad2 className="w-6 h-6" />,
      bgImage:
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      keyStats: '140W+ TGP • 240Hz • RTX 4070/4080',
    },
    {
      id: 'coding',
      title: 'PROGRAMMING',
      subtitle: 'FAST COMPILES & MULTI-THREADING',
      description:
        'High multi-core CPU performance, 32GB+ RAM bandwidth, fast NVMe reads, and ergonomic keyboards for software engineering.',
      icon: <Code2 className="w-6 h-6" />,
      bgImage:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      keyStats: '32GB RAM • 14-Core CPU • 1TB SSD',
    },
    {
      id: 'creator',
      title: 'CREATOR',
      subtitle: 'COLOR-ACCURATE OLED & VRAM',
      description:
        'DCI-P3 100% OLED displays, 8GB+ VRAM for 4K video timeline acceleration, and quiet cooling architecture.',
      icon: <Palette className="w-6 h-6" />,
      bgImage:
        'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
      keyStats: '100% DCI-P3 • 4K OLED • 12GB VRAM',
    },
    {
      id: 'student',
      title: 'STUDENT',
      subtitle: 'PORTABILITY & ALL-DAY BATTERY',
      description:
        'Lightweight designs (< 1.6kg), 10+ hours battery endurance, sturdy build, and instant UNiDAYS student discount eligibility.',
      icon: <GraduationCap className="w-6 h-6" />,
      bgImage:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      keyStats: '< 1.6kg • 10h+ Battery • UNiDAYS Perks',
    },
    {
      id: 'business',
      title: 'BUSINESS',
      subtitle: 'ELEGANCE & HARDWARE SECURITY',
      description:
        'Sleek CNC aluminum chassis, fingerprint/IR webcam login, crystal clear microphone arrays, and silent fan acoustic profiles.',
      icon: <Briefcase className="w-6 h-6" />,
      bgImage:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      keyStats: 'CNC Aluminum • Whisper Quiet • Security',
    },
    {
      id: 'budget',
      title: 'VALUE & AI WORKSTATION',
      subtitle: 'MAXIMUM BANG FOR BUCK',
      description:
        'NVIDIA RTX 40-series with maximum CUDA cores, 16GB+ VRAM for local LLM inference, PyTorch & TensorFlow training within budget.',
      icon: <Cpu className="w-6 h-6" />,
      bgImage:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      keyStats: 'Value Focus • Tensor Cores • PyTorch Ready',
    },
  ];

  return (
    <section className="py-32 px-6 sm:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
          04 / CATEGORY SHOWCASE
        </span>
        <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-slate-900 dark:text-white">
          CHOOSE YOUR <span className="text-blue-600 dark:text-blue-400">EXPERIENCE.</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
          Select your primary use case to reveal laptops tuned for your exact workload demands.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat) => {
          const isHovered = hoveredId === cat.id;

          return (
            <div
              key={cat.id}
              onMouseEnter={() => setHoveredId(cat.id)}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative rounded-3xl overflow-hidden h-[420px] cursor-pointer transition-all duration-500 border ${
                isHovered
                  ? 'border-blue-500 dark:border-blue-400 shadow-2xl scale-[1.02]'
                  : 'border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              <img
                src={cat.bgImage}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/20" />

              <div className="relative h-full p-8 flex flex-col justify-between text-white z-10">
                <div className="flex justify-between items-start">
                  <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                    {cat.icon}
                  </div>
                  <div className="p-2.5 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold tracking-widest text-blue-400 uppercase">
                    {cat.subtitle}
                  </span>
                  <h3 className="text-3xl font-black font-display tracking-tight">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-3 border-t border-white/15 flex justify-between items-center text-xs font-semibold text-blue-300">
                    <span>{cat.keyStats}</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
