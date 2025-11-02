import { Mail, Phone, Linkedin, MapPin, Briefcase, Award, Zap, Download } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import {
  personalInfo,
  summary,
  skills,
  currentExperience,
  previousExperience,
  achievements,
  passions,
  education
} from '../../data';

const resumeData = {
  personalInfo,
  summary,
  skills,
  currentExperience,
  previousExperience,
  achievements,
  passions,
  education
};

export default function Resume() {
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

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden print:shadow-none print:rounded-none">
        {/* Header with Navy Blue Background */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 md:p-8 print:p-4 print:py-2">
          <div className="text-center md:text-left print:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-1 print:text-xl print:mb-0.5">{resumeData.personalInfo.name}</h1>
            <p className="text-blue-200 text-xs md:text-sm mb-4 print:text-xs print:mb-2">{resumeData.personalInfo.title}</p>
            {/* Contact Info - Single line on web, separate on mobile */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-4 text-xs print:flex-row print:gap-3 print:text-xs">
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3 md:hidden print:hidden" />
                <a href={`tel:${resumeData.personalInfo.phone}`} className="hover:text-blue-300 transition-colors">
                  {resumeData.personalInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3 md:hidden print:hidden" />
                <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:text-blue-300 transition-colors">
                  {resumeData.personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Linkedin className="w-3 h-3 md:hidden print:hidden" />
                <a href={`https://${resumeData.personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors">
                  {resumeData.personalInfo.linkedin}
                </a>
              </div>
              <div className="flex items-center gap-1 md:ml-auto print:ml-auto">
                <MapPin className="w-3 h-3" />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Single Column Layout */}
        <div className="p-4 md:p-8 print:p-4">
          {/* Summary Section */}
          <div className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-3 print:text-base print:pb-1 print:mb-2">PROFESSIONAL SUMMARY</h2>
            <p className="text-sm text-slate-700 leading-relaxed print:text-xs print:leading-tight">{resumeData.summary}</p>
          </div>

          {/* Skills Section */}
          <div className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-3 print:text-base print:pb-1 print:mb-2">CORE COMPETENCIES</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2 print:text-xs print:mb-1">Lead Generation & Sales</h3>
                <div className="flex flex-wrap gap-1">
                  {resumeData.skills.primary.map((skill, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs print:px-1.5 print:py-0.5">{skill}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2 print:text-xs print:mb-1">Technical Expertise</h3>
                <div className="flex flex-wrap gap-1">
                  {resumeData.skills.technical.map((skill, idx) => (
                    <span key={idx} className="bg-slate-200 text-slate-800 px-2 py-1 rounded text-xs print:px-1.5 print:py-0.5">{skill}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-2 print:text-xs print:mb-1">Tools & Platforms</h3>
                <div className="flex flex-wrap gap-1">
                  {resumeData.skills.tools.map((skill, idx) => (
                    <span key={idx} className="bg-slate-200 text-slate-800 px-2 py-1 rounded text-xs print:px-1.5 print:py-0.5">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-2">PROFESSIONAL EXPERIENCE</h2>

            {/* Current Role */}
            <div className="mb-6 print:mb-3">
              <h3 className="font-bold text-slate-800 text-base print:text-sm">{resumeData.currentExperience.role}</h3>
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2 print:text-xs print:mb-1">
                <span className="font-semibold">{resumeData.currentExperience.company}</span>
                <span>|</span>
                <span>{resumeData.currentExperience.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3 print:text-xs print:mb-1">
                <Briefcase className="w-4 h-4 print:w-3 print:h-3" />
                <span>{resumeData.currentExperience.period}</span>
              </div>
              <ul className="space-y-1 print:space-y-0">
                {resumeData.currentExperience.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-700 print:text-xs print:leading-tight">
                    <span className="text-blue-600 mr-2 mt-0.5">▸</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Previous Roles */}
            {resumeData.previousExperience.map((exp, idx) => (
              <div key={idx} className="mb-5 print:mb-2">
                <h3 className="font-bold text-slate-800 text-base print:text-sm">{exp.role}</h3>
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2 print:text-xs print:mb-1">
                  <span className="font-semibold">{exp.company}</span>
                  <span>|</span>
                  <span>{exp.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-2 print:text-xs print:mb-1">
                  <Briefcase className="w-4 h-4 print:w-3 print:h-3" />
                  <span>{exp.period}</span>
                </div>
                <ul className="space-y-1 print:space-y-0">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start text-sm text-slate-700 print:text-xs print:leading-tight">
                      <span className="text-blue-600 mr-2 mt-0.5">▸</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Achievements Section */}
          <div className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-3 print:text-base print:pb-1 print:mb-2">KEY ACHIEVEMENTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print:gap-2">
              {resumeData.achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5 print:w-4 print:h-4" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 print:text-xs">{achievement.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed print:text-xs print:leading-tight">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-4 print:text-base print:pb-1 print:mb-2">EDUCATION & CERTIFICATIONS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 print:gap-2">
              {resumeData.education.map((edu, idx) => (
                <div key={idx} className="mb-3 print:mb-2">
                  <h3 className="font-bold text-slate-800 text-sm print:text-xs">{edu.degree}</h3>
                  <p className="text-sm text-slate-600 print:text-xs">{edu.institution}</p>
                  {edu.details && <p className="text-xs text-slate-500">{edu.details}</p>}
                  {edu.year && <p className="text-xs text-slate-500">{edu.year}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Passions Section */}
          <div className="mb-6 print:mb-3">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-3 print:text-base print:pb-1 print:mb-2">PROFESSIONAL INTERESTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 print:gap-2">
              {resumeData.passions.map((passion, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-blue-600 flex-shrink-0 mt-1 print:w-3 print:h-3" />
                  <p className="text-sm text-slate-700 leading-relaxed print:text-xs print:leading-tight">{passion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Only visible in PDF */}
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
      </div>
    </PageTransition>
  );
}