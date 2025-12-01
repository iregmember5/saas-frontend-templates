import React from "react";
import type { HowItWorksStep, Theme } from "../../../types/features-page";
import { getFullImageUrl } from "../utils/imageUtils";
import EasyIcon from "../../landingpage/IconRenderer";

/* eslint-disable @typescript-eslint/no-unused-vars */

interface EnhancedHowItWorksProps {
  steps: HowItWorksStep[];
  theme: Theme;
  heading?: string;
  description?: string;
  getFullImageUrl: (url: string | { url: string } | undefined) => string;
}

export const EnhancedHowItWorks: React.FC<EnhancedHowItWorksProps> = ({
  steps,

  heading,
  description,
}) => {
  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, var(--primary-color) 5%, transparent) 0%, color-mix(in srgb, var(--accent-color) 5%, transparent) 100%)`,
      }}
    >
      <style>{`
        .how-it-works-circle-primary { background-color: var(--primary-color); }
        .how-it-works-circle-accent { background-color: var(--accent-color); }
        .how-it-works-gradient { background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%); }
        .how-it-works-border { border-color: var(--primary-color); }
        .how-it-works-overlay { background-color: var(--primary-color); }
        .how-it-works-icon-bg { background: linear-gradient(135deg, color-mix(in srgb, var(--primary-color) 15%, transparent) 0%, color-mix(in srgb, var(--accent-color) 15%, transparent) 100%); color: var(--primary-color); }
        .how-it-works-number-bg { background: linear-gradient(135deg, color-mix(in srgb, var(--primary-color) 10%, transparent) 0%, color-mix(in srgb, var(--accent-color) 10%, transparent) 100%); color: var(--primary-color); }
        .how-it-works-connector { background-color: color-mix(in srgb, var(--primary-color) 30%, transparent); }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse how-it-works-circle-primary" />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse how-it-works-circle-accent"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {heading && (
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 animate-fadeInUp"
              style={{ color: "var(--text-color)" }}
            >
              {heading}
            </h2>
          )}
          {description && (
            <p
              className="text-xl max-w-3xl mx-auto animate-fadeInUp animation-delay-200"
              style={{ color: "var(--neutral-color)" }}
            >
              {description}
            </p>
          )}
        </div>

        {steps.map((step, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 mb-20 last:mb-0 ${
                isEven ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              <div
                className="lg:w-1/2 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg relative how-it-works-gradient">
                    {step.step_number}
                    <div className="absolute inset-0 rounded-full border-2 animate-ping opacity-20 how-it-works-border" />
                  </div>
                  <h3
                    className="text-2xl lg:text-3xl font-bold"
                    style={{ color: "var(--text-color)" }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p
                  className="text-lg lg:text-xl leading-relaxed"
                  style={{ color: "var(--neutral-color)" }}
                >
                  {step.description}
                </p>
              </div>

              <div
                className="lg:w-1/2 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.2 + 0.1}s` }}
              >
                <div className="relative">
                  {step.image ? (
                    <div className="relative group">
                      <img
                        src={getFullImageUrl(step.image.url)}
                        alt={step.title}
                        className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-2xl transform transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 how-it-works-overlay" />
                    </div>
                  ) : step.icon ? (
                    <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto rounded-2xl flex items-center justify-center transform transition-all duration-500 hover:scale-110 hover:rotate-3 shadow-2xl how-it-works-icon-bg">
                      <EasyIcon icon={step.icon} size={64} color="var(--primary-color)" />
                    </div>
                  ) : (
                    <div className="w-full h-64 lg:h-80 rounded-2xl flex items-center justify-center text-6xl transform transition-all duration-500 hover:scale-105 shadow-2xl how-it-works-number-bg">
                      {step.step_number}
                    </div>
                  )}

                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute -bottom-24 left-1/2 w-1 h-24 transform -translate-x-1/2 how-it-works-connector" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
