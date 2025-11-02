import { Link } from 'react-router-dom';

interface Service {
  id?: string;
  icon?: string;
  title: string;
  description: string;
  features: string[];
  image?: string;
}

interface ServicesSectionProps {
  title: string;
  subtitle: string;
  services: Service[];
  images?: string[];
  showViewMore?: boolean;
}

export default function ServicesSection({ title, subtitle, services, images = [], showViewMore = true }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Grid container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
              <div
                key={service.id || idx}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group border border-slate-200"
              >
                {/* Image Header - No Icon */}
                {images[idx] && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={images[idx]}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed text-sm">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-1 mb-4">
                    {service.features.slice(0, 3).map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start text-xs text-slate-700">
                        <span className="text-blue-600 mr-2 mt-0.5 font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-xs text-slate-500 ml-4">
                        +{service.features.length - 3} more features
                      </li>
                    )}
                  </ul>

                  {/* Read More Link */}
                  {service.id && (
                    <Link
                      to={`/services/${service.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}

                  {/* Decorative bottom line */}
                  <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 rounded-full"></div>
                </div>
              </div>
            ))}
        </div>

        {/* View More Link */}
        {showViewMore && (
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              View All Services
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
