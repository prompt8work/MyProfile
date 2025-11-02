import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SkillsSection from '../components/SkillsSection';
import ServicesSection from '../components/ServicesSection';
import CoursesSection from '../components/CoursesSection';
import PageTransition from '../components/PageTransition';

import { skills, landingPageContent, images, courseDetails, serviceDetails, skillDetails } from '../../data';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      const sections = ['home', 'skills', 'services', 'courses', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header activeSection={activeSection} />

        <Hero
          badge={landingPageContent.hero.badge}
          title={landingPageContent.hero.title}
          titleHighlight={landingPageContent.hero.titleHighlight}
          subtitle={landingPageContent.hero.subtitle}
          description={landingPageContent.hero.description}
          ctaPrimary={landingPageContent.hero.ctaPrimary}
          ctaSecondary={landingPageContent.hero.ctaSecondary}
          onPrimaryClick={() => scrollToSection('contact')}
          onSecondaryClick={() => scrollToSection('skills')}
          backgroundImage={landingPageContent.hero.backgroundImage}
          isVisible={isVisible}
        />

        <SkillsSection
          title={landingPageContent.skillsSection.title}
          subtitle={landingPageContent.skillsSection.subtitle}
          skills={skillDetails.skills.filter(s => s.featured).slice(0, 3).map(s => ({ id: s.id, name: s.title }))}
          bgColor="bg-white"
          showImages={true}
          images={images.primarySkills}
          showViewMore={true}
        />

        <ServicesSection
          title={landingPageContent.servicesSection.title}
          subtitle={landingPageContent.servicesSection.subtitle}
          services={serviceDetails.services.filter(s => s.featured).slice(0, 3)}
          images={images.services}
          showViewMore={true}
        />

        <CoursesSection
          title={landingPageContent.coursesSection.title}
          subtitle={landingPageContent.coursesSection.subtitle}
          courses={courseDetails.courses.filter(course => course.featured).slice(0, 3)}
          showViewMore={true}
        />

        <Footer />
      </div>
    </PageTransition>
  );
}
