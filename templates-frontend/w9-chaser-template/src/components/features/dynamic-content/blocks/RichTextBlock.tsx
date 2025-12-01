import React from "react";
import type { Theme } from "../../../../types/features-page";

interface RichTextBlockProps {
  value: any;
  theme: Theme;
}

export const RichTextBlock: React.FC<RichTextBlockProps> = ({
  value,
  theme,
}) => {
  if (!value) return null;

  return (
    <section className="py-16" style={{ backgroundColor: theme.bgColor }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div
          className="prose prose-lg max-w-none bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          style={{ color: theme.textColor }}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    </section>
  );
};
