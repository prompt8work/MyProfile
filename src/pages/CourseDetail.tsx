import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BarChart, Calendar, Eye } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import { courseDetails } from '../../data';

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = courseDetails.courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header transparent={false} />
          <div className="pt-24 pb-20 px-4 text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Course Not Found</h1>
            <Link to="/courses" className="text-blue-600 hover:text-blue-700">
              ← Back to Courses
            </Link>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header transparent={false} />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link
            to="/courses"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="relative h-96">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                    {course.category}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    {course.level}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl text-slate-200 max-w-3xl">{course.shortDescription}</p>
              </div>
            </div>

            {/* Course Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-xs text-slate-500">Duration</div>
                  <div className="font-semibold text-slate-800">{course.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BarChart className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="text-xs text-slate-500">Level</div>
                  <div className="font-semibold text-slate-800">{course.level}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-xs text-slate-500">Updated</div>
                  <div className="font-semibold text-slate-800">{new Date(course.lastUpdated).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="text-xs text-slate-500">Views</div>
                  <div className="font-semibold text-slate-800">{course.views.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Overview */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Course Overview</h2>
                <p className="text-slate-600 leading-relaxed">{course.fullContent.overview}</p>
              </div>

              {/* What You Will Learn */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">What You Will Learn</h2>
                <ul className="space-y-3">
                  {course.fullContent.whatYouWillLearn.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 mr-3 mt-1 font-bold text-lg">✓</span>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Outline */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Course Outline</h2>
                <div className="space-y-6">
                  {course.fullContent.courseOutline.map((module, idx) => (
                    <div key={idx} className="border-l-4 border-blue-600 pl-6">
                      <h3 className="text-lg font-bold text-slate-800 mb-3">
                        Module {idx + 1}: {module.module}
                      </h3>
                      <ul className="space-y-2">
                        {module.lessons.map((lesson, lIdx) => (
                          <li key={lIdx} className="text-slate-600 flex items-start">
                            <span className="text-slate-400 mr-2">{lIdx + 1}.</span>
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Topics Covered */}
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Topics Covered</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {course.topics.map((topic, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 text-slate-700 px-3 py-1 rounded-full text-sm border border-slate-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Prerequisites */}
                <div className="border-t border-slate-200 pt-4 mb-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Prerequisites</h4>
                  <p className="text-sm text-slate-600">{course.fullContent.prerequisites}</p>
                </div>

                {/* Certification */}
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Certification</h4>
                  <p className="text-sm text-slate-600">{course.fullContent.certification}</p>
                </div>

                {/* CTA Button */}
                <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Enroll Now
                </button>
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
