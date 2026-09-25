import type { Metadata } from "next";
import { Mail, Phone, MapPin, Briefcase, Award, Zap } from "lucide-react";
import PageTransition from "../../components/PageTransition";
import LinkedinIcon from "../../components/icons/LinkedinIcon";
import ExportPdfButton from "../../components/ExportPdfButton";
import Tag from "../../components/ui/Tag";
import { personalInfo } from "../../../data";
import { client } from "../../sanity/lib/client";
import { resumeQuery } from "../../sanity/lib/queries";

export const metadata: Metadata = {
  title: "Resume — PromptAtWork",
  description: "Professional resume — AI Solution Engineer, prompt engineering, experience, skills and certifications.",
};

// Interim revalidation strategy until the Sanity webhook is wired up.
export const revalidate = 60;

type ResumeData = {
  summary: string;
  skills: { category: string; items: string[] }[];
  experience: {
    company: string;
    role: string;
    location: string;
    startDate: string;
    endDate?: string;
    responsibilities: string[];
  }[];
  education: { degree: string; institution?: string; details?: string; year?: string }[];
  certifications: { name: string; issuer?: string; credentialId?: string; date?: string }[];
  achievements: { title: string; description: string }[];
  interests: string[];
};

const sectionHeading =
  "text-base font-bold tracking-wide text-neutral-900 border-b-2 border-plum-200 pb-2 mb-3 print:text-sm print:pb-1 print:mb-2";

function formatMonthYear(iso: string): string {
  const [year, month] = iso.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[Number(month) - 1]} ${year}`;
}

function formatPeriod(startDate: string, endDate?: string): string {
  return `${formatMonthYear(startDate)} – ${endDate ? formatMonthYear(endDate) : "Present"}`;
}

export default async function Resume() {
  const resume: ResumeData = await client.fetch(resumeQuery);

  // Education and certifications render as one combined section, matching
  // the original page's layout — Sanity keeps them as separate arrays
  // (PRD §71) since they're conceptually different, but the display groups
  // them the way a printed résumé actually would.
  const educationAndCerts = [
    ...resume.education.map((e) => ({ degree: e.degree, institution: e.institution, details: e.details, year: e.year })),
    ...resume.certifications.map((c) => ({
      degree: c.name,
      institution: c.issuer,
      details: c.credentialId ? `Certificate ID: ${c.credentialId}` : undefined,
      year: c.date,
    })),
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-neutral-100 py-8 px-4">
        <ExportPdfButton />

        <div className="max-w-5xl mx-auto bg-white shadow-sm border border-neutral-200 rounded-2xl overflow-hidden print:shadow-none print:rounded-none print:border-none">
          {/* Header */}
          <div data-print-header className="bg-neutral-900 text-white p-4 md:p-8 print:p-4 print:py-2">
            <div className="text-center md:text-left print:text-left">
              <h1 className="font-display text-2xl md:text-3xl font-semibold mb-1 print:text-xl print:mb-0.5">
                {personalInfo.name}
              </h1>
              <p className="text-neutral-300 text-xs md:text-sm mb-4 print:text-xs print:mb-2">{personalInfo.title}</p>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-4 text-xs print:flex-row print:gap-3 print:text-xs">
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 md:hidden print:hidden" />
                  <a href={`tel:${personalInfo.phone}`} className="text-white hover:text-cyan-400 transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3 md:hidden print:hidden" />
                  <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-cyan-400 transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <LinkedinIcon className="w-3 h-3 md:hidden print:hidden" />
                  <a
                    href={`https://${personalInfo.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-cyan-400 transition-colors"
                  >
                    {personalInfo.linkedin}
                  </a>
                </div>
                <div className="flex items-center gap-1 md:ml-auto print:ml-auto">
                  <MapPin className="w-3 h-3" />
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8 print:p-4">
            <div className="mb-6 print:mb-3">
              <h2 className={sectionHeading}>PROFESSIONAL SUMMARY</h2>
              <p className="text-sm text-neutral-700 leading-relaxed print:text-xs print:leading-tight">{resume.summary}</p>
            </div>

            <div className="mb-6 print:mb-3">
              <h2 className={sectionHeading}>CORE COMPETENCIES</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 print:gap-2">
                {resume.skills.map((group) => (
                  <div key={group.category}>
                    <h3 className="text-sm font-bold text-neutral-700 mb-2 print:text-xs print:mb-1">{group.category}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((skill) => (
                        <Tag key={skill} variant={group.category.includes("Lead") ? "plum" : "neutral"}>
                          {skill}
                        </Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 print:mb-3">
              <h2 className={sectionHeading}>PROFESSIONAL EXPERIENCE</h2>
              {resume.experience.map((exp, idx) => (
                <div key={idx} className="mb-5 last:mb-0 print:mb-2">
                  <h3 className="font-display font-semibold text-neutral-900 text-base print:text-sm">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2 print:text-xs print:mb-1">
                    <span className="font-semibold">{exp.company}</span>
                    <span>|</span>
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-500 mb-2 print:text-xs print:mb-1">
                    <Briefcase className="w-4 h-4 print:w-3 print:h-3" />
                    <span>{formatPeriod(exp.startDate, exp.endDate)}</span>
                  </div>
                  <ul className="space-y-1 print:space-y-0">
                    {exp.responsibilities.map((r, ri) => (
                      <li key={ri} className="flex items-start text-sm text-neutral-700 print:text-xs print:leading-tight">
                        <span className="text-plum-600 mr-2 mt-0.5">▸</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mb-6 print:mb-3">
              <h2 className={sectionHeading}>KEY ACHIEVEMENTS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
                {resume.achievements.map((a, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-plum-600 flex-shrink-0 mt-0.5 print:w-4 print:h-4" />
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 print:text-xs">{a.title}</h3>
                      <p className="text-sm text-neutral-600 leading-relaxed print:text-xs print:leading-tight">{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 print:mb-3">
              <h2 className={sectionHeading}>EDUCATION &amp; CERTIFICATIONS</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:gap-2">
                {educationAndCerts.map((edu, idx) => (
                  <div key={idx} className="mb-3 print:mb-2">
                    <h3 className="font-bold text-neutral-900 text-sm print:text-xs">{edu.degree}</h3>
                    {edu.institution && <p className="text-sm text-neutral-600 print:text-xs">{edu.institution}</p>}
                    {edu.details && <p className="text-xs text-neutral-500">{edu.details}</p>}
                    {edu.year && <p className="text-xs text-neutral-500">{edu.year}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 print:mb-3">
              <h2 className={sectionHeading}>PROFESSIONAL INTERESTS</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 print:gap-2">
                {resume.interests.map((passion, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-plum-600 flex-shrink-0 mt-1 print:w-3 print:h-3" />
                    <p className="text-sm text-neutral-700 leading-relaxed print:text-xs print:leading-tight">{passion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div data-print-footer className="hidden print:block bg-neutral-100 p-4 border-t-2 border-neutral-200">
            <div className="flex justify-between items-center text-xs text-neutral-600">
              <div>
                <p className="mb-6">Date: ___________________</p>
              </div>
              <div className="text-right">
                <p className="mb-6">Signature: ___________________</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
