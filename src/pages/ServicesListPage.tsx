import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServicesSection from '../components/ServicesSection';
import PageTransition from '../components/PageTransition';
import { serviceDetails, images } from '../../data';

export default function ServicesListPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'alphabetical'>('featured');

  // Get unique categories from services
  const categories = ['All', ...Array.from(new Set(serviceDetails.services.map(s => s.category)))];

  // Filter services by category
  const filteredServices = selectedCategory === 'All'
    ? serviceDetails.services
    : serviceDetails.services.filter(service => service.category === selectedCategory);

  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === 'featured') {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header activeSection="services" />

        {/* Hero Section */}
        <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Services <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">I Offer</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
              Comprehensive solutions tailored to drive your business growth and digital transformation
            </p>

            {/* Filter and Sort Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3">
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

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'alphabetical')}
                  className="px-6 py-2 rounded-full bg-white text-slate-700 border border-slate-200 font-semibold hover:bg-slate-100 transition-all cursor-pointer appearance-none pr-10"
                >
                  <option value="featured">Featured First</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Services Count */}
            <p className="text-sm text-slate-500">
              Showing {sortedServices.length} {sortedServices.length === 1 ? 'service' : 'services'}
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <ServicesSection
          title=""
          subtitle=""
          services={sortedServices}
          images={images.services}
          showViewMore={false}
        />

        <Footer />
      </div>
    </PageTransition>
  );
}
