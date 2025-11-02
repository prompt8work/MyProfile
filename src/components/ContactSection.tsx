import { Mail, Phone, Linkedin, MapPin, Send } from 'lucide-react';
import { personalInfo } from '../../data';

interface ContactSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
}

export default function ContactSection({ title, subtitle, ctaText }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600">
            {subtitle}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* 4 columns in 1 row layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex flex-col items-center text-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm text-slate-600 font-semibold mb-1">Email</div>
                <div className="text-slate-800 text-sm font-medium break-all">{personalInfo.email}</div>
              </div>
            </a>

            

            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm text-slate-600 font-semibold mb-1">LinkedIn</div>
                <div className="text-slate-800 text-xs font-medium break-all">{personalInfo.linkedin}</div>
              </div>
            </a>

           
          </div>

          
        </div>
      </div>
    </section>
  );
}
