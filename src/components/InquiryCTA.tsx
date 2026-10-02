import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

interface InquiryCTAProps {
  onScrollToForm: () => void;
}

export const InquiryCTA: React.FC<InquiryCTAProps> = ({ onScrollToForm }) => {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Decorative Gradient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>STARTUP SOLUTIONS & BESPOKE SOFTWARE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white">
          Have a project in mind?
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Tell us about your idea and let's turn it into a working digital solution.
        </p>

        <div className="pt-2">
          <button
            onClick={onScrollToForm}
            className="btn-hover-lift inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 hover:from-cyan-300 hover:to-indigo-200 rounded-full shadow-xl shadow-cyan-500/20 cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
