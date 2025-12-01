import React from "react";
import type { Theme } from "../../../../types/features-page";

/* eslint-disable @typescript-eslint/no-unused-vars */

interface CardGridBlockProps {
  value: any;
  theme: Theme;
  getFullImageUrl: (url: string) => string;
}

export const CardGridBlock: React.FC<CardGridBlockProps> = ({
  value,
  theme: _theme,
  getFullImageUrl,
}) => {
  if (!value || !value.cards) return null;

  const columns = parseInt(value.columns) || 3;
  const gridCols =
    {
      1: "grid-cols-1",
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-4",
    }[columns] || "md:grid-cols-3";

  return (
    <section className="py-16 bg-theme-background">
      <div className="container mx-auto px-4">
        {value.heading && (
          <h2 className="text-4xl font-bold text-center mb-4 text-theme-text">
            {value.heading}
          </h2>
        )}
        {value.subheading && (
          <p className="text-xl text-center mb-12 text-theme-neutral">
            {value.subheading}
          </p>
        )}

        <div className={`grid ${gridCols} gap-6`}>
          {value.cards.map((card: any, idx: number) => {
            const getCardImage = () => {
              if (card.card_content?.card_image) {
                const img = card.card_content.card_image;
                if (typeof img === "string") return img;
                if (img?.url) return getFullImageUrl(img.url);
              }
              return null;
            };

            const cardImageUrl = getCardImage();

            return (
              <div
                key={idx}
                className="bg-theme-background rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
              >
                {cardImageUrl && (
                  <img
                    src={cardImageUrl}
                    alt={card.custom_title || card.card_content?.title || ""}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-theme-text">
                    {card.custom_title || card.card_content?.title}
                  </h3>
                  <p className="text-theme-neutral">
                    {card.custom_description ||
                      card.card_content?.description ||
                      ""}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
