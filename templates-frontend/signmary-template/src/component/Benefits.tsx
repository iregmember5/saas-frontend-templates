// Benefits Component with dynamic data
import React from "react";
import type { SectionProps, BenefitItem } from "../component/types";

// Benefits Component
const Benefits: React.FC<SectionProps> = ({ data }) => {
  const defaultBenefits: BenefitItem[] = [
    {
      title: "Secure & Legally Compliant eSignatures",
      description:
        "Send and collect legally binding signatures in seconds. My Powerly ensures every document meets international security standards.",
      icon: "🔒",
      stats: "99.9% Uptime",
    },
    {
      title: "Seamless Team Collaboration",
      description:
        "Manage roles, permissions, and workflows across your entire team.",
      icon: "👥",
      stats: "50% Faster Processing",
    },
    {
      title: "Global Integration Network",
      description: "Connect My Powerly with 5,000+ tools using Zapier.",
      icon: "🌐",
      stats: "5,000+ Integrations",
    },
  ];

  const benefits = data?.benefits?.length ? data.benefits : defaultBenefits;

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            {data?.benefits_head || "Why Choose Us?"}
          </h2>
          <p className="text-xl text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
            {data?.benefits_introduction ||
              "Built for professionals who demand excellence"}
          </p>
        </div>

        <div className="space-y-20">
          {benefits.map((benefit: BenefitItem, index: number) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1 lg:max-w-md">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-transparent dark:border-slate-700">
                  <div className="text-5xl mb-4">{benefit.icon}</div>
                  <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {benefit.stats}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-8 h-80 flex items-center justify-center border border-transparent dark:border-slate-700">
                  <div className="text-6xl text-blue-600/20 dark:text-blue-400/30">
                    📊
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
