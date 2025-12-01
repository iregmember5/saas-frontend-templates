import type { FeaturesPageData } from "../../../types/features-page";

const isDevelopment = import.meta.env.DEV;
const frontendUrl = isDevelopment
  ? "http://localhost:5173"
  : "http://w9chaser.com";

const baseApiUrl = isDevelopment
  ? "/blogs/api/v2"
  : "https://esign-admin.signmary.com/blogs/api/v2";

export const fetchAllFeaturesPages = async (): Promise<FeaturesPageData[]> => {
  try {
    const apiUrl = `${baseApiUrl}/features-pages/`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
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
