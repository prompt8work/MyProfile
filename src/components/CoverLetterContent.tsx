"use client";

import { Download, Mail, Phone, MapPin } from "lucide-react";
import PageTransition from "./PageTransition";
import LinkedinIcon from "./icons/LinkedinIcon";
import { personalInfo, coverLetter } from "../../data";

const sectionHeading =
  "text-base font-bold tracking-wide text-neutral-900 border-b-2 border-plum-200 pb-2 mb-3 print:text-sm print:pb-1 print:mb-2";

export default function CoverLetterContent() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-neutral-100 py-8 px-4">
        {/* PDF Export Button - Hidden on Print */}
        <div className="fixed top-4 right-4 z-50 no-print">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 bg-plum-600 hover:bg-plum-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors font-semibold"
          >
            <Download className="w-5 h-5" />
            Export to PDF
          </button>
        </div>

        <div className="max-w-5xl mx-auto bg-white shadow-sm border border-neutral-200 rounded-2xl overflow-hidden print:shadow-none print:rounded-none print:border-none">
          <div data-print-header className="bg-neutral-900 text-white p-4 md:p-8 print:p-4 print:py-2">
            <div className="text-center md:text-left print:text-left">
              <h1 className="font-display text-2xl md:text-3xl font-semibold mb-1 print:text-xl print:mb-0.5">
                {personalInfo.name}
              </h1>
              <p className="text-neutral-300 text-xs md:text-sm mb-4 print:text-xs print:mb-2">
                {personalInfo.title}
              </p>
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
              <p className="text-sm text-neutral-600 print:text-xs">{currentDate}</p>
            </div>

            <div className="mb-6 print:mb-3">
              <p className="text-lg font-bold text-neutral-900 print:text-base">
                {coverLetter.recipient.salutation},
              </p>
            </div>

            <div className="mb-6 print:mb-3">
              <p className="text-sm text-neutral-700 leading-relaxed print:text-xs print:leading-tight">
                {coverLetter.opening.paragraph}
              </p>
            </div>

            {coverLetter.body.map((section, idx) => (
              <div key={idx} className="mb-6 print:mb-3">
                <h2 className={sectionHeading}>{section.heading.toUpperCase()}</h2>
                <p className="text-sm text-neutral-700 leading-relaxed print:text-xs print:leading-tight">
                  {section.content}
                </p>
              </div>
            ))}

            <div className="mb-6 print:mb-3">
              <p className="text-sm text-neutral-700 leading-relaxed mb-4 print:text-xs print:leading-tight print:mb-2">
                {coverLetter.closing.paragraph}
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed print:text-xs print:leading-tight">
                {coverLetter.closing.callToAction}
              </p>
            </div>

            <div className="mt-8 mb-6 print:mt-6 print:mb-4">
              <p className="text-sm text-neutral-800 mb-8 print:text-xs print:mb-6">
                {coverLetter.signature.closing},
              </p>
              <div className="mb-8 print:mb-6">
                <div className="h-12 border-b border-neutral-300 mb-2 print:h-10"></div>
              </div>
              <p className="font-display text-base font-semibold text-neutral-900 print:text-sm">{coverLetter.signature.name}</p>
              <p className="text-sm text-neutral-600 print:text-xs">{coverLetter.signature.title}</p>
            </div>

            <div className="mt-6 pt-6 border-t border-neutral-200 no-print">
              <h3 className="text-sm font-bold text-neutral-900 mb-3">Attachments:</h3>
              <ul className="space-y-2">
                {coverLetter.attachments.map((attachment, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-neutral-600 text-sm">
                    <span className="text-plum-600">📎</span>
                    <span className="font-semibold">{attachment.name}</span>
                    <span>- {attachment.description}</span>
                  </li>
                ))}
              </ul>
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
