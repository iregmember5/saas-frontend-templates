import { useEffect, useRef } from "react";
import type { LandingPageData } from "../../types/landing";

export default function Pricing({ data }: { data: LandingPageData }) {
  const widgetCode = data.pricing_section?.widget_code;
  const slug =
    widgetCode?.match(/slug=([^&'"]+)/)?.[1] || "untitled-pricing-table-82";
  const containerId = `widget-${slug}`;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create the container with the exact ID the loader expects
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

    // Create and inject the loader script
    const script = document.createElement("script");
    script.src = `https://pricing-bundler-green.vercel.app/widget-loader.js?slug=${slug}`;
    script.async = true;

    // Important: Append script to the container or after it so currentScript works better
    containerRef.current?.appendChild(script);

    // Cleanup
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [slug]);

  return (
    <div id="pricing" className="w-full mx-auto max-w-6xl">
      {data.pricing_section?.heading && (
        <h2 className="text-3xl font-bold text-center mb-4">
          {data.pricing_section.heading}
        </h2>
      )}
      {data.pricing_section?.description && (
        <p className="text-center text-gray-600 mb-8">
          {data.pricing_section.description}
        </p>
      )}
      {/* This div will get the correct ID and the widget will render inside it */}
      <div ref={containerRef} />
    </div>
  );
}
