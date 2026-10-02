-- Hardens register_for_batch() against two gaps in the original version:
--
-- 1. Case-sensitive duplicate check. "A@x.com" and "a@x.com" were treated
--    as different people, so one person could take two seats. Emails are
--    now compared lower-cased, and a unique index backs that up at the
--    table level (defense in depth — the function is the only write path,
--    but the index makes the rule hold even if that ever changes).
-- 2. Caller-supplied training_id was trusted. A request could pair batch X
--    with any training slug, storing a registration whose training_id
--    disagrees with its batch. The batch row is the source of truth, so
--    the function now ignores p_training_id and uses the batch's own.
--
-- Signature is unchanged, so trainingRepository.ts needs no change.

create unique index if not exists training_registration_batch_email_unique
  on public.training_registration (batch_id, lower(email));

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
  v_email text := lower(trim(p_email));
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

  if exists (
    select 1 from public.training_registration
    where batch_id = p_batch_id and lower(email) = v_email
  ) then
    return query select null::uuid, 'DUPLICATE_REGISTRATION';
    return;
  end if;

  insert into public.training_registration
    (training_id, batch_id, name, email, phone, organization, experience_level, status)
  values
    (v_batch.training_id, p_batch_id, p_name, v_email, p_phone, p_organization, p_experience_level, 'confirmed')
  returning id into v_new_id;

  update public.training_batch
    set seats_filled = seats_filled + 1,
        status = case when seats_filled + 1 >= seats then 'FULL' else status end
    where id = p_batch_id;

  return query select v_new_id, 'SUCCESS';
end;
$$;

-- anon is the intended caller (the Server Action uses the publishable key).
-- The Supabase advisor flags this as "public can execute SECURITY DEFINER";
-- that is the design — the function is the single, validated write path.
grant execute on function public.register_for_batch(uuid, text, text, text, text, text, text) to anon;
