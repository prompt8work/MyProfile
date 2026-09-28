"use client";

import { useActionState } from "react";
import { personalInfo } from "../../../data";
import SectionHeading from "../ui/SectionHeading";
import LinkedinIcon from "../icons/LinkedinIcon";
import { submitContactForm, type ContactFormState } from "../../app/contact/actions";

const purposes = ["Job Opportunity", "AI Consulting", "Training", "Workshop", "Collaboration", "Speaking"];

const initialState: ContactFormState = { status: "idle", message: "" };

const inputClass =
  "text-sm px-3.5 py-3 rounded-lg border border-neutral-300 bg-neutral-50 disabled:opacity-60";
const errorTextClass = "text-xs text-error mt-1";

export default function Contact() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <section id="contact" className="w-full">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 py-24 sm:py-28">
        <SectionHeading
          align="start"
          eyebrow="CONTACT"
          title="Let's Build Something Together"
          description="Job opportunity, AI consulting, a training program, or just want to talk about AI — I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-14">
          <div className="flex flex-col gap-7">
            <div className="flex gap-3.5 items-start">
              <span className="w-10 h-10 rounded-[10px] bg-plum-100 flex items-center justify-center shrink-0">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--color-plum-700)" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-neutral-600">Email</span>
                <span className="text-[14.5px] text-neutral-900 font-medium">{personalInfo.email}</span>
              </div>
            </div>
            <div className="flex gap-3.5 items-start">
              <span className="w-10 h-10 rounded-[10px] bg-plum-100 flex items-center justify-center shrink-0">
                <LinkedinIcon className="w-[17px] h-[17px] text-plum-700" />
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-neutral-600">LinkedIn</span>
                <a
                  href={`https://${personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14.5px] text-neutral-900 font-medium hover:text-plum-600 transition-colors"
                >
                  {personalInfo.linkedin.replace("linkedin.com/in/", "in/")}
                </a>
              </div>
            </div>
            <div className="flex gap-3.5 items-start">
              <span className="w-10 h-10 rounded-[10px] bg-plum-100 flex items-center justify-center shrink-0">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--color-plum-700)" strokeWidth="1.8"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-neutral-600">Location</span>
                <span className="text-[14.5px] text-neutral-900 font-medium">{personalInfo.location} · Open to remote</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mt-2">
              <span className="text-xs text-neutral-600">Reach out about</span>
              <div className="flex flex-wrap gap-2">
                {purposes.map((p) => (
                  <span key={p} className="text-xs text-neutral-600 border border-neutral-300 rounded-full px-3 py-1.5">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <form action={formAction} className="bg-white border border-neutral-200 rounded-[18px] p-8 flex flex-col gap-[18px]" noValidate>
            {/* Honeypot — invisible to sighted users and screen readers (not
                type="hidden", which some bots skip), real visitors never
                fill it in. Non-empty means an automated submission. */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="company_website">Leave this field empty</label>
              <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-name" className="text-xs font-semibold text-neutral-600">Your Name</label>
                <input id="c-name" name="name" type="text" placeholder="Jane Doe" disabled={isPending} className={inputClass} />
                {state.fieldErrors?.name && <p className={errorTextClass}>{state.fieldErrors.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-email" className="text-xs font-semibold text-neutral-600">Your Email</label>
                <input id="c-email" name="email" type="email" placeholder="jane@company.com" disabled={isPending} className={inputClass} />
                {state.fieldErrors?.email && <p className={errorTextClass}>{state.fieldErrors.email}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-org" className="text-xs font-semibold text-neutral-600">Organization</label>
                <input id="c-org" name="organization" type="text" placeholder="Optional" disabled={isPending} className={inputClass} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="c-purpose" className="text-xs font-semibold text-neutral-600">Purpose</label>
                <select id="c-purpose" name="purpose" disabled={isPending} defaultValue="Job Opportunity" className={`${inputClass} text-neutral-900`}>
                  <option>Job Opportunity</option>
                  <option>AI Consulting</option>
                  <option>Training</option>
                  <option>Workshop</option>
                  <option>Collaboration</option>
                  <option>Speaking</option>
                  <option>Project Discussion</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="c-msg" className="text-xs font-semibold text-neutral-600">Your Message</label>
              <textarea id="c-msg" name="message" rows={4} placeholder="Tell me a bit about what you have in mind..." disabled={isPending} className={`${inputClass} resize-y`} />
              {state.fieldErrors?.message && <p className={errorTextClass}>{state.fieldErrors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="self-start inline-flex items-center gap-2.5 bg-neutral-900 text-white text-[14.5px] font-semibold px-6 py-3.5 rounded-xl hover:bg-neutral-800 transition-colors disabled:opacity-60"
            >
              {isPending ? "Sending…" : "Send Message"}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" /></svg>
            </button>

            {state.status === "success" && (
              <p role="status" className="text-sm text-success font-medium">{state.message}</p>
            )}
            {state.status === "error" && (
              <p role="alert" className="text-sm text-error font-medium">{state.message}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
