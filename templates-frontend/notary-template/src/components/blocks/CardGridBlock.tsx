import React from 'react';

interface Card {
  custom_title: string;
  custom_description: string;
  card_content: string | null;
  card_icon: string;
  card_image: string | null;
  card_background: string | null;
}

interface CardGridBlock {
  type: 'card_grid';
  value: {
    heading: string;
    subheading: string;
    columns: string;
    cards: Card[];
  };
  id: string;
}

interface CardGridBlockProps {
  block: CardGridBlock;
}

export const CardGridBlock: React.FC<CardGridBlockProps> = ({ block }) => {
  const { value } = block;
  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
  }[value.columns] || 'md:grid-cols-3';

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {value.heading && (
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">
            {value.heading}
          </h2>
        )}
        {value.subheading && (
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            {value.subheading}
          </p>
        )}

        <div className={`grid grid-cols-1 ${gridCols} gap-8`}>
          {value.cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 to-theme-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {card.custom_title}
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {card.custom_description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
