import React from "react";
import type { FAQItem, Theme } from "../../../types/features-page";

/* eslint-disable @typescript-eslint/no-unused-vars */

interface FAQSectionProps {
  faqs: FAQItem[];
  theme: Theme;
  heading?: string;
  description?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,

  heading,
  description,
}) => {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section
      className="py-16 sm:py-24"
      style={{ backgroundColor: "var(--background-color)" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          {heading && (
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 animate-fadeInUp"
              style={{ color: "var(--text-color)" }}
            >
              {heading}
            </h2>
          )}
          {description && (
            <p
              className="text-xl animate-fadeInUp animation-delay-200"
              style={{ color: "var(--neutral-color)" }}
            >
              {description}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.id}
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <summary
                className="px-6 py-4 cursor-pointer font-semibold text-lg flex justify-between items-center hover:bg-gray-50 transition-colors group-hover:translate-x-2 duration-300"
                style={{ color: "var(--text-color)" }}
              >
                {faq.question}
                <span
                  className="text-2xl group-open:rotate-180 transition-transform duration-300 group-hover:scale-125"
                  style={{ color: "var(--primary-color)" }}
                >
                  ▼
                </span>
              </summary>
              <div
                className="px-6 py-4 border-t transform origin-top transition-all duration-300"
                style={{ color: "var(--neutral-color)" }}
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
