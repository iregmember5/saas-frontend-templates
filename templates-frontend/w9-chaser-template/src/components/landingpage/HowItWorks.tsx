import React, { useState } from "react";
import type { LandingPageData } from "../../types/landing";
import EasyIcon from "./IconRenderer";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HowItWorksProps {
  data: LandingPageData;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ data }) => {
  const section = data.how_it_works_section;
  const primaryColor = data.color_theme?.primary_color || "#3B82F6";
  const secondaryColor = data.color_theme?.secondary_color || "#1E40AF";
  const [currentStep, setCurrentStep] = useState(0);

  if (!section || !section.steps || section.steps.length === 0) {
    return null;
  }

  const hasMultipleSteps = section.steps.length > 1;
  const canGoPrev = currentStep > 0;
  const canGoNext = currentStep < section.steps.length - 1;

  const getVideoEmbedUrl = (url: string): string | undefined => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.match(
        /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/
      )?.[1];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : undefined;
    }
    return url;
  };

  const getIconName = (icon?: string) => icon?.split("/").pop() || "";

  const currentStepData = section.steps[currentStep];
  const video = currentStepData?.video;
  const videoUrl = video?.video_url?.trim();
  const videoSource = video?.video_source;
  const imageUrl = currentStepData?.image;

  const getFullVideoUrl = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `https://esign-admin.signmary.com${url}`;
  };

  // Get video file URL - backend returns it as video_file_url
  const videoFileUrl = (video as any)?.video_file_url;

  const embedUrl =
    videoUrl && videoSource === "youtube"
      ? getVideoEmbedUrl(videoUrl)
      : undefined;
  const uploadedVideoUrl =
    videoSource === "upload" && videoFileUrl
      ? getFullVideoUrl(videoFileUrl)
      : undefined;

  console.log("HowItWorks Debug:", {
    video,
    videoUrl,
    videoFileUrl,
    videoSource,
    embedUrl,
    uploadedVideoUrl,
    imageUrl,
  });
  return (
    <section
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: data.color_theme?.background_color || "#F9FAFB",
      }}
    >
      <div className="max-w-7xl mx-auto relative">
        {section.heading && (
          <div className="mb-4 sm:mb-6 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3 sm:mb-4 border bg-theme-primary/5 text-theme-primary border-theme-primary/20">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-theme-primary" />
              {section.heading || "How It Works"}
            </div>
          </div>
        )}
        {hasMultipleSteps && (
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={!canGoPrev}
            className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg items-center justify-center z-10"
            style={{
              opacity: canGoPrev ? 1 : 0.3,
              cursor: canGoPrev ? "pointer" : "not-allowed",
              backgroundColor: canGoPrev ? `${primaryColor}10` : "#fff",
            }}
          >
            <ChevronLeft className="w-6 h-6" style={{ color: primaryColor }} />
          </button>
        )}
        {hasMultipleSteps && (
          <button
            onClick={() =>
              setCurrentStep((prev) =>
                Math.min(section.steps.length - 1, prev + 1)
              )
            }
            disabled={!canGoNext}
            className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg items-center justify-center z-10"
            style={{
              opacity: canGoNext ? 1 : 0.3,
              cursor: canGoNext ? "pointer" : "not-allowed",
              backgroundColor: canGoNext ? `${primaryColor}10` : "#fff",
            }}
          >
            <ChevronRight className="w-6 h-6" style={{ color: primaryColor }} />
          </button>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left side - Image/Video */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              {embedUrl ? (
                <div className="aspect-video">
                  <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : uploadedVideoUrl ? (
                <div className="aspect-video">
                  <video
                    src={uploadedVideoUrl}
                    className="w-full h-full"
                    controls
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt={section.heading}
                  className="w-full h-auto"
                />
              ) : (
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No media available</span>
                </div>
              )}
            </div>

            {/* Floating header badge */}
            <div
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl shadow-lg"
              style={{ backgroundColor: secondaryColor }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <EasyIcon
                  icon={section.icon || "FiZap"}
                  size={24}
                  color="#FFFFFF"
                  className="sm:w-8 sm:h-8"
                />
                <div>
                  <div className="font-bold text-sm sm:text-base md:text-lg">
                    {section.heading}
                  </div>
                  <div className="text-xs sm:text-sm opacity-80">
                    {section.steps.length} Simple Steps
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Steps */}
          <div>
            <div className="space-y-6 sm:space-y-8">
              {(hasMultipleSteps ? [currentStepData] : section.steps).map(
                (step, index) => {
                  const displayStepNumber = hasMultipleSteps
                    ? step.step_number || currentStep + 1
                    : step.step_number || index + 1;
                  return (
                    <div key={index} className="space-y-6">
                      {/* Step Icon & Number */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        {step.icon && (
                          <div
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${primaryColor}15` }}
                          >
                            <EasyIcon
                              icon={getIconName(step.icon)}
                              size={24}
                              color={primaryColor}
                              className="sm:w-7 sm:h-7 md:w-8 md:h-8"
                            />
                          </div>
                        )}
                        <span className="text-2xl sm:text-3xl font-bold text-gray-300">
                          Step {displayStepNumber}
                        </span>
                      </div>

                      {/* Step Content Items */}
                      {step.content?.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 sm:gap-4 pl-2 sm:pl-4"
                        >
                          <div className="flex-shrink-0">
                            <div
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${primaryColor}10` }}
                            >
                              <EasyIcon
                                icon={getIconName(item.icon) || "FiCircle"}
                                size={18}
                                color={primaryColor}
                                className="sm:w-5 sm:h-5"
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4
                              className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2"
                              style={{
                                color:
                                  data.color_theme?.text_color || "#111827",
                              }}
                            >
                              {item.title}
                            </h4>
                            <p
                              className="text-sm sm:text-base leading-relaxed"
                              style={{
                                color:
                                  data.color_theme?.neutral_color || "#6B7280",
                              }}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }
              )}
            </div>
            {hasMultipleSteps && (
              <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                {section.steps.map((_, index) => (
                  <div
                    key={index}
                    className="h-1.5 sm:h-2 rounded-full transition-all cursor-pointer"
                    style={{
                      width: index === currentStep ? "1.5rem" : "0.5rem",
                      backgroundColor:
                        index === currentStep ? primaryColor : "#D1D5DB",
                    }}
                    onClick={() => setCurrentStep(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
