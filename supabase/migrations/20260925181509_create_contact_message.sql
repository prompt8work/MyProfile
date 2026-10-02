create table if not exists public.contact_message (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  organization text,
  purpose text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.contact_message enable row level security;

-- Anonymous visitors may only INSERT (the contact form) — no policy grants
-- SELECT/UPDATE/DELETE to anon, so submissions can never be read back
-- through the public API, only through the Supabase dashboard / service
-- role. This is deliberately narrower than "use the service role key
-- server-side," per PRD §76's least-privilege intent.
create policy "Anyone can submit a contact message"
  on public.contact_message
  for insert
  to anon
  with check (true);
