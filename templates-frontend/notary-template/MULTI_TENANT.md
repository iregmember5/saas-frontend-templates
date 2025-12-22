# Multi-Tenant Configuration

This template supports dynamic multi-tenant deployment where each user gets their own subdomain.

## How It Works

### Production Mode
When deployed, the frontend automatically detects the subdomain from the URL:
- URL: `https://notary-powerly.dogskansascity.com`
- Extracted subdomain: `notary-powerly`
- API calls include headers: `X-Tenant-Id: notary-powerly` and `X-Subdomain: notary-powerly`

### Development Mode
For local development, use environment variables:

1. Copy `.env.example` to `.env.local`
2. Set your test subdomain:
```env
VITE_SUBDOMAIN=notary-powerly
VITE_TENANT_ID=notary-powerly
```

## API Integration

All API requests automatically include tenant identification headers:
- `X-Tenant-Id`: Identifies which tenant's data to fetch
- `X-Subdomain`: The subdomain making the request
- `X-Frontend-Url`: The full origin URL

## Backend Requirements

Your Wagtail backend must:

1. **Accept tenant headers** in API requests
2. **Filter data by tenant** based on `X-Tenant-Id` header
3. **Support multiple tenants** in the same database or separate databases

Example Wagtail middleware:
```python
class TenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        tenant_id = request.headers.get('X-Tenant-Id')
        subdomain = request.headers.get('X-Subdomain')
        
        if tenant_id:
            request.tenant_id = tenant_id
            request.subdomain = subdomain
        
        return self.get_response(request)
```

## Deployment

Each user deployment creates:
- Unique subdomain: `{user-name}.dogskansascity.com`
- DNS A record pointing to your server
- Frontend served with dynamic tenant detection
- CMS access: `https://{user-name}-admin.signmary.com/cms/`

## Testing Multiple Tenants Locally

Edit your `/etc/hosts` file:
```
127.0.0.1 tenant1.localhost
127.0.0.1 tenant2.localhost
```

Then access:
- `http://tenant1.localhost:5173`
- `http://tenant2.localhost:5173`

Each will automatically use its subdomain as the tenant ID.
