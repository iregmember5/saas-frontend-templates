# AI Preview Feature Guide

## Overview
The AI Preview feature allows users to see AI-generated content rendered on the sales page template before saving it to the database.

## How It Works

When `ai_preview=true` is present in the URL parameters, the application will:
1. Skip the API fetch
2. Parse content from URL parameters
3. Display the AI-generated content immediately

## URL Parameters

### Required Parameter
- `ai_preview=true` - Enables preview mode

### Content Parameters
- `page_title` - Page title (shown in header banner)
- `hero_title` - Main hero heading
- `hero_subtitle` - Hero subtitle text
- `hero_description` - Hero description text
- `cta_primary` - Primary call-to-action button text
- `cta_secondary` - Secondary call-to-action button text
- `features` - JSON array of feature descriptions
- `benefits` - JSON array of benefit descriptions
- `testimonial` - Customer testimonial text (optional)

## Example URL

```
http://localhost:5173/?ai_preview=true&page_title=Email+Marketing+Agency%3A+ROI+Driven&hero_title=Unlock+Explosive+Growth&hero_subtitle=Struggling+with+low+engagement&hero_description=We+specialize+in+data-driven+campaigns&cta_primary=Claim+Your+Strategy+Session&cta_secondary=Explore+Our+Services&features=["Feature 1","Feature 2"]&benefits=["Benefit 1","Benefit 2"]&testimonial=Great+service!
```

## Implementation Details

### Data Structure
The preview creates a `SalesPages` object with:
- **header_section**: Contains page title
- **main_hero_section**: Hero content (title, subtitle, description, CTA)
- **secondary_cta_section**: Secondary CTA button
- **reusable_sections**: Two sections for Features and Benefits
- **testimonial section**: Added if testimonial parameter exists

### Features Section
- Heading: "Key Features"
- Cards created from `features` array parameter
- Each feature becomes a card with description

### Benefits Section
- Heading: "Benefits"
- Cards created from `benefits` array parameter
- Each benefit becomes a card with description

### Testimonial Section
- Heading: "What Our Clients Say"
- Description contains the testimonial text
- Only added if `testimonial` parameter is provided

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open the preview URL with your AI-generated content parameters

3. The page should render immediately without API calls

## Notes

- All URL parameters should be properly URL-encoded
- Arrays (features, benefits) must be valid JSON format
- Empty or missing parameters will result in empty sections
- The preview does NOT save data to the database
- Users can see exactly what will be implemented before confirming
