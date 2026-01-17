// Performance monitoring for production
export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && typeof window !== "undefined") {
    import("web-vitals")
      .then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS(onPerfEntry);
        onINP(onPerfEntry);
        onFCP(onPerfEntry);
        onLCP(onPerfEntry);
        onTTFB(onPerfEntry);
      })
      .catch(() => {
        // web-vitals not available, skip
      });
  }
};

// Log performance metrics in development
if (import.meta.env.DEV) {
  reportWebVitals(console.log);
}
