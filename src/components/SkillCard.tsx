interface SkillCardProps {
  skill: string;
  index: number;
  showImage?: boolean;
  imageUrl?: string;
}

export default function SkillCard({ skill, index, showImage = false, imageUrl }: SkillCardProps) {
  // Get first two letters for initials
  const getInitials = (text: string) => {
    const words = text.split(' ');
    if (words.length >= 2) {
      return words[0][0] + words[1][0];
    }
    return text.substring(0, 2);
  };

  // Generate a color based on index for variety
  const getColorClass = (idx: number) => {
    const colors = [
      'from-blue-600 to-purple-600',
      'from-purple-600 to-pink-600',
      'from-pink-600 to-red-600',
      'from-red-600 to-orange-600',
      'from-orange-600 to-yellow-600',
      'from-yellow-600 to-green-600',
      'from-green-600 to-teal-600',
      'from-teal-600 to-blue-600',
    ];
    return colors[idx % colors.length];
  };

  return (
    <div
      className="group relative p-6 bg-white rounded-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-slate-200 overflow-hidden"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getColorClass(index)} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

      <div className="relative z-10">
        {/* Image or Icon Badge */}
        {showImage && imageUrl ? (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={skill}
              className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className={`w-14 h-14 bg-gradient-to-br ${getColorClass(index)} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md`}>
            <span className="text-white font-bold text-xl">
              {getInitials(skill)}
            </span>
          </div>
        )}

        {/* Skill Name */}
        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
          {skill}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed">
          Professional expertise in {skill.toLowerCase()}
        </p>

        {/* Decorative element */}
        <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${getColorClass(index)} transition-all duration-500 rounded-full`}></div>
      </div>
    </div>
  );
}
