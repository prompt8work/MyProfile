
-- PRD §63 ERD: TRAINING_BATCH, CLASS_SCHEDULE, TRAINING_REGISTRATION.
-- training_id is a plain string, not a FK — Training documents live in
-- Sanity, not Postgres, so this is a loose reference (the training's
-- Sanity slug), matching the ERD's own "string training_id" typing.

create table public.training_batch (
  id uuid primary key default gen_random_uuid(),
  training_id text not null,
  batch_name text not null,
  start_date date not null,
  end_date date,
  mode text,
  seats int not null default 0,
  seats_filled int not null default 0,
  -- Not in the §63 ERD's literal column list, but §39's own batch field
  -- list includes "Registration Deadline" and §74 rule 3 requires
  -- checking it — impossible without storing it. Same kind of justified,
  -- commented addition as data/projects.ts's `stats` field beyond its PRD
  -- schema stub.
  registration_deadline date,
  status text not null default 'DRAFT'
    check (status = any (array['DRAFT', 'OPEN', 'FULL', 'CLOSED', 'COMPLETED', 'CANCELLED'])),
  created_at timestamptz not null default now()
);

create index training_batch_training_id_idx on public.training_batch (training_id);

alter table public.training_batch enable row level security;

-- Batch/schedule data (dates, seats, status) carries no PII and must be
-- publicly visible for a visitor to see availability before registering.
create policy "anon can read batches"
  on public.training_batch for select
  to anon
  using (true);

-- No direct write grants for anon/authenticated — every write goes
-- through register_for_batch() below.
revoke insert, update, delete on public.training_batch from anon, authenticated;

create table public.class_schedule (
  id uuid primary key default gen_random_uuid(),
  batch_id uuid not null references public.training_batch(id) on delete cascade,
  class_date date not null,
  start_time time not null,
  end_time time not null,
  timezone text not null default 'IST',
  status text not null default 'SCHEDULED'
    check (status = any (array['SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED']))
);

create index class_schedule_batch_id_idx on public.class_schedule (batch_id);

alter table public.class_schedule enable row level security;

create policy "anon can read class schedule"
  on public.class_schedule for select
  to anon
  using (true);

revoke insert, update, delete on public.class_schedule from anon, authenticated;

create table public.training_registration (
  id uuid primary key default gen_random_uuid(),
  training_id text not null,
  batch_id uuid not null references public.training_batch(id),
  name text not null,
  email text not null,
  phone text,
  organization text,
  experience_level text,
  status text not null default 'confirmed',
  created_at timestamptz not null default now()
);

create index training_registration_batch_id_idx on public.training_registration (batch_id);

alter table public.training_registration enable row level security;

-- Deliberately NO select/insert/update/delete policy for anon at all —
-- registrations carry real PII (name/email/phone), the same reasoning as
-- contact_message having no public SELECT. Every write goes through
-- register_for_batch(), never a direct table write.
revoke insert, update, delete on public.training_registration from anon, authenticated;

-- PRD §73's exact call chain (RegisterTraining -> ValidateBatch ->
-- CheckSeatAvailability -> CreateRegistration) and §74's business rules,
-- collapsed into one atomic SECURITY DEFINER transaction rather than
-- separate application-level steps — a read-then-write across multiple
-- round trips from the Server Action would race under concurrent
-- registrations for the last seat. "for update" locks the batch row so
-- two simultaneous calls for the same batch serialize instead of both
-- reading a stale seat count.
create or replace function public.register_for_batch(
  p_batch_id uuid,
  p_training_id text,
  p_name text,
  p_email text,
  p_phone text,
  p_organization text,
  p_experience_level text
)
returns table(registration_id uuid, result_status text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_batch record;
  v_existing_count int;
  v_new_id uuid;
begin
  select * into v_batch from public.training_batch where id = p_batch_id for update;

  if not found then
    return query select null::uuid, 'BATCH_NOT_FOUND';
    return;
  end if;

  if v_batch.status <> 'OPEN' then
    return query select null::uuid, 'BATCH_NOT_OPEN';
    return;
  end if;

  if v_batch.registration_deadline is not null and v_batch.registration_deadline < current_date then
    return query select null::uuid, 'DEADLINE_PASSED';
    return;
  end if;

  if v_batch.seats_filled >= v_batch.seats then
    return query select null::uuid, 'BATCH_FULL';
    return;
  end if;

  select count(*) into v_existing_count from public.training_registration
    where batch_id = p_batch_id and email = p_email;

  if v_existing_count > 0 then
    return query select null::uuid, 'DUPLICATE_REGISTRATION';
    return;
  end if;

  insert into public.training_registration
    (training_id, batch_id, name, email, phone, organization, experience_level, status)
  values
    (p_training_id, p_batch_id, p_name, p_email, p_phone, p_organization, p_experience_level, 'confirmed')
  returning id into v_new_id;

  update public.training_batch
    set seats_filled = seats_filled + 1,
        status = case when seats_filled + 1 >= seats then 'FULL' else status end
    where id = p_batch_id;

  return query select v_new_id, 'SUCCESS';
end;
$$;

grant execute on function public.register_for_batch(uuid, text, text, text, text, text, text) to anon;
