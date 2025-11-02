import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { serviceDetails, images } from '../../data';

export default function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceDetails.services.find(s => s.id === serviceId);

  if (!service) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header activeSection="services" />
          <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Service Not Found</h1>
              <p className="text-slate-600 mb-8">The service you're looking for doesn't exist.</p>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Back to Services
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  const serviceImage = images.services[serviceDetails.services.indexOf(service)] || service.image;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header activeSection="services" />

        {/* Hero Section with Image */}
        <section className="pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-8">
              <img
                src={serviceImage}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                {service.category && (
                  <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-4">
                    {service.category}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  {service.title}
                </h1>
                <p className="text-lg text-white/90 max-w-3xl">
                  {service.shortDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Column */}
              <div className="lg:col-span-2 space-y-8">
                {/* Overview */}
                {service.fullContent?.overview && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      Overview
                    </h2>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">{service.fullContent.overview}</p>
                  </div>
                )}

                {/* Benefits */}
                {service.fullContent?.benefits && service.fullContent.benefits.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      Key Benefits
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.fullContent.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
                          <span className="text-green-600 font-bold text-lg mt-1">✓</span>
                          <span className="text-slate-700 leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Process */}
                {service.fullContent?.process && service.fullContent.process.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </span>
                      Our Process
                    </h2>
                    <div className="space-y-4">
                      {service.fullContent.process.map((step, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                              {idx + 1}
                            </div>
                          </div>
                          <div className="flex-1 pt-2">
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">{(step as any).step || (step as any).title}</h3>
                            <p className="text-slate-700 leading-relaxed">{(step as any).description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deliverables */}
                {service.fullContent?.deliverables && service.fullContent.deliverables.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                      Deliverables
                    </h2>
                    <ul className="space-y-3">
                      {service.fullContent.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-orange-600 font-bold text-lg mt-1">→</span>
                          <span className="text-slate-700 leading-relaxed">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Quick Info Card */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Info</h3>
                    <div className="space-y-3">
                      {service.category && (
                        <div className="flex items-start gap-3">
                          <span className="text-blue-600 font-semibold text-sm">Category:</span>
                          <span className="text-slate-700 text-sm">{service.category}</span>
                        </div>
                      )}
                      {service.features && service.features.length > 0 && (
                        <div>
                          <span className="text-blue-600 font-semibold text-sm block mb-2">Features:</span>
                          <div className="space-y-1">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <span className="text-blue-600 text-xs mt-0.5">✓</span>
                                <span className="text-slate-700 text-xs">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tools Used */}
                  {service.fullContent?.toolsUsed && service.fullContent.toolsUsed.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-blue-100">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Tools & Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.fullContent.toolsUsed.map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-white text-blue-700 text-xs font-semibold rounded-full border border-blue-200 shadow-sm"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">Interested in this service?</h3>
                    <p className="text-white/90 text-sm mb-4">Let's discuss how I can help your business grow</p>
                    <a
                      href="#contact"
                      className="inline-block w-full bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                    >
                      Get in Touch
                    </a>
                  </div>

                  {/* Back to Services Link */}
                  <Link
                    to="/services"
                    className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to All Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
