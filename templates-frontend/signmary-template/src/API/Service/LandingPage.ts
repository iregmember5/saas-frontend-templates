// API Service
const fetchLandingPageData = async () => {
  try {
    // Use relative URL to leverage Vite proxy in development
    // In production, you'll need to update this to the full URL
    const isDevelopment = import.meta.env.DEV;
    const apiUrl = isDevelopment
      ? "/blogs/api/v2/mypages/"
      : "https://esign-admin.signmary.com/blogs/api/v2/mypages/";

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // In production, add the X-Frontend-Url header
        ...(isDevelopment ? {} : { "X-Frontend-Url": "https://signmary.com" }),
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch landing page data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Check if data and items exist
    if (!data || !data.items || data.items.length === 0) {
      throw new Error("No landing page data available");
    }

    return data.items[0];
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
  }
};

export { fetchLandingPageData };
