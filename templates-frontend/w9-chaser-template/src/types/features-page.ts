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

export interface CardContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  card_style: "basic" | "feature" | "testimonial" | "pricing" | "team";
  card_image?: ImageData;
  background_image?: ImageData;
  button_text: string;
  button_url: string;
  price: string;
  price_period: string;
  features: string[];
  rating: number;
  order: number;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
  order: number;
}

export interface HowItWorksStep {
  step_number: string;
  title: string;
  description: string;
  icon?: string;
  image?: ImageData;
  getFullImageUrl: (url: string | { url: string } | undefined) => string;
}

export interface DynamicContentBlock {
  type: string;
  value: any;
  id: string;
}

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

  // Problem/Solution Section
  problem_solution_heading?: string;
  problem_description?: string;
  solution_description?: string;
  problem_solution_image?: ImageData;
  problem_solution_description?: string;

  // How It Works Section
  how_it_works_heading?: string;
  how_it_works_description?: string;
  how_it_works_steps?: HowItWorksStep[];

  // Benefits Section
  benefits_heading?: string;
  benefits_description?: string;
  benefits_style?: "cards" | "list" | "mixed";
  benefits?: Benefit[];

  // Card Sections
  card_sections_heading?: string;
  card_sections_description?: string;
  card_sections?: CardContent[];

  // FAQ Section
  faq_section_heading?: string;
  faq_section_description?: string;
  faqs?: FAQItem[];

  // Pricing Section
  pricing_heading?: string;
  pricing_description?: string;
  pricing_widget_code?: string;
  show_pricing_cta?: boolean;
  pricing_cta_text?: string;
  pricing_cta_url?: string;

  // Testimonials Section
  testimonials_heading?: string;
  testimonials_description?: string;
  testimonials?: Testimonial[];

  // Primary CTA Section
  primary_cta_heading?: string;
  primary_cta_description?: string;
  primary_cta_button_text?: string;
  primary_cta_button_url?: string;
  primary_cta_background_image?: ImageData;

  // Secondary CTA Section
  secondary_cta_heading?: string;
  secondary_cta_description?: string;
  secondary_cta_button_text?: string;
  secondary_cta_button_url?: string;

  // Features Overview
  features_intro_heading?: string;
  features_intro_description?: string;
  features?: Feature[];

  // Feature Categories
  categories_heading?: string;
  categories_description?: string;

  // Technical Specifications
  specifications_heading?: string;
  specifications_description?: string;

  // Dynamic Content
  dynamic_content?: DynamicContentBlock[];

  // Theme
  color_theme?: ColorTheme;

  // Meta
  meta_title?: string;
  meta_description?: string;
  og_image?: ImageData;

  // Frontend Configuration
  allowed_frontends?: Array<{
    id: number;
    name: string;
    url: string;
    is_active: boolean;
  }>;
}

export interface FeaturesPageProps {
  pageId?: number;
  slug?: string;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  neutralColor: string;
  bgColor: string;
}
