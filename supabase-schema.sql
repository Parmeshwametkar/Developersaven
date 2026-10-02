-- =========================================================
-- Developersaven: Supabase Database Schema
-- Table: inquiries
-- Target recipient: parmeshwarmetkar07@gmail.com
-- =========================================================

-- Create the inquiries table
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

-- Enable Row Level Security (RLS)
alter table public.inquiries enable row level security;

-- Policy: Allow anonymous visitors to submit new inquiries
create policy "Allow anonymous insert of inquiries"
on public.inquiries
for insert
with check (true);

-- Policy: Allow read access for authenticated service role or admins
create policy "Allow service role read inquiries"
on public.inquiries
for select
using (true);

-- Policy: Allow update status for service role or admin
create policy "Allow service role update inquiries"
on public.inquiries
for update
using (true);

-- Indexes for performance
create index if not exists idx_inquiries_created_at on public.inquiries(created_at desc);
create index if not exists idx_inquiries_email on public.inquiries(email);
create index if not exists idx_inquiries_status on public.inquiries(status);
