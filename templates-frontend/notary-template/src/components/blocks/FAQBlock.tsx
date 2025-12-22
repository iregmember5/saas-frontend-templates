import React, { useState } from 'react';
import type { FAQBlock as FAQBlockType } from '../../types/wagtail';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQBlockProps {
  block: FAQBlockType;
}

export const FAQBlock: React.FC<FAQBlockProps> = ({ block }) => {
  const { value } = block;
  const [openIndex, setOpenIndex] = useState<number | null>(value.expand_first ? 0 : null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-theme-primary/10 rounded-2xl mb-6">
            <HelpCircle className="w-12 h-12 text-theme-primary" />
          </div>
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          {value.category && (
            <p className="text-xl text-gray-600">{value.category}</p>
          )}
        </div>

        <div className="space-y-4">
          {value.faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-theme-primary/30 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-all"
              >
                <span className="text-xl font-bold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 p-2 rounded-full transition-all ${
                  openIndex === index ? 'bg-theme-primary text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {openIndex === index ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-8 pb-6">
                  <div className="pt-4 border-t-2 border-gray-100">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
