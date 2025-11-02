import { FileText, Linkedin, Mail } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { personalInfo } from '../../data';

interface HeaderProps {
  activeSection?: string;
  transparent?: boolean;
}

export default function Header({ activeSection = 'home', transparent = false }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If we're already on home page, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 ${transparent ? 'bg-transparent' : 'bg-white/90'} backdrop-blur-md shadow-md z-50 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-bold text-slate-800">PromptAtWork</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#home"
              onClick={(e) => handleSectionClick(e, 'home')}
              className={`transition-colors cursor-pointer ${activeSection === 'home' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Home
            </a>
            <a
              href="#skills"
              onClick={(e) => handleSectionClick(e, 'skills')}
              className={`transition-colors cursor-pointer ${activeSection === 'skills' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Skills
            </a>
            <a
              href="#services"
              onClick={(e) => handleSectionClick(e, 'services')}
              className={`transition-colors cursor-pointer ${activeSection === 'services' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Services
            </a>
            <a
              href="#courses"
              onClick={(e) => handleSectionClick(e, 'courses')}
              className={`transition-colors cursor-pointer ${activeSection === 'courses' ? 'text-blue-600 font-semibold' : 'text-slate-600 hover:text-blue-600'}`}
            >
              Courses
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/resume"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Resume</span>
            </Link>
            <Link
              to="/cover-letter"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Cover Letter</span>
            </Link>
            <a
              href={`https://${personalInfo.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
