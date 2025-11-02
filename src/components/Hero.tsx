import { ChevronDown, Send } from 'lucide-react';

interface HeroProps {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  backgroundImage?: string;
  isVisible?: boolean;
}

export default function Hero({
  badge,
  title,
  titleHighlight,
  subtitle,
  description,
  ctaPrimary,
  ctaSecondary,
  onPrimaryClick,
  onSecondaryClick,
  backgroundImage,
  isVisible = true
}: HeroProps) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={backgroundImage ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      } : {}}
    >
      <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative z-10`}>
        <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
          {badge}
        </div>

        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${backgroundImage ? 'text-white' : 'text-slate-900'}`}>
          {title}
          <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {titleHighlight}
          </span>
        </h1>

        <p className={`text-lg sm:text-xl md:text-2xl mb-4 max-w-3xl mx-auto ${backgroundImage ? 'text-blue-100' : 'text-slate-600'}`}>
          {subtitle}
        </p>

        <p className={`text-base sm:text-lg mb-8 max-w-2xl mx-auto ${backgroundImage ? 'text-slate-200' : 'text-slate-500'}`}>
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onPrimaryClick}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            {ctaPrimary}
            <Send className="w-5 h-5" />
          </button>
          <button
            onClick={onSecondaryClick}
            className={`px-8 py-4 ${backgroundImage ? 'bg-white text-slate-800' : 'bg-white text-slate-800'} rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 border-2 ${backgroundImage ? 'border-white' : 'border-slate-200'}`}
          >
            {ctaSecondary}
          </button>
        </div>

        <div className="mt-16 animate-bounce">
          <ChevronDown className={`w-8 h-8 mx-auto ${backgroundImage ? 'text-white' : 'text-slate-400'}`} />
        </div>
      </div>
    </section>
  );
}
