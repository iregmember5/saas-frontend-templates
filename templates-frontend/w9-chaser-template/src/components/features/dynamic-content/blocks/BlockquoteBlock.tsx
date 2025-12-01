import React from "react";
import type { Theme } from "../../../../types/features-page";

interface BlockquoteBlockProps {
  value: any;
  theme: Theme;
}

export const BlockquoteBlock: React.FC<BlockquoteBlockProps> = ({
  value,
  theme,
}) => {
  if (!value) return null;

  return (
    <section
      className="py-16"
      style={{ backgroundColor: `${theme.primaryColor}05` }}
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <blockquote
          className="bg-white p-8 rounded-2xl shadow-lg border-l-4 hover:shadow-xl transition-all duration-300"
          style={{ borderColor: theme.primaryColor }}
        >
          <p
            className="text-2xl italic mb-4"
            style={{ color: theme.textColor }}
          >
            "{value.text}"
          </p>
          {value.author && (
            <footer
              className="text-lg font-semibold"
              style={{ color: theme.primaryColor }}
            >
              — {value.author}
              {value.source && (
                <span
                  className="text-sm ml-2"
                  style={{ color: theme.neutralColor }}
                >
                  ({value.source})
                </span>
              )}
            </footer>
          )}
        </blockquote>
      </div>
    </section>
  );
};
