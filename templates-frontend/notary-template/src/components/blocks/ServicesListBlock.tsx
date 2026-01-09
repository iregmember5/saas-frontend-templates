import React from "react";
import type { ServicesListBlock as ServicesListBlockType } from "../../types/wagtail";
import { Clock, DollarSign, ArrowRight, Sparkles } from "lucide-react";

interface ServicesListBlockProps {
  block: ServicesListBlockType;
}

// Helper function to parse description into structured bullet points
const parseDescription = (description: string | undefined): React.ReactNode => {
  if (!description || !description.trim()) {
    return <p className="text-gray-500 italic">No description available</p>;
  }

  // Normalize all line breaks - handle both escaped and literal versions
  let text = description
    .replace(/\\r\\n/g, "\n") // \r\n in API
    .replace(/\\n/g, "\n") // \n in API
    .replace(/\\r/g, "\n") // \r in API
    .replace(/\r\n/g, "\n") // Real CRLF
    .replace(/\r/g, "\n") // Real CR
    .replace(/rn/g, "\n") // Literal 'rn' that slipped through
    .trim();

  // Split by newlines and filter empty lines
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return <p className="text-gray-500 italic">No description available</p>;
  }

  // If single line without bullet markers, return as paragraph
  if (lines.length === 1 && !lines[0].match(/^[\.\-•✅]/)) {
    return <p className="text-gray-600 leading-relaxed">{lines[0]}</p>;
  }

  // Create the content structure
  const content: React.ReactNode[] = [];
  let firstParagraph = true;

  for (const line of lines) {
    // Check if line starts with bullet marker
    const isBullet = /^[\.\-•✅]\s/.test(line);

    // Remove bullet markers (., -, •, etc)
    const cleanedLine = line.replace(/^[\.\-•✅]\s*/, "").trim();

    if (!cleanedLine) continue;

    // First non-bullet line is intro paragraph
    if (firstParagraph && !isBullet) {
      content.push(
        <p
          key={`intro-${content.length}`}
          className="mb-3 text-gray-600 leading-relaxed"
        >
          {cleanedLine}
        </p>
      );
      firstParagraph = false;
    } else {
      // Everything else becomes bullet points
      content.push(
        <div
          key={`bullet-${content.length}`}
          className="flex items-start gap-2 text-gray-600 leading-relaxed"
        >
          <span className="text-theme-primary mt-1 flex-shrink-0 font-bold">
            •
          </span>
          <span>{cleanedLine}</span>
        </div>
      );
    }
  }

  return content.length > 0 ? (
    <div className="space-y-2">{content}</div>
  ) : (
    <p className="text-gray-500 italic">No description available</p>
  );
};

// Parse StructValue string format from API
const parseServiceValue = (service: any) => {
  if (typeof service.value === "string" && service.value.includes("StructValue")) {
    const parsed: any = {};
    const str = service.value;
    
    // Extract each field with flexible quote matching
    const extractField = (fieldName: string) => {
      // Match: 'field': "value" or 'field': 'value' or 'field': \"value\"
      const patterns = [
        new RegExp(`'${fieldName}':\\s*\\\\"([^\\\\"]*(?:\\\\\\\\.[^\\\\"]*)*)\\\\"`),
        new RegExp(`'${fieldName}':\\s*"([^"]*)"`),
        new RegExp(`'${fieldName}':\\s*'([^']*(?:\\\\'[^']*)*)'`)
      ];
      
      for (const pattern of patterns) {
        const match = str.match(pattern);
        if (match && match[1]) {
          return match[1]
            .replace(/\\r\\n/g, '\n')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\n')
            .replace(/\\"/g, '"')
            .replace(/\\'/g, "'");
        }
      }
      return '';
    };
    
    parsed.service_name = extractField('service_name');
    parsed.short_description = extractField('short_description');
    parsed.starting_price = extractField('starting_price');
    parsed.duration = extractField('duration');
    parsed.cta_label = extractField('cta_label');
    parsed.cta_action = extractField('cta_action');
    parsed.cta_target = extractField('cta_target');
    
    return parsed;
  }
  return service.value || service;
};

export const ServicesListBlock: React.FC<ServicesListBlockProps> = ({
  block,
}) => {
  const { value } = block;
  const parsedServices = value.services?.map(parseServiceValue) || [];

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
              // Get description from either field - prioritize short_description
              const description =
                service.short_description || service.description || "";

              // Get CTA label - provide default if empty
              const ctaLabel = service.cta_label?.trim() || "Learn More";
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
                          if (
                            service.cta_action === "url" &&
                            service.cta_target
                          ) {
                            window.open(service.cta_target, "_blank");
                          } else if (service.cta_action === "book") {
                            document
                              .querySelector('[id*="booking"]')
                              ?.scrollIntoView({ behavior: "smooth" });
                          } else if (service.cta_action === "contact") {
                            document
                              .querySelector('[id*="contact"]')
                              ?.scrollIntoView({ behavior: "smooth" });
                          } else {
                            document
                              .querySelector('[id*="contact"], [id*="booking"]')
                              ?.scrollIntoView({ behavior: "smooth" });
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
