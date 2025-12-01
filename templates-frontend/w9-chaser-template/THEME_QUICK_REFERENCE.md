# 🎨 Dynamic Theme - Quick Reference Card

## 🚀 Quick Start

```tsx
// 1. Import (if using utilities)
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColor, getGradient } from '../utils/themeUtils';

// 2. Use in component
const { theme } = useTheme();
```

## 📋 Cheat Sheet

### Tailwind Classes

```tsx
// Backgrounds
bg-theme-primary
bg-theme-secondary
bg-theme-accent
bg-theme-neutral
bg-theme-background

// Text
text-theme-primary
text-theme-secondary
text-theme-accent
text-theme-neutral
text-theme-text

// Borders
border-theme-primary
border-theme-secondary
border-theme-accent
border-theme-neutral

// Gradients
gradient-theme-primary    // primary → accent
gradient-theme-secondary  // secondary → primary
```

### CSS Variables

```css
var(--color-primary)
var(--color-secondary)
var(--color-accent)
var(--color-neutral)
var(--color-background)
var(--color-text)
```

### Utility Functions

```tsx
getThemeColor(theme, 'primary_color', '#3B82F6')
getThemeColor(theme, 'secondary_color', '#1E40AF')
getThemeColor(theme, 'accent_color', '#10B981')
getThemeColor(theme, 'neutral_color', '#6B7280')
getThemeColor(theme, 'background_color', '#FFFFFF')
getThemeColor(theme, 'text_color', '#1F2937')

getGradient(theme, 'primary')    // primary → accent
getGradient(theme, 'secondary')  // secondary → primary
```

## 🎯 Common Patterns

### Button
```tsx
<button className="bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg">
  Click Me
</button>
```

### Gradient Button
```tsx
<button className="gradient-theme-primary text-white px-6 py-3 rounded-lg">
  Click Me
</button>
```

### Card
```tsx
<div className="bg-theme-background border-2 border-theme-neutral rounded-xl p-6">
  <h3 className="text-theme-primary text-xl font-bold mb-2">Title</h3>
  <p className="text-theme-text">Description</p>
</div>
```

### Section
```tsx
<section className="py-20 bg-theme-background">
  <h2 className="text-4xl font-bold text-theme-primary mb-4">Title</h2>
  <p className="text-theme-neutral">Description</p>
</section>
```

### Hero with Gradient
```tsx
<section className="gradient-theme-primary text-white py-20">
  <h1 className="text-5xl font-bold">Hero Title</h1>
</section>
```

## 🎨 Color Usage Guide

| Color | When to Use |
|-------|-------------|
| **Primary** | Main CTAs, primary buttons, key headings, brand elements |
| **Secondary** | Secondary buttons, hover states, alternative actions |
| **Accent** | Highlights, success states, badges, special features |
| **Neutral** | Subtle text, borders, dividers, secondary content |
| **Background** | Page backgrounds, card backgrounds |
| **Text** | Body text, headings, main content |

## ⚡ Pro Tips

1. **Use Tailwind classes** for simple cases
2. **Use CSS variables** for inline styles
3. **Use utilities** for complex logic
4. **Always provide fallbacks**
5. **Test with different themes**
6. **Maintain good contrast**

## 🔗 Full Documentation

- `DYNAMIC_THEME_README.md` - Complete guide
- `THEME_USAGE_GUIDE.md` - Detailed usage
- `MIGRATION_GUIDE.md` - Migration help
- `ThemeShowcase.tsx` - Live examples

---

**Need help?** Check the full documentation or see `ThemeShowcase.tsx` for examples!
