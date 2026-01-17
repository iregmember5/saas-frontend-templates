import { useState, useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const FeaturesPage = lazy(() => import("./components/features/features-page/FeaturesPage").then(m => ({ default: m.FeaturesPage })));
const BlogPage = lazy(() => import("./components/blogs/BlogPage").then(m => ({ default: m.BlogPage })));
const DebugFeaturesAPI = lazy(() => import("./pages/DebugFeaturesApi"));
const DebugLandingAPI = lazy(() => import("./pages/DebugLandingApi"));

const Loader = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
    <div style={{ width: "48px", height: "48px", border: "4px solid #f3f4f6", borderTop: "4px solid #3b82f6", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  const [currentView, setCurrentView] = useState<{
    type: "landing" | "features" | "blog" | "debug-features" | "debug-landing";
    slug?: string;
  }>({ type: "landing" });

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

      if (path.includes("/debug") || hash.includes("#debug")) {
        setCurrentView({ type: "debug-features" });
        return;
      }

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

      if (path.includes("/blog") || hash.includes("#blog")) {
        setCurrentView({ type: "blog" });
        return;
      }

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

      setCurrentView({ type: "landing" });
    };

    checkRoute();

    window.addEventListener("hashchange", checkRoute);
    window.addEventListener("popstate", checkRoute);

    return () => {
      window.removeEventListener("hashchange", checkRoute);
      window.removeEventListener("popstate", checkRoute);
    };
  }, []);

  if (currentView.type === "blog") {
    return (
      <ThemeProvider>
        <Suspense fallback={<Loader />}>
          <BlogPage slug={currentView.slug} />
        </Suspense>
      </ThemeProvider>
    );
  }

  if (currentView.type === "features") {
    return (
      <ThemeProvider>
        <Suspense fallback={<Loader />}>
          <FeaturesPage slug={currentView.slug} />
        </Suspense>
      </ThemeProvider>
    );
  }

  if (currentView.type === "debug-features") {
    return (
      <ThemeProvider>
        <Suspense fallback={<Loader />}>
          <DebugFeaturesAPI />
        </Suspense>
      </ThemeProvider>
    );
  }

  if (currentView.type === "debug-landing") {
    return (
      <ThemeProvider>
        <Suspense fallback={<Loader />}>
          <DebugLandingAPI />
        </Suspense>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Suspense fallback={<Loader />}>
        <LandingPage />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
