import React from 'react';
import { 
  Cpu, 
  Sparkles, 
  Smartphone, 
  Database, 
  MessageCircle, 
  LifeBuoy 
} from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  const advantages = [
    {
      title: 'Custom-Built Solutions',
      description: 'Zero generic templates. Every system is hand-crafted around your specific requirements and operational workflow.',
      icon: Cpu,
    },
    {
      title: 'Modern UI/UX',
      description: 'Clean, intuitive interfaces designed for high readability, minimal friction, and optimal conversion rates.',
      icon: Sparkles,
    },
    {
      title: 'Responsive Development',
      description: 'Fluid, cross-device layouts rigorously tested on mobile smartphones, tablets, laptops, and ultra-wide screens.',
      icon: Smartphone,
    },
    {
      title: 'Scalable Architecture',
      description: 'Engineered for seamless horizontal growth with modern relational databases, serverless APIs, and CDN caching.',
      icon: Database,
    },
    {
      title: 'Clear Communication',
      description: 'Direct collaboration with founder Parmeshwar Metkar. Regular milestone demos with zero agency middlemen.',
      icon: MessageCircle,
    },
    {
      title: 'Long-Term Support',
      description: 'Comprehensive documentation, clean source code handoff, post-launch QA warranty, and maintenance retainers.',
      icon: LifeBuoy,
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-white border-b border-slate-200/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-3">
            Why Developersaven
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            High standards for startups that value quality and momentum.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We focus on software craft, rigorous engineering, and long-term durability. Here is why clients partner with Developersaven.
          </p>
        </div>

        {/* 6 Feature Cards (3 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-left">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="card-hover-lift p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
