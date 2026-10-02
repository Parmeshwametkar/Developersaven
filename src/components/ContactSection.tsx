import React from 'react';
import { Mail, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

interface ContactSectionProps {
  onStartProject: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onStartProject }) => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-white border-b border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Layout Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch text-left">
          
          {/* Left Column: Heading & Company Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold tracking-wider uppercase">
                Direct Contact
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
                Let's Build Something Great.
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Developersaven builds modern websites, web applications, software applications and custom digital projects for startups, businesses and individuals.
              </p>
              <p className="text-sm text-slate-500 leading-relaxed">
                Whether you have complete specifications or an early concept, we are ready to collaborate and take your idea to production.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <span>Open to new client projects & technical consultations</span>
            </div>
          </div>

          {/* Right Column: Contact Card */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-md flex flex-col justify-between h-full space-y-8">
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-bold text-lg font-display">
                    D
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Developersaven
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                      Startup Solutions
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Founder:
                      </span>
                      <span className="text-base font-bold text-slate-900 font-display">
                        Parmeshwar Metkar
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Email:
                      </span>
                      <a
                        href="mailto:parmeshwarmetkar07@gmail.com"
                        className="text-base font-semibold text-indigo-600 hover:text-indigo-700 hover:underline transition-colors"
                      >
                        parmeshwarmetkar07@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                        Turnaround:
                      </span>
                      <span className="text-sm text-slate-700">
                        Inquiries reviewed and answered within 24 hours
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Action CTA */}
              <div className="pt-6 border-t border-slate-200">
                <button
                  onClick={onStartProject}
                  className="w-full btn-hover-lift inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-semibold text-white bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 hover:from-blue-600 hover:to-indigo-500 rounded-full shadow-md shadow-indigo-600/20 cursor-pointer"
                >
                  <span>Send Project Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
