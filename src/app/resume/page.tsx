import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  ArrowUp,
  BriefcaseBusiness,
  ChartNoAxesColumn,
  CodeXml,
  Download,
  FolderKanban,
  GraduationCap,
  History,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  UserRound,
} from "lucide-react";
import LinkedinIcon from "../../components/icons/LinkedinIcon";
import { RESUME_PDF_PATH, educationLines, formatPeriod, getResume, pdfFilename, splitRoles } from "../../lib/resume";
import { buildMetadata } from "../../lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Resume — PromptAtWork",
  description:
    "Resume of Niharika Dhande, AI Solution Engineer: multi-LLM systems, prompt engineering, RAG, evaluation and full-stack delivery.",
  path: "/resume",
});

// The web page follows the dark "glass" template (Docs/Template design/Web
// Design.jpeg). Content comes from the Sanity Resume document — the same
// source /resume/download renders the PDF from — so editing it in Studio
// updates both.
export const revalidate = 60;

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/ai-lab", label: "AI Lab" },
  { href: "/training", label: "Training" },
  { href: "/resume", label: "Resume", active: true },
];

const card =
  "rounded-2xl border border-cyan-400/15 bg-[#0a1a33]/60 backdrop-blur-sm shadow-[0_0_0_1px_rgba(79,214,227,0.03),0_20px_50px_rgba(0,0,0,0.35)]";

function DownloadButton({ filename, className = "" }: { filename: string; className?: string }) {
  return (
    <a
      href={RESUME_PDF_PATH}
      download={filename}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-cyan-400 to-[#22d3ee] px-5 py-3 text-sm font-semibold text-[#03101f] shadow-[0_0_24px_rgba(79,214,227,0.35)] transition hover:brightness-110 hover:text-[#03101f] ${className}`}
    >
      Download CV
      <Download className="h-4 w-4" />
    </a>
  );
}

function CardTitle({ icon, children, action }: { icon: ReactNode; children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h2 className="flex items-center gap-3 text-lg font-semibold text-white">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 text-cyan-400">
          {icon}
        </span>
        {children}
      </h2>
      {action}
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-cyan-400/20 bg-cyan-400/[0.06] px-2.5 py-1 text-xs text-cyan-100/90">
      {children}
    </span>
  );
}

function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-cyan-400/25 text-cyan-400">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-slate-400">{label}</p>
        <div className="truncate text-sm text-slate-100">{children}</div>
      </div>
    </div>
  );
}

export default async function Resume() {
  const resume = await getResume();
  const { featured, earlier } = splitRoles(resume.roles);
  const filename = pdfFilename(resume);
  const [intro, ...aboutParagraphs] = resume.summary;
  const tel = resume.phone ? `tel:${resume.phone.replace(/\s/g, "")}` : undefined;
  const linkClass = "text-slate-100 hover:text-cyan-400";
  const contactRows = (
    <>
      {resume.email && (
        <InfoRow icon={<Mail className="h-4 w-4" />} label="Email">
          <a href={`mailto:${resume.email}`} className={linkClass}>
            {resume.email}
          </a>
        </InfoRow>
      )}
      {resume.phone && (
        <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone">
          <a href={tel} className={linkClass}>
            {resume.phone}
          </a>
        </InfoRow>
      )}
      {resume.location && (
        <InfoRow icon={<MapPin className="h-4 w-4" />} label="Location">
          {resume.location}
        </InfoRow>
      )}
    </>
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030a18] text-slate-300">
      {/* Background glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[-10%] h-[640px] w-[640px] rounded-full bg-cyan-500/15 blur-[140px]" />
        <div className="absolute top-[45%] -left-40 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-cyan-400/10 bg-[#030a18]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-4 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5 text-white hover:text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-cyan-400/30 bg-cyan-400/10 font-mono text-sm font-semibold text-cyan-400">
              ND
            </span>
            <span className="text-base font-semibold">{resume.name}</span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={
                  l.active
                    ? "rounded-lg bg-cyan-400/10 px-3.5 py-2 text-sm font-medium text-cyan-400 shadow-[0_0_18px_rgba(79,214,227,0.2)] hover:text-cyan-400"
                    : "px-3.5 py-2 text-sm text-slate-300 transition-colors hover:text-cyan-400"
                }
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <a
            href={RESUME_PDF_PATH}
            download={filename}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 px-4 py-2 text-sm text-slate-100 transition hover:bg-cyan-400/10 hover:text-white"
          >
            <Download className="h-4 w-4 text-cyan-400" />
            Download CV
          </a>
        </div>
      </header>

      <main className="relative mx-auto flex max-w-[1200px] flex-col gap-6 px-4 pb-16 sm:px-8">
        {/* Hero */}
        <section className="grid grid-cols-1 items-center gap-10 pt-12 pb-6 md:grid-cols-[1.1fr_1fr] md:pt-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.06] px-3.5 py-1.5 text-xs text-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              {resume.title}
            </span>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold tracking-tight text-white sm:text-5xl lg:text-[56px]">
              I build <span className="text-cyan-400 drop-shadow-[0_0_18px_rgba(79,214,227,0.45)]">GenAI systems</span>
              <br />
              that ship to production.
            </h1>
            {intro && <p className="mt-6 max-w-[520px] text-[15px] leading-relaxed text-slate-300">{intro}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <DownloadButton filename={filename} />
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/40 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-cyan-400/10 hover:text-white"
              >
                Let&apos;s Talk
                <MessageCircle className="h-4 w-4 text-cyan-400" />
              </Link>
            </div>
            <div className="mt-6 flex gap-3">
              {[
                resume.linkedin && { href: `https://${resume.linkedin}`, label: "LinkedIn", icon: <LinkedinIcon className="h-4 w-4" />, external: true },
                resume.email && { href: `mailto:${resume.email}`, label: "Email", icon: <Mail className="h-4 w-4" /> },
                tel && { href: tel, label: "Phone", icon: <Phone className="h-4 w-4" /> },
              ]
                .filter((s) => !!s)
                .map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/25 text-slate-200 transition hover:border-cyan-400/60 hover:text-cyan-400"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="relative mx-auto aspect-square w-[78%]">
              <div className="absolute -inset-6 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-cyan-400/50 shadow-[0_0_60px_rgba(79,214,227,0.35)]">
                <Image
                  src="/images/headshot.png"
                  alt={resume.name}
                  fill
                  sizes="(max-width: 768px) 80vw, 360px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 md:absolute md:top-0 md:-right-4 md:mt-0 md:flex md:w-[132px] md:flex-col">
              {resume.heroStats.map((s) => (
                <div key={s.label} className={`${card} px-4 py-3`}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs leading-snug text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
            <div className={`${card} mt-3 flex items-center gap-4 px-5 py-4 md:absolute md:bottom-2 md:left-0 md:mt-0`}>
              <CodeXml className="h-7 w-7 flex-shrink-0 text-cyan-400" />
              <div className="text-sm leading-6 text-slate-200">
                {resume.skills.slice(0, 3).map((g) => (
                  <p key={g.category}>{g.category}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About + Core skills */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className={`${card} p-6 sm:p-7`}>
            <CardTitle icon={<UserRound className="h-4 w-4" />}>About Me</CardTitle>
            <div className="space-y-3 text-sm leading-relaxed text-slate-300">
              {aboutParagraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoRow icon={<UserRound className="h-4 w-4" />} label="Name">
                {resume.name}
              </InfoRow>
              {contactRows}
            </div>
          </div>

          <div className={`${card} p-6 sm:p-7`}>
            <CardTitle icon={<CodeXml className="h-4 w-4" />}>Core Skills</CardTitle>
            <div className="space-y-5">
              {resume.skills.map((g) => (
                <div key={g.category}>
                  <div className="mb-2 flex items-center gap-3">
                    <h3 className="text-xs font-semibold tracking-[0.14em] text-cyan-400 uppercase">{g.category}</h3>
                    <span className="h-px flex-1 bg-linear-to-r from-cyan-400/40 to-transparent" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roles with highlights */}
        {featured.length > 0 && (
          <section className={`${card} p-6 sm:p-7`}>
            <CardTitle icon={<BriefcaseBusiness className="h-4 w-4" />}>Experience</CardTitle>
            <div className="space-y-8">
              {featured.map((r) => (
                <div key={`${r.company}-${r.startDate}`}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      {r.role} <span className="font-normal text-slate-400">— {r.company}</span>
                    </h3>
                    <p className="font-mono text-xs tracking-wide text-cyan-400 uppercase">
                      {formatPeriod(r.startDate, r.endDate)}
                      {r.location && ` · ${r.location}`}
                    </p>
                  </div>
                  <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
                    {r.highlights.map((h) => (
                      <li key={h.slice(0, 24)} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_#4fd6e3]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Earlier roles — timeline, styled like the template's process strip */}
        {earlier.length > 0 && (
          <section className={`${card} p-6 sm:p-7`}>
            <CardTitle icon={<History className="h-4 w-4" />}>{resume.earlierRolesHeading || "Earlier Roles"}</CardTitle>
            <div className="relative">
              <div aria-hidden className="absolute top-7 right-[8%] left-[8%] hidden h-px bg-linear-to-r from-cyan-400/10 via-cyan-400/60 to-cyan-400/10 lg:block" />
              <ol
                className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))] lg:gap-4"
                style={{ "--cols": earlier.length } as CSSProperties}
              >
                {earlier.map((r, i) => (
                  <li key={`${r.company}-${r.startDate}`} className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
                    <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-cyan-400/50 bg-[#061429] font-mono text-sm font-semibold text-cyan-400 shadow-[0_0_20px_rgba(79,214,227,0.3)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="lg:mt-3">
                      <p className="text-sm font-semibold text-white">{r.role}</p>
                      <p className="mt-1 text-xs leading-snug text-slate-400">
                        {r.company}
                        {r.location && `, ${r.location}`}
                      </p>
                      <p className="mt-1.5 font-mono text-[11px] text-cyan-400/90">{formatPeriod(r.startDate, r.endDate)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* Selected projects */}
        <section className={`${card} p-6 sm:p-7`}>
          <CardTitle
            icon={<FolderKanban className="h-4 w-4" />}
            action={
              <Link href="/projects" className="hidden items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 sm:flex">
                View All Work <ArrowRight className="h-4 w-4" />
              </Link>
            }
          >
            Selected Projects
          </CardTitle>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {resume.projects.map((p) => (
              <article
                key={p.name}
                className="flex flex-col rounded-xl border border-cyan-400/15 bg-[#071428]/80 p-5 transition hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(79,214,227,0.12)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-white">{p.name}</h3>
                  {p.badge && (
                    <span className="flex-shrink-0 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] text-cyan-400">
                      {p.badge}
                    </span>
                  )}
                </div>
                {p.description.map((d) => (
                  <p key={d.slice(0, 24)} className="mt-3 text-[13px] leading-relaxed text-slate-300">
                    {d}
                  </p>
                ))}
                <ul className="mt-3 flex-1 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt.slice(0, 24)} className="flex gap-2.5 text-[13px] leading-relaxed text-slate-300">
                      <span className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-cyan-400" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Education + numbers */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className={`${card} p-6 sm:p-7`}>
            <CardTitle icon={<GraduationCap className="h-4 w-4" />}>Education &amp; Teaching</CardTitle>
            <ul className="space-y-4">
              {[...educationLines(resume), ...resume.teaching.map((x) => ({ title: x.title, detail: x.description }))].map((e) => (
                <li key={e.title} className="rounded-xl border border-cyan-400/10 bg-[#071428]/70 px-4 py-3">
                  <p className="text-sm font-semibold text-white">{e.title}</p>
                  {e.detail && <p className="mt-0.5 text-xs text-slate-400">{e.detail}</p>}
                </li>
              ))}
            </ul>
          </div>

          <div className={`${card} p-6 sm:p-7`}>
            <CardTitle icon={<ChartNoAxesColumn className="h-4 w-4" />}>By The Numbers</CardTitle>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {resume.numbers.map((n) => (
                <div
                  key={n.label}
                  className="flex flex-col items-center justify-center rounded-xl border border-cyan-400/25 bg-[#071428]/80 px-3 py-6 text-center shadow-[inset_0_0_24px_rgba(79,214,227,0.06)]"
                >
                  <p className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_12px_rgba(79,214,227,0.5)]">{n.value}</p>
                  <p className="mt-2 text-xs text-slate-300">{n.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`${card} grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-[1fr_1fr]`}>
          <div>
            <h2 className="flex items-center gap-3 text-xl font-semibold text-white">
              <Send className="h-5 w-5 text-cyan-400" />
              Let&apos;s Build Something Great
            </h2>
            <p className="mt-3 max-w-[420px] text-sm leading-relaxed text-slate-300">
              Have a GenAI product, prompt system or automation in mind? I&apos;d love to hear about it.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-cyan-400 to-[#22d3ee] px-5 py-3 text-sm font-semibold text-[#03101f] shadow-[0_0_24px_rgba(79,214,227,0.35)] transition hover:brightness-110 hover:text-[#03101f]"
              >
                Send Message <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={RESUME_PDF_PATH}
                download={filename}
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/40 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-cyan-400/10 hover:text-white"
              >
                Download CV <Download className="h-4 w-4 text-cyan-400" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 border-cyan-400/10 sm:grid-cols-2 md:border-l md:pl-8">
            {contactRows}
            {resume.linkedin && (
              <InfoRow icon={<LinkedinIcon className="h-4 w-4" />} label="LinkedIn">
                <a href={`https://${resume.linkedin}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {resume.linkedin.replace("linkedin.com/in/", "in/")}
                </a>
              </InfoRow>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-cyan-400/10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-8">
          <span className="flex items-center gap-2.5 text-sm font-semibold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 font-mono text-xs text-cyan-400">
              ND
            </span>
            {resume.name}
          </span>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} {resume.name}. All rights reserved.</p>
          <a
            href="#"
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/40 text-cyan-400 transition hover:bg-cyan-400/10 hover:text-cyan-400"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </footer>
    </div>
  );
}
