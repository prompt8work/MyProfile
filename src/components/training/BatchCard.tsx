"use client";

import { useActionState, useState } from "react";
import { submitRegistration, type RegistrationFormState } from "../../app/training/actions";
import type { TrainingBatch, ClassSchedule } from "../../supabase/trainingRepository";

const initialState: RegistrationFormState = { status: "idle", message: "" };
const inputClass = "text-sm px-3.5 py-3 rounded-lg border border-neutral-300 bg-neutral-50 disabled:opacity-60";
const errorTextClass = "text-xs text-error mt-1";

// timeZone: "UTC" avoids a hydration mismatch — this is a Client
// Component, so this date renders once server-side and again during
// client hydration; without a fixed zone, a day-boundary timestamp can
// format to a different calendar day between Vercel's server (UTC) and a
// visitor's local browser, which React flags as a mismatch (found live on
// VideoCard, which has the identical pattern — see its own comment).
function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export default function BatchCard({
  batch,
  schedule,
  trainingId,
}: {
  batch: TrainingBatch;
  schedule: ClassSchedule[];
  trainingId: string;
}) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(submitRegistration, initialState);

  const seatsLeft = batch.seats - batch.seatsFilled;
  const isOpen = batch.status === "OPEN" && seatsLeft > 0;

  return (
    <div className="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-lg font-semibold text-neutral-900">{batch.batchName}</h3>
          <span className="text-sm text-neutral-600">
            {formatDate(batch.startDate)}
            {batch.endDate ? ` – ${formatDate(batch.endDate)}` : ""}
            {batch.mode ? ` · ${batch.mode}` : ""}
          </span>
        </div>
        <span
          className={`font-mono text-[11px] font-semibold px-2.5 py-1 rounded-full self-start ${
            isOpen ? "bg-success/10 text-success" : "bg-neutral-100 text-neutral-600"
          }`}
        >
          {batch.status === "OPEN" ? (isOpen ? `${seatsLeft} SEATS LEFT` : "FULL") : batch.status}
        </span>
      </div>

      {schedule.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {schedule.map((s) => (
            <span key={s.id} className="text-xs text-neutral-600 border border-neutral-200 rounded-full px-3 py-1">
              {formatDate(s.classDate)}, {s.startTime.slice(0, 5)}–{s.endTime.slice(0, 5)} {s.timezone}
            </span>
          ))}
        </div>
      )}

      {isOpen && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="self-start inline-flex items-center gap-2 bg-plum-600 hover:bg-plum-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          Register for this batch
        </button>
      )}

      {isOpen && open && state.status !== "success" && (
        <form action={formAction} className="flex flex-col gap-4 pt-2 border-t border-neutral-100">
          <input type="hidden" name="batchId" value={batch.id} />
          <input type="hidden" name="trainingId" value={trainingId} />

          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label htmlFor={`tr-website-${batch.id}`}>Leave this field empty</label>
            <input id={`tr-website-${batch.id}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`tr-name-${batch.id}`} className="text-xs font-semibold text-neutral-600">Name</label>
              <input id={`tr-name-${batch.id}`} name="name" type="text" disabled={isPending} className={inputClass} />
              {state.fieldErrors?.name && <p className={errorTextClass}>{state.fieldErrors.name}</p>}
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`tr-email-${batch.id}`} className="text-xs font-semibold text-neutral-600">Email</label>
              <input id={`tr-email-${batch.id}`} name="email" type="email" disabled={isPending} className={inputClass} />
              {state.fieldErrors?.email && <p className={errorTextClass}>{state.fieldErrors.email}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`tr-phone-${batch.id}`} className="text-xs font-semibold text-neutral-600">Phone (optional)</label>
              <input id={`tr-phone-${batch.id}`} name="phone" type="tel" disabled={isPending} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor={`tr-org-${batch.id}`} className="text-xs font-semibold text-neutral-600">Organization (optional)</label>
              <input id={`tr-org-${batch.id}`} name="organization" type="text" disabled={isPending} className={inputClass} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`tr-exp-${batch.id}`} className="text-xs font-semibold text-neutral-600">Experience Level</label>
            <select id={`tr-exp-${batch.id}`} name="experienceLevel" disabled={isPending} defaultValue="Beginner" className={`${inputClass} text-neutral-900`}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 bg-plum-600 hover:bg-plum-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60"
            >
              {isPending ? "Submitting…" : "Confirm Registration"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={isPending}
              className="text-sm text-neutral-600 hover:text-neutral-700"
            >
              Cancel
            </button>
          </div>

          {state.status === "error" && <p role="alert" className={errorTextClass}>{state.message}</p>}
        </form>
      )}

      {state.status === "success" && (
        <p role="status" className="text-sm text-success font-medium pt-2 border-t border-neutral-100">
          {state.message}
        </p>
      )}
    </div>
  );
}
