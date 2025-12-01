import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";

const DebugFeaturesAPI = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // === Panel UI State ===
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"summary" | "details" | "json">(
    "summary"
  );

  // === Saved window position/size ===
  const [panelState, setPanelState] = useState(() => {
    const stored = localStorage.getItem("debugPanelState");
    return stored
      ? JSON.parse(stored)
      : {
          x: window.innerWidth - 600,
          y: window.innerHeight - 500,
          width: 600,
          height: 450,
        };
  });

  // Auto detect dark mode for initial load
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
  }, []);

  // Save panel state in localStorage
  const savePanelState = (newState: any) => {
    setPanelState(newState);
    localStorage.setItem("debugPanelState", JSON.stringify(newState));
  };

  // Save collapsed state
  useEffect(() => {
    localStorage.setItem("debugPanelCollapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  // Load collapsed state
  useEffect(() => {
    const saved = localStorage.getItem("debugPanelCollapsed");
    if (saved === "1") setCollapsed(true);
  }, []);

  // === API CALL ===
  useEffect(() => {
    const testAPI = async () => {
      try {
        setLoading(true);

        const isDevelopment = import.meta.env.DEV;
        const frontendUrl = isDevelopment
          ? "http://localhost:5173"
          : "https://w9chaser.com";

        const baseApiUrl = isDevelopment
          ? "/blogs/api/v2"
          : "https://esign-admin.signmary.com/blogs/api/v2";

        const response = await fetch(`${baseApiUrl}/features-pages/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Frontend-Url": frontendUrl,
          },
        });

        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        setApiData(data);

        // Auto-select first page if available
        if (data?.items?.length > 0) {
          setSelectedPage(data.items[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  // === THEMING ===
  const bg = darkMode ? "bg-gray-900" : "bg-white";
  const text = darkMode ? "text-gray-200" : "text-gray-800";
  const border = darkMode ? "border-gray-700" : "border-gray-300";
  const cardBg = darkMode ? "bg-gray-800" : "bg-gray-50";

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not published";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Rnd
      size={{ width: panelState.width, height: panelState.height }}
      position={{ x: panelState.x, y: panelState.y }}
      minWidth={500}
      minHeight={200}
      bounds="window"
      dragHandleClassName="drag-header"
      onDragStop={(_e, d) => {
        savePanelState({ ...panelState, x: d.x, y: d.y });
      }}
      onResizeStop={(_e, _direction, ref, _delta, pos) => {
        savePanelState({
          ...panelState,
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          ...pos,
        });
      }}
      className="z-50"
    >
      <div
        className={`${bg} ${text} shadow-2xl rounded-xl border-2 ${border} w-full h-full flex flex-col`}
      >
        {/* HEADER */}
        <div
          className={`drag-header px-4 py-3 flex items-center justify-between ${
            darkMode ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
          } cursor-move rounded-t-xl`}
        >
          <div className="flex items-center gap-2">
            <span>{error ? "❌" : "🛠"}</span>
            <span className="font-semibold">Features API Debug</span>
            {apiData && !error && (
              <span className="text-sm opacity-80">
                ({apiData.meta?.total_count || 0} pages found)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-sm transition"
              title="Toggle dark mode"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>

            <button
              onClick={() => window.location.reload()}
              className="px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-sm transition"
              title="Refresh data"
            >
              🔄
            </button>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-sm transition"
            >
              {collapsed ? "➕ Expand" : "➖ Collapse"}
            </button>
          </div>
        </div>

        {/* COLLAPSED MODE */}
        {collapsed && (
          <div className="p-3 text-center text-sm opacity-80 flex-1 flex items-center justify-center">
            <div>
              Debug panel collapsed.
              <br />
              Click "Expand" to view API data.
            </div>
          </div>
        )}

        {/* EXPANDED MODE */}
        {!collapsed && (
          <div className="flex-1 p-4 overflow-hidden flex flex-col">
            {loading ? (
              <div className="flex items-center gap-3 justify-center flex-1">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p>Loading API data...</p>
              </div>
            ) : error ? (
              <div className="bg-red-500/10 border border-red-500 p-4 rounded-lg">
                <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                  <span>❌</span> API Error
                </h4>
                <p className="text-sm">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-3 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {/* VIEW MODE TOGGLE */}
                <div className="flex gap-2 mb-4 border-b pb-2">
                  <button
                    onClick={() => setViewMode("summary")}
                    className={`px-3 py-1 rounded text-sm transition ${
                      viewMode === "summary"
                        ? darkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    📄 Pages List
                  </button>
                  <button
                    onClick={() => setViewMode("details")}
                    disabled={!selectedPage}
                    className={`px-3 py-1 rounded text-sm transition ${
                      viewMode === "details"
                        ? darkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    } ${!selectedPage ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    👁 Page Details
                  </button>
                  <button
                    onClick={() => setViewMode("json")}
                    className={`px-3 py-1 rounded text-sm transition ${
                      viewMode === "json"
                        ? darkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-500 text-white"
                        : darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {`</> JSON`}
                  </button>
                </div>

                {/* CONTENT AREA */}
                <div className="flex-1 overflow-auto">
                  {/* SUMMARY VIEW - Pages List */}
                  {viewMode === "summary" && (
                    <div className="space-y-3">
                      <h3 className="font-bold text-lg mb-3">
                        Available Pages
                      </h3>
                      {apiData?.items?.map((page: any, i: number) => (
                        <div
                          key={i}
                          className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${
                            selectedPage?.id === page.id
                              ? darkMode
                                ? "border-blue-500 bg-blue-900/20"
                                : "border-blue-500 bg-blue-50"
                              : `${border} ${cardBg}`
                          }`}
                          onClick={() => {
                            setSelectedPage(page);
                            setViewMode("details");
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-bold text-lg">
                                  {page.title}
                                </span>
                                <span
                                  className={`text-xs px-2 py-1 rounded ${
                                    page.live
                                      ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                                  }`}
                                >
                                  {page.live ? "Live" : "Draft"}
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-sm opacity-80">
                                <div className="flex items-center gap-1">
                                  <span>🆔</span>
                                  <span>ID: {page.id}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span>🔗</span>
                                  <span>Slug: {page.slug}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span>📅</span>
                                  <span>
                                    Published:{" "}
                                    {formatDate(page.first_published_at)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span>⭐</span>
                                  <span>
                                    Features: {page.features?.length || 0}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-2xl opacity-60">→</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* DETAILS VIEW - Single Page */}
                  {viewMode === "details" && selectedPage && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg">Page Details</h3>
                        <button
                          onClick={() => setViewMode("summary")}
                          className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                        >
                          ← Back to List
                        </button>
                      </div>

                      <div
                        className={`p-4 rounded-lg border ${border} ${cardBg}`}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Basic Info */}
                          <div>
                            <h4 className="font-bold mb-2 text-blue-400">
                              📋 Basic Information
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>Title:</span>
                                <span className="font-medium">
                                  {selectedPage.title}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>ID:</span>
                                <span>{selectedPage.id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Slug:</span>
                                <span>{selectedPage.slug}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Status:</span>
                                <span
                                  className={
                                    selectedPage.live
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }
                                >
                                  {selectedPage.live ? "✅ Live" : "❌ Draft"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Dates */}
                          <div>
                            <h4 className="font-bold mb-2 text-blue-400">
                              📅 Publishing Dates
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>First Published:</span>
                                <span>
                                  {formatDate(selectedPage.first_published_at)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Last Published:</span>
                                <span>
                                  {formatDate(selectedPage.last_published_at)}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Header Info */}
                          {selectedPage.header_title && (
                            <div className="md:col-span-2">
                              <h4 className="font-bold mb-2 text-blue-400">
                                🎯 Header Content
                              </h4>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="font-medium">Title:</span>{" "}
                                  {selectedPage.header_title}
                                </div>
                                {selectedPage.header_subtitle && (
                                  <div>
                                    <span className="font-medium">
                                      Subtitle:
                                    </span>{" "}
                                    {selectedPage.header_subtitle}
                                  </div>
                                )}
                                {selectedPage.header_description && (
                                  <div>
                                    <span className="font-medium">
                                      Description:
                                    </span>{" "}
                                    {selectedPage.header_description}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Features Count */}
                          <div className="md:col-span-2">
                            <h4 className="font-bold mb-2 text-blue-400">
                              ⭐ Features
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">
                                {selectedPage.features?.length || 0}
                              </span>
                              <span>feature(s) available</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* JSON VIEW */}
                  {viewMode === "json" && (
                    <div className="h-full flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">Raw JSON Response</h3>
                        <button
                          onClick={() => setViewMode("summary")}
                          className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                        >
                          ← Back to List
                        </button>
                      </div>
                      <pre
                        className={`text-xs p-4 rounded overflow-auto flex-1 ${
                          darkMode
                            ? "bg-gray-800 text-gray-100"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {JSON.stringify(apiData, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default DebugFeaturesAPI;
