import React from "react";

export const LoadingState: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--primary-color, #3B82F6) 5%, white) 0%, white 50%, color-mix(in srgb, var(--accent-color, #10B981) 5%, white) 100%)" }}>
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-20 w-20 border-4 border-solid mb-4" style={{ borderColor: "var(--primary-color, #3B82F6)", borderTopColor: "transparent" }}></div>
      <p className="text-xl font-medium" style={{ color: "var(--neutral-color, #6B7280)" }}>Loading features...</p>
    </div>
  </div>
);
