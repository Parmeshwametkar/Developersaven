import React, { useState } from 'react';
import { 
  Globe, 
  Layers, 
  Terminal, 
  Smartphone, 
  Palette, 
  Boxes, 
  ArrowRight, 
  Check, 
  X,
  ExternalLink 
} from 'lucide-react';
import { ProjectType } from '../types';

interface ServiceItem {
  id: string;
  title: string;
  projectType: ProjectType;
  icon: any;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  techUsed: string[];
  timeline: string;
}

const servicesData: ServiceItem[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    projectType: 'Website',
    icon: Globe,
    shortDesc: 'Modern business websites, landing pages, portfolios and custom websites.',
    fullDesc: 'We build high-converting, blazing-fast, and search-optimized websites designed to establish your brand authority and turn casual visitors into clients.',
    deliverables: [
      'Custom responsive corporate & brand websites',
      'High-converting landing pages with lead capture',
      'Founder, executive & agency portfolios',
      'Technical SEO, Schema markup & speed optimization',
      'Content management system (CMS) integration',
    ],
    techUsed: ['React', 'Next.js', 'Tailwind CSS', 'Vite', 'TypeScript'],
    timeline: '1–2 Weeks',
  },
  {
    id: 'web-application-development',
    title: 'Web Application Development',
    projectType: 'Web Application',
    icon: Layers,
    shortDesc: 'Responsive and scalable web applications.',
    fullDesc: 'From SaaS dashboards and customer portals to interactive systems, we engineer scalable web applications with robust authentication and real-time state synchronization.',
    deliverables: [
      'Cloud SaaS platforms & client dashboards',
      'Role-based access control (RBAC) & user authentication',
      'Relational & NoSQL database architectures',
      'Automated transaction handling & billing integrations',
      'REST & GraphQL API design & integration',
    ],
    techUsed: ['React', 'Node.js', 'PostgreSQL / Supabase', 'Express', 'Tailwind CSS'],
    timeline: '3–6 Weeks',
  },
  {
    id: 'software-development',
    title: 'Software Development',
    projectType: 'Software Application',
    icon: Terminal,
    shortDesc: 'Custom software solutions designed around business requirements.',
    fullDesc: 'We design bespoke business software tailored to your specific organizational pipelines, eliminating legacy manual overhead and connecting disparate systems.',
    deliverables: [
      'Internal operations tools & automated pipelines',
      'Custom CRM, ERP, and inventory management',
      'High-throughput data synchronization scripts',
      'Secure third-party API orchestrations',
      'Cloud deployment on modern serverless or VPS infra',
    ],
    techUsed: ['TypeScript', 'Python', 'Node.js', 'PostgreSQL', 'Docker'],
    timeline: '4–8 Weeks',
  },
  {
    id: 'mobile-application-development',
    title: 'Mobile Application Development',
    projectType: 'Mobile Application',
    icon: Smartphone,
    shortDesc: 'Modern mobile applications for businesses and startups.',
    fullDesc: 'Turn your startup concept into a slick, intuitive mobile app with smooth animations, offline data caching, and native device capabilities.',
    deliverables: [
      'Cross-platform iOS and Android applications',
      'Progressive Web Apps (PWA) with offline support',
      'Push notification setup & user engagement tracking',
      'In-app authentication & biometric sign-in',
      'Store submission guidance & CI/CD delivery',
    ],
    techUsed: ['React Native', 'TypeScript', 'Tailwind / NativeWind', 'Supabase'],
    timeline: '4–8 Weeks',
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    projectType: 'UI/UX Design',
    icon: Palette,
    shortDesc: 'Clean, intuitive and user-friendly interfaces.',
    fullDesc: 'Great software starts with empathetic, deliberate design. We craft cohesive design systems, click-through wireframes, and production-ready component specs.',
    deliverables: [
      'End-to-end user journey mapping & wireframing',
      'High-fidelity interactive Figma prototypes',
      'Design systems, typography scales & token libraries',
      'Accessibility (WCAG AA) compliant color palettes',
      'Developer handoff specs with pixel-perfect precision',
    ],
    techUsed: ['Figma', 'Design Systems', 'Design Tokens', 'Prototyping'],
    timeline: '1–3 Weeks',
  },
  {
    id: 'custom-project-development',
    title: 'Custom Project Development',
    projectType: 'Custom Project',
    icon: Boxes,
    shortDesc: 'End-to-end development for unique digital ideas.',
    fullDesc: 'Have a unique idea that does not fit standard boxes? We collaborate directly with you to scope, architect, prototype, and build your bespoke digital product.',
    deliverables: [
      'Comprehensive requirements scoping & technical architecture',
      'Rapid prototype / MVP build for investor or customer demo',
      'Custom integrations with APIs or legacy databases',
      'Rigorous test coverage and QA validation',
      'Post-launch maintenance & feature iteration',
    ],
    techUsed: ['Full Stack Stack Selection', 'Cloud Architecture', 'Agile Delivery'],
    timeline: 'Custom / Flexible',
  },
];

interface ServicesSectionProps {
  onSelectService: (projectType: ProjectType) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-3">
            Services & Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Solutions Built Around Your Ideas
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            From modern responsive websites to enterprise-grade web applications and custom digital tools, Developersaven delivers end-to-end engineering excellence.
          </p>
        </div>

        {/* Bootstrap-style Responsive Card Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="card-hover-lift group flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-300 transition-all duration-300"
              >
                <div>
                  {/* Icon Container */}
                  <div className="w-13 h-13 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 font-display mb-2.5 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {service.shortDesc}
                  </p>

                  {/* Deliverables snippet */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-500">
                        <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Small Arrow / Button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer py-1.5"
                  >
                    Learn More
                  </button>

                  <button
                    onClick={() => onSelectService(service.projectType)}
                    className="btn-hover-lift inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-xs cursor-pointer"
                  >
                    <span>Start Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Service Details */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left border border-slate-200">
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <selectedService.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {selectedService.title}
                  </h3>
                  <span className="text-xs font-medium text-indigo-600">
                    {selectedService.projectType}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedService.fullDesc}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Scope & Deliverables
                </h4>
                <ul className="space-y-2">
                  {selectedService.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                <span>Typical Delivery: <strong className="text-slate-800">{selectedService.timeline}</strong></span>
                <span>Tech: <strong className="text-indigo-600">{selectedService.techUsed.slice(0, 3).join(', ')}</strong></span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    const type = selectedService.projectType;
                    setSelectedService(null);
                    onSelectService(type);
                  }}
                  className="w-full btn-hover-lift inline-flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 rounded-full shadow-md shadow-indigo-600/20"
                >
                  <span>Request {selectedService.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
