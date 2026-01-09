export interface ImageData {
  id: number;
  title: string;
  url: string;
  width?: number;
  height?: number;
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

// Hero Block
export interface HeroBlock {
  type: 'hero';
  value: {
    headline: string;
    subheadline?: string;
    primary_cta_label: string;
    primary_cta_action: 'book' | 'contact' | 'upload' | 'url';
    primary_cta_target?: string;
    secondary_cta_label?: string;
    secondary_cta_action?: 'book' | 'contact' | 'upload' | 'url';
    secondary_cta_target?: string;
    background_type: 'solid' | 'image' | 'gradient';
    background_image?: ImageData;
    overlay_color?: string;
    show_location_badge: boolean;
    location_text?: string;
  };
  id: string;
}

// Verified Notary Credentials Block
export interface VerifiedCredentialsBlock {
  type: 'verified_credentials';
  value: {
    notary_name: string;
    state_of_commission: string;
    license_number: string;
    commission_expiry: string;
    certifications: string[];
    display_badge_icons: boolean;
    disclaimer_text?: string;
  };
  id: string;
}

// Testimonials Block
export interface TestimonialItem {
  client_name: string;
  rating: number;
  testimonial_text: string;
  client_photo?: ImageData;
}

export interface TestimonialsBlock {
  type: 'testimonials';
  value: {
    display_type: 'manual' | 'google';
    testimonials?: TestimonialItem[];
    google_place_id?: string;
    max_reviews: number;
  };
  id: string;
}

// Service Area Block
export interface ServiceAreaBlock {
  type: 'service_area';
  value: {
    service_modes: string[];
    cities_served: string[];
    travel_radius?: number;
    show_map: boolean;
    map_type?: 'google' | 'static';
    office_address?: string;
  };
  id: string;
}

// Services List Block
export interface ServiceItem {
  service_name: string;
  description: string;
  short_description?: string;
  starting_price?: string;
  duration?: string;
  cta_label: string;
  cta_action: string;
  cta_target?: string;
  is_popular: boolean;
}

export interface ServicesListBlock {
  type: 'services_list';
  value: {
    services: ServiceItem[];
  };
  id: string;
}

// FAQ Block
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQBlock {
  type: 'faq';
  value: {
    category: string;
    faqs: FAQItem[];
    expand_first: boolean;
  };
  id: string;
}

// Booking Block
export interface BookingBlock {
  type: 'booking';
  value: {
    booking_type: 'office' | 'mobile' | 'remote';
    calendar_source: 'internal' | 'google' | 'outlook';
    duration_options: string[];
    buffer_time: number;
    require_payment: boolean;
    confirmation_message: string;
  };
  id: string;
}

// Document Upload Block
export interface DocumentUploadBlock {
  type: 'document_upload';
  value: {
    allowed_file_types: string[];
    max_file_size: number;
    require_before_booking: boolean;
    instructions: string;
    privacy_notice: string;
  };
  id: string;
}

// eSignature Block
export interface ESignatureBlock {
  type: 'esignature';
  value: {
    document_source: 'upload' | 'template';
    require_auth: boolean;
    signer_types: string[];
    completion_redirect?: string;
  };
  id: string;
}

// Payment Block
export interface PaymentBlock {
  type: 'payment';
  value: {
    payment_type: 'full' | 'deposit';
    amount: string;
    description: string;
    require_before_proceeding: boolean;
    success_message: string;
  };
  id: string;
}

// Identity Verification Block
export interface IdentityVerificationBlock {
  type: 'identity_verification';
  value: {
    verification_methods: string[];
    max_attempts: number;
    failure_message: string;
    compliance_disclaimer: string;
  };
  id: string;
}

// Consent Block
export interface ConsentBlock {
  type: 'consent';
  value: {
    consent_text: string;
    checkbox_label: string;
    block_submission: boolean;
  };
  id: string;
}

// Contact Form Block
export interface ContactFormBlock {
  type: 'contact_form';
  value: {
    form_fields: string[];
    enable_file_upload: boolean;
    route_to: 'crm' | 'email';
    success_message: string;
  };
  id: string;
}

// Content Block
export interface ContentBlock {
  type: 'content';
  value: {
    content: string;
    enable_table_styling: boolean;
    enable_callout_styling: boolean;
  };
  id: string;
}

// Card Grid Block
export interface CardGridBlock {
  type: 'card_grid';
  value: {
    heading: string;
    subheading: string;
    columns: string;
    cards: Array<{
      custom_title: string;
      custom_description: string;
      card_content: string | null;
      card_icon: string;
      card_image: string | null;
      card_background: string | null;
    }>;
  };
  id: string;
}

export type NotaryBlock =
  | HeroBlock
  | VerifiedCredentialsBlock
  | TestimonialsBlock
  | ServiceAreaBlock
  | ServicesListBlock
  | FAQBlock
  | BookingBlock
  | DocumentUploadBlock
  | ESignatureBlock
  | PaymentBlock
  | IdentityVerificationBlock
  | ConsentBlock
  | ContactFormBlock
  | ContentBlock
  | CardGridBlock;

export interface NotaryPageData {
  id: number;
  title: string;
  meta: {
    type: string;
    slug: string;
    seo_title: string;
    search_description: string;
  };
  color_theme?: ColorTheme;
  blocks: NotaryBlock[];
  header_config?: {
    id: number;
    name: string;
    logo?: { url: string; title: string } | null;
    site_name?: string;
    navbar_style: string;
    sticky_navbar: boolean;
    transparent_on_home: boolean;
    navbar_cta?: any;
    navigation_items: any[];
  };
  footer_config?: {
    name: string;
    company_info: {
      description: string;
      logo: string | null;
    };
    contact_info: {
      address: string;
      phone: string;
      email: string;
    };
    social_links: Array<{
      platform: string;
      url: string;
      icon_class: string;
    }>;
    sections: {
      quick_links: {
        show: boolean;
        heading: string;
        links: Array<{ name: string; url: string; order: number }>;
      };
      services: {
        show: boolean;
        heading: string;
        links: Array<{ name: string; url: string; order: number }>;
      };
      resources: {
        show: boolean;
        heading: string;
        links: Array<{ name: string; url: string; order: number }>;
      };
      contact: {
        show: boolean;
        heading: string;
      };
    };
    copyright_text: string;
    additional_footer_text: string;
  };
}

export interface ApiResponse {
  meta: {
    total_count: number;
  };
  items: NotaryPageData[];
}

import { getApiConfig } from '../config/api';

// Helper to parse StructValue strings from API
const parseStructValue = (structStr: string): any => {
  try {
    // Extract content between StructValue({ and })
    const match = structStr.match(/StructValue\(\{(.*)\}\)$/s);
    if (!match) return {};
    
    let content = match[1];
    const result: any = {};
    
    // State machine to parse key-value pairs
    let i = 0;
    while (i < content.length) {
      // Skip whitespace
      while (i < content.length && /\s/.test(content[i])) i++;
      if (i >= content.length) break;
      
      // Parse key (format: 'key':)
      if (content[i] !== "'") break;
      i++; // skip opening quote
      let key = '';
      while (i < content.length && content[i] !== "'") {
        key += content[i];
        i++;
      }
      i++; // skip closing quote
      
      // Skip colon and whitespace
      while (i < content.length && (content[i] === ':' || /\s/.test(content[i]))) i++;
      
      // Parse value
      let value = '';
      if (content[i] === "'") {
        // Single-quoted value
        i++; // skip opening quote
        while (i < content.length && content[i] !== "'") {
          value += content[i];
          i++;
        }
        i++; // skip closing quote
      } else if (content[i] === '\\' && content[i + 1] === '"') {
        // Escaped double-quoted value (\"...\")
        i += 2; // skip \" 
        while (i < content.length) {
          if (content[i] === '\\' && content[i + 1] === '"') {
            i += 2; // skip closing \"
            break;
          }
          // Handle escaped apostrophes within the value
          if (content[i] === '\\' && content[i + 1] === "'") {
            value += "'";
            i += 2;
          } else {
            value += content[i];
            i++;
          }
        }
      }
      
      result[key] = value;
      
      // Skip comma and whitespace
      while (i < content.length && (content[i] === ',' || /\s/.test(content[i]))) i++;
    }
    
    return result;
  } catch (e) {
    console.error('Failed to parse StructValue:', e, structStr);
  }
  return {};
};

export const fetchNotaryPageData = async (): Promise<NotaryPageData> => {
  const { mockNotaryData } = await import('../utils/mockData');
  
  try {
    const { cmsUrl, subdomain, tenantId } = getApiConfig();
    const apiUrl = `${cmsUrl}/notary-pages/`;
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
      console.warn('API not available, using mock data');
      return mockNotaryData;
    }

    const data: any = await response.json();
    if (!data?.items?.length) {
      console.warn('No API data, using mock data');
      return mockNotaryData;
    }

    const page: any = data.items[0];
    
    // Process dynamic_content blocks
    const dynamicBlocks: NotaryBlock[] = (page.dynamic_content || []).map((block: any) => ({
      type: block.type,
      value: block.value,
      id: block.id,
    }));
    
    // Merge API data with mock data - API overrides only what it provides
    const apiBlocks: NotaryBlock[] = [
      page.hero && page.hero.headline && {
        type: 'hero' as const,
        value: {
          headline: page.hero.headline || '',
          subheadline: page.hero.subheadline,
          primary_cta_label: page.hero.primary_cta?.label || '',
          primary_cta_action: page.hero.primary_cta?.action || 'book',
          primary_cta_target: page.hero.primary_cta?.target,
          secondary_cta_label: page.hero.secondary_cta?.label,
          secondary_cta_action: page.hero.secondary_cta?.action,
          secondary_cta_target: page.hero.secondary_cta?.target,
          background_type: page.hero.background_type || 'solid',
          background_image: page.hero.background_image,
          overlay_color: page.hero.overlay_color,
          show_location_badge: page.hero.show_location_badge || false,
          location_text: page.hero.location_text,
        },
        id: 'hero-1',
      },
      page.credentials && page.credentials.notary_name && {
        type: 'verified_credentials' as const,
        value: {
          notary_name: page.credentials.notary_name || '',
          state_of_commission: page.credentials.state || '',
          license_number: page.credentials.license_number || '',
          commission_expiry: page.credentials.expiry_date || '',
          certifications: page.credentials.certifications || [],
          display_badge_icons: page.credentials.display_badges || false,
          disclaimer_text: page.credentials.disclaimer,
        },
        id: 'credentials-1',
      },
      page.services && page.services.length > 0 && {
        type: 'services_list' as const,
        value: {
          services: (page.services || []).map((s: any) => {
            const serviceData = typeof s.value === 'string' ? parseStructValue(s.value) : s.value;
            console.log('Parsed service:', serviceData);
            return {
              service_name: serviceData.service_name || '',
              description: serviceData.short_description || '',
              starting_price: serviceData.starting_price || '',
              duration: serviceData.duration || '',
              cta_label: serviceData.cta_label || '',
              cta_action: serviceData.cta_action || 'contact',
              cta_target: serviceData.cta_target || '',
              is_popular: false,
            };
          }),
        },
        id: 'services-1',
      },
      page.service_area && page.service_area.cities && page.service_area.cities.length > 0 && {
        type: 'service_area' as const,
        value: {
          service_modes: Object.entries(page.service_area.modes || {})
            .filter(([_, v]) => v)
            .map(([k]) => k),
          cities_served: page.service_area.cities || [],
          travel_radius: page.service_area.travel_radius,
          show_map: page.service_area.show_map || false,
          map_type: page.service_area.map_type,
          office_address: page.service_area.office_address,
        },
        id: 'service-area-1',
      },
      ...dynamicBlocks,
      page.booking && page.booking.duration_options && page.booking.duration_options.length > 0 && {
        type: 'booking' as const,
        value: {
          booking_type: page.booking.type || 'office',
          calendar_source: page.booking.calendar_source || 'internal',
          duration_options: page.booking.duration_options || [],
          buffer_time: page.booking.buffer_time || 0,
          require_payment: page.booking.require_payment || false,
          confirmation_message: page.booking.confirmation_message || '',
        },
        id: 'booking-1',
      },
      page.upload && page.upload.allowed_types && page.upload.allowed_types.length > 0 && {
        type: 'document_upload' as const,
        value: {
          allowed_file_types: page.upload.allowed_types || [],
          max_file_size: page.upload.max_size || 10,
          require_before_booking: page.upload.require_before_booking || false,
          instructions: page.upload.instructions || '',
          privacy_notice: page.upload.privacy_notice || '',
        },
        id: 'upload-1',
      },
      page.testimonials && (page.testimonials.items && page.testimonials.items.length > 0 || page.testimonials.display_type === 'google') && {
        type: 'testimonials' as const,
        value: {
          display_type: page.testimonials.display_type || 'manual',
          testimonials: (page.testimonials.items || []).map((t: any) => ({
            client_name: t.name || '',
            rating: 5,
            testimonial_text: t.quote || '',
            client_photo: t.photo,
          })),
          google_place_id: page.testimonials.google_place_id,
          max_reviews: page.testimonials.max_reviews || 5,
        },
        id: 'testimonials-1',
      },
      page.faq && page.faq.items && page.faq.items.length > 0 && {
        type: 'faq' as const,
        value: {
          category: page.faq.category || '',
          faqs: (page.faq.items || []).map((f: any) => ({
            question: f.question || '',
            answer: f.answer || '',
          })),
          expand_first: page.faq.expand_first || false,
        },
        id: 'faq-1',
      },
      page.payment && page.payment.amount && parseFloat(page.payment.amount) > 0 && {
        type: 'payment' as const,
        value: {
          payment_type: page.payment.type || 'full',
          amount: page.payment.amount || '0',
          description: page.payment.description || '',
          require_before_proceeding: page.payment.require_before_proceeding || false,
          success_message: page.payment.success_message || '',
        },
        id: 'payment-1',
      },
      page.contact_form && page.contact_form.fields && page.contact_form.fields.length > 0 && {
        type: 'contact_form' as const,
        value: {
          form_fields: page.contact_form.fields || [],
          enable_file_upload: page.contact_form.enable_file_upload || false,
          route_to: page.contact_form.route_leads_to || 'email',
          success_message: page.contact_form.success_message || '',
        },
        id: 'contact-1',
      },
    ].filter((block): block is NotaryBlock => !!block);

    // Only use mock blocks that aren't provided by API
    const apiBlockIds = new Set(apiBlocks.map(b => b.id));
    const mockBlocksToKeep = mockNotaryData.blocks.filter(b => !apiBlockIds.has(b.id));
    
    return {
      id: page.id,
      title: page.title,
      meta: {
        type: 'notary.NotaryPage',
        slug: page.slug,
        seo_title: page.meta?.title || page.title,
        search_description: page.meta?.description || '',
      },
      color_theme: undefined,
      blocks: [...apiBlocks, ...mockBlocksToKeep],
      header_config: page.header_config,
      footer_config: page.footer_config,
    };
  } catch (error) {
    console.error("API error, using mock data:", error);
    return mockNotaryData;
  }
};
