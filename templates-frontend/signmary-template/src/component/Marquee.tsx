import React from "react";

const Marquee: React.FC = () => {
  const marqueeItems = [
    "🔐 Bank-level security with full audit trail",
    "⚡ Fast, automated signing workflow",
    "📦 Drag-and-drop document assembly",
    "🤝 Perfect for remote collaboration",
    "🔗 Zapier & Google Drive Integrations",
    "📈 Dashboard for team tracking and insights",
  ];

  return (
    <section className="bg-blue-50 py-4 overflow-hidden">
      <div className="whitespace-nowrap">
        <div className="inline-block animate-scrollMarquee">
          {marqueeItems.map((item, index) => (
            <span
              key={index}
              className="inline-block mx-8 text-xl text-gray-500 font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Marquee;
