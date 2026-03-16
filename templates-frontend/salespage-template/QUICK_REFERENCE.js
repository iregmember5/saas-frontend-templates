// ============================================
// AI PREVIEW QUICK REFERENCE
// ============================================

// 1. BASIC PREVIEW URL STRUCTURE
// ============================================
const baseUrl = 'http://localhost:5173/';
const previewUrl = `${baseUrl}?ai_preview=true&page_title=...&hero_title=...`;

// 2. COMPLETE EXAMPLE
// ============================================
function generatePreviewUrl(content) {
  const params = new URLSearchParams({
    ai_preview: 'true',
    page_title: content.pageTitle,
    hero_title: content.heroTitle,
    hero_subtitle: content.heroSubtitle,
    hero_description: content.heroDescription,
    cta_primary: content.ctaPrimary,
    cta_secondary: content.ctaSecondary,
    features: JSON.stringify(content.features),
    benefits: JSON.stringify(content.benefits),
    testimonial: content.testimonial || ''
  });
  
  return `http://localhost:5173/?${params.toString()}`;
}

// 3. USAGE IN YOUR AI MODAL
// ============================================
const handlePreview = () => {
  const aiContent = {
    pageTitle: "Email Marketing Agency: ROI Driven",
    heroTitle: "Unlock Explosive Growth",
    heroSubtitle: "Struggling with low engagement?",
    heroDescription: "We specialize in data-driven campaigns...",
    ctaPrimary: "Claim Your Strategy Session",
    ctaSecondary: "Explore Our Services",
    features: [
      "Get a personalized email strategy",
      "Implement advanced email automation",
      "Receive transparent, data-driven reports"
    ],
    benefits: [
      "Stop guessing and start selling",
      "Achieve predictable revenue streams",
      "Benefit from our proprietary A/B testing"
    ],
    testimonial: "This agency transformed our email strategy!"
  };
  
  const previewUrl = generatePreviewUrl(aiContent);
  window.open(previewUrl, '_blank');
};

// 4. REACT COMPONENT EXAMPLE
// ============================================
import React from 'react';

const AIPreviewButton = ({ aiGeneratedContent }) => {
  const openPreview = () => {
    const params = new URLSearchParams({
      ai_preview: 'true',
      page_title: aiGeneratedContent.pageTitle,
      hero_title: aiGeneratedContent.heroTitle,
      hero_subtitle: aiGeneratedContent.heroSubtitle,
      hero_description: aiGeneratedContent.heroDescription,
      cta_primary: aiGeneratedContent.ctaPrimary,
      cta_secondary: aiGeneratedContent.ctaSecondary,
      features: JSON.stringify(aiGeneratedContent.features),
      benefits: JSON.stringify(aiGeneratedContent.benefits),
    });
    
    if (aiGeneratedContent.testimonial) {
      params.append('testimonial', aiGeneratedContent.testimonial);
    }
    
    const url = `${window.location.origin}/?${params.toString()}`;
    window.open(url, '_blank');
  };
  
  return (
    <button onClick={openPreview} className="preview-button">
      🔍 Open Visual Preview in New Tab
    </button>
  );
};

// 5. PARAMETER REFERENCE
// ============================================
/*
REQUIRED PARAMETERS:
- ai_preview: 'true' (enables preview mode)

CONTENT PARAMETERS:
- page_title: string (top banner)
- hero_title: string (main headline)
- hero_subtitle: string (subtitle)
- hero_description: string (description)
- cta_primary: string (primary button text)
- cta_secondary: string (secondary button text)
- features: JSON array of strings
- benefits: JSON array of strings
- testimonial: string (optional)

EXAMPLE ARRAYS:
features: ["Feature 1", "Feature 2", "Feature 3"]
benefits: ["Benefit 1", "Benefit 2", "Benefit 3"]
*/

// 6. VALIDATION HELPER
// ============================================
function validatePreviewContent(content) {
  const required = [
    'pageTitle',
    'heroTitle',
    'heroSubtitle',
    'heroDescription',
    'ctaPrimary',
    'features',
    'benefits'
  ];
  
  const missing = required.filter(field => !content[field]);
  
  if (missing.length > 0) {
    console.error('Missing required fields:', missing);
    return false;
  }
  
  if (!Array.isArray(content.features) || content.features.length === 0) {
    console.error('Features must be a non-empty array');
    return false;
  }
  
  if (!Array.isArray(content.benefits) || content.benefits.length === 0) {
    console.error('Benefits must be a non-empty array');
    return false;
  }
  
  return true;
}

// 7. FULL INTEGRATION EXAMPLE
// ============================================
const AIContentModal = ({ aiContent, onConfirm }) => {
  const handleOpenPreview = () => {
    if (!validatePreviewContent(aiContent)) {
      alert('Please ensure all required fields are filled');
      return;
    }
    
    const previewUrl = generatePreviewUrl(aiContent);
    window.open(previewUrl, '_blank');
  };
  
  const handleConfirmImplementation = async () => {
    // Save to database via API
    const response = await fetch('/api/sales-pages/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aiContent)
    });
    
    if (response.ok) {
      onConfirm();
    }
  };
  
  return (
    <div className="modal">
      <h2>AI Generated Content Preview</h2>
      
      <div className="content-preview">
        <h3>{aiContent.pageTitle}</h3>
        <p>{aiContent.heroTitle}</p>
        {/* ... show other fields ... */}
      </div>
      
      <div className="actions">
        <button onClick={handleOpenPreview} className="btn-preview">
          🔍 Open Visual Preview in New Tab
        </button>
        <button onClick={handleConfirmImplementation} className="btn-confirm">
          ✅ Confirm & Implement
        </button>
      </div>
    </div>
  );
};

// 8. TESTING CHECKLIST
// ============================================
/*
✅ Preview URL opens in new tab
✅ Page title appears in top banner
✅ Hero section displays correctly
✅ Features section shows all features
✅ Benefits section shows all benefits
✅ Testimonial appears (if provided)
✅ CTA buttons have correct text
✅ No API calls are made
✅ Page loads instantly
✅ Special characters display correctly
*/

// 9. COMMON ISSUES & SOLUTIONS
// ============================================
/*
ISSUE: Features/Benefits not showing
SOLUTION: Ensure arrays are JSON.stringify'd before adding to URL

ISSUE: Special characters broken
SOLUTION: Use URLSearchParams (handles encoding automatically)

ISSUE: Preview shows old data
SOLUTION: Clear browser cache or use incognito mode

ISSUE: URL too long error
SOLUTION: Consider limiting content length or using POST method
*/

// 10. PRODUCTION DEPLOYMENT
// ============================================
/*
1. Update baseUrl to production domain:
   const baseUrl = 'https://preview-salespage.notarywealthbuilder.com/';

2. Ensure CORS is configured if calling from different domain

3. Test with real AI-generated content

4. Monitor URL length (browsers have ~2000 char limit)

5. Consider implementing URL shortening for very long content
*/
