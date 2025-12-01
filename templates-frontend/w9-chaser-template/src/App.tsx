// App.tsx
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import { FeaturesPage } from "./components/features/features-page/FeaturesPage";
import { BlogPage } from "./components/blogs/BlogPage";
import DebugFeaturesAPI from "./pages/DebugFeaturesApi";
import DebugLandingAPI from "./pages/DebugLandingApi";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  const [currentView, setCurrentView] = useState<{
    type: "landing" | "features" | "blog" | "debug-features" | "debug-landing";
    slug?: string;
  }>({ type: "landing" });

  // Simple URL-based routing
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      // Debug pages
      if (
        path.includes("/debug-features") ||
        hash.includes("#debug-features")
      ) {
        setCurrentView({ type: "debug-features" });
        return;
      }

      if (path.includes("/debug-landing") || hash.includes("#debug-landing")) {
        setCurrentView({ type: "debug-landing" });
        return;
      }

      // Legacy debug route defaults to features
      if (path.includes("/debug") || hash.includes("#debug")) {
        setCurrentView({ type: "debug-features" });
        return;
      }

      // Check if we're on a blog post page
      if (path.includes("/blog/") || hash.includes("#blog/")) {
        const slugMatch =
          path.match(/\/blog\/([^\/]+)/) || hash.match(/#blog\/([^\/]+)/);

        if (slugMatch && slugMatch[1]) {
          setCurrentView({ type: "blog", slug: slugMatch[1] });
        } else {
          setCurrentView({ type: "blog" });
        }
        return;
      }

      // Check if we're on blog index
      if (path.includes("/blog") || hash.includes("#blog")) {
        setCurrentView({ type: "blog" });
        return;
      }

      // Check if we're on a features page
      if (path.includes("/features/") || hash.includes("#features/")) {
        const slugMatch =
          path.match(/\/features\/([^\/]+)/) ||
          hash.match(/#features\/([^\/]+)/);

        if (slugMatch && slugMatch[1]) {
          setCurrentView({ type: "features", slug: slugMatch[1] });
        } else {
          setCurrentView({ type: "features", slug: "sales-marketing" });
        }
        return;
      }

      // Default to landing page
      setCurrentView({ type: "landing" });
    };

    checkRoute();

    // Listen for hash changes (for navigation without page reload)
    window.addEventListener("hashchange", checkRoute);
    window.addEventListener("popstate", checkRoute);

    return () => {
      window.removeEventListener("hashchange", checkRoute);
      window.removeEventListener("popstate", checkRoute);
    };
  }, []);

  // Render based on current view
  if (currentView.type === "blog") {
    return (
      <ThemeProvider>
        <BlogPage slug={currentView.slug} />
      </ThemeProvider>
    );
  }

  if (currentView.type === "features") {
    return (
      <ThemeProvider>
        <FeaturesPage slug={currentView.slug} />
      </ThemeProvider>
    );
  }

  if (currentView.type === "debug-features") {
    return (
      <ThemeProvider>
        <DebugFeaturesAPI />
      </ThemeProvider>
    );
  }

  if (currentView.type === "debug-landing") {
    return (
      <ThemeProvider>
        <DebugLandingAPI />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <LandingPage />
    </ThemeProvider>
  );
}

export default App;
