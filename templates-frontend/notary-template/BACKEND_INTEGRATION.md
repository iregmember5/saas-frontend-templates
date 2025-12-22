# Backend Integration Guide

## API Endpoints

### Get Notary Page
```
GET /api/v2/notary-pages/
Headers:
  X-Frontend-Url: http://localhost:3000
```

### Create Appointment
```
POST /api/v2/notary-appointments/
Body: {
  "notary_page": 1,
  "client_name": "John Doe",
  "client_email": "john@example.com",
  "client_phone": "555-1234",
  "appointment_type": "office",
  "appointment_date": "2024-01-15T10:00:00Z",
  "duration": 30,
  "notes": "Need to notarize power of attorney"
}
```

### Upload Document
```
POST /api/v2/notary-documents/
Content-Type: multipart/form-data
Body: {
  "notary_page": 1,
  "client_name": "John Doe",
  "client_email": "john@example.com",
  "document_file": <file>,
  "document_type": "Power of Attorney"
}
```

## Backend Response Format

The Wagtail backend returns data in this structure:

```json
{
  "meta": { "total_count": 1 },
  "items": [{
    "id": 1,
    "title": "Professional Notary Services",
    "slug": "home",
    "hero": {
      "headline": "...",
      "subheadline": "...",
      "primary_cta": { "label": "...", "action": "book", "target": "" },
      "background_type": "gradient",
      "show_location_badge": true,
      "location_text": "📍 Serving California"
    },
    "credentials": {
      "notary_name": "John Smith",
      "state": "California",
      "license_number": "CA-123456789",
      "expiry_date": "2026-12-31",
      "certifications": ["NNA Certified", "Background Screened"],
      "display_badges": true,
      "disclaimer": "..."
    },
    "services": [...],
    "service_area": {
      "modes": { "office": true, "mobile": true, "ron": true },
      "cities": ["Los Angeles", "San Diego"],
      "travel_radius": 50,
      "show_map": true,
      "office_address": "..."
    },
    "booking": {...},
    "upload": {...},
    "testimonials": {...},
    "faq": {...},
    "payment": {...},
    "contact_form": {...},
    "appointments": [...],
    "documents": [...],
    "header_config": {...},
    "footer_config": {...},
    "color_theme": {...},
    "meta": {...}
  }]
}
```

## Frontend Integration Steps

1. **Enable Backend API** (in `src/types/wagtail.ts`):
   - Uncomment the backend integration code
   - Comment out the mock data line

2. **Update API URL** (if needed):
   ```typescript
   const baseApiUrl = "https://your-backend.com/api/v2";
   ```

3. **Test Connection**:
   ```bash
   npm run dev
   # Check browser console for API calls
   ```

## Appointment Booking Flow

1. User fills booking form → Frontend calls:
   ```typescript
   POST /api/v2/notary-appointments/
   ```

2. Backend creates appointment → Returns:
   ```json
   {
     "id": 123,
     "status": "pending",
     "appointment_date": "2024-01-15T10:00:00Z"
   }
   ```

3. Frontend shows confirmation

## Document Upload Flow

1. User drops file → Frontend calls:
   ```typescript
   POST /api/v2/notary-documents/
   ```

2. Backend stores file → Returns:
   ```json
   {
     "id": 456,
     "document_url": "/media/notary_documents/2024/01/15/doc.pdf",
     "status": "uploaded"
   }
   ```

3. Frontend shows success

## Environment Variables

Create `.env` file:
```
VITE_API_URL=https://your-backend.com/api/v2
VITE_FRONTEND_URL=http://localhost:3000
```

## CORS Configuration

Backend must allow:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://your-frontend.com",
]
```

## Ready to Deploy

When backend is ready:
1. Uncomment integration code in `wagtail.ts`
2. Update API URLs
3. Test all endpoints
4. Deploy!
