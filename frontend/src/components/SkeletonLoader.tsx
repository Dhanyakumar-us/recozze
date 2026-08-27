import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="p-8 rounded-3xl bg-[#101010] border border-white/5 space-y-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-4 w-28 bg-[#050505] rounded-lg" />
        <div className="h-6 w-20 bg-[#050505] rounded-full" />
      </div>

      <div className="h-48 w-full bg-[#050505] rounded-2xl" />

      <div className="grid grid-cols-4 gap-2">
        <div className="h-8 bg-[#050505] rounded-xl" />
        <div className="h-8 bg-[#050505] rounded-xl" />
        <div className="h-8 bg-[#050505] rounded-xl" />
        <div className="h-8 bg-[#050505] rounded-xl" />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <div className="h-6 w-32 bg-[#050505] rounded-lg" />
        <div className="h-9 w-28 bg-[#050505] rounded-xl" />
      </div>
    </div>
  );
};
