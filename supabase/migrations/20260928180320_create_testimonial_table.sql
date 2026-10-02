create table public.testimonial (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  organization text,
  quote text not null,
  source_context text not null check (source_context in ('training', 'consulting', 'general')),
  status text not null default 'PENDING' check (status in ('PENDING', 'PUBLISHED')),
  created_at timestamptz not null default now()
);

alter table public.testimonial enable row level security;

-- Same pattern as `comment`: anon may insert only as PENDING, and may
-- only read rows that have been moved to PUBLISHED (by the site owner,
-- directly in the table editor, until Phase 10's admin dashboard exists).
create policy "anon can insert pending testimonials"
  on public.testimonial
  for insert
  to anon
  with check (status = 'PENDING');

create policy "anon can read published testimonials"
  on public.testimonial
  for select
  to anon
  using (status = 'PUBLISHED');
