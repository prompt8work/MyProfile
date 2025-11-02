import { Link } from 'react-router-dom';

interface Skill {
  id?: string;
  name: string;
  category?: string;
  description?: string;
}

interface SkillsSectionProps {
  title: string;
  subtitle: string;
  skills: Skill[] | string[];
  bgColor?: string;
  showImages?: boolean;
  images?: string[];
  showViewMore?: boolean;
}

export default function SkillsSection({
  title,
  subtitle,
  skills,
  bgColor = 'bg-white',
  showImages = true,
  images = [],
  showViewMore = true
}: SkillsSectionProps) {
  // Convert string array to Skill array if needed
  const skillItems: Array<{name: string, id?: string}> = skills.map(skill =>
    typeof skill === 'string' ? { name: skill, id: undefined } : { name: skill.name, id: skill.id }
  );

  // Generate gradient colors for cards
  const getColorClass = (idx: number) => {
    const colors = [
      'from-blue-600 to-purple-600',
      'from-purple-600 to-pink-600',
      'from-pink-600 to-red-600',
      'from-red-600 to-orange-600',
      'from-orange-600 to-yellow-600',
      'from-green-600 to-teal-600',
    ];
    return colors[idx % colors.length];
  };

  return (
    <section
      id="skills"
      className={`py-20 px-4 sm:px-6 lg:px-8 ${bgColor}`}
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

        {/* Grid container - matching CoursesSection style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillItems.map((skill, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group border border-slate-200"
            >
              {/* Image Header */}
              {showImages && images[idx] ? (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={images[idx]}
                    alt={skill.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${getColorClass(idx)} rounded-lg flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">
                        {skill.name.split(' ').length > 1
                          ? skill.name.split(' ')[0][0] + skill.name.split(' ')[1][0]
                          : skill.name.substring(0, 2)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`h-48 bg-gradient-to-br ${getColorClass(idx)} flex items-center justify-center`}>
                  <div className="text-white text-6xl font-bold opacity-20">
                    {skill.name.split(' ').length > 1
                      ? skill.name.split(' ')[0][0] + skill.name.split(' ')[1][0]
                      : skill.name.substring(0, 2)}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Professional expertise in {skill.name.toLowerCase()} with hands-on experience
                </p>

                {/* Skill level indicator */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-slate-500 font-semibold">Proficiency:</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < 4 ? `bg-gradient-to-r ${getColorClass(idx)}` : 'bg-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Read More Link */}
                {skill.id && (
                  <Link
                    to={`/skills/${skill.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors mt-2"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}

                {/* Decorative bottom line */}
                <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${getColorClass(idx)} transition-all duration-500 rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Link */}
        {showViewMore && (
          <div className="text-center mt-12">
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              View All Skills
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
