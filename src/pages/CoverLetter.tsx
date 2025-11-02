import { Download, Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { personalInfo, coverLetter } from '../../data';

export default function CoverLetter() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-slate-100 py-8 px-4">
      {/* PDF Export Button - Hidden on Print */}
      <div className="fixed top-4 right-4 z-50 no-print">
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg transition-colors font-semibold"
        >
          <Download className="w-5 h-5" />
          Export to PDF
        </button>
      </div>

      {/* Cover Letter Content - Same structure as Resume */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden print:shadow-none print:rounded-none">
        {/* Header with Navy Blue Background - Same as Resume */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 md:p-8 print:p-4 print:py-2">
          <div className="text-center md:text-left print:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 print:text-xl print:mb-0.5">{personalInfo.name}</h1>
            <p className="text-blue-200 text-xs md:text-sm mb-4 print:text-xs print:mb-2">{personalInfo.title}</p>
            {/* Contact Info - Single line on web, separate on mobile */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-4 text-xs print:flex-row print:gap-3 print:text-xs">
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3 md:hidden print:hidden" />
                <a href={`tel:${personalInfo.phone}`} className="hover:text-blue-300 transition-colors">
                  {personalInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3 md:hidden print:hidden" />
                <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-300 transition-colors">
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Linkedin className="w-3 h-3 md:hidden print:hidden" />
                <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
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

        {/* Content Area - Same padding as Resume */}
        <div className="p-4 md:p-8 print:p-4">
          {/* Date */}
          <div className="mb-6 print:mb-3">
            <p className="text-sm text-slate-600 print:text-xs">{currentDate}</p>
          </div>

          {/* Salutation */}
          <div className="mb-6 print:mb-3">
            <p className="text-lg font-bold text-slate-800 print:text-base">
              {coverLetter.recipient.salutation},
            </p>
          </div>

          {/* Opening Paragraph */}
          <div className="mb-6 print:mb-3">
            <p className="text-sm text-slate-700 leading-relaxed print:text-xs print:leading-tight">
              {coverLetter.opening.paragraph}
            </p>
          </div>

          {/* Body Sections */}
          {coverLetter.body.map((section, idx) => (
            <div key={idx} className="mb-6 print:mb-3">
              <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-3 print:text-base print:pb-1 print:mb-2">
                {section.heading.toUpperCase()}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed print:text-xs print:leading-tight">
                {section.content}
              </p>
            </div>
          ))}

          {/* Closing Paragraphs */}
          <div className="mb-6 print:mb-3">
            <p className="text-sm text-slate-700 leading-relaxed mb-4 print:text-xs print:leading-tight print:mb-2">
              {coverLetter.closing.paragraph}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed print:text-xs print:leading-tight">
              {coverLetter.closing.callToAction}
            </p>
          </div>

          {/* Signature */}
          <div className="mt-8 mb-6 print:mt-6 print:mb-4">
            <p className="text-sm text-slate-800 mb-8 print:text-xs print:mb-6">{coverLetter.signature.closing},</p>
            <div className="mb-8 print:mb-6">
              {/* Signature space */}
              <div className="h-12 border-b border-slate-300 mb-2 print:h-10"></div>
            </div>
            <p className="text-base font-bold text-slate-900 print:text-sm">{coverLetter.signature.name}</p>
            <p className="text-sm text-slate-600 print:text-xs">{coverLetter.signature.title}</p>
          </div>

          {/* Attachments - Only visible on screen */}
          <div className="mt-6 pt-6 border-t border-slate-200 no-print">
            <h3 className="text-sm font-bold text-slate-800 mb-3">Attachments:</h3>
            <ul className="space-y-2">
              {coverLetter.attachments.map((attachment, idx) => (
                <li key={idx} className="flex items-center gap-2 text-slate-600 text-sm">
                  <span className="text-blue-600">📎</span>
                  <span className="font-semibold">{attachment.name}</span>
                  <span>- {attachment.description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer - Print only - Same as Resume */}
        <div className="hidden print:block bg-slate-100 p-4 border-t-2 border-slate-300">
          <div className="flex justify-between items-center text-xs text-slate-600">
            <div>
              <p className="mb-6">Date: ___________________</p>
            </div>
            <div className="text-right">
              <p className="mb-6">Signature: ___________________</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          /* Add top margin for continuation pages */
          @page :left {
            margin-top: 10px;
          }

          @page :right {
            margin-top: 10px;
          }

          /* First page keeps original margins */
          @page :first {
            margin-top: 0;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          html, body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            height: auto !important;
          }

          .no-print {
            display: none !important;
          }

          /* Prevent page breaks */
          .page-break-inside-avoid {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Page break handling */
          .page-break-after {
            page-break-after: always !important;
            break-after: always !important;
          }

          .page-break-before {
            page-break-before: always !important;
            break-before: always !important;
          }

          * {
            orphans: 3;
            widows: 3;
          }

          h1, h2, h3, h4, h5, h6 {
            page-break-after: avoid !important;
            break-after: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }

          /* Make sure background colors print */
          .bg-gradient-to-r,
          .bg-slate-100 {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
      </div>
    </PageTransition>
  );
}
