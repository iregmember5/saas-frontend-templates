import type { FeaturesPageData } from "../../../types/features-page";
import { getApiConfig } from "../../../config/api";

export const fetchAllFeaturesPages = async (): Promise<FeaturesPageData[]> => {
  try {
    const { cmsUrl, subdomain, tenantId } = getApiConfig();
    const apiUrl = `${cmsUrl}/features-pages/`;

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
        `Failed to fetch features pages: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data || !data.items) {
      return [];
    }

    return data.items;
  } catch (error) {
    console.error("Error fetching features pages:", error);
    return [];
  }
};
