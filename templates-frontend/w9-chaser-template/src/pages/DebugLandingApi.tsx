import { useEffect, useState } from "react";
import { Rnd } from "react-rnd";

const DebugLandingAPI = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // === Panel UI State ===
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<"summary" | "details" | "json">(
    "summary"
  );

  // === Saved window position/size ===
  const [panelState, setPanelState] = useState(() => {
    const stored = localStorage.getItem("debugLandingPanelState");
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
    localStorage.setItem("debugLandingPanelState", JSON.stringify(newState));
  };

  // Save collapsed state
  useEffect(() => {
    localStorage.setItem("debugLandingPanelCollapsed", collapsed ? "1" : "0");
  }, [collapsed]);

  // Load collapsed state
  useEffect(() => {
    const saved = localStorage.getItem("debugLandingPanelCollapsed");
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

        const response = await fetch(`${baseApiUrl}/mypages/`, {
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
            darkMode ? "bg-gray-800 text-white" : "bg-green-600 text-white"
          } cursor-move rounded-t-xl`}
        >
          <div className="flex items-center gap-2">
            <span>{error ? "❌" : "🏠"}</span>
            <span className="font-semibold">Landing Page API Debug</span>
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
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
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
                          ? "bg-green-600 text-white"
                          : "bg-green-500 text-white"
                        : darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    📄 Summary
                  </button>
                  <button
                    onClick={() => setViewMode("details")}
                    className={`px-3 py-1 rounded text-sm transition ${
                      viewMode === "details"
                        ? darkMode
                          ? "bg-green-600 text-white"
                          : "bg-green-500 text-white"
                        : darkMode
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    👁 Details
                  </button>
                  <button
                    onClick={() => setViewMode("json")}
                    className={`px-3 py-1 rounded text-sm transition ${
                      viewMode === "json"
                        ? darkMode
                          ? "bg-green-600 text-white"
                          : "bg-green-500 text-white"
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
                  {/* SUMMARY VIEW */}
                  {viewMode === "summary" && apiData && (
                    <div className="space-y-4">
                      <div className={`${cardBg} p-4 rounded-lg`}>
                        <h3 className="font-bold mb-2">
                          📊 API Response Summary
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="opacity-70">Total Pages:</span>
                            <span className="ml-2 font-mono">
                              {apiData.meta?.total_count || 0}
                            </span>
                          </div>
                          <div>
                            <span className="opacity-70">Items Returned:</span>
                            <span className="ml-2 font-mono">
                              {apiData.items?.length || 0}
                            </span>
                          </div>
                        </div>
                      </div>

                      {apiData.items?.[0] && (
                        <div className={`${cardBg} p-4 rounded-lg`}>
                          <h3 className="font-bold mb-2">
                            🏠 Landing Page Info
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div>
                              <span className="opacity-70">Title:</span>
                              <span className="ml-2">
                                {apiData.items[0].title}
                              </span>
                            </div>
                            <div>
                              <span className="opacity-70">Slug:</span>
                              <span className="ml-2 font-mono">
                                {apiData.items[0].meta?.slug}
                              </span>
                            </div>
                            <div>
                              <span className="opacity-70">Published:</span>
                              <span className="ml-2">
                                {formatDate(
                                  apiData.items[0].meta?.first_published_at
                                )}
                              </span>
                            </div>
                            <div>
                              <span className="opacity-70">Last Updated:</span>
                              <span className="ml-2">
                                {formatDate(
                                  apiData.items[0].meta?.last_published_at
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {apiData.items?.[0]?.sections && (
                        <div className={`${cardBg} p-4 rounded-lg`}>
                          <h3 className="font-bold mb-2">
                            📋 Sections ({apiData.items[0].sections.length})
                          </h3>
                          <div className="space-y-1 text-sm">
                            {apiData.items[0].sections.map(
                              (section: any, idx: number) => (
                                <div key={idx} className="flex justify-between">
                                  <span>{section.type}</span>
                                  <span className="opacity-70 font-mono">
                                    #{idx + 1}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* DETAILS VIEW */}
                  {viewMode === "details" && apiData?.items?.[0] && (
                    <div className="space-y-4">
                      <div className={`${cardBg} p-4 rounded-lg`}>
                        <h3 className="font-bold mb-2">📝 Page Details</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong>Header Title:</strong>{" "}
                            {apiData.items[0].header_title || "N/A"}
                          </div>
                          <div>
                            <strong>Header Subtitle:</strong>{" "}
                            {apiData.items[0].header_subtitle || "N/A"}
                          </div>
                          <div>
                            <strong>SEO Title:</strong>{" "}
                            {apiData.items[0].meta?.seo_title || "N/A"}
                          </div>
                          <div>
                            <strong>Meta Description:</strong>{" "}
                            {apiData.items[0].meta?.search_description || "N/A"}
                          </div>
                        </div>
                      </div>

                      {apiData.items[0].color_theme && (
                        <div className={`${cardBg} p-4 rounded-lg`}>
                          <h3 className="font-bold mb-2">🎨 Color Theme</h3>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded border"
                                style={{
                                  backgroundColor:
                                    apiData.items[0].color_theme.primary_color,
                                }}
                              ></div>
                              <span>
                                Primary:{" "}
                                {apiData.items[0].color_theme.primary_color}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded border"
                                style={{
                                  backgroundColor:
                                    apiData.items[0].color_theme
                                      .secondary_color,
                                }}
                              ></div>
                              <span>
                                Secondary:{" "}
                                {apiData.items[0].color_theme.secondary_color}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* JSON VIEW */}
                  {viewMode === "json" && (
                    <pre
                      className={`${cardBg} p-4 rounded-lg text-xs overflow-auto font-mono`}
                    >
                      {JSON.stringify(apiData, null, 2)}
                    </pre>
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

export default DebugLandingAPI;
