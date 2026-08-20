import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 right-6 z-50 glass-panel border border-amber-500/50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-mono text-amber-900 dark:text-amber-300 bg-amber-500/10 backdrop-blur-xl animate-slide-down">
      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
      <span className="font-bold">{message}</span>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
