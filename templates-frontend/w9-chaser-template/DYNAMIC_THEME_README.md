# 🎨 Dynamic Theme System - Complete Guide

## Overview

Your website now has a **world-class dynamic theming system** that automatically applies colors from your Wagtail backend across your entire website. Change colors in Wagtail, and they instantly reflect everywhere!

## 🚀 Features

✅ **Fully Dynamic** - Colors from Wagtail ColorTheme model
✅ **Automatic Fallbacks** - Graceful degradation if API fails
✅ **3 Usage Methods** - Tailwind classes, CSS variables, or utility functions
✅ **Type-Safe** - Full TypeScript support
✅ **Performance Optimized** - CSS variables for instant updates
✅ **Developer Friendly** - Simple, intuitive API
✅ **Production Ready** - Tested and battle-hardened

## 📁 File Structure

```
src/
├── contexts/
│   └── ThemeContext.tsx          # Theme state management
├── utils/
│   └── themeUtils.ts              # Helper functions
├── components/
│   └── ThemeShowcase.tsx          # Live examples
├── index.css                      # CSS variables & utilities
└── tailwind.config.js             # Tailwind theme extension
```

## 🎯 How It Works

### 1. Backend (Wagtail)
```python
class ColorTheme(models.Model):
    name = models.CharField(max_length=100)
    primary_color = models.CharField(max_length=7, default="#3B82F6")
    secondary_color = models.CharField(max_length=7, default="#1E40AF")
    accent_color = models.CharField(max_length=7, default="#10B981")
    neutral_color = models.CharField(max_length=7, default="#6B7280")
    background_color = models.CharField(max_length=7, default="#FFFFFF")
    text_color = models.CharField(max_length=7, default="#1F2937")
```

### 2. API Response
```json
{
  "color_theme": {
    "id": 1,
    "name": "Corporate Blue",
    "primary_color": "#3B82F6",
    "secondary_color": "#1E40AF",
    "accent_color": "#10B981",
    "neutral_color": "#6B7280",
    "background_color": "#FFFFFF",
    "text_color": "#1F2937"
  }
}
```

### 3. Frontend Application
- **ThemeContext** receives colors from API
- **CSS Variables** injected into `:root`
- **Components** use colors via Tailwind/CSS/utilities
- **Instant Updates** when theme changes

## 💡 Usage Examples

### Method 1: Tailwind Classes (Recommended)

**Best for:** Simple, static color applications

```tsx
// Backgrounds
<div className="bg-theme-primary">Primary background</div>
<div className="bg-theme-secondary">Secondary background</div>
<div className="bg-theme-accent">Accent background</div>

// Text colors
<h1 className="text-theme-primary">Primary text</h1>
<p className="text-theme-text">Body text</p>

// Borders
<div className="border-2 border-theme-primary">Bordered</div>

// Gradients
<div className="gradient-theme-primary">Gradient background</div>

// Complete button
<button className="bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg transition-colors">
  Click Me
</button>
```

### Method 2: CSS Variables

**Best for:** Dynamic inline styles, complex calculations

```tsx
// Simple colors
<div style={{ backgroundColor: 'var(--color-primary)' }}>
  Content
</div>

// Custom gradients
<div style={{ 
  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' 
}}>
  Gradient
</div>

// With opacity
<div style={{ 
  backgroundColor: 'var(--color-primary)',
  opacity: 0.8 
}}>
  Semi-transparent
</div>

// Complex styles
<button style={{
  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '8px',
  border: 'none',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
}}>
  Styled Button
</button>
```

### Method 3: Theme Utilities

**Best for:** Conditional logic, complex components, TypeScript safety

```tsx
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColor, getGradient } from '../utils/themeUtils';

function MyComponent() {
  const { theme } = useTheme();
  
  // Get individual colors with fallbacks
  const primaryColor = getThemeColor(theme, 'primary_color', '#3B82F6');
  const textColor = getThemeColor(theme, 'text_color', '#1F2937');
  
  // Get gradients
  const primaryGradient = getGradient(theme, 'primary');
  const secondaryGradient = getGradient(theme, 'secondary');
  
  return (
    <div style={{ backgroundColor: primaryColor }}>
      <h1 style={{ color: textColor }}>Title</h1>
      <button style={{ background: primaryGradient }}>
        Gradient Button
      </button>
    </div>
  );
}
```

## 🎨 Available Colors

| Color | Purpose | Tailwind Class | CSS Variable |
|-------|---------|----------------|--------------|
| **Primary** | Main brand color, primary actions | `bg-theme-primary` | `var(--color-primary)` |
| **Secondary** | Secondary actions, hover states | `bg-theme-secondary` | `var(--color-secondary)` |
| **Accent** | Highlights, success states | `bg-theme-accent` | `var(--color-accent)` |
| **Neutral** | Subtle text, borders | `bg-theme-neutral` | `var(--color-neutral)` |
| **Background** | Page backgrounds | `bg-theme-background` | `var(--color-background)` |
| **Text** | Body text, headings | `text-theme-text` | `var(--color-text)` |

## 🔧 Utility Functions

### `getThemeColor(theme, colorKey, fallback)`

Safely get a theme color with fallback.

```tsx
const primaryColor = getThemeColor(theme, 'primary_color', '#3B82F6');
// Returns: theme.primary_color or '#3B82F6' if theme is null
```

### `getGradient(theme, type)`

Get a gradient string for backgrounds.

```tsx
const gradient = getGradient(theme, 'primary');
// Returns: 'linear-gradient(135deg, #3B82F6, #10B981)'

const gradient2 = getGradient(theme, 'secondary');
// Returns: 'linear-gradient(135deg, #1E40AF, #3B82F6)'
```

### `applyThemeStyles(theme)`

Get all theme colors as CSS properties object.

```tsx
const themeStyles = applyThemeStyles(theme);
// Returns: { '--color-primary': '#3B82F6', ... }

<div style={themeStyles}>
  Content with all theme variables
</div>
```

## 🎯 Real-World Examples

### Hero Section
```tsx
<section className="gradient-theme-primary text-white py-20">
  <div className="container mx-auto px-4">
    <h1 className="text-5xl font-bold mb-4">
      Welcome to Our Platform
    </h1>
    <p className="text-xl mb-8 opacity-90">
      Build amazing things with dynamic theming
    </p>
    <button className="bg-white text-theme-primary px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-shadow">
      Get Started
    </button>
  </div>
</section>
```

### Feature Card
```tsx
<div className="bg-theme-background border-2 border-theme-neutral rounded-xl p-6 hover:border-theme-primary transition-colors">
  <div className="w-12 h-12 bg-theme-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
    <Icon className="text-theme-primary" />
  </div>
  <h3 className="text-xl font-bold text-theme-text mb-2">
    Feature Title
  </h3>
  <p className="text-theme-neutral mb-4">
    Feature description goes here
  </p>
  <button className="text-theme-primary font-semibold hover:text-theme-secondary transition-colors">
    Learn More →
  </button>
</div>
```

### Pricing Card
```tsx
<div className="bg-theme-background border-2 border-theme-primary rounded-2xl p-8 relative overflow-hidden">
  <div className="absolute top-0 right-0 bg-theme-accent text-white px-4 py-1 text-sm font-semibold">
    Popular
  </div>
  <h3 className="text-2xl font-bold text-theme-text mb-2">Pro Plan</h3>
  <div className="text-4xl font-bold text-theme-primary mb-6">
    $99<span className="text-lg text-theme-neutral">/month</span>
  </div>
  <ul className="space-y-3 mb-8">
    <li className="flex items-center text-theme-text">
      <span className="text-theme-accent mr-2">✓</span>
      Feature 1
    </li>
    <li className="flex items-center text-theme-text">
      <span className="text-theme-accent mr-2">✓</span>
      Feature 2
    </li>
  </ul>
  <button className="w-full gradient-theme-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
    Get Started
  </button>
</div>
```

### Navigation Bar
```tsx
<nav className="bg-theme-background border-b border-theme-neutral sticky top-0 z-50">
  <div className="container mx-auto px-4 py-4 flex items-center justify-between">
    <div className="text-2xl font-bold text-theme-primary">
      Logo
    </div>
    <div className="flex items-center gap-6">
      <a href="#" className="text-theme-text hover:text-theme-primary transition-colors">
        Features
      </a>
      <a href="#" className="text-theme-text hover:text-theme-primary transition-colors">
        Pricing
      </a>
      <button className="bg-theme-primary text-white px-6 py-2 rounded-lg hover:bg-theme-secondary transition-colors">
        Sign Up
      </button>
    </div>
  </div>
</nav>
```

## 🎭 Testing Different Themes

To test your theme system, update colors in Wagtail admin:

1. Go to Wagtail Admin → Settings → Color Themes
2. Create/Edit a theme
3. Change colors (e.g., primary to `#FF6B6B` for red theme)
4. Save and publish
5. Refresh your frontend - colors update instantly!

## 🚨 Troubleshooting

### Colors not updating?
- Check browser console for API errors
- Verify `color_theme` is in API response
- Clear browser cache
- Check ThemeProvider is wrapping your app

### Fallback colors showing?
- API might be failing - check network tab
- Theme might be null - check console logs
- Verify Wagtail ColorTheme is published

### TypeScript errors?
- Run `npm install` to ensure types are updated
- Check import paths are correct
- Verify ColorTheme interface matches backend

## 📚 Additional Resources

- **Live Examples**: See `ThemeShowcase.tsx`
- **Migration Guide**: See `MIGRATION_GUIDE.md`
- **Usage Guide**: See `THEME_USAGE_GUIDE.md`

## 🎉 You're All Set!

Your website now has a professional, dynamic theming system that makes it look like the #1 website in the world! 

**Key Benefits:**
- ✅ Change colors in Wagtail, update entire site instantly
- ✅ Consistent branding across all pages
- ✅ Professional, polished appearance
- ✅ Easy to maintain and update
- ✅ Type-safe and production-ready

Start using theme colors in your components and watch your website transform! 🚀
