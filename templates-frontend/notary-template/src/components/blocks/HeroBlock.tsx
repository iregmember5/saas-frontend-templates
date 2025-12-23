import React from 'react';
import type { HeroBlock as HeroBlockType } from '../../types/wagtail';
import { Calendar, Upload, Mail, ArrowRight } from 'lucide-react';

interface HeroBlockProps {
  block: HeroBlockType;
}

export const HeroBlock: React.FC<HeroBlockProps> = ({ block }) => {
  const { value } = block;

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'book': return <Calendar className="w-5 h-5" />;
      case 'upload': return <Upload className="w-5 h-5" />;
      case 'contact': return <Mail className="w-5 h-5" />;
      default: return <ArrowRight className="w-5 h-5" />;
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Always use gradient background - ignore API background settings */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-primary via-theme-secondary to-theme-accent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {value.show_location_badge && value.location_text && (
          <div className="inline-flex items-center px-6 py-3 bg-white/95 backdrop-blur-md rounded-full mb-8 shadow-xl border border-white/20 animate-fade-in">
            <span className="text-theme-primary font-bold text-lg">{value.location_text}</span>
          </div>
        )}

        <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight drop-shadow-2xl">
          {value.headline}
        </h1>

        {value.subheadline && (
          <p className="text-xl md:text-3xl text-white/95 mb-12 max-w-4xl mx-auto font-light leading-relaxed drop-shadow-lg">
            {value.subheadline}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group inline-flex items-center gap-3 px-10 py-5 bg-theme-accent text-white rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-theme-accent/50">
            {getActionIcon(value.primary_cta_action)}
            {value.primary_cta_label}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {value.secondary_cta_label && (
            <button className="group inline-flex items-center gap-3 px-10 py-5 bg-white/95 backdrop-blur-md text-theme-primary rounded-xl font-bold text-lg hover:bg-white transition-all shadow-2xl border-2 border-white/30">
              {value.secondary_cta_action && getActionIcon(value.secondary_cta_action)}
              {value.secondary_cta_label}
            </button>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  );
};
