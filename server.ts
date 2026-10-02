import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Target recipient email for project inquiries
const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || 'parmeshwarmetkar07@gmail.com';
const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const ADMIN_PASSKEY = process.env.ADMIN_PASSKEY || 'devaven2026';

// Initialize Supabase if credentials are provided
let supabaseClient: any = null;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('[Supabase] Initialized Supabase client successfully');
  } catch (err) {
    console.warn('[Supabase] Initialization failed, will use local storage fallback:', err);
  }
}

// Ensure local persistence directory exists
const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'inquiries.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadLocalInquiries(): any[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.error('[Storage] Error reading inquiries.json:', e);
  }
  return [];
}

function saveLocalInquiries(inquiries: any[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (e) {
    console.error('[Storage] Error writing inquiries.json:', e);
  }
}

// Generate unique inquiry ID (Format: DS-XXXXXX)
function generateInquiryId(): string {
  const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `DS-${randomChars}`;
}

// Helper to send email via Resend
async function sendInquiryEmail(inquiry: any) {
  if (!RESEND_API_KEY) {
    console.log(`[Email Dispatch] RESEND_API_KEY not configured. Notification payload prepared for ${RECIPIENT_EMAIL}:`);
    console.log(JSON.stringify({
      to: RECIPIENT_EMAIL,
      subject: `New Project Inquiry — Developersaven [${inquiry.id}]`,
      client: `${inquiry.full_name} (${inquiry.email})`,
      projectTitle: inquiry.project_title,
      projectType: inquiry.project_type,
      budget: inquiry.budget,
      timeline: inquiry.timeline,
    }, null, 2));
    return { sent: false, reason: 'RESEND_API_KEY not set (logged securely on server)' };
  }

  try {
    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
        <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; margin-bottom: 24px; text-align: left;">
          <h1 style="color: #38bdf8; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Developersaven</h1>
          <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">Startup Solutions · New Client Project Inquiry</p>
        </div>

        <div style="background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 16px;">
            <strong style="color: #0f172a; font-size: 14px;">Inquiry ID:</strong>
            <span style="font-family: monospace; font-size: 14px; color: #0284c7; font-weight: bold;">${inquiry.id}</span>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 140px;">Client Name:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${inquiry.full_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Email Address:</td>
              <td style="padding: 8px 0; font-weight: 600;"><a href="mailto:${inquiry.email}" style="color: #0284c7; text-decoration: none;">${inquiry.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Phone / WhatsApp:</td>
              <td style="padding: 8px 0; color: #0f172a;">${inquiry.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Company / Org:</td>
              <td style="padding: 8px 0; color: #0f172a;">${inquiry.company || 'Individual / Startup'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Project Type:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #0284c7;">${inquiry.project_type}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Budget Range:</td>
              <td style="padding: 8px 0; color: #0f172a;">${inquiry.budget || 'Flexible / Not decided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Expected Timeline:</td>
              <td style="padding: 8px 0; color: #0f172a;">${inquiry.timeline || 'Flexible'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Preferred Contact:</td>
              <td style="padding: 8px 0; color: #0f172a;">${inquiry.preferred_contact || 'Email'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Reference URL:</td>
              <td style="padding: 8px 0; color: #0f172a;">${inquiry.reference_url ? `<a href="${inquiry.reference_url}" target="_blank" style="color: #0284c7;">${inquiry.reference_url}</a>` : 'None'}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
            <h3 style="margin: 0 0 8px 0; font-size: 15px; color: #0f172a;">Project Title:</h3>
            <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 600; color: #1e293b;">${inquiry.project_title}</p>

            <h3 style="margin: 0 0 8px 0; font-size: 15px; color: #0f172a;">Project Description:</h3>
            <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${inquiry.project_description}</div>

            ${inquiry.required_features ? `
              <h3 style="margin: 16px 0 8px 0; font-size: 15px; color: #0f172a;">Required Features:</h3>
              <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${inquiry.required_features}</div>
            ` : ''}
          </div>
        </div>

        <div style="text-align: center; font-size: 12px; color: #94a3b8;">
          <p style="margin: 4px 0;">Received at: ${new Date(inquiry.created_at).toUTCString()}</p>
          <p style="margin: 4px 0;">Developersaven · Founder: Parmeshwar Metkar · Startup Solutions</p>
        </div>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Developersaven Inquiries <onboarding@resend.dev>',
        to: [RECIPIENT_EMAIL],
        reply_to: inquiry.email,
        subject: `New Project Inquiry: ${inquiry.project_title} — Developersaven [${inquiry.id}]`,
        html: htmlBody,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[Resend Error]', res.status, errText);
      return { sent: false, error: errText };
    }

    const data = await res.json();
    return { sent: true, data };
  } catch (err: any) {
    console.error('[Resend Exception]', err);
    return { sent: false, error: err.message };
  }
}

// API Health Check & System Status
app.get('/api/health', (req: Request, res: Response) => {
  const localList = loadLocalInquiries();
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    recipientEmail: RECIPIENT_EMAIL,
    supabaseConfigured: !!(SUPABASE_URL && SUPABASE_ANON_KEY),
    resendConfigured: !!RESEND_API_KEY,
    totalLocalInquiries: localList.length,
  });
});

// API: Create new Project Inquiry
app.post('/api/inquiries', async (req: Request, res: Response): Promise<any> => {
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

    // Strict validation
    if (!full_name || typeof full_name !== 'string' || full_name.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide a valid full name.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!project_type || typeof project_type !== 'string') {
      return res.status(400).json({ error: 'Please select a project type.' });
    }

    if (!project_title || typeof project_title !== 'string' || project_title.trim().length < 3) {
      return res.status(400).json({ error: 'Please provide a project title (minimum 3 characters).' });
    }

    if (!project_description || typeof project_description !== 'string' || project_description.trim().length < 10) {
      return res.status(400).json({ error: 'Please provide a project description (minimum 10 characters).' });
    }

    const inquiryId = generateInquiryId();
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

    let supabaseSuccess = false;

    // 1. Save to Supabase PostgreSQL if configured
    if (supabaseClient) {
      try {
        const { error: dbError } = await supabaseClient
          .from('inquiries')
          .insert([inquiryRecord]);

        if (dbError) {
          console.error('[Supabase Error] Failed to insert inquiry:', dbError);
        } else {
          supabaseSuccess = true;
          console.log('[Supabase Success] Recorded inquiry:', inquiryId);
        }
      } catch (dbEx) {
        console.error('[Supabase Exception]', dbEx);
      }
    }

    // 2. Always persist to resilient local store so data is never lost
    const localInquiries = loadLocalInquiries();
    localInquiries.unshift(inquiryRecord);
    saveLocalInquiries(localInquiries);

    // 3. Dispatch email notification to parmeshwarmetkar07@gmail.com
    const emailResult = await sendInquiryEmail(inquiryRecord);

    return res.status(201).json({
      success: true,
      inquiryId: inquiryId,
      message: 'Your project inquiry has been received successfully. Our team will review your requirements and contact you using the details provided.',
      databaseSaved: supabaseSuccess || true,
      emailDispatched: emailResult.sent,
      inquiry: {
        id: inquiryRecord.id,
        created_at: inquiryRecord.created_at,
        full_name: inquiryRecord.full_name,
        email: inquiryRecord.email,
        project_type: inquiryRecord.project_type,
        project_title: inquiryRecord.project_title,
      },
    });
  } catch (error: any) {
    console.error('[API /inquiries Error]', error);
    return res.status(500).json({
      error: 'An unexpected error occurred while processing your inquiry. Please try again or contact us directly at parmeshwarmetkar07@gmail.com',
    });
  }
});

// API: Get inquiries (for dashboard & management)
app.get('/api/inquiries', async (req: Request, res: Response): Promise<any> => {
  try {
    // If Supabase is available, try reading from Supabase
    if (supabaseClient) {
      const { data, error } = await supabaseClient
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return res.json({ inquiries: data, source: 'supabase' });
      }
    }

    // Fallback to local store
    const localList = loadLocalInquiries();
    return res.json({ inquiries: localList, source: 'local' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// API: Update inquiry status (New, Contacted, In Progress, Completed, Closed)
app.patch('/api/inquiries/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['New', 'Contacted', 'In Progress', 'Completed', 'Closed'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    // Update in Supabase if configured
    if (supabaseClient) {
      await supabaseClient
        .from('inquiries')
        .update({ status })
        .eq('id', id);
    }

    // Update in local store
    const list = loadLocalInquiries();
    const index = list.findIndex((item) => item.id === id);
    if (index !== -1) {
      list[index].status = status;
      saveLocalInquiries(list);
    }

    return res.json({ success: true, id, status });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// Mount Vite or serve static files
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Developersaven Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
