import React from "react";
import type { Benefit, Theme } from "../../../types/features-page";
import EasyIcon from "../../landingpage/IconRenderer";

/* eslint-disable @typescript-eslint/no-unused-vars */

interface EnhancedBenefitsProps {
  benefits: Benefit[];
  theme: Theme;
  heading?: string;
  description?: string;
}

export const EnhancedBenefits: React.FC<EnhancedBenefitsProps> = ({
  benefits,

  heading,
  description,
}) => {
  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 3%, transparent) 0%, color-mix(in srgb, var(--color-accent) 3%, transparent) 100%)`,
      }}
    >
      <style>{`
        .benefits-circle-primary { background-color: var(--color-primary); }
        .benefits-circle-accent { background-color: var(--color-accent); }
        .benefits-gradient-hover { background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%); }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full opacity-5 animate-float benefits-circle-primary" />
        <div
          className="absolute bottom-10 right-10 w-60 h-60 rounded-full opacity-5 animate-float benefits-circle-accent"
          style={{ animationDelay: "2s", animationDuration: "8s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-3 animate-pulse benefits-circle-primary" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group relative p-8 rounded-3xl bg-theme-background shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden"
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 benefits-gradient-hover" />

              <div className="relative z-10">
                {benefit.icon && (
                  <div className="mb-6 transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <EasyIcon icon={benefit.icon} size={48} color="var(--color-primary)" />
                  </div>
                )}

                <h3
                  className="text-2xl font-bold mb-4 transform transition-all duration-300 group-hover:translate-x-2 text-theme-text"
                >
                  {benefit.title}
                </h3>

                {benefit.stats && (
                  <div
                    className="text-4xl font-bold mb-4 transform transition-all duration-500 group-hover:scale-110 text-theme-primary"
                  >
                    {benefit.stats}
                  </div>
                )}

                <p
                  className="text-lg leading-relaxed transform transition-all duration-300 group-hover:translate-x-1 text-theme-neutral"
                >
                  {benefit.description}
                </p>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500">
                <div className="absolute top-2 right-2 w-16 h-16 rounded-full benefits-circle-primary" />
                <div className="absolute bottom-2 left-2 w-12 h-12 rounded-full benefits-circle-accent" />
              </div>

              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
