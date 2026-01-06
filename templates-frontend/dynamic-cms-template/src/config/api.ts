export interface ApiConfig {
  cmsUrl: string;
  subdomain: string;
  tenantId: string;
}

export const getApiConfig = (): ApiConfig => {
  const hostname = window.location.hostname;
  
  const isDevelopment = import.meta.env.DEV || hostname === 'localhost' || hostname.includes('localhost');
  
  if (isDevelopment) {
    return {
      cmsUrl: import.meta.env.VITE_CMS_URL || 'https://esign-admin.signmary.com/blogs/api/v2',
      subdomain: import.meta.env.VITE_SUBDOMAIN || 'demo',
      tenantId: import.meta.env.VITE_TENANT_ID || 'demo',
    };
  }
  
  const parts = hostname.split('.');
  const subdomain = parts.length > 2 ? parts.slice(0, -2).join('.') : parts[0];
  
  return {
    cmsUrl: `https://esign-admin.signmary.com/blogs/api/v2`,
    subdomain: subdomain,
    tenantId: subdomain,
  };
};
