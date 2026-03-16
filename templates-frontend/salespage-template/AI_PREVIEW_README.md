# AI Preview Implementation - Complete Guide

## 🎯 What Was Implemented

The AI Preview feature allows users to see AI-generated content rendered on the sales page template **before** saving it to the database. This implementation follows the **exact same pattern as the notary template**.

## 🚀 How It Works

### Architecture Pattern (Same as Notary Template)

1. **Always Fetch from API First** - The template always fetches the base page data from the API
2. **Apply AI Overrides** - If `ai_preview=true` is in the URL, AI-generated content overrides specific sections
3. **Preserve Existing Data** - All other sections remain intact from the API response
4. **No Database Changes** - Preview mode only modifies the display, never saves to database

### Flow Diagram
```
1. User opens preview URL with ai_preview=true
   ↓
2. Template fetches page data from API (normal flow)
   ↓
3. applyAiPreviewOverrides() function checks for ai_preview=true
   ↓
4. If true: Parse URL parameters and override specific sections
   ↓
5. Render page with overridden content
   ↓
6. User sees AI content in context of full page
```

## 📋 Implementation Details

### The applyAiPreviewOverrides Function

This function (inspired by notary template) does the following:

```typescript
const applyAiPreviewOverrides = (pageData: SalesPages): SalesPages => {
  // 1. Check if ai_preview=true
  const params = new URLSearchParams(window.location.search);
  if (params.get('ai_preview') !== 'true') {
    return pageData; // Return unchanged if not preview mode
  }

  // 2. Parse URL parameters
  const pageTitle = params.get('page_title');
  const heroTitle = params.get('hero_title');
  // ... etc

  // 3. Override specific sections while preserving others
  return {
    ...pageData, // Keep all existing data
    header_section: { ...pageData.header_section, title: pageTitle },
    main_hero_section: { ...pageData.main_hero_section, heading: heroTitle },
    // ... override only what's provided in URL
  };
};
```

## 🔄 Key Differences from Initial Implementation

### Before (Wrong Approach)
```typescript
if (ai_preview === 'true') {
  // Create page from scratch using only URL params
  // Skip API call entirely
} else {
  // Fetch from API
}
```

### After (Correct Approach - Like Notary Template)
```typescript
// Always fetch from API
const pageData = await fetchFromAPI();

// Then apply AI overrides if needed
const finalData = applyAiPreviewOverrides(pageData);
```

### Why This Approach is Better
1. **Preserves Context** - User sees AI content in context of full page with all sections
2. **Consistent Behavior** - Same API flow whether preview or not
3. **Better UX** - Shows how AI content fits with existing page structure
4. **Easier Debugging** - Single code path for data fetching

## 📋 URL Parameter Mapping

The following URL parameters override specific sections:

| URL Parameter | Overrides | Description |
|--------------|---------|-------------|
| `ai_preview` | Mode flag | Must be "true" to enable preview |
| `page_title` | header_section.title | Top banner title |
| `hero_title` | main_hero_section.heading | Main hero headline |
| `hero_subtitle` | main_hero_section.subheading | Hero subtitle |
| `hero_description` | main_hero_section.description | Hero description text |
| `cta_primary` | main_hero_section.button.text | Primary CTA button |
| `cta_secondary` | secondary_cta_section.button.text | Secondary CTA button |
| `features` | reusable_sections[0].cards | JSON array of features |
| `benefits` | reusable_sections[1].cards | JSON array of benefits |
| `testimonial` | reusable_sections[2].description | Customer testimonial (optional) |

## 📝 What Gets Overridden vs Preserved

### Overridden Sections (if URL params provided)
- Header banner title
- Hero section (title, subtitle, description, primary CTA)
- Secondary CTA button text
- Features section (replaces first reusable section)
- Benefits section (replaces second reusable section)
- Testimonial section (adds/replaces third reusable section)

### Preserved Sections (from API)
- Navigation menu
- Footer
- Images and styling
- All other reusable sections
- Card sections
- FAQ section
- Pricing section
- Calendar section
- Web form section
- Featured on section
- Gallery section

## 📁 Files Modified

### `src/components/Maverick.tsx`
- Added AI preview detection logic in `useEffect`
- Parses URL parameters when `ai_preview=true`
- Creates a complete `SalesPages` object from URL params
- Bypasses API calls in preview mode

## 🧪 Testing the Implementation

### Method 1: Using the Preview Generator (Recommended)

1. Open `preview-generator.html` in your browser
2. Fill in the form with your AI-generated content
3. Click "Generate Preview URL"
4. Click "Open Preview in New Tab"

### Method 2: Manual URL Construction

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Navigate to a URL like:
   ```
   http://localhost:5173/?ai_preview=true&page_title=My+Page&hero_title=Welcome&features=["Feature 1","Feature 2"]&benefits=["Benefit 1","Benefit 2"]
   ```

### Method 3: Integration with Your AI System

When your AI generates content, construct the preview URL:

```javascript
const generatePreviewUrl = (aiContent) => {
  const baseUrl = 'https://preview-salespage.notarywealthbuilder.com/';
  const params = new URLSearchParams({
    ai_preview: 'true',
    page_title: aiContent.pageTitle,
    hero_title: aiContent.heroTitle,
    hero_subtitle: aiContent.heroSubtitle,
    hero_description: aiContent.heroDescription,
    cta_primary: aiContent.ctaPrimary,
    cta_secondary: aiContent.ctaSecondary,
    features: JSON.stringify(aiContent.features),
    benefits: JSON.stringify(aiContent.benefits),
    testimonial: aiContent.testimonial || ''
  });
  
  return `${baseUrl}?${params.toString()}`;
};
```

## 🎨 What Users Will See

When users click the preview link, they'll see:

1. **Top Banner** - Page title in a prominent banner
2. **Hero Section** - Main headline, subtitle, description, and primary CTA
3. **Features Section** - "Key Features" heading with all features as cards
4. **Benefits Section** - "Benefits" heading with all benefits as cards
5. **Testimonial Section** - (If provided) "What Our Clients Say" with testimonial text
6. **Secondary CTA** - Secondary call-to-action button

## 🔧 Technical Details

### Data Structure Created
```typescript
{
  header_section: {
    title: string,
    button: { text: '', url: '' }
  },
  main_hero_section: {
    heading: string,
    subheading: string,
    description: string,
    button: { text: string, url: '' }
  },
  secondary_cta_section: {
    button: { text: string, url: '' }
  },
  reusable_sections: [
    {
      heading: 'Key Features',
      cards: [{ name: '', description: string }]
    },
    {
      heading: 'Benefits',
      cards: [{ name: '', description: string }]
    },
    {
      heading: 'What Our Clients Say',
      description: string
    }
  ]
}
```

### Array Parameter Format
Features and benefits must be valid JSON arrays:
```javascript
// Correct
features=["Feature 1","Feature 2","Feature 3"]

// Incorrect
features=Feature 1,Feature 2,Feature 3
```

## 🎯 Integration Steps

### Step 1: Generate Content with AI
Your AI system generates the content fields.

### Step 2: Show Preview Modal
Display a modal with:
- AI-generated content preview (text)
- "Open Visual Preview" button
- "Confirm & Implement" button

### Step 3: Generate Preview URL
When user clicks "Open Visual Preview":
```javascript
const previewUrl = generatePreviewUrl(aiGeneratedContent);
window.open(previewUrl, '_blank');
```

### Step 4: User Confirms
After reviewing the visual preview, user clicks "Confirm & Implement" to save to database.

## 📝 Example Implementation in Your AI Modal

```javascript
// In your AI content generation modal
const handleOpenVisualPreview = () => {
  const previewUrl = new URL('https://preview-salespage.notarywealthbuilder.com/');
  previewUrl.searchParams.set('ai_preview', 'true');
  previewUrl.searchParams.set('page_title', aiContent.pageTitle);
  previewUrl.searchParams.set('hero_title', aiContent.heroTitle);
  previewUrl.searchParams.set('hero_subtitle', aiContent.heroSubtitle);
  previewUrl.searchParams.set('hero_description', aiContent.heroDescription);
  previewUrl.searchParams.set('cta_primary', aiContent.ctaPrimary);
  previewUrl.searchParams.set('cta_secondary', aiContent.ctaSecondary);
  previewUrl.searchParams.set('features', JSON.stringify(aiContent.features));
  previewUrl.searchParams.set('benefits', JSON.stringify(aiContent.benefits));
  
  if (aiContent.testimonial) {
    previewUrl.searchParams.set('testimonial', aiContent.testimonial);
  }
  
  window.open(previewUrl.toString(), '_blank');
};
```

## ✅ Benefits

1. **User Confidence** - Users see exactly what will be implemented
2. **No Database Pollution** - Preview doesn't save anything
3. **Instant Feedback** - No waiting for API calls
4. **Easy Integration** - Just construct a URL with parameters
5. **Shareable** - Users can share preview links with team members

## 🐛 Troubleshooting

### Preview shows empty content
- Check that `ai_preview=true` is in the URL
- Verify URL parameters are properly encoded
- Check browser console for parsing errors

### Features/Benefits not showing
- Ensure arrays are valid JSON format
- Check that values are properly URL encoded
- Verify array items are not empty strings

### Special characters not displaying correctly
- Use `encodeURIComponent()` for all parameter values
- Ensure proper UTF-8 encoding

## 🎉 Success!

Your AI preview feature is now fully implemented and ready to use. Users can:
1. Generate content with AI
2. Click "Open Visual Preview"
3. See the rendered page in a new tab
4. Confirm and implement if satisfied

No more guessing what the final result will look like!
