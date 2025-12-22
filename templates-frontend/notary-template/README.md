# Notary Template - React + TypeScript + Tailwind CSS

A comprehensive, compliance-focused website template for Notary services in the USA, powered by Wagtail CMS.

## Features

### Phase 1 - Must-Have (Launch)
- ✅ Hero Block with multiple CTA options
- ✅ Verified Notary Credentials Block
- ✅ Services List Block
- ✅ Online Booking with calendar integration
- ✅ Contact & intake forms
- ✅ Secure document upload
- ✅ Stripe payment integration
- ✅ Reviews & testimonials
- ✅ Service area display
- ✅ FAQ accordion

### Phase 2 - Differentiation
- ✅ eSignature blocks
- ✅ Identity verification (OTP/KBA)
- ✅ Consent & disclosure blocks
- 🔄 Client portal login (coming soon)
- 🔄 Automation rules (coming soon)
- 🔄 Google Reviews sync (coming soon)

### Phase 3 - Platform
- 🔄 RON-ready intake workflows (coming soon)
- 🔄 Compliance audit trails (coming soon)
- 🔄 White-label controls (coming soon)
- 🔄 Multi-website mode (coming soon)

## Block Library

### Conversion & Trust Blocks
1. **Hero Block** - First impression with primary/secondary CTAs
2. **Verified Notary Credentials Block** - Trust & compliance display
3. **Testimonials Block** - Social proof (manual or Google Reviews)
4. **Service Area Block** - Local SEO + service coverage

### Service & Content Blocks
5. **Services List Block** - Service offerings with pricing
6. **FAQ Block** - Accordion-style Q&A
7. **Content Block** - Flexible rich text content

### Workflow Blocks (Core Differentiator)
8. **Booking & Calendar Block** - Appointment scheduling
9. **Secure Document Upload Block** - Pre-intake documents
10. **eSignature Block** - Embedded signing
11. **Payment Block** - Stripe integration

### Identity & Compliance Blocks
12. **Identity Verification Block** - OTP/KBA verification
13. **Consent & Disclosure Block** - Legal consent

### Engagement & Support Blocks
14. **Contact Form Block** - Lead capture
15. **Content Block** - Rich text content

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Wagtail Integration

The template fetches data from Wagtail CMS via REST API:

```typescript
// API endpoint
GET /api/v2/notary-pages/

// Response structure
{
  "meta": { "total_count": 1 },
  "items": [{
    "id": 1,
    "title": "Home",
    "color_theme": { ... },
    "blocks": [ ... ]
  }]
}
```

## Block Structure

Each block follows this pattern:

```typescript
{
  "type": "block_type",
  "value": {
    // Block-specific fields
  },
  "id": "unique-id"
}
```

## Theming

Dynamic theming via CSS variables:

```css
:root {
  --color-primary: #2563eb;
  --color-secondary: #7c3aed;
  --color-accent: #f59e0b;
  --color-neutral: #6b7280;
  --color-background: #ffffff;
  --color-text: #1f2937;
}
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS 3** - Styling
- **Vite** - Build tool
- **Lucide React** - Icons
- **Framer Motion** - Animations

## Project Structure

```
src/
├── components/
│   ├── blocks/          # All block components
│   ├── Navbar.tsx       # Navigation
│   └── Footer.tsx       # Footer
├── contexts/
│   └── ThemeContext.tsx # Theme management
├── types/
│   └── wagtail.ts       # TypeScript types & API
├── App.tsx              # Main app
└── index.css            # Global styles
```

## Development

```bash
# Start dev server
npm run dev

# Type checking
npm run build

# Lint code
npm run lint
```

## Deployment

The template is designed to work with:
- Vercel
- Netlify
- AWS Amplify
- Any static hosting

## Environment Variables

```env
VITE_API_URL=https://your-wagtail-backend.com/api/v2
```

## License

MIT

## Support

For issues or questions, contact support@notarytemplate.com
