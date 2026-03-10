import { getApiConfig } from '../../config/api';

// API Service
const fetchLandingPageData = async () => {
  try {
    const { cmsUrl, subdomain, tenantId } = getApiConfig();
    const apiUrl = `${cmsUrl}/mypages/`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": window.location.origin,
        "X-Tenant-Id": tenantId,
        "X-Subdomain": subdomain,
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

    const item = data.items[0];
    const contentType = item?.content_type || item?.meta?.type;
    if (contentType && !String(contentType).includes("LandingPage")) {
      throw new Error(
        `Unsupported content type: ${contentType}. This template supports LandingPage only.`
      );
    }
    return item;
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
  }
};

export { fetchLandingPageData };
