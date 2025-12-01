import React from "react";
import type { CardContent, Theme } from "../../../types/features-page";
import { getFullImageUrl } from "../utils/imageUtils";

/* eslint-disable @typescript-eslint/no-unused-vars */

interface CardSectionsProps {
  cards: CardContent[];
  theme: Theme;
  heading?: string;
  description?: string;
}

export const CardSections: React.FC<CardSectionsProps> = ({
  cards,

  heading,
  description,
}) => {
  if (!cards || cards.length === 0) return null;

  return (
    <section
      className="py-16 sm:py-24"
      style={{ backgroundColor: "var(--background-color)" }}
    >
      <style>{`
        .card-button-gradient { background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%); }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              className="text-xl max-w-3xl mx-auto animate-fadeInUp animation-delay-200"
              style={{ color: "var(--neutral-color)" }}
            >
              {description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {card.card_image && (
                <img
                  src={getFullImageUrl(card.card_image.url)}
                  alt={card.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              )}
              <div className="p-6">
                <h3
                  className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300"
                  style={{ color: "var(--text-color)" }}
                >
                  {card.title}
                </h3>
                {card.subtitle && (
                  <p
                    className="text-lg mb-3 group-hover:translate-x-1 transition-transform duration-300"
                    style={{ color: "var(--primary-color)" }}
                  >
                    {card.subtitle}
                  </p>
                )}
                <p
                  className="mb-4 group-hover:translate-x-1 transition-transform duration-300"
                  style={{ color: "var(--neutral-color)" }}
                >
                  {card.description}
                </p>
                {card.button_text && (
                  <a
                    href={card.button_url || "#"}
                    className="inline-block px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg card-button-gradient"
                    {...(!card.button_url && { onClick: (e) => e.preventDefault() })}
                  >
                    {card.button_text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
