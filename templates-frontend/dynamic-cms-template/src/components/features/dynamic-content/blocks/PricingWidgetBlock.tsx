import React from "react";
import type { Theme } from "../../../../types/features-page";

interface PricingWidgetBlockProps {
  value: any;
  theme: Theme;
}

export const PricingWidgetBlock: React.FC<PricingWidgetBlockProps> = ({
  value,
  theme,
}) => {
  if (!value || !value.widget_code) return null;

  return (
    <section className="py-16" style={{ backgroundColor: theme.bgColor }}>
      <div className="container mx-auto px-4">
        {value.description && (
          <p
            className="text-xl text-center mb-8"
            style={{ color: theme.neutralColor }}
          >
            {value.description}
          </p>
        )}
        <div dangerouslySetInnerHTML={{ __html: value.widget_code }} />
      </div>
    </section>
  );
};
