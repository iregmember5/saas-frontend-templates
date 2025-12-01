import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EasyIcon from "./IconRenderer";

const API_BASE_URL = "https://esign-admin.signmary.com";

const getFullImageUrl = (url: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `${API_BASE_URL}${url}`;
};

interface ProblemSolutionProps {
  data?: {
    heading?: string;
    introduction?: string;
    items?: Array<{
      name?: string;
      status_heading?: string;
      status_description?: string;
      image?: {
        url: string;
        title?: string;
      };
      background_image?: any;
      icon_text_pairs?: Array<{
        icon?: string;
        text?: string;
      }>;
    }>;
    background_image?: any;
    color_theme?: {
      primary_color?: string;
      secondary_color?: string;
      background_color?: string;
      text_color?: string;
      neutral_color?: string;
    };
  };
}

const MarketingProblemSolution = ({ data }: ProblemSolutionProps) => {
  const primaryColor = data?.color_theme?.primary_color || "#3B82F6";
  const secondaryColor = data?.color_theme?.secondary_color || "#1E40AF";

  const personas =
    data?.items?.map((item, index) => ({
      id: item.name?.toLowerCase().replace(/\s+/g, "-") || `persona-${index}`,
      title: item.name || "",
      statusHeading: item.status_heading || "",
      statusDescription: item.status_description?.replace(/<[^>]*>/g, "") || "",
      image: item.image ? getFullImageUrl(item.image.url) : null,
      iconTextPairs: item.icon_text_pairs || [],
    })) || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

  // Calculate which personas to show (always show 3, with current in middle when possible)
  const getVisiblePersonas = () => {
    if (personas.length <= visibleCount) {
      return personas;
    }

    const start = Math.max(
      0,
      Math.min(currentIndex - 1, personas.length - visibleCount)
    );
    return personas.slice(start, start + visibleCount);
  };

  const visiblePersonas = getVisiblePersonas();

  // Find which position the current persona is at in the visible array
  const currentPersonaInVisible = visiblePersonas.findIndex(
    (p) => p.id === personas[currentIndex]?.id
  );
  const selectedPersona = personas[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(personas.length - 1, prev + 1));
  };

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < personas.length - 1;

  return (
    <div className="min-h-screen" style={{ backgroundColor: data?.color_theme?.background_color || "#F9FAFB" }}>
      {/* Header Section */}
      <div
        className="py-12 sm:py-14 md:py-16 px-4"
        style={{
          backgroundColor: data?.color_theme?.background_color || "#FFFFFF",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
            {data?.heading || "Who are you, and what's slowing you down?"}
          </h1>

          {/* Persona Selection */}
          <div className="relative flex justify-center items-center px-4 sm:px-0">
            {/* Left Navigation Button */}
            <button
              onClick={handlePrevious}
              disabled={!canGoPrevious}
              className={`absolute left-0 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
                !canGoPrevious
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:shadow-xl"
              }`}
              style={{
                ...(canGoPrevious && { backgroundColor: `${primaryColor}10` }),
              }}
            >
              <ChevronLeft
                className="w-6 h-6"
                style={{ color: primaryColor }}
              />
            </button>

            {/* Personas */}
            <div className="flex justify-center items-end gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
              {visiblePersonas.map((persona, index) => {
                const isSelected = index === currentPersonaInVisible;
                const actualIndex = personas.findIndex(
                  (p) => p.id === persona.id
                );

                return (
                  <div
                    key={persona.id}
                    className="flex flex-col items-center transition-all duration-300 cursor-pointer"
                    onClick={() => setCurrentIndex(actualIndex)}
                  >
                    <div
                      className={`relative rounded-full transition-all duration-300 ${
                        isSelected
                          ? "w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 mb-3 sm:mb-4"
                          : "w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mb-2 opacity-40 grayscale"
                      }`}
                    >
                      <div
                        className="absolute inset-0 rounded-full p-1"
                        style={{
                          background: isSelected
                            ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                            : "#E5E7EB",
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                          <div
                            className={`rounded-full ${
                              isSelected ? "w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36" : "w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28"
                            } flex items-center justify-center overflow-hidden bg-gray-100`}
                          >
                            {persona.image ? (
                              <img
                                src={persona.image}
                                alt={persona.title}
                                className="w-full h-full object-cover"
                                onError={() => {
                                  console.error(
                                    "Image failed to load:",
                                    persona.image
                                  );
                                }}
                              />
                            ) : (
                              <div
                                className={`${
                                  isSelected ? "w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32" : "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                                } rounded-full flex items-center justify-center`}
                                style={{ backgroundColor: primaryColor }}
                              >
                                <div className="text-white text-lg sm:text-xl md:text-2xl font-bold">
                                  {persona.title?.charAt(0) || "?"}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p
                      className="text-xs sm:text-sm font-medium transition-all"
                      style={{
                        color: isSelected ? primaryColor : "#9CA3AF",
                        fontSize: isSelected ? "0.875rem" : "0.75rem",
                      }}
                    >
                      {persona.title}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right Navigation Button */}
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className={`absolute right-0 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
                !canGoNext ? "opacity-30 cursor-not-allowed" : "hover:shadow-xl"
              }`}
              style={{
                ...(canGoNext && { backgroundColor: `${primaryColor}10` }),
              }}
            >
              <ChevronRight
                className="w-6 h-6"
                style={{ color: primaryColor }}
              />
            </button>
          </div>

          {/* Progress Indicator */}
          {personas.length > 1 && (
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              {personas.map((_, index) => (
                <div
                  key={index}
                  className="h-1.5 sm:h-2 rounded-full transition-all"
                  style={{
                    width: index === currentIndex ? "1.5rem" : "0.5rem",
                    backgroundColor:
                      index === currentIndex ? primaryColor : "#D1D5DB",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Problem-Solution Section */}
      {selectedPersona &&
        selectedPersona.iconTextPairs &&
        selectedPersona.iconTextPairs.length > 0 && (
          <div className="max-w-5xl mx-auto px-4 py-4 sm:py-5">
            <div
              className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12 border-2 transition-all duration-300"
              style={{ borderColor: primaryColor }}
            >
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
                {/* Left Side - Status Header */}
                <div className="w-full lg:w-1/2">
                  <h2 className="mb-6 sm:mb-8">
                    <span
                      className="text-xl sm:text-2xl md:text-3xl font-bold block mb-2"
                      style={{ color: primaryColor }}
                    >
                      {selectedPersona.statusHeading}
                    </span>
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                      {selectedPersona.statusDescription}
                    </span>
                  </h2>
                </div>

                {/* Right Side - Icon Text Pairs */}
                <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5 md:space-y-6">
                  {selectedPersona.iconTextPairs.map(
                    (pair: any, index: number) => {
                      const iconName = pair.icon?.split("/").pop() || "";
                      const itemColor = index === 0 ? "#EF4444" : "#10B981";
                      return (
                        <div key={index} className="flex items-start gap-3 sm:gap-4">
                          <div
                            className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${itemColor}15` }}
                          >
                            <EasyIcon
                              icon={iconName}
                              size={20}
                              color={itemColor}
                              className="sm:w-6 sm:h-6"
                            />
                          </div>
                          <div>
                            <p
                              className="text-sm sm:text-base font-semibold mb-1"
                              style={{ color: itemColor }}
                            >
                              {pair.text}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default MarketingProblemSolution;
