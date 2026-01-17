export const preloadCriticalResources = () => {
  // Removed preload to fix warning
};

if (typeof window !== "undefined") {
  preloadCriticalResources();
}
