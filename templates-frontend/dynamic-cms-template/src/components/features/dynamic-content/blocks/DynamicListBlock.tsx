import React from "react";
import type { Theme } from "../../../../types/features-page";
import EasyIcon from "../../../landingpage/IconRenderer";

interface DynamicListBlockProps {
  value: any;
  theme: Theme;
  getFullImageUrl: (url: string) => string;
}

export const DynamicListBlock: React.FC<DynamicListBlockProps> = ({
  value,
  theme,
  getFullImageUrl,
}) => {
  if (!value || !value.items) return null;

  return (
    <section
      className="py-16"
      style={{ backgroundColor: `${theme.primaryColor}05` }}
    >
      <div className="container mx-auto px-4">
        {value.heading && (
          <h2
            className="text-4xl font-bold text-center mb-4"
            style={{ color: theme.textColor }}
          >
            {value.heading}
          </h2>
        )}
        {value.description && (
          <p
            className="text-xl text-center mb-12"
            style={{ color: theme.neutralColor }}
          >
            {value.description}
          </p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {value.items.map((item: any, idx: number) => {
            if (item.type === "feature") {
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
                >
                  {item.value.icon && (
                    <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                      <EasyIcon icon={item.value.icon} size={32} color={theme.primaryColor} />
                    </div>
                  )}
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: theme.textColor }}
                  >
                    {item.value.title}
                  </h3>
                  <p style={{ color: theme.neutralColor }}>
                    {item.value.description}
                  </p>
                </div>
              );
            }

            if (item.type === "benefit") {
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
                >
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: theme.textColor }}
                  >
                    {item.value.title}
                  </h3>
                  {item.value.stat && (
                    <div
                      className="text-3xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300"
                      style={{ color: theme.primaryColor }}
                    >
                      {item.value.stat}
                    </div>
                  )}
                  <p style={{ color: theme.neutralColor }}>
                    {item.value.description}
                  </p>
                </div>
              );
            }

            if (item.type === "custom_item") {
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
                >
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: theme.textColor }}
                  >
                    {item.value.title}
                  </h3>
                  {item.value.image && (
                    <img
                      src={getFullImageUrl(item.value.image.url)}
                      alt={item.value.title}
                      className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div
                    className="prose"
                    style={{ color: theme.neutralColor }}
                    dangerouslySetInnerHTML={{ __html: item.value.content }}
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </section>
  );
};
