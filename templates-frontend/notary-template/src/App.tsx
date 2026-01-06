import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { fetchNotaryPageData } from "./types/wagtail";
import type { NotaryPageData } from "./types/wagtail";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BlockRenderer } from "./components/blocks/BlockRenderer";
import { Loader2 } from "lucide-react";
import "./index.css";

function App() {
  const [pageData, setPageData] = useState<NotaryPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchNotaryPageData();
        setPageData(data);

        if (data.meta.seo_title) {
          document.title = data.meta.seo_title;
        }

        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescription && data.meta.search_description) {
          metaDescription.setAttribute("content", data.meta.search_description);
        }

        setError(null);
      } catch (err) {
        console.error("Failed to load page data:", err);
        setError(err instanceof Error ? err.message : "Failed to load page");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-background">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-theme-primary animate-spin mx-auto mb-4" />
          <p className="text-xl text-theme-text">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-background">
        <div className="text-center max-w-md mx-auto px-4">
          <h2 className="text-3xl font-bold text-theme-text mb-4">
            Unable to Load Page
          </h2>
          <p className="text-theme-neutral mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-theme-primary text-white rounded-lg font-semibold hover:bg-theme-secondary transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-theme-background">
        <p className="text-theme-neutral text-xl">No page data available</p>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-theme-background">
        <Navbar headerConfig={pageData.header_config} />

        <main className="pt-20">
          {pageData.blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              notaryPageId={pageData.id}
            />
          ))}
        </main>

        <Footer config={pageData.footer_config} />
      </div>
    </ThemeProvider>
  );
}

export default App;
