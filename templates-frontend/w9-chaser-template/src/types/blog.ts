// types/blog.ts

// Utility function to generate slug from text
export const generateSlug = (text: string, id?: number): string => {
  if (!text) return id?.toString() || "post";
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

export interface BlogImage {
  id: number;
  title: string;
  url: string;
  width?: number;
  height?: number;
}

export interface BlogAuthor {
  id: number;
  name: string;
  bio?: string;
  avatar?: BlogImage;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: BlogImage;
  author?: BlogAuthor;
  categories?: BlogCategory[];
  published_date: string;
  reading_time?: number;
  meta: {
    seo_title?: string;
    search_description?: string;
  };
}

export interface BlogIndexConfig {
  title: string;
  description: string;
  hero_image?: BlogImage;
  show_categories?: boolean;
  posts_per_page?: number;
}

export interface BlogPageData {
  id: number;
  title: string;
  slug: string;
  meta: {
    type: string;
    seo_title?: string;
    search_description?: string;
  };
  config: BlogIndexConfig;
  posts: BlogPost[];
  header_config?: {
    logo?: BlogImage;
    site_name?: string;
    navigation_items?: any[];
    navbar_cta?: {
      text: string;
      url: string;
    };
  };
  footer_config?: {
    logo?: BlogImage;
    site_name?: string;
    description?: string;
    social_links?: Array<{
      platform: string;
      url: string;
    }>;
    footer_sections?: Array<{
      title: string;
      links: Array<{
        text: string;
        url: string;
      }>;
    }>;
    copyright_text?: string;
  };
  general_section?: {
    title: string;
    description: string;
    image: BlogImage;
    cta_text?: string;
    cta_url?: string;
  };
}

export interface BlogPostPageData {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: BlogImage;
  author?: BlogAuthor;
  categories?: BlogCategory[];
  published_date: string;
  reading_time?: number;
  meta: {
    type: string;
    seo_title?: string;
    search_description?: string;
  };
  related_posts?: BlogPost[];
}

// API Response types
export interface BlogApiResponse {
  meta: {
    total_count: number;
  };
  items: BlogPageData[];
}

export interface BlogPostApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: BlogPost[];
}

// API Service Functions
// ===== API Configuration =====
const isDevelopment = import.meta.env.DEV;
const frontendUrl = isDevelopment
  ? "http://localhost:5173"
  : "http://w9chaser.com";

const baseApiUrl = isDevelopment
  ? "/blogs/api/v2"
  : "https://esign-admin.signmary.com/blogs/api/v2";

// ===== API Service Functions =====

export const fetchBlogIndexPage = async (): Promise<BlogPageData> => {
  try {
    const apiUrl = `${baseApiUrl}/blog-pages/`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch blog page data: ${response.status} ${response.statusText}`
      );
    }

    const data: BlogApiResponse = await response.json();

    if (!data || !data.items || data.items.length === 0) {
      throw new Error("No blog page data available");
    }

    console.log("✅ Blog page data fetched:", data.items[0]);
    return data.items[0];
  } catch (error) {
    console.error("❌ Error fetching blog page data:", error);
    throw error;
  }
};

export const fetchAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const apiUrl = `${baseApiUrl}/blog-cards/`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch blog posts: ${response.status} ${response.statusText}`
      );
    }

    const data: BlogPostApiResponse = await response.json();

    if (!data || !data.results) {
      console.log("No blog posts returned from API");
      return [];
    }

    console.log(`✅ Fetched ${data.results.length} blog posts`);
    return data.results;
  } catch (error) {
    console.error("❌ Error fetching blog posts:", error);
    return [];
  }
};

export const fetchBlogPostBySlug = async (
  slug: string
): Promise<BlogPostPageData> => {
  try {
    console.log(`🔍 Fetching blog post with slug: ${slug}`);

    // Try to fetch by slug using the by_slug action
    const apiUrl = `${baseApiUrl}/blog-cards/${slug}/by_slug/`;
    console.log(`Trying API endpoint: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Found post via API`);
      return data as BlogPostPageData;
    }

    // Fallback: fetch all posts and find by matching slug
    console.log(`API endpoint failed, trying fallback`);
    const allPosts = await fetchAllBlogPosts();

    // Generate slug from title to match
    const post = allPosts.find((p) => {
      const generatedSlug = p.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      return generatedSlug === slug;
    });

    if (!post) {
      console.log(
        `Available posts:`,
        allPosts.map((p) => p.title)
      );
      throw new Error(`Blog post not found for slug: ${slug}`);
    }

    console.log(`✅ Found post via fallback`);
    return post as BlogPostPageData;
  } catch (error) {
    console.error("❌ Error fetching blog post:", error);
    throw error;
  }
};

export const fetchBlogPostsByCategory = async (
  categorySlug: string
): Promise<BlogPost[]> => {
  try {
    const apiUrl = `${baseApiUrl}/blog-cards/?category=${categorySlug}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch posts by category: ${response.statusText}`
      );
    }

    const data: BlogPostApiResponse = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
};
