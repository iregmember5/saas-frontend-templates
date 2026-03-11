// ===== Type Definitions =====
export interface SalesPages {
  [key: string]: any;
}

export interface ApiResponse {
  items: SalesPages[];
}

export interface FeaturesPageData {
  [key: string]: any;
}

export interface FeaturesPageApiResponse {
  items: FeaturesPageData[];
}

// ===== API Service Functions =====

const baseApiUrl = "https://mypowerly.com/v1/blogs/api/v2";
const frontendUrl = "https://mypowerly.com";

const imageBaseUrl = "https://mypowerly.com/v1";

export const prependImageUrl = (url: string | undefined) => {
  if (!url) return url;
  if (url.startsWith("http")) return url;
  return `${imageBaseUrl}${url}`;
};

export const fetchLandingPageData = async (): Promise<SalesPages | null> => {
  try {
    const apiUrl = `${baseApiUrl}/sales-pages/?fields=*`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch landing page data: ${response.status}`);
      return null;
    }

    const data: ApiResponse = await response.json();

    if (!data || !data.items || data.items.length === 0) {
      return null;
    }

    return data.items[0];
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    return null;
  }
};

export const fetchMyPagesData = async (): Promise<SalesPages | null> => {
  try {
    const apiUrl = `${baseApiUrl}/mypages/`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch mypages data: ${response.status}`);
      return null;
    }

    const data: ApiResponse = await response.json();

    if (!data || !data.items || data.items.length === 0) {
      return null;
    }

    return data.items[0];
  } catch (error) {
    console.error("Error fetching mypages data:", error);
    return null;
  }
};

// ===== NEW: Fetch all FeaturesPages =====
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
        `Failed to fetch features pages: ${response.status} ${response.statusText}`,
      );
    }

    const data: FeaturesPageApiResponse = await response.json();

    if (!data || !data.items) {
      return [];
    }

    return data.items;
  } catch (error) {
    console.error("Error fetching features pages:", error);
    return [];
  }
};

// ===== NEW: Fetch single FeaturesPage by ID or slug =====
export const fetchFeaturesPageById = async (
  id: number,
): Promise<FeaturesPageData> => {
  try {
    const apiUrl = `${baseApiUrl}/features-pages/${id}/`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch features page: ${response.status} ${response.statusText}`,
      );
    }

    const data: FeaturesPageData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching features page:", error);
    throw error;
  }
};

export const fetchAllSalesPages = async (): Promise<SalesPages[]> => {
  try {
    const apiUrl = `${baseApiUrl}/sales-pages/`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch sales pages: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    if (!data || !data.items) {
      return [];
    }

    return data.items;
  } catch (error) {
    console.error("Error fetching sales pages:", error);
    return [];
  }
};

export const fetchWorkbookPageData = async (): Promise<SalesPages | null> => {
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
      console.error(`Failed to fetch workbook page data: ${response.status}`);
      return null;
    }

    const data: ApiResponse = await response.json();

    if (!data || !data.items || data.items.length === 0) {
      return null;
    }

    return data.items[0];
  } catch (error) {
    console.error("Error fetching workbook page data:", error);
    return null;
  }
};
