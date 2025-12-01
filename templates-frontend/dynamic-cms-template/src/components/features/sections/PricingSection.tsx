import React from "react";
import type { Theme } from "../../../types/features-page";

interface PricingSectionProps {
  heading?: string;
  description?: string;
  widgetCode?: string;
  showCta?: boolean;
  ctaText?: string;
  ctaUrl?: string;
  theme: Theme;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  heading,
  description,
  widgetCode,
  showCta,
  ctaText,
  ctaUrl,
}) => {
  if (!heading && !widgetCode && !showCta) return null;

  return (
    <section
      className="py-16 sm:py-24 bg-theme-background"
    >
      <style>{`
        .pricing-button-gradient { 
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%); 
        }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {heading && (
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 animate-fadeInUp text-theme-text"
            >
              {heading}
            </h2>
          )}
          {description && (
            <p
              className="text-xl max-w-3xl mx-auto animate-fadeInUp animation-delay-200 text-theme-neutral"
            >
              {description}
            </p>
          )}
        </div>

        {/* Widget Code */}
        {widgetCode && (
          <div 
            className="mb-12 animate-fadeInUp animation-delay-400"
            dangerouslySetInnerHTML={{ __html: widgetCode }} 
          />
        )}

        {/* CTA Button */}
        {showCta && ctaText && (
          <div className="text-center animate-fadeInUp animation-delay-600">
            <a
              href={ctaUrl || "#"}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 pricing-button-gradient"
              {...(!ctaUrl && { onClick: (e) => e.preventDefault() })}
            >
              {ctaText}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};