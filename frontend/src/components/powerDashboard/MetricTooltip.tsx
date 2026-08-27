import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface MetricTooltipProps {
  content: string;
  children?: React.ReactNode;
}

export const MetricTooltip: React.FC<MetricTooltipProps> = ({ content, children }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      {children}
      <button
        type="button"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={(e) => {
          e.stopPropagation();
          setShow(!show);
        }}
        className="ml-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer focus:outline-none"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-2.5 bg-slate-900/95 text-slate-200 text-xs rounded-xl shadow-xl border border-cyan-500/30 backdrop-blur-md z-50 pointer-events-none animate-in fade-in zoom-in-95">
          <p className="leading-relaxed">{content}</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
};
