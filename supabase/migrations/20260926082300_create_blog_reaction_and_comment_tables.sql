
-- PRD §63 ERD: BLOG_REACTION and COMMENT tables.

create table public.blog_reaction (
  id uuid primary key default gen_random_uuid(),
  content_id text not null,
  reaction_type text not null check (reaction_type = any (array['like', 'love', 'insightful', 'useful', 'share'])),
  visitor_hash text not null,
  created_at timestamptz not null default now()
);

-- One reaction of a given type per visitor per piece of content — the
-- soft anonymous rate-limit PRD §32 asks for (a repeat click updates
-- nothing new; the client can no-op locally once it already has one).
create unique index blog_reaction_visitor_unique
  on public.blog_reaction (content_id, reaction_type, visitor_hash);

create index blog_reaction_content_id_idx on public.blog_reaction (content_id);

alter table public.blog_reaction enable row level security;

-- Reactions carry no PII (visitor_hash is a random per-browser token, not
-- an identity) and counts must be publicly visible, so — unlike
-- contact_message — anon gets both INSERT and SELECT here.
create policy "anon can insert reactions"
  on public.blog_reaction for insert
  to anon
  with check (true);

create policy "anon can read reaction counts"
  on public.blog_reaction for select
  to anon
  using (true);

create table public.comment (
  id uuid primary key default gen_random_uuid(),
  content_id text not null,
  name text not null,
  email text not null,
  comment text not null,
  status text not null default 'PENDING' check (status = any (array['PENDING', 'APPROVED', 'PUBLISHED', 'REJECTED'])),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index comment_content_id_idx on public.comment (content_id);

alter table public.comment enable row level security;

-- PRD §59 moderation state machine: a new comment can only ever be
-- inserted as PENDING — anon has no path to set its own status to
-- PUBLISHED. Moving PENDING -> APPROVED -> PUBLISHED (or -> REJECTED)
-- happens from the Supabase dashboard, which is the "secure admin
-- authentication" surface for this table until Phase 6 builds a real
-- admin UI (PRD §77: admin auth is a separate, later concern).
create policy "anon can insert pending comments"
  on public.comment for insert
  to anon
  with check (status = 'PENDING');

-- Comments are "not automatically public" (PRD §33) — anon can only ever
-- read comments already moved to PUBLISHED, never PENDING/APPROVED/REJECTED.
create policy "anon can read published comments"
  on public.comment for select
  to anon
  using (status = 'PUBLISHED');
