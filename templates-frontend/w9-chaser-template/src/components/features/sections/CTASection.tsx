import React from "react";
import type { ImageData, Theme } from "../../../types/features-page";
import { getFullImageUrl } from "../utils/imageUtils";

/* eslint-disable @typescript-eslint/no-unused-vars */

interface CTASectionProps {
  heading: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  backgroundImage?: ImageData;
  theme: Theme;
  isPrimary?: boolean;
}

export const CTASection: React.FC<CTASectionProps> = ({
  heading,
  description,
  buttonText,
  buttonUrl,
  backgroundImage,

  isPrimary = false,
}) => {
  if (isPrimary) {
    return (
      <section
        className="py-20 relative overflow-hidden gradient-theme-primary"
        style={{
          background: backgroundImage
            ? `url(${getFullImageUrl(backgroundImage.url)})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <style>{`
          .cta-overlay { background: linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 95%, transparent) 0%, color-mix(in srgb, var(--color-accent) 95%, transparent) 100%); }
        `}</style>
        <div className="absolute inset-0 cta-overlay" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fadeInUp">
              {heading}
            </h2>
            {description && (
              <p className="text-xl text-white/90 mb-10 animate-fadeInUp animation-delay-200">
                {description}
              </p>
            )}
            {buttonText && (
              <a
                href={buttonUrl || "#"}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 animate-fadeInUp animation-delay-400 animate-pulse-glow text-theme-primary"
                {...(!buttonUrl && { onClick: (e) => e.preventDefault() })}
              >
                {buttonText}
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-16 sm:py-24 bg-theme-background"
    >
      <style>{`
        .cta-button-gradient { background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%); }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold mb-6 animate-fadeInUp text-theme-text"
          >
            {heading}
          </h2>
          {description && (
            <p
              className="text-xl mb-10 animate-fadeInUp animation-delay-200 text-theme-neutral"
            >
              {description}
            </p>
          )}
          {buttonText && (
            <a
              href={buttonUrl || "#"}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 animate-fadeInUp animation-delay-400 cta-button-gradient"
              {...(!buttonUrl && { onClick: (e) => e.preventDefault() })}
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
