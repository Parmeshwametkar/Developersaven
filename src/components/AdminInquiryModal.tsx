import React, { useState, useEffect } from 'react';
import { 
  X, 
  RefreshCw, 
  Inbox, 
  Search, 
  Calendar, 
  Mail, 
  Phone, 
  Building, 
  Copy, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { ProjectInquiry, InquiryStatus } from '../types';

interface AdminInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshNeeded?: () => void;
}

export const AdminInquiryModal: React.FC<AdminInquiryModalProps> = ({ 
  isOpen, 
  onClose,
  onRefreshNeeded 
}) => {
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/inquiries');
      if (!res.ok) {
        throw new Error('Failed to load inquiries from server');
      }
      const data = await res.json();
      setInquiries(data.inquiries || []);
      if (data.inquiries && data.inquiries.length > 0 && !selectedInquiry) {
        setSelectedInquiry(data.inquiries[0]);
      }
    } catch (err: any) {
      setError(err.message || 'Error fetching records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInquiries();
    }
  }, [isOpen]);

  const handleUpdateStatus = async (id: string, newStatus: InquiryStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries(prev => 
          prev.map(item => item.id === id ? { ...item, status: newStatus } : item)
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
        }
        if (onRefreshNeeded) onRefreshNeeded();
      }
    } catch (e) {
      console.error('Failed to update status:', e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCopy = (text: string, id: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  if (!isOpen) return null;

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      inq.full_name?.toLowerCase().includes(term) ||
      inq.email?.toLowerCase().includes(term) ||
      inq.project_title?.toLowerCase().includes(term) ||
      inq.id?.toLowerCase().includes(term) ||
      inq.company?.toLowerCase().includes(term);

    return matchesStatus && matchesSearch;
  });

  const statuses: InquiryStatus[] = ['New', 'Contacted', 'In Progress', 'Completed', 'Closed'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[88vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left">
        
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Developersaven Inquiries Console
              </h3>
              <p className="text-xs text-slate-500">
                Direct client submissions · parmeshwarmetkar07@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchInquiries}
              disabled={loading}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50 cursor-pointer"
              title="Refresh records"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="px-6 py-3 border-b border-slate-200 bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by client, email, project title, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-600 text-xs"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto py-1">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1 rounded-full font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              All ({inquiries.length})
            </button>
            {statuses.map((st) => {
              const count = inquiries.filter(i => i.status === st).length;
              return (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-full font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    statusFilter === st
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {st} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Pane Body */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Pane: List */}
          <div className="w-full md:w-5/12 border-r border-slate-200 overflow-y-auto p-4 space-y-2.5 bg-slate-50/50">
            {loading && inquiries.length === 0 ? (
              <div className="py-20 text-center text-xs text-slate-500">
                Loading inquiries from database...
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="py-20 text-center text-xs text-slate-500 space-y-2">
                <p>No inquiries matching the current criteria.</p>
                <p className="text-[11px] text-slate-400">New submissions via the website form will appear here instantly.</p>
              </div>
            ) : (
              filteredInquiries.map((inq) => {
                const isSelected = selectedInquiry?.id === inq.id;
                return (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                      isSelected
                        ? 'bg-white border-indigo-600 shadow-sm ring-1 ring-indigo-600/20'
                        : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-mono text-indigo-600 font-bold">{inq.id}</span>
                      <span className="text-slate-400 tabular-nums">
                        {new Date(inq.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 truncate mb-0.5">
                      {inq.project_title}
                    </h4>

                    <div className="flex items-center justify-between text-xs text-slate-600 mt-2">
                      <span className="truncate font-medium">{inq.full_name}</span>
                      <span className="text-indigo-600 font-semibold ml-2">{inq.project_type}</span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 mt-2 border-t border-slate-100">
                      <span>Status: <strong className="text-slate-700">{inq.status}</strong></span>
                      <span>{inq.budget}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Pane: Selected Details */}
          <div className="hidden md:flex flex-1 flex-col overflow-y-auto p-6 bg-white">
            {selectedInquiry ? (
              <div className="space-y-6">
                
                {/* Header */}
                <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-indigo-600 font-bold">{selectedInquiry.id}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500">
                        Received {new Date(selectedInquiry.created_at).toLocaleString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-display mt-1">
                      {selectedInquiry.project_title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Status:</span>
                    <select
                      value={selectedInquiry.status}
                      disabled={updatingId === selectedInquiry.id}
                      onChange={(e) => handleUpdateStatus(selectedInquiry.id, e.target.value as InquiryStatus)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-indigo-600"
                    >
                      {statuses.map(st => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Client Profile Box */}
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider font-bold block mb-0.5">Client Full Name</span>
                    <span className="text-sm font-bold text-slate-900">{selectedInquiry.full_name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider font-bold block mb-0.5">Email Address</span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        className="text-indigo-600 hover:underline font-semibold"
                      >
                        {selectedInquiry.email}
                      </a>
                      <button
                        onClick={() => handleCopy(selectedInquiry.email, 'email')}
                        className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                        title="Copy email"
                      >
                        {copiedId === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider font-bold block mb-0.5">Phone / WhatsApp</span>
                    <span className="text-slate-700 font-medium">{selectedInquiry.phone || 'Not provided'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider font-bold block mb-0.5">Company / Org</span>
                    <span className="text-slate-700 font-medium">{selectedInquiry.company || 'Solo / Startup'}</span>
                  </div>
                </div>

                {/* Project Specs */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider font-bold block mb-0.5">Project Type</span>
                    <span className="text-indigo-600 font-bold">{selectedInquiry.project_type}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider font-bold block mb-0.5">Budget</span>
                    <span className="text-slate-800 font-semibold">{selectedInquiry.budget}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider font-bold block mb-0.5">Timeline</span>
                    <span className="text-slate-800 font-semibold">{selectedInquiry.timeline}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase tracking-wider font-bold block mb-0.5">Preferred Contact</span>
                    <span className="text-slate-700 font-medium">{selectedInquiry.preferred_contact || 'Email'}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 uppercase tracking-wider font-bold block mb-0.5">Reference Benchmark</span>
                    {selectedInquiry.reference_url ? (
                      <a
                        href={selectedInquiry.reference_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-600 hover:underline flex items-center gap-1 font-medium"
                      >
                        <span className="truncate">{selectedInquiry.reference_url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <span className="text-slate-400">None provided</span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Project Description
                  </h4>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                    {selectedInquiry.project_description}
                  </div>
                </div>

                {selectedInquiry.required_features && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Required Features
                    </h4>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                      {selectedInquiry.required_features}
                    </div>
                  </div>
                )}

                {/* Reply action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Reply directly via client email.
                  </span>
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Re:%20Project%20Inquiry%20${encodeURIComponent(selectedInquiry.project_title)}%20%E2%80%94%20Developersaven&body=Hi%20${encodeURIComponent(selectedInquiry.full_name)},%0D%0A%0D%0AThank%20you%20for%20contacting%20Developersaven%20regarding%20${encodeURIComponent(selectedInquiry.project_title)}.`}
                    className="btn-hover-lift inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors cursor-pointer shadow-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply to {selectedInquiry.full_name}</span>
                  </a>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-xs text-slate-400">
                Select an inquiry from the left panel to review full specifications.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
