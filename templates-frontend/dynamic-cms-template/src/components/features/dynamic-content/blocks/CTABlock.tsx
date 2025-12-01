import React from "react";
import type { Theme } from "../../../../types/features-page";

/* eslint-disable @typescript-eslint/no-unused-vars */

interface CTABlockProps {
  value: any;
  theme: Theme;
  getFullImageUrl: (url: string) => string;
}

export const CTABlock: React.FC<CTABlockProps> = ({
  value,
  theme: _theme,
  getFullImageUrl,
}) => {
  if (!value) return null;

  const bgStyle = value.background_image
    ? {
        backgroundImage: `url(${getFullImageUrl(value.background_image.url)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`,
      };

  return (
    <section className="py-20 relative overflow-hidden" style={bgStyle}>
      <style>{`
        .cta-block-overlay { background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 90%, transparent) 0%, color-mix(in srgb, var(--color-accent) 90%, transparent) 100%); }
      `}</style>
      <div className="absolute inset-0 cta-block-overlay" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          {value.title && (
            <h2 className="text-4xl font-bold mb-4 animate-fadeInUp">
              {value.title}
            </h2>
          )}
          {value.description && (
            <p className="text-xl mb-8 animate-fadeInUp animation-delay-200">
              {value.description}
            </p>
          )}
          {value.button_text && (
            <a
              href={value.button_url || "#"}
              className="inline-block px-8 py-4 bg-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fadeInUp animation-delay-400 text-theme-primary"
              {...(!value.button_url && { onClick: (e) => e.preventDefault() })}
            >
              {value.button_text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
