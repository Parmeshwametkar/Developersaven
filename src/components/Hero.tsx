import React from 'react';
import { 
  ArrowRight, 
  Check, 
  Code2, 
  Cpu, 
  Smartphone, 
  Users, 
  Terminal, 
  Sparkles, 
  Layers, 
  Database,
  CheckCircle2
} from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreServices }) => {
  const trustPoints = [
    { title: 'Custom Development', desc: 'Tailored specifically to your business workflows and startup ideas.' },
    { title: 'Responsive Design', desc: 'Flawlessly optimized for smartphones, tablets, laptops, and 4K displays.' },
    { title: 'Modern Technology', desc: 'Built with scalable architectures, React, TypeScript, and cloud databases.' },
  ];

  const statsStrip = [
    {
      title: 'Custom Projects',
      desc: 'Bespoke web & software architecture',
      icon: Code2,
    },
    {
      title: 'Modern Technology',
      desc: 'React, Node.js, TypeScript & Cloud',
      icon: Cpu,
    },
    {
      title: 'Responsive Design',
      desc: 'Flawless across all screen sizes',
      icon: Smartphone,
    },
    {
      title: 'Client Focused',
      desc: 'Direct founder collaboration',
      icon: Users,
    },
  ];

  return (
    <section id="home" className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/60 border-b border-slate-200/70">
      
      {/* Subtle modern background gradient orbs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-indigo-200/40 via-blue-100/50 to-purple-100/30 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-blue-200/30 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              <span className="text-xs font-bold tracking-wider uppercase font-display">
                STARTUP SOLUTIONS
              </span>
            </div>

            {/* Large Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.1]">
              Build. Launch.{' '}
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Grow.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal max-w-xl">
              Modern websites, applications and software solutions built around your ideas.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onStartProject}
                className="btn-hover-lift inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 hover:from-blue-600 hover:to-indigo-500 rounded-full shadow-lg shadow-indigo-600/25 cursor-pointer"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="btn-hover-lift inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-full shadow-xs cursor-pointer transition-colors"
              >
                <span>Explore Services</span>
              </button>
            </div>

            {/* Small Value Indicators */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Custom Development</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Modern UI/UX</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Responsive Solutions</span>
              </div>
            </div>

          </div>

          {/* Right Column: Abstract Software Development Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Decorative Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl opacity-75" />

              {/* Central Code / App Window */}
              <div className="relative rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-left">
                
                {/* Window Header */}
                <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/90 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block"></span>
                    <span className="text-xs font-mono text-slate-400 ml-2">DevelopersavenCore.ts</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-indigo-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Production Ready</span>
                  </div>
                </div>

                {/* Code Content */}
                <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 overflow-x-auto bg-slate-900/95 space-y-1.5">
                  <p className="text-slate-500">// Initialize client startup architecture</p>
                  <p>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-blue-300">project</span> ={' '}
                    <span className="text-purple-400">new</span>{' '}
                    <span className="text-yellow-300">DevelopersavenProject</span>({'{'}
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">company:</span>{' '}
                    <span className="text-emerald-300">'Developersaven'</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">founder:</span>{' '}
                    <span className="text-emerald-300">'Parmeshwar Metkar'</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">stack:</span>{' '}
                    <span className="text-sky-300">['React', 'TypeScript', 'Tailwind', 'Supabase']</span>,
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">mission:</span>{' '}
                    <span className="text-emerald-300">'Build. Launch. Grow.'</span>
                  </p>
                  <p>{'});'}</p>
                  <p className="text-cyan-400 pt-1">
                    <span className="text-purple-400">await</span> project.<span className="text-blue-300">deploy</span>({'{'} mode: <span className="text-emerald-300">'production'</span> {'}'});
                  </p>
                </div>

                {/* Window Bottom Status */}
                <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span>0 errors · Clean build</span>
                  </span>
                  <span className="text-slate-400 font-mono">Fast Execution</span>
                </div>
              </div>

              {/* Floating UI Card 1: Top Right */}
              <div className="absolute -top-6 -right-4 sm:-right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-200/90 hidden sm:flex items-center gap-3 animate-in fade-in duration-300">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Startup Velocity</p>
                  <p className="text-xs font-bold text-slate-900">Idea to Launch Fast</p>
                </div>
              </div>

              {/* Floating UI Card 2: Bottom Left */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-200/90 hidden sm:flex items-center gap-3 animate-in fade-in duration-300">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Database & APIs</p>
                  <p className="text-xs font-bold text-slate-900">PostgreSQL & Serverless</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* STATS / TRUST STRIP IMMEDIATELY BELOW HERO */}
        <div className="mt-16 sm:mt-20 pt-8 border-t border-slate-200/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {statsStrip.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="card-hover-lift p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md text-left flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
