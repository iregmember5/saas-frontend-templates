export interface ApiConfig {
  cmsUrl: string;
  subdomain: string;
  tenantId: string;
}

export const getApiConfig = (): ApiConfig => {
  const hostname = window.location.hostname;
  
  // Determine if we're in development or production
  const isDevelopment = import.meta.env.DEV || hostname === 'localhost' || hostname.includes('localhost');
  
  if (isDevelopment) {
    return {
      cmsUrl: import.meta.env.VITE_CMS_URL || 'https://esign-admin.signmary.com/blogs/api/v2',
      subdomain: import.meta.env.VITE_SUBDOMAIN || 'demo',
      tenantId: import.meta.env.VITE_TENANT_ID || 'demo',
    };
  }
  
  // Extract full subdomain (handles: notary, notary-powerly, notary-powerly-john, etc.)
  // For "notary-powerly-john.dogskansascity.com" -> "notary-powerly-john"
  // For "notary.dogskansascity.com" -> "notary"
  const parts = hostname.split('.');
  const subdomain = parts.length > 2 ? parts.slice(0, -2).join('.') : parts[0];
  
  return {
    cmsUrl: `https://esign-admin.signmary.com/blogs/api/v2`,
    subdomain: subdomain,
    tenantId: subdomain,
  };
};
