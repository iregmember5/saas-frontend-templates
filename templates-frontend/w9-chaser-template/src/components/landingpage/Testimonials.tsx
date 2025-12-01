import React from "react";
import type { LandingPageData } from "../../types/landing";

interface TestimonialsProps {
  data: LandingPageData;
}

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  photo: string | null;
  order: number;
}

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  const {
    testimonials_head,
    testimonials_introduction,
    testimonials,
    color_theme,
  } = data;

  // Only hide if there's absolutely no content
  if (
    !testimonials_head &&
    !testimonials_introduction &&
    (!testimonials || testimonials.length === 0)
  ) {
    return null;
  }

  const primaryColor = color_theme?.primary_color || "#3B82F6";
  const accentColor = color_theme?.accent_color || "#10B981";
  const textColor = color_theme?.text_color || "#1F2937";
  const neutralColor = color_theme?.neutral_color || "#6B7280";
  const bgColor = color_theme?.background_color || "#FFFFFF";

  // Sample testimonials for when the array is empty
  const sampleTestimonials: Testimonial[] = [
    {
      id: 1,
      quote:
        "This platform has completely transformed how we handle tax forms. The efficiency and accuracy are unmatched!",
      name: "Sarah Johnson",
      title: "Tax Manager",
      company: "Financial Solutions Inc.",
      photo: null,
      order: 1,
    },
    {
      id: 2,
      quote:
        "As a tax professional, I appreciate the attention to detail and IRS compliance features. It saves us hours of work each week.",
      name: "Michael Chen",
      title: "CPA",
      company: "Chen & Associates",
      photo: null,
      order: 2,
    },
    {
      id: 3,
      quote:
        "The user-friendly interface combined with powerful features makes this the best tax form solution we've ever used.",
      name: "Emily Rodriguez",
      title: "Tax Consultant",
      company: "QuickTax Pro",
      photo: null,
      order: 3,
    },
  ];

  const displayTestimonials =
    testimonials && testimonials.length > 0 ? testimonials : sampleTestimonials;

  const gradientBg = `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`;

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section
      className="py-12 sm:py-16 md:py-20 relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
      aria-labelledby="testimonials-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full"
          style={{ background: gradientBg }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full"
          style={{ background: gradientBg }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto">
          {testimonials_head && (
            <div className="relative inline-block mb-4">
              <h2
                id="testimonials-heading"
                className="text-2xl sm:text-3xl md:text-4xl font-bold relative z-10"
                style={{ color: textColor }}
              >
                {testimonials_head}
              </h2>
              <div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 sm:h-1 rounded-full w-16 sm:w-20"
                style={{ background: gradientBg }}
              />
            </div>
          )}

          {testimonials_introduction && (
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed text-balance"
              style={{ color: neutralColor }}
            >
              {testimonials_introduction}
            </p>
          )}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative p-4 sm:p-5 md:p-6 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden border"
              style={{
                borderColor: `${primaryColor}15`,
              }}
            >
              {/* Gradient overlay on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
                style={{ background: gradientBg }}
              />

              {/* Quote Icon */}
              <div
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-3xl sm:text-4xl opacity-10 font-serif select-none"
                style={{ color: primaryColor }}
                aria-hidden="true"
              >
                "
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Quote */}
                <blockquote className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 italic text-pretty">
                  <span style={{ color: textColor }}>
                    "{testimonial.quote}"
                  </span>
                </blockquote>

                {/* Author Info */}
                <div
                  className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t"
                  style={{ borderColor: `${primaryColor}20` }}
                >
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0 shadow-md"
                    style={{ background: gradientBg }}
                    aria-hidden="true"
                  >
                    {getInitials(testimonial.name)}
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <p
                      className="font-bold text-xs sm:text-sm truncate"
                      style={{ color: textColor }}
                    >
                      {testimonial.name}
                    </p>
                    <p
                      className="text-[10px] sm:text-xs truncate"
                      style={{ color: neutralColor }}
                    >
                      {testimonial.title}
                    </p>
                    <p
                      className="text-[10px] sm:text-xs font-semibold truncate"
                      style={{ color: accentColor }}
                    >
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Animated corner accent */}
              <div
                className="absolute bottom-0 right-0 w-0 h-0.5 group-hover:w-16 transition-all duration-500"
                style={{ background: gradientBg }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        {/* Call to add testimonials */}
        {(!testimonials || testimonials.length === 0) && (
          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6" style={{ color: neutralColor }}>
              Have experience with our platform? We'd love to hear from you!
            </p>
            <button
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
              style={{
                backgroundColor: primaryColor,
                color: "#FFFFFF",
              }}
            >
              Share Your Experience
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
