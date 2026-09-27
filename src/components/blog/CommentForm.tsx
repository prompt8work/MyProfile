"use client";

import { useActionState } from "react";
import { submitComment, type CommentFormState } from "../../app/blog/actions";

const initialState: CommentFormState = { status: "idle", message: "" };

const inputClass = "text-sm px-3.5 py-3 rounded-lg border border-neutral-300 bg-neutral-50 disabled:opacity-60";
const errorTextClass = "text-xs text-error mt-1";

export default function CommentForm({ contentId }: { contentId: string }) {
  const [state, formAction, isPending] = useActionState(submitComment, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <input type="hidden" name="contentId" value={contentId} />

      {/* Honeypot — same pattern as the Contact form. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="cm-website">Leave this field empty</label>
        <input id="cm-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cm-name" className="text-xs font-semibold text-neutral-600">Name</label>
          <input id="cm-name" name="name" type="text" disabled={isPending} className={inputClass} />
          {state.fieldErrors?.name && <p className={errorTextClass}>{state.fieldErrors.name}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cm-email" className="text-xs font-semibold text-neutral-600">Email (not shown publicly)</label>
          <input id="cm-email" name="email" type="email" disabled={isPending} className={inputClass} />
          {state.fieldErrors?.email && <p className={errorTextClass}>{state.fieldErrors.email}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="cm-comment" className="text-xs font-semibold text-neutral-600">Comment</label>
        <textarea id="cm-comment" name="comment" rows={3} disabled={isPending} className={`${inputClass} resize-y`} />
        {state.fieldErrors?.comment && <p className={errorTextClass}>{state.fieldErrors.comment}</p>}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="self-start inline-flex items-center gap-2.5 bg-neutral-900 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-60"
      >
        {isPending ? "Submitting…" : "Submit Comment"}
      </button>

      {state.status === "success" && <p role="status" className="text-sm text-success font-medium">{state.message}</p>}
      {state.status === "error" && <p role="alert" className="text-sm text-error font-medium">{state.message}</p>}
    </form>
  );
}
