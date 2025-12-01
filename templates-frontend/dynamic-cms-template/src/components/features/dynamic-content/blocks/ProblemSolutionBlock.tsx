import React from "react";
import type { Theme } from "../../../../types/features-page";

interface ProblemSolutionBlockProps {
  value: any;
  theme: Theme;
  getFullImageUrl: (url: string) => string;
}

export const ProblemSolutionBlock: React.FC<ProblemSolutionBlockProps> = ({
  value,
  theme,
  getFullImageUrl,
}) => {
  if (!value) return null;

  return (
    <section className="py-16" style={{ backgroundColor: theme.bgColor }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-red-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">❌</span>
              Problem
            </h3>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: value.problem }}
            />
          </div>
          <div
            className="bg-white p-8 rounded-2xl shadow-lg border-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            style={{ borderColor: theme.accentColor }}
          >
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span className="text-3xl">✅</span>
              Solution
            </h3>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: value.solution }}
            />
          </div>
        </div>
        {value.image && (
          <div className="mt-8 max-w-4xl mx-auto">
            <img
              src={getFullImageUrl(value.image.url)}
              alt="Problem Solution"
              className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            />
          </div>
        )}
      </div>
    </section>
  );
};
