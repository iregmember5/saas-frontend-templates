import { useEffect, useRef } from "react";
import type { NotaryPageData } from "../../types/wagtail";

interface PricingBlockProps {
  data: NotaryPageData;
}

export default function PricingBlock({ data }: PricingBlockProps) {
  const pricingSection = data.pricing_section;
  const widgetCode = pricingSection?.widget_code;
  const slug = widgetCode?.match(/slug=([^&'"]+)/)?.[1] || "";
  const containerId = `widget-${slug}`;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) return;
    
    if (containerRef.current) {
      containerRef.current.id = containerId;
      containerRef.current.innerHTML = `
        <div style="
          padding: 60px 20px;
          text-align: center;
          color: #666;
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 18px;
        ">
          Loading pricing widget...
        </div>
      `;
    }

    const script = document.createElement("script");
    script.src = `https://pricing-bundler-green.vercel.app/widget-loader.js?slug=${slug}`;
    script.async = true;

    containerRef.current?.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [slug]);

  if (!slug) return null;

  return (
    <div className="w-full mx-auto max-w-6xl py-16">
      {pricingSection?.heading && (
        <h2 className="text-3xl font-bold text-center mb-4">
          {pricingSection.heading}
        </h2>
      )}
      {pricingSection?.description && (
        <p className="text-center text-gray-600 mb-8">
          {pricingSection.description}
        </p>
      )}
      <div ref={containerRef} />
    </div>
  );
}
