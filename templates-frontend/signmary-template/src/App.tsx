// App component that fetches landing page data and handles loading and error states
import { useState, useEffect } from "react";
import "./App.css";
import Benefits from "./component/Benefits";
import CTA from "./component/CTA";
import Features from "./component/Features";
import Footer from "./component/Footer";
import Header from "./component/Header";
import { fetchLandingPageData } from "./API/Service/LandingPage";
import Navbar from "./component/Navbar";
import Testimonials from "./component/Testimonials";
import type { PageData } from "./component/types";
// App.tsx
function App() {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchLandingPageData();
        if (data) {
          setPageData(data);
        } else {
          setError("Failed to load page data");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-slate-300 text-lg">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 dark:text-red-400 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-red-600 dark:text-red-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 dark:bg-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 hover:shadow-lg"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
        <p className="text-gray-600 dark:text-slate-300 text-lg">
          No page data found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar />
      <div id="navigatetofirstscreen">
        <Header className="h-[70vh]" data={pageData} />
      </div>
      <div id="features">
        <Features data={pageData} />
      </div>
      <div id="benefits">
        <Benefits data={pageData} />
      </div>
      <div id="testimonials">
        <Testimonials data={pageData} />
      </div>
      <div id="pricing">
        <CTA data={pageData} />
      </div>
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}

export default App;
