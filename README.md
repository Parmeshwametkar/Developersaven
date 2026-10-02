# Developersaven — Startup Solutions

> Modern websites, applications and software solutions built around your ideas.

Official website and inquiry portal for **Developersaven**, founded by **Parmeshwar Metkar** (`parmeshwarmetkar07@gmail.com`).

---

## 🚀 Overview

Developersaven is a software development and digital solutions company built for startups, businesses, and founders. This project features:

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, Syne & Plus Jakarta Sans typography.
- **Backend / API**: Express full-stack server (`server.ts`) and Vercel serverless functions (`api/inquiries.ts`).
- **Database Support**: Supabase PostgreSQL table with automatic fallback to resilient file-backed storage (`data/inquiries.json`).
- **Notification Engine**: Transactional email notifications via Resend API sent to `parmeshwarmetkar07@gmail.com`.
- **Inquiry Management**: Built-in interactive Admin Inquiries Console with status tracking (`New`, `Contacted`, `In Progress`, `Completed`, `Closed`).

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript (Vite)
- **Styling**: Tailwind CSS v4
- **Backend**: Node.js / Express
- **Database**: Supabase PostgreSQL (SQL migration script included in `supabase-schema.sql`)
- **Email Service**: Resend API
- **Deployment**: Vercel ready (`vercel.json`) or standard Node.js VPS / Docker

---

## 📦 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/developersaven.git
cd developersaven
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Copy the example environment file:
```bash
cp .env.example .env
```
Configure your keys in `.env` (optional for local testing; the app works out of the box with local storage):
```env
CONTACT_EMAIL="parmeshwarmetkar07@gmail.com"
SUPABASE_URL=""
SUPABASE_ANON_KEY=""
RESEND_API_KEY=""
ADMIN_PASSKEY="devaven2026"
```

### 4. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production build
```bash
npm run build
npm start
```

---

## 🗄️ Supabase Database Setup (Optional)

1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in your Supabase dashboard.
3. Paste and execute the contents of `supabase-schema.sql`.
4. Copy your **Project URL** and **Anon API Key** into your `.env` or Vercel Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

---

## ✉️ Resend Email Setup (Optional)

1. Create a free account at [resend.com](https://resend.com).
2. Generate an API Key and add it to your environment variables:
   - `RESEND_API_KEY`
3. All new project inquiries will be automatically emailed to `parmeshwarmetkar07@gmail.com`.

---

## 🌐 Deploy to Vercel

1. Push this repository to your GitHub account.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Set the environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `RESEND_API_KEY`, `CONTACT_EMAIL`).
5. Click **Deploy**. Vercel will automatically build the static assets and mount the serverless API routes (`/api/inquiries`).

---

## 📄 License & Rights

© 2026 Developersaven. Founder: Parmeshwar Metkar. All rights reserved.
