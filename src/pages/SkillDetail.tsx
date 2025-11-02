import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { skillDetails, images } from '../../data';

export default function SkillDetail() {
  const { skillId } = useParams<{ skillId: string }>();
  const skill = skillDetails.skills.find(s => s.id === skillId);

  if (!skill) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header activeSection="skills" />
          <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">Skill Not Found</h1>
              <p className="text-slate-600 mb-8">The skill you're looking for doesn't exist.</p>
              <Link
                to="/skills"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Back to Skills
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  const skillImage = skill.image || images.primarySkills[0];

  // Function to extract YouTube video ID from URL
  const getYouTubeEmbedUrl = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header activeSection="skills" />

        {/* Hero Section with Image */}
        <section className="pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl mb-8">
              <img
                src={skillImage}
                alt={skill.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
                {skill.category && (
                  <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-4">
                    {skill.category}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  {skill.title}
                </h1>
                <p className="text-lg text-white/90 max-w-3xl">
                  {skill.shortDescription}
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
                {skill.fullContent?.overview && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      Overview
                    </h2>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">{skill.fullContent.overview}</p>
                  </div>
                )}

                {/* Key Skills */}
                {skill.fullContent?.keySkills && skill.fullContent.keySkills.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      Key Skills
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {skill.fullContent.keySkills.map((keySkill, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
                          <span className="text-green-600 font-bold text-lg mt-1">✓</span>
                          <span className="text-slate-700 leading-relaxed">{keySkill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {skill.fullContent?.experience && skill.fullContent.experience.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </span>
                      Experience & Application
                    </h2>
                    <div className="space-y-6">
                      {skill.fullContent.experience.map((exp, idx) => (
                        <div key={idx} className="border-l-4 border-purple-600 pl-6 py-2">
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">{exp.title}</h3>
                          <p className="text-slate-700 leading-relaxed">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {skill.fullContent?.achievements && skill.fullContent.achievements.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </span>
                      Key Achievements
                    </h2>
                    <ul className="space-y-3">
                      {skill.fullContent.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-orange-600 font-bold text-lg mt-1">★</span>
                          <span className="text-slate-700 leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Videos Section */}
                {skill.fullContent?.videos && skill.fullContent.videos.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-lg flex items-center justify-center text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      Video Demonstrations
                    </h2>
                    <div className="space-y-6">
                      {skill.fullContent.videos.map((video, idx) => {
                        // Handle both string URLs and object format
                        const videoUrl = typeof video === 'string' ? video : video.url;
                        const videoTitle = typeof video === 'string' ? `Video ${idx + 1}` : video.title;
                        const videoDescription = typeof video === 'string' ? undefined : video.description;

                        const embedUrl = getYouTubeEmbedUrl(videoUrl);
                        return (
                          <div key={idx} className="space-y-3">
                            <h3 className="text-lg font-semibold text-slate-900">{videoTitle}</h3>
                            {videoDescription && (
                              <p className="text-slate-600 text-sm">{videoDescription}</p>
                            )}
                            {embedUrl ? (
                              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                <iframe
                                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                                  src={embedUrl}
                                  title={videoTitle}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            ) : (
                              <a
                                href={videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                              >
                                Watch Video
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
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
                      {skill.category && (
                        <div className="flex items-start gap-3">
                          <span className="text-blue-600 font-semibold text-sm">Category:</span>
                          <span className="text-slate-700 text-sm">{skill.category}</span>
                        </div>
                      )}
                      {skill.featured && (
                        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                          <span className="text-yellow-600 text-lg">★</span>
                          <span className="text-yellow-800 text-sm font-semibold">Featured Skill</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Proficiency Indicator */}
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-blue-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Proficiency Level
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-full h-3 rounded-full ${
                              i < 4 ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-slate-600 text-sm">Expert Level</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-center">
                    <h3 className="text-lg font-bold text-white mb-2">Work Together?</h3>
                    <p className="text-white/90 text-sm mb-4">Let's discuss how this skill can benefit your project</p>
                    <a
                      href="#contact"
                      className="inline-block w-full bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                    >
                      Get in Touch
                    </a>
                  </div>

                  {/* Back to Skills Link */}
                  <Link
                    to="/skills"
                    className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to All Skills
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
