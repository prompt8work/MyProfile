import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkillsSection from '../components/SkillsSection';
import PageTransition from '../components/PageTransition';
import { skills, images } from '../../data';

export default function SkillsListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Combine all skills
  const allSkills = [
    ...skills.primary,
    ...skills.technical,
    ...skills.tools,
    ...skills.AI_API
  ];

  // Get unique categories
  const categories = ['All', 'Primary', 'Technical', 'Tools', 'AI APIs'];

  // Filter skills by category
  const filteredSkills = selectedCategory === 'All'
    ? allSkills
    : selectedCategory === 'Primary'
      ? skills.primary
      : selectedCategory === 'Technical'
        ? skills.technical
        : selectedCategory === 'Tools'
          ? skills.tools
          : skills.AI_API;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header activeSection="skills" />

        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Core <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Competencies</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
              Explore my comprehensive skill set across various domains of technology and expertise
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Skills Count */}
            <p className="text-sm text-slate-500">
              Showing {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'}
            </p>
          </div>
        </section>

        {/* Skills Grid */}
        <SkillsSection
          title=""
          subtitle=""
          skills={filteredSkills}
          bgColor="bg-transparent"
          showImages={true}
          images={images.primarySkills}
          showViewMore={false}
        />

        <Footer />
      </div>
    </PageTransition>
  );
}
