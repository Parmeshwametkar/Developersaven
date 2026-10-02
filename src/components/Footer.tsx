import React from 'react';
import { ArrowUp, Cloud, Inbox, Mail } from 'lucide-react';
import { ProjectType } from '../types';

interface FooterProps {
  onSelectService: (service: ProjectType) => void;
  onOpenAdmin: () => void;
  onOpenDeployGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectService, 
  onOpenAdmin,
  onOpenDeployGuide 
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-12 relative text-left border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-slate-800">
          
          {/* Column 1: Developersaven / Startup Solutions (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-base font-display">
                D
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Developersaven
              </span>
            </div>

            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Startup Solutions
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Modern websites, applications and software solutions built around your ideas.
            </p>

            <div className="pt-2 text-xs text-slate-500">
              Founder: <strong className="text-slate-300 font-semibold">Parmeshwar Metkar</strong>
            </div>
          </div>

          {/* Column 2: Company (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, '#about')}
                  className="hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, '#services')}
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, '#projects')}
                  className="hover:text-white transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleNavClick(e, '#process')}
                  className="hover:text-white transition-colors"
                >
                  Process
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectService('Website');
                    document.querySelector('#inquiry')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Website Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectService('Web Application');
                    document.querySelector('#inquiry')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Web Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectService('Software Application');
                    document.querySelector('#inquiry')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Software Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectService('Mobile Application');
                    document.querySelector('#inquiry')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mobile Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectService('UI/UX Design');
                    document.querySelector('#inquiry')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  UI/UX Design
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="mailto:parmeshwarmetkar07@gmail.com"
                className="text-indigo-400 hover:text-indigo-300 hover:underline block break-all font-medium"
              >
                parmeshwarmetkar07@gmail.com
              </a>
              <p className="text-[11px] text-slate-500">
                Founder: Parmeshwar Metkar
              </p>
              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="btn-hover-lift inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer py-1"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>Back to top</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Tools */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Developersaven. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={onOpenDeployGuide}
              className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Cloud className="w-3.5 h-3.5 text-indigo-400" />
              <span>Vercel & Cloud Architecture Guide</span>
            </button>
            <span aria-hidden="true" className="text-slate-800">·</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Inbox className="w-3.5 h-3.5 text-indigo-400" />
              <span>Inquiries Console</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
