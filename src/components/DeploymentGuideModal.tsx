import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Database, Mail, Cloud, Shield } from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const sqlSchema = `-- Run this in Supabase SQL Editor:
create table if not exists public.inquiries (
  id text primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  email text not null,
  phone text,
  company text,
  project_type text not null,
  budget text,
  timeline text,
  project_title text not null,
  project_description text not null,
  required_features text,
  reference_url text,
  preferred_contact text,
  status text default 'New' not null check (status in ('New', 'Contacted', 'In Progress', 'Completed', 'Closed'))
);

alter table public.inquiries enable row level security;

create policy "Allow insert of inquiries"
on public.inquiries for insert with check (true);

create policy "Allow select inquiries"
on public.inquiries for select using (true);`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[88vh] bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-y-auto p-6 sm:p-8 text-left space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Vercel, Supabase & Email Deployment Guide
              </h3>
              <p className="text-xs text-slate-500">
                Production architecture configuration for Developersaven
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overview */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-600">
          <p className="font-bold text-slate-900">Fullstack Hybrid Architecture:</p>
          <p>
            • Development Runtime: Express backend + Vite dev server mounts on port 3000 (`server.ts`).
          </p>
          <p>
            • Vercel Production: Uses `vercel.json` and serverless API function `/api/inquiries.ts`.
          </p>
          <p>
            • Database Persistence: Directly saves to Supabase PostgreSQL when configured, with built-in resilient server-side backup.
          </p>
        </div>

        {/* Environment Variables */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            <span>1. Required Environment Variables</span>
          </h4>
          <div className="p-4 rounded-2xl bg-slate-900 font-mono text-xs text-slate-200 border border-slate-800 space-y-2">
            <p><strong className="text-cyan-400">CONTACT_EMAIL</strong>="parmeshwarmetkar07@gmail.com"</p>
            <p><strong className="text-cyan-400">SUPABASE_URL</strong>="https://[project-ref].supabase.co"</p>
            <p><strong className="text-cyan-400">SUPABASE_ANON_KEY</strong>="eyJhbGciOi..."</p>
            <p><strong className="text-cyan-400">RESEND_API_KEY</strong>="re_12345..."</p>
          </div>
        </div>

        {/* SQL Schema */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600" />
              <span>2. Supabase SQL Setup (Table: inquiries)</span>
            </h4>
            <button
              onClick={() => handleCopy(sqlSchema, 'sql')}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full border border-slate-200 cursor-pointer"
            >
              {copiedKey === 'sql' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>Copy SQL</span>
            </button>
          </div>
          <pre className="p-4 rounded-2xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800">
            {sqlSchema}
          </pre>
        </div>

        {/* Email Notification Flow */}
        <div className="space-y-2 text-xs text-slate-600">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-600" />
            <span>3. Email Delivery (Resend API)</span>
          </h4>
          <p>
            When a visitor submits an inquiry, the server invokes Resend's API sending the client requirements directly to:
          </p>
          <div className="p-3 rounded-xl bg-indigo-50 font-mono text-indigo-900 border border-indigo-200 font-bold">
            parmeshwarmetkar07@gmail.com
          </div>
        </div>

        {/* Close Button */}
        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="btn-hover-lift px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition-colors cursor-pointer shadow-xs"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
