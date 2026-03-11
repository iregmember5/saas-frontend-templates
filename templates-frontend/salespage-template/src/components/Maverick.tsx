import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

import IconRenderer from "./IconRenderer";
import WebForm from "./WebForm";
import OrderTemplateForm from "./OrderTemplateForm";
import EventRegistrationForm from "./EventRegistrationForm";
import TattooConsentForm from "./TattooConsentForm";
import NewsletterSubscriptionForm from "./NewsletterSubscriptionForm";
import MusicSubmissionForm from "./MusicSubmissionForm";
import BloodDonationForm from "./BloodDonationForm";
import ComprehensiveAssessmentForm from "./ComprehensiveAssessmentForm";
import FoodOrderForm from "./FoodOrderForm";
import IRSClientOrganizerForm from "./IRSClientOrganizerForm";
import {
  fetchAllSalesPages,
  fetchAllFeaturesPages,
  fetchWorkbookPageData,
  prependImageUrl,
  type SalesPages,
  type FeaturesPageData,
} from "../../types/maverick";

const styles = `
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.5); }
    50% { box-shadow: 0 0 40px rgba(251, 191, 36, 0.8); }
  }
  
  .geometric-bg {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%);
    position: relative;
  }
  
  .geometric-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%);
  }
  
  body, html, #root {
    margin: 0 !important;
    padding: 0 !important;
    width: 100%;
    overflow-x: hidden;
  }
`;

export default function TaxAdvisorLandingPage() {
  const [searchParams] = useSearchParams();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [pageData, setPageData] = useState<SalesPages | null>(null);
  const [showWebForm, setShowWebForm] = useState(false);
  const [showOrderTemplate, setShowOrderTemplate] = useState(false);
  const [showEventTemplate, setShowEventTemplate] = useState(false);
  const [showTattooTemplate, setShowTattooTemplate] = useState(false);
  const [showNewsletterTemplate, setShowNewsletterTemplate] = useState(false);
  const [showMusicTemplate, setShowMusicTemplate] = useState(false);
  const [showBloodDonationTemplate, setShowBloodDonationTemplate] =
    useState(false);
  const [showComprehensiveTemplate, setShowComprehensiveTemplate] =
    useState(false);
  const [showFoodOrderTemplate, setShowFoodOrderTemplate] = useState(false);
  const [showIRSOrganizerTemplate, setShowIRSOrganizerTemplate] =
    useState(false);
  const [webformPageData, setWebformPageData] = useState<any>(null);
  const [isLoadingWebForm, setIsLoadingWebForm] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  const [_, setFeaturesData] = useState<FeaturesPageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleOpenWebForm = async () => {
    setIsLoadingWebForm(true);
    try {
      const response = await fetch(
        "https://mypowerly.com/v1/blogs/api/v2/webform-pages/",
        {
          headers: {
            "X-Frontend-Url": "https://mypowerly.com",
          },
        },
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        const webformPage = data.items[0];
        setWebformPageData({
          id: webformPage.id,
          web_form_section: {
            form: webformPage.web_form,
          },
        });
        setShowWebForm(true);
      }
    } catch (error) {
      console.error("Error fetching webform:", error);
    } finally {
      setIsLoadingWebForm(false);
    }
  };

  useEffect(() => {
    const container = document.querySelector('[style*="overflow: auto"]');
    const handleScroll = () => {
      if (container) {
        setShowFloatingButton(container.scrollTop > 500);
      }
    };
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [pageData]);

  const getFloatingButtonText = () => {
    if (pageData?.primary_cta_section?.button?.text) {
      return pageData.primary_cta_section.button.text;
    }
    if (pageData?.main_hero_section?.button?.text) {
      return pageData.main_hero_section.button.text;
    }
    if (
      !pageData?.main_hero_section?.heading &&
      pageData?.reusable_sections?.[0]?.button?.text
    ) {
      return pageData.reusable_sections[0].button.text;
    }
    return null;
  };

  useEffect(() => {
    Promise.all([
      fetchAllSalesPages(),
      fetchAllFeaturesPages(),
      fetchWorkbookPageData(),
    ])
      .then(([salesPages, featuresData]) => {
        const urlSlug = window.location.search.substring(1);
        const selectedPage =
          salesPages.find((page) => {
            const title = page.meta_title || page.header_section?.title || "";
            const slug = title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");
            return slug === urlSlug;
          }) || salesPages[0];
        setPageData(selectedPage);
        setFeaturesData(featuresData);
        setLoading(false);

        // Force update title and favicon after page loads
        setTimeout(() => {
          fetch("https://mypowerly.com/v1/api/site-settings/")
            .then((res) => res.json())
            .then((settings) => {
              if (settings.site_title) {
                document.title = settings.site_title;
              }
              if (settings.favicon?.url) {
                const faviconUrl = settings.favicon.url.startsWith("http")
                  ? settings.favicon.url
                  : `https://https://mypowerly.com/v1${settings.favicon.url}`;
                let link = document.querySelector(
                  "link[rel~='icon']",
                ) as HTMLLinkElement;
                if (!link) {
                  link = document.createElement("link");
                  link.rel = "icon";
                  document.head.appendChild(link);
                }
                link.href = faviconUrl;
              }
            })
            .catch(console.error);
        }, 100);
      })
      .catch(console.error);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="geometric-bg text-white fixed inset-0 w-screen h-screen flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xl font-bold text-yellow-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="geometric-bg text-white fixed inset-0 w-screen h-screen flex items-center justify-center z-50">
        <div className="text-center">
          <div className="text-xl font-bold text-red-400 mb-4">
            Failed to load page data
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        margin: 0,
        padding: 0,
        overflow: "auto",
        zIndex: 9999,
      }}
    >
      <style>{styles}</style>
      <div className="geometric-bg text-white w-full min-h-screen overflow-x-hidden">
        {/* Top Banner */}
        {pageData?.header_section?.title && (
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white py-3 sm:py-4 px-3 sm:px-4 font-bold shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto relative z-10 gap-3">
              <p className="text-xl sm:text-2xl md:text-4xl font-extrabold drop-shadow-lg text-center flex-1">
                {pageData.header_section.title}
              </p>
              {pageData.header_section.button?.text && (
                <button
                  onClick={handleOpenWebForm}
                  disabled={isLoadingWebForm}
                  className="bg-yellow-400 text-black px-4 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 rounded-full text-xs sm:text-sm md:text-base flex items-center gap-2 whitespace-nowrap font-black shadow-xl hover:scale-105 transition-all disabled:opacity-50 flex-shrink-0"
                >
                  {isLoadingWebForm
                    ? "Loading..."
                    : pageData.header_section.button.text}
                </button>
              )}
            </div>
          </div>
        )}
        {pageData?.header_section?.line_one && (
          <p className="text-2xl sm:text-3xl mt-2 text-center font-bold text-yellow-300">
            {pageData.header_section.line_one}
          </p>
        )}

        {/* Hero Section */}
        <div className="relative overflow-hidden py-8">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-transparent"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="container mx-auto px-3 sm:px-4 py-4 relative max-w-7xl">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div className="text-center md:text-left space-y-3 sm:space-y-4">
                {pageData?.main_hero_section?.heading && (
                  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black mb-2 sm:mb-4 leading-tight bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
                    {pageData.main_hero_section.heading}
                  </h1>
                )}
                {pageData?.main_hero_section?.subheading && (
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto md:mx-0 mb-2 sm:mb-4 leading-relaxed">
                    {pageData.main_hero_section.subheading}
                  </p>
                )}
                {pageData?.main_hero_section?.description && (
                  <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto md:mx-0 mb-2 sm:mb-4 leading-relaxed">
                    {pageData.main_hero_section.description}
                  </p>
                )}

                {pageData?.main_hero_section?.button?.text && (
                  <button
                    onClick={handleOpenWebForm}
                    disabled={isLoadingWebForm}
                    className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-black font-black py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 rounded-full text-sm sm:text-base md:text-xl hover:scale-110 transition-all shadow-2xl hover:shadow-yellow-500/50 animate-[glow_2s_ease-in-out_infinite] disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                  >
                    {isLoadingWebForm ? (
                      <span className="flex items-center gap-2 justify-center">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      <>🎯 {pageData.main_hero_section.button.text}</>
                    )}
                  </button>
                )}
              </div>
              <div className="relative">
                {pageData?.main_hero_section?.image?.url && (
                  <div className="relative animate-[float_6s_ease-in-out_infinite]">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl blur-2xl opacity-50" />
                    <img
                      src={prependImageUrl(
                        pageData.main_hero_section.image.url,
                      )}
                      alt="Workshop Hero"
                      className="relative rounded-3xl shadow-2xl w-full border-4 border-yellow-500/30"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Featured On Section */}
        {pageData?.featured_on_section?.items &&
          pageData.featured_on_section.items.length > 0 && (
            <div className="py-8 sm:py-12 border-y border-gray-800 overflow-hidden">
              <p className="text-center text-gray-400 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
                {pageData.featured_on_section.heading}
              </p>
              <div className="flex items-center gap-6 sm:gap-12 px-3 sm:px-4 animate-[scroll_20s_linear_infinite]">
                {[...Array(2)].map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-6 sm:gap-12 shrink-0"
                  >
                    {pageData.featured_on_section.items.map(
                      (item: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 sm:gap-3"
                        >
                          {item.icon ? (
                            <IconRenderer
                              iconPath={item.icon}
                              className="w-6 sm:w-8 h-6 sm:h-8 text-white"
                            />
                          ) : (
                            <svg
                              className="w-6 sm:w-8 h-6 sm:h-8 text-gray-500"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <circle cx="12" cy="12" r="10" />
                            </svg>
                          )}
                          <span className="text-gray-500 text-base sm:text-xl md:text-2xl font-bold whitespace-nowrap">
                            {item.name}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* What You'll Learn */}
        {pageData?.card_sections?.cards &&
          pageData.card_sections.cards.length > 0 && (
            <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-24">
              {pageData.card_sections.main_header && (
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                  <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
                    WHAT YOU'LL DISCOVER
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4">
                    {pageData.card_sections.main_header}
                  </h2>
                  {pageData.card_sections.footer_title && (
                    <p className="text-sm sm:text-base md:text-xl text-gray-400 max-w-2xl mx-auto">
                      {pageData.card_sections.footer_title}
                    </p>
                  )}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
                {pageData.card_sections.cards.map((card: any, idx: number) => (
                  <div key={idx} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-gray-900 border border-yellow-500/30 rounded-2xl p-4 sm:p-6 md:p-8 hover:border-yellow-500 transition-all">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-lg sm:text-2xl font-black text-black">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          {card.title && (
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                              {card.title}
                            </h3>
                          )}
                          {card.subtitle && (
                            <h4 className="text-sm sm:text-base md:text-lg font-semibold text-yellow-400 mb-2 sm:mb-3">
                              {card.subtitle}
                            </h4>
                          )}
                          {card.description && (
                            <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">
                              {card.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Free Registration Banner */}
        {pageData?.secondary_cta_section?.heading && (
          <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-24">
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl blur-2xl opacity-30" />
              <div className="relative bg-black border-2 sm:border-4 border-yellow-500 rounded-3xl p-6 sm:p-8 md:p-12 text-center">
                <div className="inline-block bg-yellow-400 text-black px-3 sm:px-4 py-1 rounded-full text-xs font-black uppercase mb-3 sm:mb-6">
                  Limited Time Offer
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-white mb-3 sm:mb-4">
                  {pageData.secondary_cta_section.heading}
                </h2>
                {pageData.secondary_cta_section.description && (
                  <div className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                    {pageData.secondary_cta_section.description}
                  </div>
                )}
                {pageData.secondary_cta_section.announcement && (
                  <p className="text-sm sm:text-base md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
                    {pageData.secondary_cta_section.announcement}
                  </p>
                )}
                {pageData.secondary_cta_section.button?.text && (
                  <button
                    onClick={handleOpenWebForm}
                    disabled={isLoadingWebForm}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black py-3 sm:py-4 md:py-5 px-6 sm:px-10 md:px-12 rounded-full text-sm sm:text-base md:text-xl hover:scale-105 transition-transform shadow-2xl disabled:opacity-50 w-full sm:w-auto"
                  >
                    {isLoadingWebForm
                      ? "Loading..."
                      : `${pageData.secondary_cta_section.button.text} →`}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Meet Your Speakers */}
        {pageData?.images_gallery_section?.images &&
          pageData.images_gallery_section.images.filter((img: any) => img.image)
            .length > 0 && (
            <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-24">
              {pageData.images_gallery_section.heading && (
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-3 sm:mb-4">
                    {pageData.images_gallery_section.heading}
                  </h2>
                  <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full" />
                </div>
              )}
              <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-12 max-w-5xl mx-auto">
                {pageData.images_gallery_section.images
                  .filter((img: any) => img.image)
                  .map((img: any, i: number) => (
                    <div key={i} className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 rounded-full overflow-hidden border-3 sm:border-4 border-yellow-500 shadow-2xl">
                        <img
                          src={prependImageUrl(img.image?.url)}
                          alt={img.caption || "Speaker"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

        {/* Reusable Sections */}
        {pageData?.reusable_sections
          ?.filter(
            (s: any) =>
              s.heading ||
              s.subheading ||
              s.description ||
              s.subdescription ||
              s.button?.text ||
              s.image ||
              s.cards?.length > 0,
          )
          .map((section: any, idx: number) => (
            <div
              key={idx}
              className={`relative overflow-hidden ${
                idx === 0 && !pageData?.main_hero_section?.heading
                  ? "py-3 sm:py-4"
                  : "py-12 sm:py-16 md:py-24"
              }`}
            >
              {/* Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-orange-500/5" />
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

              <div className="container mx-auto px-3 sm:px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                  {/* Section Header */}
                  <div className="text-center mb-8 sm:mb-12 md:mb-20">
                    {section.heading && (
                      <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-6">
                        <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                          {section.heading}
                        </span>
                      </h2>
                    )}
                    {section.subheading && (
                      <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 px-3 sm:px-6 py-1 sm:py-2 rounded-full mb-4 sm:mb-6">
                        <h3 className="text-sm sm:text-base md:text-xl font-black text-black">
                          {section.subheading}
                        </h3>
                      </div>
                    )}
                    {section.description && (
                      <p className="text-sm sm:text-base md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        {section.description}
                      </p>
                    )}
                    {section.cards && section.cards.length > 0 && (
                      <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                        <button
                          onClick={() => setViewMode("grid")}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-bold transition-all ${
                            viewMode === "grid"
                              ? "bg-yellow-500 text-black"
                              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                          }`}
                        >
                          Grid
                        </button>
                        <button
                          onClick={() => setViewMode("list")}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-bold transition-all ${
                            viewMode === "list"
                              ? "bg-yellow-500 text-black"
                              : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                          }`}
                        >
                          List
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Cards Grid */}
                  {section.cards && section.cards.length > 0 && (
                    <div
                      className={
                        viewMode === "grid"
                          ? `grid sm:grid-cols-2 lg:grid-cols-${
                              section.cards.filter(
                                (c: any) => c.name || c.description,
                              ).length === 2
                                ? "2"
                                : "4"
                            } gap-3 sm:gap-6 ${
                              section.cards.filter(
                                (c: any) => c.name || c.description,
                              ).length === 2
                                ? "max-w-4xl mx-auto"
                                : ""
                            }`
                          : "flex flex-col gap-3 sm:gap-4 max-w-4xl mx-auto"
                      }
                    >
                      {section.cards
                        .filter((c: any) => c.name || c.description)
                        .map((card: any, i: number) => (
                          <div key={i} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 rounded-2xl opacity-75 group-hover:opacity-100 blur transition-all duration-500" />
                            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-yellow-600 group-hover:border-yellow-500 rounded-2xl p-4 sm:p-6 h-full transition-all duration-300">
                              {card.name && (
                                <h4 className="text-sm sm:text-base md:text-lg font-bold text-white mb-3 sm:mb-4 group-hover:text-yellow-400 transition-colors">
                                  {card.name}
                                </h4>
                              )}
                              {card.description && (
                                <div className="text-gray-400 text-xs sm:text-sm leading-relaxed space-y-1.5 sm:space-y-2">
                                  {card.description.split("\n").map(
                                    (line: string, idx: number) =>
                                      line.trim() && (
                                        <div
                                          key={idx}
                                          className="flex items-start gap-2"
                                        >
                                          <span className="text-yellow-500 mt-1 flex-shrink-0">
                                            •
                                          </span>
                                          <span>
                                            {line.replace(/^🔸\s*/, "")}
                                          </span>
                                        </div>
                                      ),
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Button */}
                  {section.button?.text && (
                    <div className="text-center mt-8 sm:mt-12 md:mt-16">
                      <button
                        onClick={handleOpenWebForm}
                        disabled={isLoadingWebForm}
                        className="group relative bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-black font-black py-3 sm:py-4 md:py-5 px-6 sm:px-10 md:px-12 rounded-full text-sm sm:text-base md:text-xl hover:scale-105 transition-all shadow-2xl overflow-hidden disabled:opacity-50 w-full sm:w-auto"
                      >
                        <span className="relative z-10">
                          {isLoadingWebForm
                            ? "Loading..."
                            : `${section.button.text} →`}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

        {/* Simple CTA Sections */}
        {pageData?.simple_cta_sections
          ?.filter(
            (c: any) =>
              c.heading || c.subtitle || c.description || c.button?.text,
          )
          .map((cta: any, idx: number) => (
            <div
              key={idx}
              className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16 text-center"
            >
              {cta.heading && (
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
                  {cta.heading}
                </h2>
              )}
              {cta.subtitle && (
                <p className="text-sm sm:text-base md:text-xl mb-4 sm:mb-8">
                  {cta.subtitle}
                </p>
              )}
              {cta.description && (
                <p className="text-xs sm:text-sm md:text-base mb-3 sm:mb-4">
                  {cta.description}
                </p>
              )}
              {cta.button?.text && (
                <button
                  onClick={handleOpenWebForm}
                  disabled={isLoadingWebForm}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-2 sm:py-3 md:py-4 px-6 sm:px-8 rounded-full text-sm sm:text-base md:text-lg hover:scale-105 transition-transform disabled:opacity-50 w-full sm:w-auto"
                >
                  {isLoadingWebForm ? "Loading..." : `🎯 ${cta.button.text}`}
                </button>
              )}
            </div>
          ))}

        {/* Web Form Section */}
        {pageData?.web_form_section?.form && (
          <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16">
            {pageData.web_form_section.heading && (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-center">
                {pageData.web_form_section.heading}
              </h2>
            )}
            {pageData.web_form_section.description && (
              <p className="text-xs sm:text-sm md:text-base text-center mb-6 sm:mb-8">
                {pageData.web_form_section.description}
              </p>
            )}
            <div className="max-w-2xl mx-auto text-center">
              <button
                onClick={handleOpenWebForm}
                disabled={isLoadingWebForm}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black py-3 sm:py-4 md:py-5 px-6 sm:px-10 md:px-12 rounded-full text-sm sm:text-base md:text-xl hover:scale-105 transition-transform shadow-2xl disabled:opacity-50 w-full sm:w-auto"
              >
                {isLoadingWebForm
                  ? "Loading..."
                  : pageData.web_form_section.form.form_title || "Apply Now"}
              </button>
            </div>
          </div>
        )}

        {/* Calendar Section */}
        {pageData?.calendar_section?.embed_code && (
          <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16">
            {pageData.calendar_section.heading && (
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center">
                {pageData.calendar_section.heading}
              </h2>
            )}
            <div
              className="max-w-4xl mx-auto overflow-x-auto"
              dangerouslySetInnerHTML={{
                __html: pageData.calendar_section.embed_code,
              }}
            />
          </div>
        )}

        {/* FAQ Section */}
        {pageData?.faq_section?.faqs &&
          pageData.faq_section.faqs.length > 0 && (
            <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-24">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-3 sm:mb-4">
                    {pageData.faq_section.heading}
                  </h2>
                  <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto rounded-full" />
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {pageData.faq_section.faqs.map((faq: any, i: number) => (
                    <div
                      key={i}
                      className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full text-left p-4 sm:p-5 md:p-6 flex justify-between items-center group"
                      >
                        <span className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-yellow-400 transition-colors pr-3 sm:pr-4">
                          {faq.question}
                        </span>
                        <div className="flex-shrink-0 w-6 sm:w-8 h-6 sm:h-8 bg-yellow-500/20 rounded-full flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                          {openFaq === i ? (
                            <ChevronUp className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />
                          ) : (
                            <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />
                          )}
                        </div>
                      </button>
                      {openFaq === i && (
                        <div
                          className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed border-t border-gray-800"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        {/* Pricing Section */}
        {pageData?.primary_cta_section?.heading && (
          <div className="container mx-auto px-3 sm:px-4 py-12 sm:py-16 md:py-24">
            <div className="max-w-sm sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
              <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500 rounded-3xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 sm:p-6 text-center">
                  <p className="text-black font-black text-xs sm:text-sm uppercase tracking-wider">
                    {pageData.primary_cta_section.heading}
                  </p>
                </div>
                <div className="p-4 sm:p-5 md:p-6 text-center">
                  {pageData.primary_cta_section.subtitle && (
                    <div className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2 sm:mb-3">
                      {pageData.primary_cta_section.subtitle}
                    </div>
                  )}
                  {pageData.primary_cta_section.description && (
                    <p className="text-xs sm:text-sm md:text-sm text-gray-400 mb-2 sm:mb-3">
                      {pageData.primary_cta_section.description}
                    </p>
                  )}
                  {pageData.primary_cta_section.subdescription && (
                    <p className="text-yellow-400 font-bold text-xs sm:text-xs md:text-sm mb-3 sm:mb-4">
                      {pageData.primary_cta_section.subdescription}
                    </p>
                  )}
                  {pageData.primary_cta_section.button?.text && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleOpenWebForm();
                      }}
                      disabled={isLoadingWebForm}
                      style={{ pointerEvents: "auto", zIndex: 1 }}
                      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-black py-3 sm:py-4 md:py-5 rounded-full text-sm sm:text-base md:text-lg hover:scale-105 transition-transform shadow-xl disabled:opacity-50 cursor-pointer relative"
                    >
                      {isLoadingWebForm
                        ? "Loading..."
                        : pageData.primary_cta_section.button.text}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {webformPageData?.web_form_section?.form && (
        <WebForm
          isOpen={showWebForm}
          onClose={() => setShowWebForm(false)}
          data={webformPageData.web_form_section}
          webformPageId={webformPageData.id}
        />
      )}

      <OrderTemplateForm
        isOpen={showOrderTemplate}
        onClose={() => setShowOrderTemplate(false)}
      />
      <EventRegistrationForm
        isOpen={showEventTemplate}
        onClose={() => setShowEventTemplate(false)}
      />
      <TattooConsentForm
        isOpen={showTattooTemplate}
        onClose={() => setShowTattooTemplate(false)}
      />
      <NewsletterSubscriptionForm
        isOpen={showNewsletterTemplate}
        onClose={() => setShowNewsletterTemplate(false)}
      />
      <MusicSubmissionForm
        isOpen={showMusicTemplate}
        onClose={() => setShowMusicTemplate(false)}
      />
      <BloodDonationForm
        isOpen={showBloodDonationTemplate}
        onClose={() => setShowBloodDonationTemplate(false)}
      />
      <ComprehensiveAssessmentForm
        isOpen={showComprehensiveTemplate}
        onClose={() => setShowComprehensiveTemplate(false)}
      />
      <FoodOrderForm
        isOpen={showFoodOrderTemplate}
        onClose={() => setShowFoodOrderTemplate(false)}
      />
      <IRSClientOrganizerForm
        isOpen={showIRSOrganizerTemplate}
        onClose={() => setShowIRSOrganizerTemplate(false)}
      />

      {/* Floating CTA Button */}
      {showFloatingButton &&
        !showWebForm &&
        !showOrderTemplate &&
        !showEventTemplate &&
        !showTattooTemplate &&
        !showNewsletterTemplate &&
        !showMusicTemplate &&
        !showBloodDonationTemplate &&
        !showComprehensiveTemplate &&
        !showFoodOrderTemplate &&
        !showIRSOrganizerTemplate &&
        getFloatingButtonText() && (
          <div className="fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 z-[10000] px-3">
            <button
              onClick={handleOpenWebForm}
              disabled={isLoadingWebForm}
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 text-black font-black py-2 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-full text-xs sm:text-sm md:text-lg hover:scale-110 transition-all shadow-2xl hover:shadow-yellow-500/50 animate-[glow_2s_ease-in-out_infinite] disabled:opacity-50 whitespace-nowrap"
            >
              {isLoadingWebForm
                ? "Loading..."
                : `🎯 ${getFloatingButtonText()}`}
            </button>
          </div>
        )}
    </div>
  );
}
