import React from 'react';

interface BackgroundVibeProps {
  theme: 'dark' | 'light';
}

export const BackgroundVibe: React.FC<BackgroundVibeProps> = ({ theme }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-500">
      
      {/* 1. Looping Microchip / Circuit MP4 Hardware Background Video Layer */}
      <div className={`absolute inset-0 transition-opacity duration-500 overflow-hidden ${
        theme === 'dark' ? 'opacity-25 mix-blend-screen' : 'opacity-15 mix-blend-multiply'
      }`}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-110 contrast-125"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-circuit-board-and-electronic-microchip-41555-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-circuit-board-microchip-technological-loop-41584-large.mp4"
            type="video/mp4"
          />
          {/* Fallback Image */}
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&auto=format&fit=crop&q=80"
            alt="Hardware Circuit Loop"
            className="w-full h-full object-cover scale-105"
          />
        </video>
      </div>

      {/* 2. Geometric Dot Matrix Grid */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          theme === 'dark' ? 'opacity-[0.05]' : 'opacity-[0.03]'
        }`}
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, ${theme === 'dark' ? '#06B6D4' : '#2563EB'} 1px, transparent 0),
            linear-gradient(to right, ${theme === 'dark' ? 'rgba(6,182,212,0.1)' : 'rgba(37,99,235,0.08)'} 1px, transparent 1px),
            linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(139,92,246,0.1)' : 'rgba(37,99,235,0.08)'} 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 48px 48px, 48px 48px'
        }}
      />

      {/* 3. Ambient Radial Glow Orbs */}
      {theme === 'dark' ? (
        <>
          {/* Top-Left Cyan Glow */}
          <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-cyan-500/15 rounded-full blur-[140px] animate-pulse" />
          {/* Top-Right Purple Glow */}
          <div className="absolute -top-40 -right-40 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[140px] animate-float-slow" />
          {/* Bottom-Center Emerald Glow */}
          <div className="absolute -bottom-50 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-emerald-500/12 rounded-full blur-[160px]" />
        </>
      ) : (
        <>
          {/* Top-Left Soft Blue Bloom */}
          <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-blue-400/12 rounded-full blur-[140px] animate-pulse" />
          {/* Top-Right Soft Mint Bloom */}
          <div className="absolute -top-40 -right-40 w-[650px] h-[650px] bg-emerald-400/12 rounded-full blur-[140px] animate-float-slow" />
          {/* Bottom-Center Pearl Amber Highlight */}
          <div className="absolute -bottom-50 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-amber-300/10 rounded-full blur-[160px]" />
        </>
      )}

      {/* 4. Smooth Top & Bottom Vignette Shield */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,15,25,0.75)_60%,#0B0F19_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(244,246,248,0.75)_60%,#F4F6F8_100%)]'
        }`}
      />
    </div>
  );
};
