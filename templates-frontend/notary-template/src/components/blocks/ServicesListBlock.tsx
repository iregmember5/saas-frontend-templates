import React from "react";
import type { ServicesListBlock as ServicesListBlockType } from "../../types/wagtail";
import { Clock, DollarSign, ArrowRight, Sparkles } from "lucide-react";

interface ServicesListBlockProps {
  block: ServicesListBlockType;
}

// Helper function to parse description into structured bullet points
const parseDescription = (description: string | undefined): React.ReactNode => {
  if (!description) return null;

  // Normalize line breaks and clean the text
  const cleanText = description
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();

  // Split by newlines first
  const lines = cleanText.split("\n").filter((line) => line.trim());

  // If we have multiple lines, treat each as a potential bullet point
  if (lines.length > 1) {
    return (
      <div className="space-y-2">
        {lines.map((line, i) => {
          const trimmedLine = line.trim();
          if (!trimmedLine) return null;

          // Check if line already has a bullet marker
          if (
            trimmedLine.startsWith("•") ||
            trimmedLine.startsWith("-") ||
            trimmedLine.startsWith(".") ||
            trimmedLine.startsWith("✅")
          ) {
            const cleanLine = trimmedLine.replace(/^[•\-\.✅]\s*/, "").trim();
            return (
              <div key={i} className="flex items-start gap-2">
                <span className="text-theme-primary mt-1 flex-shrink-0">•</span>
                <span>{cleanLine}</span>
              </div>
            );
          }

          // First line is usually intro text
          if (i === 0) {
            return (
              <p key={i} className="mb-2">
                {trimmedLine}
              </p>
            );
          }

          // Subsequent lines as bullet points
          return (
            <div key={i} className="flex items-start gap-2">
              <span className="text-theme-primary mt-1 flex-shrink-0">•</span>
              <span>{trimmedLine}</span>
            </div>
          );
        })}
      </div>
    );
  }

  // Single block of text - split by sentences for better readability
  const sentences = cleanText
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim())
    .map((s) => s.trim());

  if (sentences.length <= 1) {
    return <p>{cleanText}</p>;
  }

  // First sentence as intro, rest as bullet points
  return (
    <div className="space-y-2">
      <p className="mb-2">{sentences[0]}</p>
      {sentences.slice(1).map((sentence, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-theme-primary mt-1 flex-shrink-0">•</span>
          <span>{sentence}</span>
        </div>
      ))}
    </div>
  );
};

// Parse StructValue string format from API
const parseServiceValue = (service: any) => {
  if (typeof service.value === 'string' && service.value.startsWith('StructValue')) {
    const match = service.value.match(/\{([^}]+)\}/);
    if (match) {
      const pairs = match[1].split("', '");
      const parsed: any = {};
      pairs.forEach((pair: string) => {
        const [key, val] = pair.split("': '");
        const cleanKey = key.replace(/^'/, '');
        const cleanVal = val?.replace(/'$/, '') || '';
        parsed[cleanKey] = cleanVal;
      });
      return parsed;
    }
  }
  return service.value || service;
};

export const ServicesListBlock: React.FC<ServicesListBlockProps> = ({
  block,
}) => {
  const { value } = block;
  const parsedServices = value.services?.map(parseServiceValue) || [];

  console.log("ServicesListBlock - services:", parsedServices);

  return (
    <section id={block.id} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            Notary Services
          </h2>
          <p className="text-xl text-gray-600">
            Professional, certified, and convenient
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {parsedServices && parsedServices.length > 0 ? (
            parsedServices.map((service, index) => {
              // Get description from either field
              const description =
                service.short_description || service.description || "";
              // Get CTA label - provide default if empty
              const ctaLabel = service.cta_label || "Learn More";
              // Check if we should show the button (show if there's any label)
              const showButton = Boolean(ctaLabel);

              return (
                <div
                  key={service.service_name || index}
                  data-service-name={service.service_name}
                  className={`group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 flex flex-col ${
                    service.is_popular
                      ? "border-theme-accent shadow-xl scale-105"
                      : "border-gray-200 hover:border-theme-primary"
                  }`}
                >
                  {service.is_popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="flex items-center gap-2 bg-gradient-to-r from-theme-accent to-orange-500 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg">
                        <Sparkles className="w-4 h-4" />
                        POPULAR
                      </div>
                    </div>
                  )}

                  <h3 className="text-2xl font-black text-gray-900 mb-4 mt-2">
                    {service.service_name || "Service"}
                  </h3>

                  <div className="text-gray-600 mb-6 leading-relaxed flex-grow">
                    {parseDescription(description)}
                  </div>

                  <div className="space-y-3 mb-8">
                    {service.starting_price && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="font-bold text-gray-900">
                          Starting at {service.starting_price}
                        </span>
                      </div>
                    )}

                    {service.duration && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Clock className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-gray-600">
                          {service.duration}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto">
                    {showButton && (
                      <button
                        className="group/btn w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-theme-primary to-theme-secondary text-white rounded-xl font-bold hover:shadow-xl transition-all"
                        onClick={() => {
                          // Handle different CTA actions
                          if (
                            service.cta_action === "url" &&
                            service.cta_target
                          ) {
                            window.open(service.cta_target, "_blank");
                          } else if (service.cta_action === "book") {
                            // Scroll to booking section or trigger booking modal
                            const bookingSection =
                              document.querySelector('[id*="booking"]');
                            bookingSection?.scrollIntoView({
                              behavior: "smooth",
                            });
                          } else if (service.cta_action === "contact") {
                            // Scroll to contact section
                            const contactSection =
                              document.querySelector('[id*="contact"]');
                            contactSection?.scrollIntoView({
                              behavior: "smooth",
                            });
                          } else {
                            // Default: scroll to contact or do nothing
                            const contactSection = document.querySelector(
                              '[id*="contact"], [id*="booking"]'
                            );
                            contactSection?.scrollIntoView({
                              behavior: "smooth",
                            });
                          }
                        }}
                      >
                        {ctaLabel}
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No services available
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
