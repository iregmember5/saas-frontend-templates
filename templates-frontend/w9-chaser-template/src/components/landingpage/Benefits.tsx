import React from "react";
import type { LandingPageData, Benefit } from "../../types/landing";
import EasyIcon from "./IconRenderer";

interface BenefitsProps {
  data: LandingPageData;
}

const Benefits: React.FC<BenefitsProps> = ({ data }) => {
  const { benefits_head, benefits_introduction, benefits } = data;

  if (
    !benefits_head &&
    !benefits_introduction &&
    (!benefits || benefits.length === 0)
  ) {
    return null;
  }

  const sampleBenefits = [
    {
      id: 1,
      title: "Save Time & Increase Efficiency",
      description:
        "Automate your tax form processes and reduce manual work by up to 80% with our streamlined platform.",
      stats: "80% Faster",
      icon: "FiZap",
      order: 1,
    },
    {
      id: 2,
      title: "Reduce Errors & Ensure Compliance",
      description:
        "Our built-in validation checks ensure IRS compliance and eliminate costly filing errors.",
      stats: "99% Accuracy",
      icon: "FiTarget",
      order: 2,
    },
    {
      id: 3,
      title: "Cost-Effective Solution",
      description:
        "Save up to 20% annually on tax preparation costs while improving service quality.",
      stats: "20% Savings",
      icon: "FiDollarSign",
      order: 3,
    },
    {
      id: 4,
      title: "Enhanced Security",
      description:
        "Enterprise-grade security protects your sensitive client data and tax information.",
      stats: "100% Secure",
      icon: "FiShield",
      order: 4,
    },
  ];

  const displayBenefits =
    benefits && benefits.length > 0 ? benefits : sampleBenefits;

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-theme-background">
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-text) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[80px] opacity-15"
        style={{
          background: `radial-gradient(circle, var(--color-primary), transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[60px] opacity-10"
        style={{
          background: `radial-gradient(circle, var(--color-accent), transparent 70%)`,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto px-4">
          {benefits_head && (
            <div className="mb-4">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 sm:mb-4 bg-theme-primary/10 text-theme-primary border border-theme-primary/20">
                Benefits
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4 text-theme-text">
                {benefits_head}
              </h2>
            </div>
          )}

          {benefits_introduction && (
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-balance text-theme-neutral">
              {benefits_introduction}
            </p>
          )}

          {(!benefits || benefits.length === 0) && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mt-4 border bg-theme-primary/5 text-theme-primary border-theme-primary/20">
              <EasyIcon icon="FiInfo" size={14} color="var(--color-primary)" />
              <span>Discover the benefits of our platform</span>
            </div>
          )}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-6xl mx-auto px-4">
          {displayBenefits.map((benefit: Benefit) => (
            <div key={benefit.id} className="group relative">
              {/* Card */}
              <div className="relative h-full p-6 rounded-2xl transition-all duration-500 hover:shadow-lg border backdrop-blur-sm bg-theme-background border-theme-primary/10">
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{
                    background: `linear-gradient(135deg, var(--color-primary)03 0%, var(--color-accent)03 100%)`,
                  }}
                />

                {/* Icon container */}
                <div className="flex items-start justify-between mb-4">
                  {benefit.icon && (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 relative overflow-hidden bg-theme-primary/10">
                      <EasyIcon
                        icon={benefit.icon}
                        size={20}
                        color="var(--color-primary)"
                        className="relative z-10 transition-transform duration-500 group-hover:rotate-6 sm:w-[22px] sm:h-[22px]"
                      />

                      {/* Shine effect */}
                      <div
                        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                        style={{
                          background: `linear-gradient(90deg, transparent, var(--color-primary)20, transparent)`,
                        }}
                      />
                    </div>
                  )}

                  {benefit.stats && (
                    <div
                      className="text-right font-bold text-base sm:text-lg lg:text-xl transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, var(--color-primary), var(--color-accent))`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {benefit.stats}
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 transition-colors duration-300 line-clamp-2 text-theme-text">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm leading-relaxed text-pretty line-clamp-3 text-theme-neutral">
                  {benefit.description}
                </p>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden rounded-b-2xl">
                  <div
                    className="h-full w-0 group-hover:w-full transition-all duration-700 ease-out"
                    style={{
                      background: `linear-gradient(90deg, var(--color-primary), var(--color-accent))`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        {(!benefits || benefits.length === 0) && (
          <div className="text-center mt-12 sm:mt-16 px-4">
            <p className="text-sm sm:text-base mb-4 sm:mb-6 text-balance text-theme-neutral">
              Ready to experience these benefits for your business?
            </p>
            <button className="group/btn inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl gradient-theme-primary text-white">
              Start Saving Today
              <EasyIcon
                icon="FiArrowRight"
                size={14}
                color="#FFFFFF"
                className="transition-transform duration-300 group-hover/btn:translate-x-1 sm:w-4 sm:h-4"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Benefits;
