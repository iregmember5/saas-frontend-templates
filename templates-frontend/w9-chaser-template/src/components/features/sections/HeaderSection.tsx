import React from "react";
import type { FeaturesPageData, Theme } from "../../../types/features-page";
import { getFullImageUrl } from "../utils/imageUtils";

interface HeaderSectionProps {
  data: FeaturesPageData;
  theme: Theme;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ data }) => {
  console.log("HeaderSection data:", {
    header_cta_text: data.header_cta_text,
    header_cta_url: data.header_cta_url,
  });
  return (
    <section
      className="relative py-20 sm:py-32 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, var(--color-primary) 10%, transparent) 0%, color-mix(in srgb, var(--color-accent) 10%, transparent) 100%)`,
      }}
    >
      <style>{`
        .header-gradient-bg {
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
        }
        .header-gradient-hover {
          background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%);
        }
        .header-shadow {
          box-shadow: 0 20px 60px color-mix(in srgb, var(--color-primary) 30%, transparent);
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl animate-float header-gradient-bg" />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl header-gradient-hover"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fadeInUp text-theme-text"
          >
            {data.header_title}
          </h1>
          <p
            className="text-xl sm:text-2xl mb-8 animate-fadeInUp animation-delay-200 text-theme-neutral"
          >
            {data.header_subtitle}
          </p>
          {data.header_description && (
            <p
              className="text-lg mb-10 max-w-3xl mx-auto animate-fadeInUp text-theme-neutral"
              style={{ animationDelay: "0.3s" }}
            >
              {data.header_description}
            </p>
          )}
          {data.header_cta_text ? (
            <a
              href={data.header_cta_url || "#"}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 hover:scale-105 relative overflow-hidden group gradient-theme-primary"
              style={{
                animationDelay: "0.4s",
              }}
              {...(!data.header_cta_url && {
                onClick: (e) => e.preventDefault(),
              })}
            >
              <span className="relative z-10">{data.header_cta_text}</span>
            </a>
          ) : null}
        </div>

        {data.header_image && (
          <div
            className="mt-16 max-w-5xl mx-auto animate-fadeInUp"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 header-shadow">
              <img
                src={getFullImageUrl(data.header_image.url)}
                alt={data.header_image.title}
                className="w-full h-auto"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
