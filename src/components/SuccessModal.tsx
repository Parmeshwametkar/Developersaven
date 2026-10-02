import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, ExternalLink, ArrowLeft, Mail } from 'lucide-react';

interface SuccessModalProps {
  inquiryId: string;
  payload: any;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ inquiryId, payload, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(inquiryId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const directMailSubject = encodeURIComponent(`Project Inquiry: ${payload?.project_title || 'Project'} [${inquiryId}]`);
  const directMailBody = encodeURIComponent(
    `Hello Parmeshwar,\n\nI just submitted an inquiry on Developersaven (Inquiry ID: ${inquiryId}).\n\nProject: ${payload?.project_title || ''}\nType: ${payload?.project_type || ''}\n\nLooking forward to speaking with you!\n\nBest regards,\n${payload?.full_name || ''}`
  );
  const mailtoLink = `mailto:parmeshwarmetkar07@gmail.com?subject=${directMailSubject}&body=${directMailBody}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left">
        
        {/* Success Icon & Header */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              Project Inquiry Received
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mt-1">
              Developersaven · Startup Solutions
            </p>
          </div>
        </div>

        {/* Message body */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
          <p className="text-sm text-slate-700 leading-relaxed">
            Thank you for contacting Developersaven. Your project requirements have been received successfully. We will review the details and contact you using the information provided.
          </p>
        </div>

        {/* Inquiry ID Card */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-indigo-700 font-bold block">
              Inquiry ID
            </span>
            <span className="text-lg font-mono font-bold text-slate-900 tracking-wider">
              {inquiryId}
            </span>
          </div>
          <button
            onClick={handleCopyId}
            className="btn-hover-lift inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-full shadow-xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        {/* Notification details */}
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
          <span>
            Notification sent directly to: <strong className="text-slate-800">parmeshwarmetkar07@gmail.com</strong>
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <a
            href={mailtoLink}
            className="btn-hover-lift flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
            <span>Open Email Thread</span>
          </a>

          <button
            onClick={() => {
              onClose();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-hover-lift flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-700 to-indigo-600 hover:from-blue-600 hover:to-indigo-500 rounded-full shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

      </div>
    </div>
  );
};
