import React from "react";

const Compare: React.FC = () => {
  const features = [
    {
      label: "📄 Tax Returns",
      essential: true,
      preferred: true,
      premium: true,
    },
    {
      label: "✍️ eSignatures",
      essential: true,
      preferred: true,
      premium: true,
    },
    { label: "⏳ Extensions", essential: true, preferred: true, premium: true },
    {
      label: "😊 Client Experience",
      essential: true,
      preferred: true,
      premium: true,
    },
    {
      label: "🔗 Integrations",
      essential: false,
      preferred: true,
      premium: true,
    },
    {
      label: "📞 Customer Support",
      essential: false,
      preferred: true,
      premium: true,
    },
    {
      label: "🗂️ Organizers",
      essential: false,
      preferred: true,
      premium: true,
    },
    {
      label: "🔒 Secure File Transfer",
      essential: false,
      preferred: false,
      premium: true,
    },
    {
      label: "📋 Document Request Lists",
      essential: false,
      preferred: false,
      premium: true,
    },
    {
      label: "📌 TicTie Calculate PDF Tool",
      essential: false,
      preferred: false,
      premium: true,
    },
    {
      label: "🤖 Next Gen Gather AI",
      essential: false,
      preferred: false,
      premium: true,
    },
    {
      label: "⚙️ API Connections",
      essential: false,
      preferred: false,
      premium: true,
    },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-100 to-white text-center">
      <h2 className="text-4xl font-bold text-blue-800 mb-2">What’s Included</h2>
      <p className="text-xl text-gray-600 mb-8">
        Straightforward and simple pricing packages to address your firm’s needs
      </p>
      <div className="grid grid-cols-4 max-w-4xl mx-auto border border-gray-200 rounded-lg overflow-hidden animate-fadeIn">
        <div className="bg-blue-800 text-white font-bold p-4 border-b border-gray-300">
          Features
        </div>
        <div className="bg-blue-800 text-white font-bold p-4 border-b border-gray-300">
          Essential
        </div>
        <div className="bg-blue-800 text-white font-bold p-4 border-b border-gray-300">
          Preferred
        </div>
        <div className="bg-blue-800 text-white font-bold p-4 border-b border-gray-300">
          Premium
        </div>
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            <div className="text-left font-medium text-blue-700 bg-blue-50 p-4 border-b border-gray-200">
              {feature.label}
            </div>
            <div className="p-4 border-b border-gray-200">
              {feature.essential ? "✅" : ""}
            </div>
            <div className="p-4 border-b border-gray-200">
              {feature.preferred ? "✅" : ""}
            </div>
            <div className="p-4 border-b border-gray-200">
              {feature.premium ? "✅" : ""}
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="mt-8">
        <button className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-primary/80 transition animate-pulse">
          Contact Our Sales Team
        </button>
      </div>
    </section>
  );
};

export default Compare;
