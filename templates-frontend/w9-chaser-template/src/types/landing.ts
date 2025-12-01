// ===== EXISTING INTERFACES (keeping all your current ones) =====
export interface ImageData {
  id: number;
  title: string;
  url: string;
  width?: number;
  height?: number;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  stats: string;
  icon: string;
  order: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  photo: ImageData | null;
  order: number;
}

export interface ColorTheme {
  id: number;
  name: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  neutral_color: string;
  background_color: string;
  text_color: string;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  video_source: "upload" | "youtube" | "vimeo" | "external";
  video_url: string;
  thumbnail: ImageData | null;
  duration: string;
  transcript: string;
}

export interface CardContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  card_content: string;
  custom_title: string;
  custom_description: string;
  card_style: "basic" | "feature" | "testimonial" | "pricing" | "team";
  icon: string;
  card_image?: ImageData;
  button_text: string;
  button_url: string;
  price: string;
  price_period: string;
  features: string[];
  rating: number;
  order: number;
}

export interface DynamicContentBlock {
  type: string;
  value: any;
  id: string;
}

export interface FrontendSite {
  id: number;
  name: string;
  url: string;
  is_active: boolean;
}

export interface FooterConfig {
  id: number;
  name: string;
  company_info?: {
    description?: string;
    logo?: {
      id: number;
      url: string;
      title: string;
    };
  };
  contact_info?: {
    address?: string;
    phone?: string;
    email?: string;
  };
  social_links?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  sections?: {
    quick_links?: boolean;
    services?: boolean;
    contact?: boolean;
  };
  copyright_text?: string;
}

export interface NavigationItem {
  id: number;
  title: string;
  url: string;
  link_type: "page" | "url" | "dropdown";
  order: number;
  children?: NavigationItem[];
}

export interface HeaderConfig {
  id: number;
  logo?: {
    id: number;
    url: string;
    title: string;
    width: number;
    height: number;
  };
  site_name?: string;
  navbar_style: string;
  navigation_items?: NavigationItem[];
  navbar_cta?: {
    text: string;
    url: string;
    style: string;
  };
  sticky_navbar: boolean;
  transparent_on_home: boolean;
}

export interface Section {
  type: string;
  data: any;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
  order: number;
  is_active: boolean;
}

export interface FAQSection {
  heading: string;
  introduction: string;
  faqs: FAQItem[];
}

export interface ProblemSolutionItem {
  problem: string;
  solution: string;
  icon?: string;
}

export interface ProblemSolutionSection {
  heading: string;
  introduction?: string;
  items: ProblemSolutionItem[];
  background_image?: ImageData | null;
}

export interface HowItWorksStep {
  step_number?: string;
  title?: string;
  description?: string;
  icon?: string;
  content?: Array<{
    icon?: string;
    title?: string;
    description?: string;
  }>;
  video?: {
    id?: number;
    title?: string;
    video_source?: string;
    video_url: string;
    thumbnail?: {
      id?: number;
      title?: string;
      url?: string;
      width?: number;
      height?: number;
    };
  };
  image?: string;
}

export interface HowItWorksSection {
  heading: string;
  description?: string;
  icon?: string;
  image?: string | null;
  background_image?: string | null;
  steps: HowItWorksStep[];
}

export interface PricingSection {
  heading: string;
  description?: string;
  widget_code?: string;
  show_cta: boolean;
  cta?: {
    text: string;
    url: string;
  };
}

export interface LandingPageData {
  header_config?: HeaderConfig;
  footer_config?: FooterConfig;
  sections?: Section[];
  header_section_image: any;
  id: number;
  title: string;
  meta: {
    type: string;
    detail_url: string;
    html_url: string | null;
    slug: string;
    show_in_menus: boolean;
    seo_title: string;
    search_description: string;
    first_published_at: string | null;
    last_published_at: string | null;
  };
  header_title?: string;
  header_subtitle?: string;
  header_description?: string;
  header_cta_primary?: string;
  header_cta_primary_url?: string;
  header_cta_secondary?: string;
  header_cta_secondary_url?: string;
  header_background_image?: ImageData;
  features_head?: string;
  features_introduction?: string;
  features?: Feature[];
  benefits_head?: string;
  benefits_introduction?: string;
  benefits?: Benefit[];
  testimonials_head?: string;
  testimonials_introduction?: string;
  testimonials?: Testimonial[];
  faq_section?: FAQSection;
  faqs?: FAQItem[];
  cta_head?: string;
  cta_introduction?: string;
  cta_primary_text?: string;
  cta_primary_url?: string;
  cta_secondary_text?: string;
  cta_secondary_url?: string;
  cta_offer?: string;
  secondary_cta_heading?: string;
  secondary_cta_description?: string;
  secondary_cta_button_text?: string;
  meta_title?: string;
  meta_description?: string;
  og_image?: ImageData;
  color_theme?: ColorTheme;
  video_section?: {
    heading: string;
    introduction: string;
    featured_video: Video | null;
  };
  card_sections?: {
    heading: string;
    cards: CardContent[];
  };
  dynamic_content?: DynamicContentBlock[];
  allowed_frontends?: FrontendSite[];
  problem_solution_section?: ProblemSolutionSection;
  how_it_works_section?: HowItWorksSection;
  pricing_section?: PricingSection;
  section_order?: string[];
}

// ===== NEW: FeaturesPage Interface =====
export interface FeaturesPageData {
  id: number;
  title: string;
  slug: string;
  url: string;
  seo_title: string;
  search_description: string;
  live: boolean;
  locked: boolean;
  first_published_at: string | null;
  last_published_at: string | null;

  // Header Section
  header_title: string;
  header_subtitle: string;
  header_description: string;
  header_image?: ImageData;
  header_cta_text: string;
  header_cta_url: string;

  // Features Overview
  features_intro_heading: string;
  features_intro_description: string;
  features: Feature[];

  // Sections
  categories_heading: string;
  categories_description: string;
  key_features_heading: string;
  key_features_description: string;
  comparison_heading: string;
  comparison_description: string;
  integrations_heading: string;
  integrations_description: string;
  specifications_heading: string;
  specifications_description: string;
  use_cases_heading: string;
  use_cases_description: string;

  // CTA Section
  features_cta_heading: string;
  features_cta_description: string;
  features_cta_button_text: string;
  features_cta_button_url: string;

  // Dynamic Content
  dynamic_content?: DynamicContentBlock[];

  // Theme (inherited from parent or own)
  color_theme?: ColorTheme;
}

export interface ApiResponse {
  meta: {
    total_count: number;
  };
  items: LandingPageData[];
}

export interface FeaturesPageApiResponse {
  meta: {
    total_count: number;
  };
  items: FeaturesPageData[];
}

// ===== API Service Functions =====
const isDevelopment = import.meta.env.DEV;
const frontendUrl = isDevelopment
  ? "http://localhost:5173"
  : "http://w9chaser.com";

const baseApiUrl = isDevelopment
  ? "/blogs/api/v2"
  : "https://esign-admin.signmary.com/blogs/api/v2";

export const fetchLandingPageData = async (): Promise<LandingPageData> => {
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
      throw new Error(
        `Failed to fetch landing page data: ${response.status} ${response.statusText}`
      );
    }

    const data: ApiResponse = await response.json();

    if (!data || !data.items || data.items.length === 0) {
      throw new Error("No landing page data available");
    }

    return data.items[0];
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
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
        `Failed to fetch features pages: ${response.status} ${response.statusText}`
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
  id: number
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
        `Failed to fetch features page: ${response.status} ${response.statusText}`
      );
    }

    const data: FeaturesPageData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching features page:", error);
    throw error;
  }
};
