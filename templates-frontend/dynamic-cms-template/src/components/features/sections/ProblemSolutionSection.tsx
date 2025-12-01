import React from "react";
import type { FeaturesPageData, Theme } from "../../../types/features-page";
import { getFullImageUrl } from "../utils/imageUtils";

/* eslint-disable @typescript-eslint/no-unused-vars */

interface ProblemSolutionSectionProps {
  data: FeaturesPageData;
  theme: Theme;
}

export const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({
  data,
}) => {
  if (!data.problem_description && !data.solution_description) return null;

  return (
    <section
      className="py-16 sm:py-24"
      style={{ backgroundColor: "var(--background-color)" }}
    >
      <style>{`
        .solution-border { border-color: var(--accent-color); }
        .solution-bg { background-color: color-mix(in srgb, var(--accent-color) 20%, transparent); }
      `}</style>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 animate-fadeInUp"
            style={{ color: "var(--text-color)" }}
          >
            {data.problem_solution_heading || "Problem & Solution"}
          </h2>
          {data.problem_solution_description && (
            <p
              className="text-xl max-w-3xl mx-auto animate-fadeInUp animation-delay-200"
              style={{ color: "var(--neutral-color)" }}
            >
              {data.problem_solution_description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {data.problem_description && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideInLeft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-2xl">❌</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  The Problem
                </h3>
              </div>
              <div
                className="prose prose-lg"
                style={{ color: "var(--neutral-color)" }}
                dangerouslySetInnerHTML={{ __html: data.problem_description }}
              />
            </div>
          )}

          {data.solution_description && (
            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideInRight solution-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center solution-bg">
                  <span className="text-2xl">✅</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Our Solution
                </h3>
              </div>
              <div
                className="prose prose-lg"
                style={{ color: "var(--neutral-color)" }}
                dangerouslySetInnerHTML={{ __html: data.solution_description }}
              />
            </div>
          )}
        </div>

        {data.problem_solution_image && (
          <div className="mt-12 max-w-4xl mx-auto animate-fadeInUp">
            <img
              src={getFullImageUrl(data.problem_solution_image.url)}
              alt={data.problem_solution_image.title}
              className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            />
          </div>
        )}
      </div>
    </section>
  );
};
