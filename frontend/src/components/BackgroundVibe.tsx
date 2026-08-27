import React, { useEffect, useState } from 'react';

interface BackgroundVibeProps {
  theme?: 'dark' | 'light';
}

export const BackgroundVibe: React.FC<BackgroundVibeProps> = ({ theme = 'dark' }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      if (!reducedMotion) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  if (theme === 'light') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F4F4F5]">
        <div className="absolute inset-0 bg-grid-blueprint opacity-60" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      {/* Engineering Blueprint Grid */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-30" />

      {/* Ambient Blue & Cyan Radial Spotlights */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Interactive Cursor Light Tracking */}
      {!reducedMotion && (
        <div
          className="absolute w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[100px] transition-transform duration-300 ease-out pointer-events-none"
          style={{
            left: `${mousePos.x - 225}px`,
            top: `${mousePos.y - 225}px`,
          }}
        />
      )}

      {/* Top Beam of Light Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
    </div>
  );
};
