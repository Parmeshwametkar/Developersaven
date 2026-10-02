import React, { useState } from 'react';
import { 
  Send, 
  Loader2, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Layers, 
  Coins, 
  Clock, 
  MessageSquare, 
  FileText, 
  Globe, 
  Code 
} from 'lucide-react';
import { ProjectType, BudgetRange, TimelineOption, ContactMethod } from '../types';

interface InquiryFormProps {
  initialProjectType?: ProjectType;
  onSuccess: (data: { inquiryId: string; payload: any }) => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ 
  initialProjectType = 'Website',
  onSuccess 
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectType: initialProjectType,
    budget: '₹25,000 – ₹50,000' as BudgetRange,
    timeline: '1 Month' as TimelineOption,
    projectTitle: '',
    projectDescription: '',
    requiredFeatures: '',
    referenceUrl: '',
    preferredContact: 'Email' as ContactMethod,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialProjectType) {
      setFormData(prev => ({ ...prev, projectType: initialProjectType }));
    }
  }, [initialProjectType]);

  const projectTypeOptions: ProjectType[] = [
    'Website',
    'Web Application',
    'Software Application',
    'Mobile Application',
    'UI/UX Design',
    'Custom Project',
    'Other',
  ];

  const budgetOptions: BudgetRange[] = [
    'Under ₹10,000',
    '₹10,000 – ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000+',
    'Not decided yet',
  ];

  const timelineOptions: TimelineOption[] = [
    'ASAP',
    '1–2 Weeks',
    '1 Month',
    '2–3 Months',
    'Flexible',
  ];

  const contactMethodOptions: ContactMethod[] = [
    'Email',
    'Phone / WhatsApp',
    'Google Meet',
  ];

  const getValidationErrors = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (minimum 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.projectTitle.trim() || formData.projectTitle.trim().length < 3) {
      newErrors.projectTitle = 'Please provide a project title or working name (minimum 3 characters).';
    }

    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 10) {
      newErrors.projectDescription = 'Please describe your project requirements (minimum 10 characters).';
    }

    if (formData.referenceUrl && formData.referenceUrl.trim() !== '') {
      try {
        const urlToTest = formData.referenceUrl.startsWith('http') 
          ? formData.referenceUrl 
          : `https://${formData.referenceUrl}`;
        new URL(urlToTest);
      } catch {
        newErrors.referenceUrl = 'Please enter a valid URL (e.g. https://example.com).';
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = getValidationErrors();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorKey);
      if (element) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    const payload = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      project_type: formData.projectType,
      budget: formData.budget,
      timeline: formData.timeline,
      project_title: formData.projectTitle,
      project_description: formData.projectDescription,
      required_features: formData.requiredFeatures,
      reference_url: formData.referenceUrl,
      preferred_contact: formData.preferredContact,
    };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch (parseErr) {
        console.warn('Could not parse response as JSON:', parseErr);
      }

      if (!response.ok) {
        throw new Error(data.error || `Server returned status ${response.status}. Please try again or email us directly at parmeshwarmetkar07@gmail.com.`);
      }

      onSuccess({
        inquiryId: data.inquiryId,
        payload,
      });

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        projectType: 'Website',
        budget: '₹25,000 – ₹50,000',
        timeline: '1 Month',
        projectTitle: '',
        projectDescription: '',
        requiredFeatures: '',
        referenceUrl: '',
        preferredContact: 'Email',
      });
      setErrors({});
    } catch (err: any) {
      console.error('Submission error:', err);
      setSubmitError(
        err.message || 'Network error occurred. You can also email us directly at parmeshwarmetkar07@gmail.com'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="inquiry" className="py-20 md:py-28 bg-slate-50/80 border-b border-slate-200/70 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-3">
            Project Inquiry Form
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Send your project specifications.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed font-normal">
            Fill out the form below. Inquiries are stored securely in our database and forwarded immediately to founder <strong className="text-slate-900">Parmeshwar Metkar</strong> at <strong className="text-indigo-600">parmeshwarmetkar07@gmail.com</strong>.
          </p>
        </div>

        {/* Premium Bootstrap-style Form Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg text-left">
          
          {submitError && (
            <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
              <div>
                <strong className="block text-red-900 font-bold">Submission Notice</strong>
                <span>{submitError}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-10">
            
            {/* 1. Contact Information */}
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>Contact Information</span>
                </h3>
                <p className="text-xs text-slate-500">How we should reach out to you.</p>
              </div>

              {/* Row 1: Full Name | Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-indigo-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="fullName"
                      type="text"
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: '' });
                      }}
                      className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                        errors.fullName 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email <span className="text-indigo-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g. john@startup.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                        errors.email 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone Number | Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Company / Organization <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="company"
                      type="text"
                      placeholder="e.g. Acme Tech or Solo Founder"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Project Details */}
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>Project Details</span>
                </h3>
                <p className="text-xs text-slate-500">Working title, category, budget, and timeline.</p>
              </div>

              {/* Row 3: Project Title */}
              <div>
                <label htmlFor="projectTitle" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Project Title <span className="text-indigo-600">*</span>
                </label>
                <input
                  id="projectTitle"
                  type="text"
                  placeholder="e.g. Modern Customer Portal & SaaS Platform"
                  value={formData.projectTitle}
                  onChange={(e) => {
                    setFormData({ ...formData, projectTitle: e.target.value });
                    if (errors.projectTitle) setErrors({ ...errors, projectTitle: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                    errors.projectTitle 
                      ? 'border-red-400 focus:ring-red-400' 
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
                  }`}
                />
                {errors.projectTitle && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.projectTitle}</p>
                )}
              </div>

              {/* Row 4: Project Type | Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="projectType" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Project Type <span className="text-indigo-600">*</span>
                  </label>
                  <div className="relative">
                    <Layers className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      id="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value as ProjectType })}
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
                    >
                      {projectTypeOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="budget" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Budget Range
                  </label>
                  <div className="relative">
                    <Coins className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value as BudgetRange })}
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 5: Expected Timeline */}
              <div>
                <label htmlFor="timeline" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Expected Timeline
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    id="timeline"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value as TimelineOption })}
                    className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
                  >
                    {timelineOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Requirements */}
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>Requirements</span>
                </h3>
                <p className="text-xs text-slate-500">Detailed requirements and contact preferences.</p>
              </div>

              {/* Project Description */}
              <div>
                <label htmlFor="projectDescription" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Project Description <span className="text-indigo-600">*</span>
                </label>
                <textarea
                  id="projectDescription"
                  rows={4}
                  placeholder="Describe what you want to build, the core problem it solves, target users, and expected workflow..."
                  value={formData.projectDescription}
                  onChange={(e) => {
                    setFormData({ ...formData, projectDescription: e.target.value });
                    if (errors.projectDescription) setErrors({ ...errors, projectDescription: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 transition-all resize-y ${
                    errors.projectDescription 
                      ? 'border-red-400 focus:ring-red-400' 
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
                  }`}
                />
                {errors.projectDescription && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{errors.projectDescription}</p>
                )}
              </div>

              {/* Required Features */}
              <div>
                <label htmlFor="requiredFeatures" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Required Features <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  id="requiredFeatures"
                  rows={2}
                  placeholder="e.g. Auth, Stripe billing, admin dashboard, analytics charts, PDF export..."
                  value={formData.requiredFeatures}
                  onChange={(e) => setFormData({ ...formData, requiredFeatures: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all resize-y"
                />
              </div>

              {/* Reference URL & Preferred Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="referenceUrl" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Reference Website / URL <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      id="referenceUrl"
                      type="url"
                      placeholder="e.g. https://linear.app"
                      value={formData.referenceUrl}
                      onChange={(e) => {
                        setFormData({ ...formData, referenceUrl: e.target.value });
                        if (errors.referenceUrl) setErrors({ ...errors, referenceUrl: '' });
                      }}
                      className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 transition-all ${
                        errors.referenceUrl 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-100'
                      }`}
                    />
                  </div>
                  {errors.referenceUrl && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.referenceUrl}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="preferredContact" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferred Contact Method
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      id="preferredContact"
                      value={formData.preferredContact}
                      onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value as ContactMethod })}
                      className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
                    >
                      {contactMethodOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Guarantee Box */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-slate-600 flex items-start gap-3">
              <Send className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>
                Your project requirements will be stored in the database and dispatched directly to founder <strong className="text-slate-900">Parmeshwar Metkar</strong> at <strong className="text-indigo-700">parmeshwarmetkar07@gmail.com</strong>.
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-hover-lift py-4 px-6 rounded-full font-bold text-white bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-600 hover:from-blue-600 hover:to-indigo-500 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-base font-display"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Project Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
