import React from "react";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50">
    <style>{`
      .error-button { background: linear-gradient(135deg, var(--primary-color, #3B82F6) 0%, var(--accent-color, #10B981) 100%); }
      .error-button:hover { background: linear-gradient(135deg, var(--accent-color, #10B981) 0%, var(--primary-color, #3B82F6) 100%); }
    `}</style>
    <div className="text-center max-w-md mx-auto px-4">
      <div className="text-red-500 mb-6">
        <svg
          className="w-20 h-20 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-3xl font-bold mb-3" style={{ color: "var(--text-color, #1F2937)" }}>
        Unable to Load Page
      </h2>
      <p className="mb-8 text-lg" style={{ color: "var(--neutral-color, #6B7280)" }}>{error}</p>
      <button
        onClick={onRetry}
        className="px-8 py-4 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl font-semibold error-button"
      >
        Try Again
      </button>
    </div>
  </div>
);
