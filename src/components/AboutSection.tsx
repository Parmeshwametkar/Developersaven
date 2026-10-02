import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, Mail, ArrowRight, UserCheck } from 'lucide-react';
import studioImage from '../assets/images/founder_studio_ambient_1790913214192.jpg';

interface AboutSectionProps {
  onStartProject: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onStartProject }) => {
  return (
    <section id="about" className="py-20 md:py-28 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-3">
            About Developersaven
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            A software development company committed to startup solutions.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Developersaven is a software development and startup solutions company that builds modern websites, web applications, software applications, and custom digital projects for clients across industries.
          </p>
        </div>

        {/* 2-Column Bootstrap-style Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch text-left">
          
          {/* Left Column: Professional Narrative & Capabilities */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                Engineering Digital Products with Precision and Care
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether you need a high-converting corporate website, a scalable full-stack web application, or a custom internal software tool, Developersaven turns business requirements into robust, production-ready code.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">Custom Engineering</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Zero generic boilerplate. Every line of code is structured around your specific operational workflows.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Zap className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">Fast Execution</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Agile milestones and direct communication ensure your product reaches users quickly and securely.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2 mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">Scalable & Secure</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Modern TypeScript, robust API validation, and secure cloud database architecture.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2 mb-1.5">
                    <UserCheck className="w-4 h-4 text-indigo-600" />
                    <h4 className="text-sm font-bold text-slate-900">Direct Founder Access</h4>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Work directly with founder Parmeshwar Metkar from initial scoping to final deployment.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-200">
              <span className="text-xs text-slate-500">
                Operating with integrity · Global client delivery
              </span>
              <button
                onClick={onStartProject}
                className="btn-hover-lift text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Premium Visual/Card */}
          <div className="lg:col-span-5">
            <div className="relative h-full rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-8 text-white shadow-xl flex flex-col justify-between overflow-hidden border border-slate-800">
              
              {/* Subtle Decorative Ambient Lights */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Card Top: Branding */}
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-display font-bold text-lg text-white">
                    D
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-300 font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    Software Company
                  </span>
                </div>

                <div>
                  <h4 className="text-2xl font-extrabold font-display tracking-tight text-white">
                    DEVELOPERSAVEN
                  </h4>
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mt-0.5">
                    Startup Solutions
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-2">
                  Building websites, web applications, software applications, and custom digital projects for clients.
                </p>
              </div>

              {/* Card Center: Workspace Studio Image preview */}
              <div className="relative z-10 my-6 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={studioImage}
                  alt="Developersaven Architectural Studio"
                  referrerPolicy="no-referrer"
                  className="w-full h-40 object-cover object-center"
                />
              </div>

              {/* Card Bottom: Founder Block */}
              <div className="relative z-10 pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">
                      Founder:
                    </span>
                    <span className="text-base font-bold text-white font-display">
                      Parmeshwar Metkar
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">
                      Direct Email:
                    </span>
                    <a
                      href="mailto:parmeshwarmetkar07@gmail.com"
                      className="text-xs font-semibold text-indigo-300 hover:text-white underline underline-offset-2 transition-colors"
                    >
                      parmeshwarmetkar07@gmail.com
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
