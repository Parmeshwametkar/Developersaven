import type { Request, Response } from 'express';
import { createClient } from '@supabase/supabase-js';

const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || 'parmeshwarmetkar07@gmail.com';
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

let supabase: any = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (e) {
    console.error('Supabase init error:', e);
  }
}

export default async function handler(req: Request, res: Response) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    if (supabase) {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return res.status(200).json({ inquiries: data });
      }
    }
    return res.status(200).json({ inquiries: [] });
  }

  if (req.method === 'POST') {
    try {
      const {
        full_name,
        email,
        phone,
        company,
        project_type,
        budget,
        timeline,
        project_title,
        project_description,
        required_features,
        reference_url,
        preferred_contact,
      } = req.body;

      if (!full_name || full_name.trim().length < 2) {
        return res.status(400).json({ error: 'Please enter your full name.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.trim())) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
      }

      if (!project_type) {
        return res.status(400).json({ error: 'Please select a project type.' });
      }

      if (!project_title || project_title.trim().length < 3) {
        return res.status(400).json({ error: 'Please enter a project title (min 3 characters).' });
      }

      if (!project_description || project_description.trim().length < 10) {
        return res.status(400).json({ error: 'Please provide a project description (min 10 characters).' });
      }

      const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
      const inquiryId = `DS-${randomChars}`;
      const createdAt = new Date().toISOString();

      const inquiryRecord = {
        id: inquiryId,
        created_at: createdAt,
        full_name: full_name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : '',
        company: company ? company.trim() : '',
        project_type: project_type.trim(),
        budget: budget ? budget.trim() : 'Not decided yet',
        timeline: timeline ? timeline.trim() : 'Flexible',
        project_title: project_title.trim(),
        project_description: project_description.trim(),
        required_features: required_features ? required_features.trim() : '',
        reference_url: reference_url ? reference_url.trim() : '',
        preferred_contact: preferred_contact ? preferred_contact.trim() : 'Email',
        status: 'New',
      };

      // 1. Supabase store
      if (supabase) {
        await supabase.from('inquiries').insert([inquiryRecord]);
      }

      // 2. Resend email dispatch
      let emailSent = false;
      if (RESEND_API_KEY) {
        try {
          const emailResp = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: 'Developersaven <onboarding@resend.dev>',
              to: [RECIPIENT_EMAIL],
              reply_to: inquiryRecord.email,
              subject: `New Project Inquiry: ${inquiryRecord.project_title} — Developersaven [${inquiryRecord.id}]`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px;">
                  <h2>New Project Inquiry — Developersaven</h2>
                  <p><strong>Inquiry ID:</strong> ${inquiryRecord.id}</p>
                  <p><strong>Client:</strong> ${inquiryRecord.full_name} (${inquiryRecord.email})</p>
                  <p><strong>Phone:</strong> ${inquiryRecord.phone || 'N/A'}</p>
                  <p><strong>Company:</strong> ${inquiryRecord.company || 'N/A'}</p>
                  <p><strong>Project Type:</strong> ${inquiryRecord.project_type}</p>
                  <p><strong>Budget:</strong> ${inquiryRecord.budget}</p>
                  <p><strong>Timeline:</strong> ${inquiryRecord.timeline}</p>
                  <p><strong>Project Title:</strong> ${inquiryRecord.project_title}</p>
                  <p><strong>Description:</strong></p>
                  <p style="background: #f1f5f9; padding: 12px; border-radius: 6px;">${inquiryRecord.project_description}</p>
                  <p><strong>Features:</strong> ${inquiryRecord.required_features || 'N/A'}</p>
                  <p><strong>Reference URL:</strong> ${inquiryRecord.reference_url || 'N/A'}</p>
                  <p><strong>Preferred Contact:</strong> ${inquiryRecord.preferred_contact}</p>
                  <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />
                  <p style="font-size: 12px; color: #64748b;">Developersaven · Founder: Parmeshwar Metkar · Startup Solutions</p>
                </div>
              `,
            }),
          });
          emailSent = emailResp.ok;
        } catch (e) {
          console.error('Email error:', e);
        }
      }

      return res.status(201).json({
        success: true,
        inquiryId: inquiryId,
        message: 'Your project inquiry has been received successfully. Our team will review your requirements and contact you using the details provided.',
        emailDispatched: emailSent,
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
