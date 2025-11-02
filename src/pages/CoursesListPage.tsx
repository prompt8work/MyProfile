import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CoursesSection from '../components/CoursesSection';
import PageTransition from '../components/PageTransition';
import { courseDetails } from '../../data';

export default function CoursesListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('popular');

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(courseDetails.courses.map(c => c.category)))];

  // Filter courses by category
  let filteredCourses = selectedCategory === 'All'
    ? courseDetails.courses
    : courseDetails.courses.filter(c => c.category === selectedCategory);

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.views - a.views;
    } else {
      return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header transparent={false} />

        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              All Courses
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of AI and Prompt Engineering courses
            </p>
          </div>
        </section>

        {/* Filters Section */}
        <section className="pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">
                    Filter by Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="text-sm font-semibold text-slate-700 mb-2 block">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular')}
                    className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="latest">Latest Updated</option>
                  </select>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600">
                  Showing <span className="font-semibold">{sortedCourses.length}</span> course{sortedCourses.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <CoursesSection
          title=""
          subtitle=""
          courses={sortedCourses}
          showViewMore={false}
        />

        <Footer />
      </div>
    </PageTransition>
  );
}
