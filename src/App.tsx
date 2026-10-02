import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProcessSection } from './components/ProcessSection';
import { WhyUsSection } from './components/WhyUsSection';
import { InquiryCTA } from './components/InquiryCTA';
import { InquiryForm } from './components/InquiryForm';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SuccessModal } from './components/SuccessModal';
import { AdminInquiryModal } from './components/AdminInquiryModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { ProjectType } from './types';

export default function App() {
  const [selectedProjectType, setSelectedProjectType] = useState<ProjectType>('Website');
  const [inquiryCount, setInquiryCount] = useState<number>(0);
  
  // Modals state
  const [successData, setSuccessData] = useState<{ inquiryId: string; payload: any } | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [deployGuideOpen, setDeployGuideOpen] = useState(false);

  // Fetch inquiry count
  const checkHealthAndCount = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setInquiryCount(data.totalLocalInquiries || 0);
      }
    } catch {
      // Dev mode or offline graceful fallback
    }
  };

  useEffect(() => {
    checkHealthAndCount();
  }, []);

  const handleStartProject = (type?: ProjectType | string) => {
    if (type && typeof type === 'string') {
      setSelectedProjectType(type as ProjectType);
    }
    const inquiryElement = document.querySelector('#inquiry');
    if (inquiryElement) {
      inquiryElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreServices = () => {
    const servicesElement = document.querySelector('#services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquirySuccess = (data: { inquiryId: string; payload: any }) => {
    setSuccessData(data);
    setInquiryCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      
      {/* Top Sticky Navigation Bar */}
      <Navbar
        onOpenInquiry={handleStartProject}
        onOpenAdmin={() => setAdminModalOpen(true)}
        inquiryCount={inquiryCount}
      />

      <main className="flex-1">
        {/* 1. Home / Hero with Value Strip */}
        <Hero
          onStartProject={() => handleStartProject()}
          onExploreServices={handleExploreServices}
        />

        {/* 2. About Developersaven & Founder */}
        <AboutSection
          onStartProject={() => handleStartProject()}
        />

        {/* 3. Services: Solutions Built Around Your Ideas */}
        <ServicesSection
          onSelectService={(type) => handleStartProject(type)}
        />

        {/* 4. Featured Projects: Selected Projects */}
        <ProjectsSection
          onStartProject={() => handleStartProject('Custom Project')}
        />

        {/* 5. How It Works: 4-Step Process Timeline */}
        <ProcessSection
          onStartProject={() => handleStartProject()}
        />

        {/* 6. Why Developersaven Feature Grid */}
        <WhyUsSection />

        {/* 7. Visually Strong Project Inquiry CTA Banner */}
        <InquiryCTA
          onScrollToForm={() => handleStartProject()}
        />

        {/* 8. Project Inquiry Form UI */}
        <InquiryForm
          initialProjectType={selectedProjectType}
          onSuccess={handleInquirySuccess}
        />

        {/* 9. Let's Build Something Great Contact Section */}
        <ContactSection
          onStartProject={() => handleStartProject()}
        />
      </main>

      {/* 10. Professional Dark Footer */}
      <Footer
        onSelectService={(type) => handleStartProject(type)}
        onOpenAdmin={() => setAdminModalOpen(true)}
        onOpenDeployGuide={() => setDeployGuideOpen(true)}
      />

      {/* Success Modal */}
      {successData && (
        <SuccessModal
          inquiryId={successData.inquiryId}
          payload={successData.payload}
          onClose={() => setSuccessData(null)}
        />
      )}

      {/* Inquiries Console Modal */}
      <AdminInquiryModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onRefreshNeeded={checkHealthAndCount}
      />

      {/* Vercel & Supabase Deployment Guide Modal */}
      <DeploymentGuideModal
        isOpen={deployGuideOpen}
        onClose={() => setDeployGuideOpen(false)}
      />

    </div>
  );
}
