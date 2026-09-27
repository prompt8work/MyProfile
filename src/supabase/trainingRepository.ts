import { supabase } from "./client";

// Repository pattern (PRD §54) — the only file that touches
// training_batch/class_schedule/training_registration directly.

export type BatchStatus = "DRAFT" | "OPEN" | "FULL" | "CLOSED" | "COMPLETED" | "CANCELLED";

export type TrainingBatch = {
  id: string;
  batchName: string;
  startDate: string;
  endDate: string | null;
  mode: string | null;
  seats: number;
  seatsFilled: number;
  registrationDeadline: string | null;
  status: BatchStatus;
};

export type ClassSchedule = {
  id: string;
  classDate: string;
  startTime: string;
  endTime: string;
  timezone: string;
  status: string;
};

export async function getBatchesForTraining(trainingId: string): Promise<TrainingBatch[]> {
  const { data, error } = await supabase
    .from("training_batch")
    .select("id, batch_name, start_date, end_date, mode, seats, seats_filled, registration_deadline, status")
    .eq("training_id", trainingId)
    .order("start_date", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch batches: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    batchName: row.batch_name,
    startDate: row.start_date,
    endDate: row.end_date,
    mode: row.mode,
    seats: row.seats,
    seatsFilled: row.seats_filled,
    registrationDeadline: row.registration_deadline,
    status: row.status as BatchStatus,
  }));
}

export async function getScheduleForBatch(batchId: string): Promise<ClassSchedule[]> {
  const { data, error } = await supabase
    .from("class_schedule")
    .select("id, class_date, start_time, end_time, timezone, status")
    .eq("batch_id", batchId)
    .order("class_date", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch class schedule: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    classDate: row.class_date,
    startTime: row.start_time,
    endTime: row.end_time,
    timezone: row.timezone,
    status: row.status,
  }));
}

export type RegistrationInput = {
  batchId: string;
  trainingId: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  experienceLevel?: string;
};

export type RegistrationResult =
  | "SUCCESS"
  | "BATCH_NOT_FOUND"
  | "BATCH_NOT_OPEN"
  | "DEADLINE_PASSED"
  | "BATCH_FULL"
  | "DUPLICATE_REGISTRATION";

// Calls register_for_batch() — a SECURITY DEFINER Postgres function that
// validates and inserts atomically (PRD §73/§74). Never insert into
// training_registration directly: RLS on that table has no policies at
// all, by design, and the seat-count race safety only holds inside that
// function's row lock, not across separate application-level calls.
export async function registerForBatch(input: RegistrationInput): Promise<RegistrationResult> {
  const { data, error } = await supabase.rpc("register_for_batch", {
    p_batch_id: input.batchId,
    p_training_id: input.trainingId,
    p_name: input.name,
    p_email: input.email,
    p_phone: input.phone || null,
    p_organization: input.organization || null,
    p_experience_level: input.experienceLevel || null,
  });

  if (error) {
    throw new Error(`Failed to register: ${error.message}`);
  }

  const row = data?.[0];
  return (row?.result_status as RegistrationResult) ?? "BATCH_NOT_FOUND";
}
