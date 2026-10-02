import React, { useState } from 'react';
import { ExternalLink, Layers, X, Check, Code, Shield, ArrowUpRight } from 'lucide-react';
import saasImage from '../assets/images/project_saas_platform_1790913183054.jpg';
import mobileImage from '../assets/images/project_mobile_solution_1790913201827.jpg';

interface ShowcaseProject {
  id: string;
  name: string;
  category: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  techStack: string[];
  image: string;
  architectureHighlights: string[];
  keyFeatures: string[];
  deploymentModel: string;
}

const projectsData: ShowcaseProject[] = [
  {
    id: 'pulseflow-analytics',
    name: 'PulseFlow Enterprise Cloud',
    category: 'Web Application / SaaS',
    tagline: 'High-frequency telemetry & financial reporting platform',
    shortDesc: 'A responsive real-time analytics portal with multi-tenant workspace isolation, role-based controls, and automated PDF export pipelines.',
    fullDesc: 'PulseFlow demonstrates Developersaven’s capability in building high-throughput SaaS applications. Engineered with modern React, TypeScript, and serverless database query caching to handle sub-100ms dashboard refreshes.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Chart.js', 'Vite'],
    image: saasImage,
    architectureHighlights: [
      'Multi-tenant workspace isolation with strict tenant scoping',
      'Asynchronous query caching for real-time statistical metrics',
      'JWT authentication with short-lived access tokens and refresh rotation',
      'Automated nightly data aggregation jobs',
    ],
    keyFeatures: [
      'Interactive cohort retention & revenue forecasting charts',
      'Configurable user roles: Super Admin, Analyst, Auditor',
      'Export to CSV, XLSX, and formatted executive PDF reports',
      'Dark/Light theme synchronizer with system preferences',
    ],
    deploymentModel: 'Vercel Serverless + Supabase PostgreSQL',
  },
  {
    id: 'omnidrive-fleet',
    name: 'OmniDrive Mobile Logistics',
    category: 'Mobile & Web Application',
    tagline: 'Last-mile logistics dispatch & tracking suite',
    shortDesc: 'End-to-end driver mobile application paired with a centralized dispatcher web portal featuring route optimization and status telemetry.',
    fullDesc: 'Architected to showcase our cross-platform capabilities. Drivers capture electronic proof-of-delivery with offline queueing, while dispatchers monitor regional route efficiency in real time.',
    techStack: ['React Native', 'React', 'TypeScript', 'Supabase', 'Node.js', 'Tailwind'],
    image: mobileImage,
    architectureHighlights: [
      'Optimistic UI state updates with offline IndexedDB storage queue',
      'Geo-hash spatial clustering for dispatch route assignment',
      'Real-time WebSocket status broadcasts to client map viewports',
      'Automated SMS/Email notification webhook dispatchers',
    ],
    keyFeatures: [
      'Digital signature capture and instant photo proof-of-delivery',
      'Dynamic turn-by-turn route overview and waypoints',
      'Driver shift timecard logging and expense tracking',
      'Dispatcher fleet overview with status filtering',
    ],
    deploymentModel: 'Cloud Run Containers + Cloud SQL',
  },
  {
    id: 'medicare-portal',
    name: 'CareLink Health Portal',
    category: 'Custom Software Solution',
    tagline: 'Secure patient intake & clinic schedule orchestrator',
    shortDesc: 'A secure, HIPAA-compliant patient appointment scheduling engine with encrypted intake records and automated email/SMS reminders.',
    fullDesc: 'Built to illustrate Developersaven’s precision in sensitive domain workflows. Features field-level encryption, audit logs for compliance, and appointment slot locking.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Resend'],
    image: saasImage,
    architectureHighlights: [
      'AES-256 field-level encryption for sensitive health disclosures',
      'Non-repudiation audit logging on all patient record accesses',
      'Zero-collision calendar appointment locking algorithm',
      'Automated email confirmations via transactional mail services',
    ],
    keyFeatures: [
      'Multi-step intake questionnaire with instant field validation',
      'Practitioner roster and available timeslot matrix',
      'Automated calendar invites (.ics) sent directly to patients',
      'Administrative patient management dashboard with search and filter',
    ],
    deploymentModel: 'Dockerized Express Backend + Vercel Edge Frontend',
  },
  {
    id: 'artisan-ecommerce',
    name: 'Aura Artisanal Storefront',
    category: 'Website & Digital Commerce',
    tagline: 'High-speed headless e-commerce experience',
    shortDesc: 'A modern, ultra-fast headless storefront with sub-second page transitions, dynamic inventory alerts, and one-click checkout flows.',
    fullDesc: 'Demonstrating Developersaven’s website development expertise with a focus on conversion rate optimization, Core Web Vitals, and smooth micro-interactions.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Stripe API', 'TypeScript'],
    image: mobileImage,
    architectureHighlights: [
      'Static asset optimization scoring 99+ on Google Lighthouse',
      'Headless cart state synced across browser sessions',
      'Pre-computed product category schemas for Google Rich Results',
      'Webhook handling for instant payment reconciliation',
    ],
    keyFeatures: [
      'Frictionless slide-over slideout drawer checkout',
      'Instant search and faceted specification filtering',
      'Mobile-optimized product imagery gallery with zoom',
      'Automated order confirmation email triggers',
    ],
    deploymentModel: 'Vercel Global CDN + Serverless Endpoints',
  },
];

interface ProjectsSectionProps {
  onStartProject: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onStartProject }) => {
  const [activeProject, setActiveProject] = useState<ShowcaseProject | null>(null);

  return (
    <section id="projects" className="py-20 md:py-28 bg-white border-b border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-3">
              Portfolio Showcase
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              Selected Projects
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Explore selected demonstration software architectures, web apps, and digital systems engineered by Developersaven.
            </p>
          </div>

          <div className="text-xs text-slate-500 max-w-xs border-l-2 border-indigo-200 pl-3">
            <strong className="text-slate-800 block">Demonstration Prototypes</strong>
            Structured architectural blueprints ready to be tailored to your project requirements.
          </div>
        </div>

        {/* 2x2 Grid of Large Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="card-hover-lift group flex flex-col justify-between rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300 overflow-hidden"
            >
              <div>
                {/* Project Preview Image / Mockup */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900 relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Badge on Image */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold shadow-xs">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-1.5 group-hover:text-indigo-600 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-600 mb-3 uppercase tracking-wide">
                    {project.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {project.shortDesc}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-slate-100">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-100 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 sm:px-8 sm:pb-8 flex items-center justify-between gap-4">
                <button
                  onClick={() => setActiveProject(project)}
                  className="btn-hover-lift inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>View Project Details</span>
                </button>

                <button
                  onClick={onStartProject}
                  className="btn-hover-lift inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
                >
                  <span>Build Similar</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-indigo-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Project Architecture & Specs */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto text-left">
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close project modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                  {activeProject.category}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 font-display mt-2">
                  {activeProject.name}
                </h3>
                <p className="text-sm text-slate-600">{activeProject.tagline}</p>
              </div>

              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200">
                <img
                  src={activeProject.image}
                  alt={activeProject.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {activeProject.fullDesc}
              </p>

              {/* Architectural Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-600" />
                  <span>Architecture & Invariants</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeProject.architectureHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-600 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Code className="w-4 h-4 text-indigo-600" />
                  <span>Key Features</span>
                </h4>
                <ul className="space-y-1.5">
                  {activeProject.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
                <span>Deployment Architecture:</span>
                <strong className="text-slate-900 font-semibold">{activeProject.deploymentModel}</strong>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveProject(null);
                    onStartProject();
                  }}
                  className="w-full btn-hover-lift inline-flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 rounded-full transition-all shadow-md"
                >
                  <span>Request Custom Project Like This</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
