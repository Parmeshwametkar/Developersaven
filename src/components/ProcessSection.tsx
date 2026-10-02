import React from 'react';
import { MessageSquareText, FileSearch, Terminal, Rocket, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onStartProject: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onStartProject }) => {
  const steps = [
    {
      number: '01',
      title: 'Share Your Idea',
      description: 'Fill out our structured inquiry form with your goals, target users, and reference benchmarks.',
      highlight: 'Takes less than 3 minutes',
      icon: MessageSquareText,
    },
    {
      number: '02',
      title: 'Discuss Requirements',
      description: 'Connect directly with leadership to scope deliverables, review tech feasibility, and finalize milestones.',
      highlight: 'Direct founder discussion',
      icon: FileSearch,
    },
    {
      number: '03',
      title: 'Development',
      description: 'We engineer your application with clean code, frequent milestone previews, and rigorous testing.',
      highlight: 'Transparent agile sprints',
      icon: Terminal,
    },
    {
      number: '04',
      title: 'Launch & Support',
      description: 'Deploy to modern cloud infrastructure, conduct final QA audits, hand over code, and provide ongoing support.',
      highlight: 'Production-ready handoff',
      icon: Rocket,
    },
  ];

  return (
    <section id="process" className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-3">
            Our Development Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            How we bring your digital vision to life.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A clear, predictable 4-step framework from initial concept to live production.
          </p>
        </div>

        {/* Timeline Container: Desktop Horizontal with Connected Line, Mobile Vertical */}
        <div className="relative">
          
          {/* Connected horizontal line (Desktop lg only) */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-1 bg-gradient-to-r from-blue-200 via-indigo-200 to-violet-200 z-0" />

          {/* Connected vertical line (Mobile & Tablet) */}
          <div className="lg:hidden absolute top-6 bottom-6 left-6 w-1 bg-gradient-to-b from-blue-200 via-indigo-200 to-violet-200 z-0" />

          {/* Grid of Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10 text-left">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="card-hover-lift flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 relative pl-16 lg:pl-6"
                >
                  {/* Numbered Circular Indicator */}
                  <div className="absolute left-3 top-6 lg:static lg:mb-5">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-display font-bold text-base flex items-center justify-center shadow-md shadow-indigo-600/30">
                      {step.number}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-900 font-display">
                        {step.title}
                      </h3>
                      <div className="hidden lg:flex w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Stage {step.number}</span>
                    <span className="text-indigo-600 font-semibold">{step.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div>
            <h4 className="text-lg font-bold text-slate-900 font-display">
              Ready to take the first step?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Share your project idea today and receive a detailed technical roadmap.
            </p>
          </div>
          <button
            onClick={onStartProject}
            className="btn-hover-lift inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 rounded-full shadow-md shadow-indigo-600/20 whitespace-nowrap cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
