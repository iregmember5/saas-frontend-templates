import React, { useEffect, useState } from "react";
import type { LandingPageData } from "../types/landing";
import { fetchLandingPageData } from "../types/landing";
import { useTheme } from "../contexts/ThemeContext";
import DynamicContentRenderer from "../components/landingpage/DynamicContent";
import GlassNavbar from "../components/landingpage/GlassNavbar";
import Header from "../components/landingpage/Header";
import Features from "../components/landingpage/Features";
import VideoSection from "../components/landingpage/VideoSection";
import Benefits from "../components/landingpage/Benefits";
import CardSections from "../components/landingpage/CardSections";
import Testimonials from "../components/landingpage/Testimonials";
import FAQ from "../components/landingpage/FAQ";
import CTA from "../components/landingpage/CTA";
import Footer from "../components/landingpage/Footer";
import ProblemSolution from "../components/landingpage/ProblemSolution";
import HowItWorks from "../components/landingpage/HowItWorks";
import Pricing from "../components/landingpage/Pricing";

interface LandingPageProps {
  onShowLogin?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onShowLogin }) => {
  const [data, setData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [themeColors, setThemeColors] = useState<any>(null);

  // Scroll animation observer - triggers on both scroll down and up
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        } else {
          entry.target.classList.remove("animate-in");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      ".scroll-fade-up, .scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-up, .scroll-fade-down"
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, [data]);

  const { setTheme } = useTheme();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const pageData = await fetchLandingPageData();
        
        // Set theme colors first for loading screen
        if (pageData.color_theme) {
          setThemeColors(pageData.color_theme);
          setTheme(pageData.color_theme);
        }
        
        setData(pageData);

        // Set dynamic meta tags
        if (pageData.meta_title || pageData.title) {
          document.title = pageData.meta_title || pageData.title;
        }

        // Set meta description
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (
          metaDescription &&
          (pageData.meta_description || pageData.header_description)
        ) {
          metaDescription.setAttribute(
            "content",
            pageData.meta_description || pageData.header_description || ""
          );
        }

        // Set OG image
        if (pageData.og_image) {
          let ogImage = document.querySelector('meta[property="og:image"]');
          if (!ogImage) {
            ogImage = document.createElement("meta");
            ogImage.setAttribute("property", "og:image");
            document.head.appendChild(ogImage);
          }
          ogImage.setAttribute("content", pageData.og_image.url);
        }

        setError(null);
      } catch (err) {
        console.error("Failed to load landing page:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load page data"
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ===== DYNAMIC SECTION RENDERING FUNCTION =====
  const renderSection = (sectionKey: string, index: number) => {
    // Map section keys to their components with appropriate animations
    const sectionComponents: Record<string, React.ReactElement | null> = {
      header: (
        <div key={`header-${index}`} className="scroll-fade-up animate-in">
          <Header data={data!} onShowLogin={onShowLogin} />
        </div>
      ),
      features: (
        <div key={`features-${index}`} className="scroll-fade-up">
          <Features data={data!} />
        </div>
      ),
      problem_solution: (
        <div key={`problem-solution-${index}`} className="scroll-scale-up">
          <ProblemSolution data={{ ...data?.problem_solution_section, color_theme: data?.color_theme } as any} />
        </div>
      ),
      how_it_works: (
        <div key={`how-it-works-${index}`} className="scroll-slide-right">
          <HowItWorks data={data!} />
        </div>
      ),
      video: data?.video_section?.featured_video ? (
        <div key={`video-${index}`} className="scroll-fade-in">
          <VideoSection data={data} />
        </div>
      ) : null,
      benefits: (
        <div key={`benefits-${index}`} className="scroll-slide-left">
          <Benefits data={data!} />
        </div>
      ),
      pricing: (
        <div key={`pricing-${index}`} className="scroll-fade-up">
          <Pricing data={data!} />
        </div>
      ),
      card_sections:
        data?.card_sections?.cards && data.card_sections.cards.length > 0 ? (
          <div key={`card-sections-${index}`} className="scroll-scale-up">
            <CardSections data={data} />
          </div>
        ) : null,
      dynamic_content:
        data?.dynamic_content && data.dynamic_content.length > 0 ? (
          <section
            key={`dynamic-content-${index}`}
            className="py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-theme-background"
          >
            <div className="w-full max-w-7xl mx-auto">
              <div className="space-y-8 sm:space-y-12">
                {data.dynamic_content.map((block) => (
                  <div key={block.id} className="w-full">
                    <DynamicContentRenderer block={block} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null,
      testimonials: (
        <div key={`testimonials-${index}`} className="scroll-slide-right">
          <Testimonials data={data!} />
        </div>
      ),
      faq: (
        <div key={`faq-${index}`} className="scroll-fade-up">
          <FAQ data={data!} />
        </div>
      ),
      cta:
        data?.cta_head || data?.cta_introduction || data?.cta_primary_text ? (
          <div key={`cta-${index}`} className="scroll-scale-up">
            <CTA data={data} />
          </div>
        ) : null,

      secondary_cta:
        data?.secondary_cta_heading ||
        data?.secondary_cta_description ||
        data?.secondary_cta_button_text ? (
          <div key={`secondary-cta-${index}`} className="scroll-scale-up">
            <CTA data={data} />
          </div>
        ) : null,
      footer: (
        <div key={`footer-${index}`} className="scroll-fade-in">
          <Footer data={data!} />
        </div>
      ),
    };

    return sectionComponents[sectionKey] || null;
  };

  if (loading) {
    const loadingPrimary = themeColors?.primary_color || "#3B82F6";
    const loadingBg = themeColors?.background_color || "#FFFFFF";
    const loadingText = themeColors?.text_color || "#1F2937";
    
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: loadingBg }}>
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <div 
              className="animate-spin rounded-full h-20 w-20 border-4 border-solid"
              style={{ 
                borderColor: `${loadingPrimary}30`,
                borderTopColor: loadingPrimary 
              }}
            ></div>
            <div 
              className="absolute inset-0 animate-ping rounded-full opacity-20"
              style={{ backgroundColor: loadingPrimary }}
            ></div>
          </div>
          <p className="text-xl font-medium" style={{ color: loadingText }}>
            Loading amazing content...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-background">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-theme-accent mb-6">
            <svg
              className="w-20 h-20 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-theme-text mb-3">
            Unable to Load Page
          </h2>
          <p className="text-theme-neutral mb-8 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 gradient-theme-primary text-white rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-background">
        <div className="text-center">
          <p className="text-theme-neutral text-xl">No page data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="landing-page">
      {/* Global Animation Styles */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideLeft {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scroll-fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .scroll-fade-in {
          opacity: 0;
          transition: opacity 0.8s ease-out;
        }

        .scroll-slide-left {
          opacity: 0;
          transform: translateX(60px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .scroll-slide-right {
          opacity: 0;
          transform: translateX(-60px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .scroll-scale-up {
          opacity: 0;
          transform: scale(0.9);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .scroll-fade-down {
          opacity: 0;
          transform: translateY(-40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) translateX(0) scale(1) !important;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Parallax effect for background elements */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Apply color theme globally with contrast fix */}
      {data.color_theme && (
        <style>{`
          :root {
            --color-primary: ${data.color_theme.primary_color};
            --color-secondary: ${data.color_theme.secondary_color};
            --color-accent: ${data.color_theme.accent_color};
            --color-neutral: ${data.color_theme.neutral_color};
            --color-background: ${
              data.color_theme.background_color === "#6B7280"
                ? "#FFFFFF"
                : data.color_theme.background_color
            };
            --color-text: ${data.color_theme.text_color};
          }
          
          /* Ensure good contrast */
          body {
            background-color: var(--color-background) !important;
            color: var(--color-text);
          }
          
          .landing-page {
            background-color: var(--color-background);
            min-height: 100vh;
          }
        `}</style>
      )}

      {/* Navbar Section - Always at top */}
      <GlassNavbar data={data} onShowLogin={onShowLogin} />

      {/* ===== DYNAMIC SECTION RENDERING ===== */}
      {data.section_order && data.section_order.length > 0 ? (
        // If section_order exists in API, render sections dynamically
        data.section_order.map((sectionKey, index) => {
          // Skip navbar as it's already rendered above
          if (sectionKey === "navbar") return null;

          return renderSection(sectionKey, index);
        })
      ) : (
        // Fallback: If no section_order, render in default order
        <>
          {/* Header Section */}
          <div className="scroll-fade-up animate-in">
            <Header data={data} onShowLogin={onShowLogin} />
          </div>

          {/* Features Section */}
          <div className="scroll-fade-up">
            <Features data={data} />
          </div>

          {/* Problem Solution Section */}
          <div className="scroll-scale-up">
            <ProblemSolution data={{ ...data?.problem_solution_section, color_theme: data?.color_theme } as any} />
          </div>

          {/* How It Works Section */}
          <div className="scroll-slide-right">
            <HowItWorks data={data} />
          </div>

          {/* Video Section */}
          {data.video_section?.featured_video && (
            <div className="scroll-fade-in">
              <VideoSection data={data} />
            </div>
          )}

          {/* Benefits Section */}
          <div className="scroll-slide-left">
            <Benefits data={data} />
          </div>

          {/* Pricing Section */}
          <div className="scroll-fade-up">
            <Pricing data={data} />
          </div>

          {/* Card Sections */}
          {data.card_sections?.cards && data.card_sections.cards.length > 0 && (
            <div className="scroll-scale-up">
              <CardSections data={data} />
            </div>
          )}

          {/* Dynamic Content Section */}
          {data.dynamic_content && data.dynamic_content.length > 0 && (
            <section className="py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8 bg-theme-background min-h-screen">
              <div className="w-full max-w-7xl mx-auto">
                <div className="space-y-8 sm:space-y-12">
                  {data.dynamic_content.map((block) => (
                    <div
                      key={block.id}
                      className="w-full bg-red-500 p-4 border-2 border-blue-500"
                    >
                      <h3 className="text-2xl font-bold mb-4">
                        Block Type: {block.type}
                      </h3>
                      <DynamicContentRenderer block={block} />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Testimonials Section */}
          <div className="scroll-slide-right">
            <Testimonials data={data} />
          </div>

          {/* FAQ Section */}
          <div className="scroll-fade-up">
            <FAQ data={data} />
          </div>

          {/* CTA Section */}
          {(data.cta_head ||
            data.cta_introduction ||
            data.cta_primary_text) && (
            <div className="scroll-scale-up">
              <CTA data={data} />
            </div>
          )}

          {/* Footer */}
          <div className="scroll-fade-in">
            <Footer data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
