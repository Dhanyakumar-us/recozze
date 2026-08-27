import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import type { Laptop } from '../types/laptop';
import {
  getLaptopImage,
  getLaptopCpu,
  getLaptopGpu,
  getLaptopTgp,
  getLaptopRam,
  getLaptopMatchScore,
} from '../utils/laptopUtils';

interface ShowcaseHeroProps {
  heroLaptop?: Laptop;
  onFindMatch: () => void;
  onExploreCatalog: () => void;
  onSelectLaptop: (laptop: Laptop) => void;
}

export const ShowcaseHero: React.FC<ShowcaseHeroProps> = ({
  heroLaptop,
  onFindMatch,
  onExploreCatalog,
  onSelectLaptop,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const laptopImage = heroLaptop
    ? getLaptopImage(heroLaptop)
    : 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1600&q=80';

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-16 px-6 sm:px-8 overflow-hidden bg-ambient-light"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-400/10 dark:bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero Typography Content */}
      <div className="max-w-5xl mx-auto text-center z-10 space-y-6">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur-md text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-300/40 dark:border-slate-700/40">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>RECO INTELLIGENT LAPTOP SHOWROOM</span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-display tracking-tight text-slate-900 dark:text-white leading-[1.05]">
          FIND YOUR <br />
          <span className="text-gradient-dark">NEXT LAPTOP.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl font-normal text-slate-600 dark:text-slate-400 leading-relaxed">
          Discover, compare and choose a laptop that actually fits your needs.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onFindMatch}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base transition-all duration-300 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 hover:-translate-y-0.5 flex items-center justify-center space-x-2 group cursor-pointer"
          >
            <span>FIND MY MATCH</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreCatalog}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-white font-semibold text-base border border-slate-200 dark:border-slate-700 transition-all duration-300 shadow-xs hover:-translate-y-0.5 cursor-pointer"
          >
            <span>EXPLORE LAPTOPS</span>
          </button>
        </div>
      </div>

      {/* Hero Visual: Interactive Laptop Showcase */}
      <div className="relative max-w-6xl mx-auto w-full mt-12 mb-4 z-10 perspective-1000">
        <div
          className="relative transition-transform duration-200 ease-out preserve-3d"
          style={{
            transform: `rotateY(${mousePos.x * 6}deg) rotateX(${
              -mousePos.y * 6
            }deg) translateZ(10px)`,
          }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15 dark:shadow-black/60 border border-white/60 dark:border-slate-800 bg-slate-900">
            <img
              src={laptopImage}
              alt={heroLaptop?.name || 'Showcase Laptop'}
              className="w-full h-[360px] sm:h-[500px] lg:h-[580px] object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-8 sm:p-12 text-white">
              {heroLaptop && (
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 backdrop-blur-md bg-black/40 p-6 rounded-2xl border border-white/10">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
                      FLAGSHIP SHOWCASE
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold font-display mt-1">
                      {heroLaptop.name}
                    </h3>
                    <p className="text-sm text-slate-300 mt-1">
                      {getLaptopGpu(heroLaptop)} ({getLaptopTgp(heroLaptop)}W TGP) • {getLaptopCpu(heroLaptop)} • {getLaptopRam(heroLaptop)}GB RAM
                    </p>
                  </div>
                  <button
                    onClick={() => onSelectLaptop(heroLaptop)}
                    className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-semibold text-xs hover:bg-slate-100 transition-colors shadow-sm cursor-pointer"
                  >
                    View Specifications
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className="absolute -top-6 -left-4 sm:top-8 sm:-left-8 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl hidden sm:flex items-center space-x-3 preserve-3d"
            style={{ transform: `translateZ(40px)` }}
          >
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                GPU POWER
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {heroLaptop ? getLaptopTgp(heroLaptop) : 140}W Unlocked TGP
              </p>
            </div>
          </div>

          <div
            className="absolute -bottom-6 -right-4 sm:bottom-8 sm:-right-8 backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl hidden sm:flex items-center space-x-3 preserve-3d"
            style={{ transform: `translateZ(50px)` }}
          >
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                MATCH SCORE
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {heroLaptop ? getLaptopMatchScore(heroLaptop) : 98}% Fit Index
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center z-10 pt-4">
        <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
          SCROLL TO EXPLORE STORY
        </p>
      </div>
    </section>
  );
};
