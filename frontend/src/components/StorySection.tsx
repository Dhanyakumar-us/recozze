import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { Laptop } from '../types/laptop';
import {
  getLaptopImage,
  getLaptopPrice,
  getLaptopCpu,
  getLaptopGpu,
  getLaptopTgp,
} from '../utils/laptopUtils';

interface StorySectionProps {
  laptops: Laptop[];
  onStartWizard: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ laptops, onStartWizard }) => {
  const showcaseLaptops = laptops.slice(0, 4);

  return (
    <section className="relative py-32 px-6 sm:px-8 max-w-7xl mx-auto space-y-36">
      {/* 1. Large Whitespace Transition + SO MANY LAPTOPS */}
      <div className="text-center space-y-12">
        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
          01 / THE OVERWHELM
        </span>
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-slate-900 dark:text-white leading-none">
          SO MANY <br />
          <span className="text-slate-400 dark:text-slate-600">LAPTOPS.</span>
        </h2>

        {/* Multi-Laptop Visual Composition */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
          {showcaseLaptops.map((laptop, index) => (
            <div
              key={laptop.id || index}
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 mb-4 flex items-center justify-center">
                <img
                  src={getLaptopImage(laptop)}
                  alt={laptop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-[10px] font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                {laptop.brand}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate mt-0.5">
                {laptop.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 truncate">
                {getLaptopCpu(laptop)} • {getLaptopGpu(laptop)}
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-semibold text-slate-900 dark:text-white">
                <span>₹{getLaptopPrice(laptop).toLocaleString('en-IN')}</span>
                <span className="text-slate-400 font-normal">{getLaptopTgp(laptop)}W TGP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. BUT WHICH ONE IS RIGHT FOR YOU? */}
      <div className="text-center space-y-8 py-16 border-y border-slate-200/60 dark:border-slate-800/60">
        <span className="text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
          02 / THE CHALLENGE
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-slate-900 dark:text-white max-w-4xl mx-auto leading-tight">
          BUT WHICH ONE IS <br />
          <span className="text-gradient-accent">RIGHT FOR YOU?</span>
        </h2>
        <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400">
          Wattage, thermal heat pipes, memory bandwidth, synthetic Cinebench scores... Specs are confusing. RECO simplifies hardware decisions into pure clarity.
        </p>
      </div>

      {/* 3. RECO Story Sequence Cards */}
      <div className="space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            03 / THE RECO METHODOLOGY
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 dark:text-white">
            How RECO Finds Your Perfect Match
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="showcase-panel p-8 sm:p-10 rounded-3xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-lg mb-6">
                01
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                WHAT MATTERS TO YOU?
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                Whether you need AAA gaming frame rates, long compile times for software, 4K video rendering, or all-day battery life for college classes.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase">
              Intent Analysis
            </div>
          </div>

          <div className="showcase-panel p-8 sm:p-10 rounded-3xl space-y-6 flex flex-col justify-between border-blue-200 dark:border-blue-900/50">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-black text-lg mb-6 shadow-md shadow-blue-600/30">
                02
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                RECO FINDS THE MATCH.
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                Our recommendation engine evaluates real-world GPU TGP wattage, heat pipe thermal dissipation, Cinebench benchmarks, and live market price trends.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">
              Algorithmic Evaluation
            </div>
          </div>

          <div className="showcase-panel p-8 sm:p-10 rounded-3xl space-y-6 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black text-lg mb-6">
                03
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                YOUR LAPTOP.
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                Receive a single, tailored recommendation backed by a 0–100% Workload Match Score, Student UNiDAYS cashback discount codes, and buy/wait price timing.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase">
              Confidence & Purchase
            </div>
          </div>
        </div>

        <div className="text-center pt-8">
          <button
            onClick={onStartWizard}
            className="px-10 py-5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-xl hover:scale-105 inline-flex items-center space-x-3 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-blue-400 dark:text-blue-600" />
            <span>START YOUR MATCHING EXPERIENCE</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
