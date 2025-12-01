import React, { useState } from "react";
import type { LandingPageData } from "../../types/landing";
import EasyIcon from "./IconRenderer"; // Add this import

interface FAQProps {
  data: LandingPageData;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
  order: number;
  is_active?: boolean;
}

const FAQ: React.FC<FAQProps> = ({ data }) => {
  console.log("🔍 FAQ Component - Full Data:", data);
  console.log("🔍 FAQ Section Data:", data.faq_section);
  console.log("🔍 FAQ Items:", data.faq_section?.faqs);

  // Extract FAQ data directly from the API structure
  const faqSection = data.faq_section;

  const heading = faqSection?.heading || "Frequently Asked Questions";
  const introduction = faqSection?.introduction || "";
  const faqItems: FAQItem[] = faqSection?.faqs || [];

  console.log("🔍 Processed FAQ Data:", {
    heading,
    introduction,
    faqItemsCount: faqItems.length,
    faqItems,
  });

  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Check if we have FAQ items to display
  if (!faqItems || faqItems.length === 0) {
    console.log("❌ No FAQ items found, returning null");
    return null;
  }

  console.log("✅ FAQ items found, rendering component");

  // Extract unique categories
  const categories = [
    "all",
    ...new Set(
      faqItems
        .map((item) => item.category)
        .filter((category): category is string =>
          Boolean(category && category.trim() !== "")
        )
    ),
  ];

  console.log("📂 Categories:", categories);

  // Filter FAQs by category
  const filteredFaqs =
    activeCategory === "all"
      ? faqItems
      : faqItems.filter((item) => item.category === activeCategory);

  const toggleItem = (id: number) => {
    // If the clicked item is already open → close all
    if (openItems.has(id)) {
      setOpenItems(new Set());
    } else {
      // Otherwise open ONLY that one
      setOpenItems(new Set([id]));
    }
  };

  const toggleAll = () => {
    if (openItems.size === filteredFaqs.length) {
      setOpenItems(new Set());
    } else {
      setOpenItems(new Set(filteredFaqs.map((item) => item.id)));
    }
  };

  const primaryColor = data.color_theme?.primary_color || "#3b82f6";
  const neutralColor = data.color_theme?.neutral_color || "#6b7280";
  const backgroundColor = data.color_theme?.background_color || "#ffffff";
  const textColor = data.color_theme?.text_color || "#1f2937";

  return (
    <section
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4" style={{ color: textColor }}>
            {heading}
          </h2>
          {introduction && (
            <p
              className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl mx-auto"
              style={{ color: textColor }}
            >
              {introduction}
            </p>
          )}
        </div>

        {/* Category Filter - Only show if we have multiple categories */}
        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  activeCategory === category ? "text-white" : "bg-opacity-20"
                }`}
                style={{
                  backgroundColor:
                    activeCategory === category
                      ? primaryColor
                      : `${primaryColor}20`,
                  color: activeCategory === category ? "white" : primaryColor,
                }}
              >
                {category === "all" ? (
                  <>
                    <EasyIcon icon="FiList" size={16} color="currentColor" />
                    All Questions
                  </>
                ) : (
                  <>
                    <EasyIcon icon="FiFolder" size={16} color="currentColor" />
                    {category}
                  </>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Expand/Collapse All */}
        {filteredFaqs.length > 1 && (
          <div className="flex justify-end mb-3 sm:mb-4">
            <button
              onClick={toggleAll}
              className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium hover:underline transition-colors duration-200"
              style={{ color: primaryColor }}
            >
              {openItems.size === filteredFaqs.length ? (
                <>
                  <EasyIcon
                    icon="FiMinusSquare"
                    size={16}
                    color={primaryColor}
                  />
                  Collapse All
                </>
              ) : (
                <>
                  <EasyIcon
                    icon="FiPlusSquare"
                    size={16}
                    color={primaryColor}
                  />
                  Expand All
                </>
              )}
            </button>
          </div>
        )}

        {/* FAQ Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 items-start">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="rounded-2xl transition-all duration-200 border-2"
              style={{
                backgroundColor: openItems.has(faq.id) ? "#ffffff" : "#f8f9fa",
                borderColor: openItems.has(faq.id) ? primaryColor : `${neutralColor}40`,
              }}
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full text-left p-4 sm:p-5 md:p-6 flex justify-between items-center transition-all duration-200"
                style={{
                  color: textColor,
                  outline: "none",
                }}
              >
                <h3
                  className="text-sm sm:text-base font-medium pr-3 sm:pr-4"
                  style={{ color: "#1f2937" }}
                >
                  {faq.question}
                </h3>
                <div
                  className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-transform duration-200"
                  style={{
                    backgroundColor: primaryColor,
                    transform: openItems.has(faq.id)
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  }}
                >
                  <EasyIcon icon="FiChevronDown" size={20} color="#ffffff" />
                </div>
              </button>

              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openItems.has(faq.id) ? "500px" : "0",
                }}
              >
                <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                  <div
                    className="text-xs sm:text-sm leading-relaxed"
                    style={{ color: "#4b5563" }}
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />

                  {faq.category && faq.category.trim() !== "" && (
                    <div className="mt-3 sm:mt-4">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full"
                        style={{
                          backgroundColor: `${primaryColor}20`,
                          color: primaryColor,
                        }}
                      >
                        <EasyIcon icon="FiTag" size={12} color={primaryColor} />
                        {faq.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
