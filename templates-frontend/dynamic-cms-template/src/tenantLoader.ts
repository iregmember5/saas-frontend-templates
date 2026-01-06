import { getApiConfig } from './config/api';

const API_URL = import.meta.env.VITE_API_URL || "https://api.yourdomain.com";

export async function loadTenantData() {
  const { subdomain, tenantId } = getApiConfig();
  const domain = window.location.hostname;

  const response = await fetch(
    `${API_URL}/api/tenant/by-domain/?domain=${domain}`,
    {
      headers: {
        'X-Tenant-Id': tenantId,
        'X-Subdomain': subdomain,
      },
    }
  );

  return response.json();
}

export function applyTenantStyles(tenant: any) {
  const root = document.documentElement;
  root.style.setProperty("--primary-color", tenant.primary_color);
  root.style.setProperty("--secondary-color", tenant.secondary_color);
  document.title = tenant.company_name;
}
