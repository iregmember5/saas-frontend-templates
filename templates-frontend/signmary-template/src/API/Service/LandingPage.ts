import { getApiConfig } from '../../config/api';

const parseJsonArrayParam = (value: string | null): any[] => {
  if (!value) return [];
  try {
    const parsed = JSON.parse(decodeURIComponent(value));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const applyAiPreviewOverrides = (pageData: any): any => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('ai_preview') !== 'true') return pageData;

  const heroTitle = params.get('hero_title')?.trim() || '';
  const heroSubtitle = params.get('hero_subtitle')?.trim() || '';
  const heroDescription = params.get('hero_description')?.trim() || '';
  const ctaPrimary = params.get('cta_primary')?.trim() || '';
  const ctaSecondary = params.get('cta_secondary')?.trim() || '';
  const pageTitle = params.get('page_title')?.trim() || '';
  const features = parseJsonArrayParam(params.get('features'));
  const benefits = parseJsonArrayParam(params.get('benefits'));
  const testimonial = params.get('testimonial')?.trim() || '';

  const overrides: any = {};

  if (pageTitle) overrides.header_title = pageTitle;
  if (heroTitle) overrides.header_subtitle = heroTitle;
  if (heroDescription) overrides.header_description = heroDescription;
  if (heroSubtitle) overrides.header_description = heroSubtitle;
  if (ctaPrimary) overrides.header_cta_primary = ctaPrimary;
  if (ctaSecondary) overrides.header_cta_secondary = ctaSecondary;

  if (features.length > 0) {
    overrides.features = features.map((f: any) => ({
      icon: typeof f === 'object' ? (f.icon || '✅') : '✅',
      title: typeof f === 'object' ? (f.title || f) : f,
      description: typeof f === 'object' ? (f.description || '') : '',
    }));
  }

  if (benefits.length > 0) {
    overrides.benefits = benefits.map((b: any) => ({
      icon: typeof b === 'object' ? (b.icon || '🚀') : '🚀',
      title: typeof b === 'object' ? (b.title || b) : b,
      description: typeof b === 'object' ? (b.description || '') : '',
      stats: typeof b === 'object' ? (b.stats || '') : '',
    }));
  }

  if (testimonial) {
    overrides.testimonials = [{
      quote: testimonial,
      name: 'AI Preview',
      title: '',
      company: '',
      rating: 5,
    }];
  }

  if (ctaPrimary) overrides.cta_primary_text = ctaPrimary;
  if (ctaSecondary) overrides.cta_secondary_text = ctaSecondary;

  return { ...pageData, ...overrides };
};

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
    return applyAiPreviewOverrides(item);
  } catch (error) {
    console.error("Error fetching landing page data:", error);
    throw error;
  }
};

export { fetchLandingPageData };
