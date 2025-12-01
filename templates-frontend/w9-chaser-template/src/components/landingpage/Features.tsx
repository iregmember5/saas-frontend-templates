import React, { useState } from "react";
import type { LandingPageData, Feature } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface FeaturesProps {
  data: LandingPageData;
}

const Features: React.FC<FeaturesProps> = ({ data }) => {
  const { features_head, features_introduction, features } = data;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? (features?.length || 1) - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === (features?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  if (
    !features_head &&
    !features_introduction &&
    (!features || features.length === 0)
  ) {
    return null;
  }

  return (
    <section
      id="features"
      className="py-16 sm:py-24 relative overflow-hidden bg-theme-background"
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--color-text) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[80px] opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle, var(--color-primary), transparent 65%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[60px] opacity-8 pointer-events-none"
        style={{
          background: `radial-gradient(circle, var(--color-accent), transparent 65%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto px-4">
          {features_head && (
            <div className="mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3 sm:mb-4 border bg-theme-primary/5 text-theme-primary border-theme-primary/20">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-theme-primary" />
                Features
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-3 sm:mb-4 text-balance text-theme-text">
                {features_head}
              </h2>
            </div>
          )}

          {features_introduction && (
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-balance text-theme-neutral">
              {features_introduction}
            </p>
          )}
        </div>

        {/* Features Carousel */}
        {features && features.length > 0 ? (
          <div className="relative max-w-4xl mx-auto px-4">
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {features.map((feature: Feature) => (
                  <div
                    key={feature.id}
                    id={`feature-${feature.id}`}
                    className="w-full flex-shrink-0 px-2 sm:px-4"
                  >
                    {/* Card container */}
                    <div className="relative h-full p-8 sm:p-10 rounded-2xl transition-all duration-500 border backdrop-blur-sm overflow-hidden bg-theme-background border-theme-primary hover:shadow-lg">
                      {/* Always visible gradient (changes opacity on navigation) */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-20 transition-opacity duration-500 -z-10 hover:opacity-80"
                        style={{
                          background: `radial-gradient(circle at top left, var(--color-primary), transparent 60%)`,
                        }}
                      />

                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 origin-left"
                        style={{
                          background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))`,
                        }}
                      />

                      {/* Icon container */}
                      {feature.icon && (
                        <div className="mb-6">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 relative overflow-hidden bg-theme-primary/10">
                            <EasyIcon
                              icon={feature.icon}
                              size={32}
                              color="var(--color-primary)"
                              className="relative z-10 transition-transform duration-300 hover:rotate-6 sm:w-10 sm:h-10"
                            />

                            {/* Shine effect */}
                            <div
                              className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700"
                              style={{
                                background: `linear-gradient(90deg, transparent, var(--color-primary)20, transparent)`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight transition-colors duration-300 text-theme-text">
                        {feature.title}
                      </h3>

                      {/* Description with auto-formatting */}
                      {(() => {
                        const description = feature.description || "";
                        // Split by bullet point indicators (•, -, *, or newlines with dashes)
                        const bulletRegex = /[•\-\*]\s+/;
                        const parts = description
                          .split(/\n|(?=[•\-\*]\s+)/)
                          .filter((text) => text.trim());

                        // Check if we have bullet points
                        const hasBullets = parts.some((part) =>
                          bulletRegex.test(part)
                        );

                        if (hasBullets && parts.length > 1) {
                          // Extract intro text (before first bullet)
                          const introText = parts[0]
                            .replace(bulletRegex, "")
                            .trim();
                          const showIntro =
                            introText && !bulletRegex.test(parts[0]);

                          // Extract bullet items
                          const bullets = parts
                            .slice(showIntro ? 1 : 0)
                            .map((part) => part.replace(bulletRegex, "").trim())
                            .filter(Boolean);

                          return (
                            <div>
                              {showIntro && (
                                <p className="text-sm sm:text-base leading-relaxed mb-6 text-theme-neutral">
                                  {introText}
                                </p>
                              )}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {bullets.map((bullet, idx) => (
                                  <div
                                    key={idx}
                                    className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 bg-theme-primary/5 border border-theme-primary/10"
                                  >
                                    <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-theme-primary" />
                                    <p className="text-sm leading-relaxed text-theme-neutral flex-1">
                                      {bullet}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        // No bullets, show as regular text
                        return (
                          <p className="text-sm sm:text-base leading-relaxed text-pretty text-theme-neutral">
                            {description}
                          </p>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 sm:mt-10 px-4 sm:px-0">
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 border border-theme-primary/30 hover:border-theme-primary hover:bg-theme-primary/10 text-theme-primary hover:scale-110 active:scale-95"
                aria-label="Previous feature"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2 sm:gap-3">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentIndex
                        ? "w-8 sm:w-10 bg-theme-primary"
                        : "w-2 sm:w-3 bg-theme-primary/30 hover:bg-theme-primary/50"
                    }`}
                    style={{ height: "8px" }}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 border border-theme-primary/30 hover:border-theme-primary hover:bg-theme-primary/10 text-theme-primary hover:scale-110 active:scale-95"
                aria-label="Next feature"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Counter */}
            <div className="flex justify-center mt-6 text-sm text-theme-neutral">
              <span className="font-semibold text-theme-primary">
                {currentIndex + 1}
              </span>
              <span className="mx-2">/</span>
              <span>{features.length}</span>
            </div>
          </div>
        ) : (
          // Empty state
          <div className="text-center py-12 max-w-xl mx-auto px-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-4 bg-theme-primary/10">
              <EasyIcon
                icon="FiSettings"
                size={28}
                color="var(--color-primary)"
                className="sm:w-8 sm:h-8"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 text-theme-text">
              Features Coming Soon
            </h3>
            <p className="text-sm sm:text-base leading-relaxed text-pretty text-theme-neutral">
              We're working on adding amazing features to enhance your
              experience. Check back soon for updates!
            </p>
          </div>
        )}
      </div>

      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
};

export default Features;
