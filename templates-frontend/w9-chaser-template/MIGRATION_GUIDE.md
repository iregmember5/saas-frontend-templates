# Migration Guide: Converting to Dynamic Theme System

## Quick Start

Your dynamic theme system is now live! Here's how to migrate existing components:

## Step 1: Import Theme Utilities

Add these imports to your component:

```tsx
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColor, getGradient } from '../utils/themeUtils';
```

## Step 2: Replace Hardcoded Colors

### Before:
```tsx
const MyComponent = () => {
  return (
    <div style={{ backgroundColor: '#3B82F6' }}>
      <h1 style={{ color: '#1F2937' }}>Title</h1>
      <button style={{ background: 'linear-gradient(135deg, #3B82F6, #10B981)' }}>
        Click Me
      </button>
    </div>
  );
};
```

### After (Method 1 - Tailwind Classes):
```tsx
const MyComponent = () => {
  return (
    <div className="bg-theme-primary">
      <h1 className="text-theme-text">Title</h1>
      <button className="gradient-theme-primary text-white">
        Click Me
      </button>
    </div>
  );
};
```

### After (Method 2 - CSS Variables):
```tsx
const MyComponent = () => {
  return (
    <div style={{ backgroundColor: 'var(--color-primary)' }}>
      <h1 style={{ color: 'var(--color-text)' }}>Title</h1>
      <button style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' }}>
        Click Me
      </button>
    </div>
  );
};
```

### After (Method 3 - Theme Utilities):
```tsx
const MyComponent = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{ backgroundColor: getThemeColor(theme, 'primary_color', '#3B82F6') }}>
      <h1 style={{ color: getThemeColor(theme, 'text_color', '#1F2937') }}>Title</h1>
      <button style={{ background: getGradient(theme, 'primary') }}>
        Click Me
      </button>
    </div>
  );
};
```

## Step 3: Update Existing Color Props

### Before:
```tsx
const primaryColor = color_theme?.primary_color || "#3B82F6";
const textColor = color_theme?.text_color || "#1F2937";
```

### After:
```tsx
const primaryColor = getThemeColor(color_theme, 'primary_color', '#3B82F6');
const textColor = getThemeColor(color_theme, 'text_color', '#1F2937');
```

## Common Patterns

### Pattern 1: Buttons
```tsx
// Tailwind approach
<button className="bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg">
  Click Me
</button>

// Gradient button
<button className="gradient-theme-primary text-white px-6 py-3 rounded-lg">
  Click Me
</button>

// Utility approach
<button style={{ background: getGradient(theme, 'primary') }} className="text-white px-6 py-3 rounded-lg">
  Click Me
</button>
```

### Pattern 2: Cards
```tsx
<div className="bg-theme-background border-2 border-theme-neutral rounded-xl p-6">
  <h3 className="text-theme-primary text-xl font-bold mb-2">Title</h3>
  <p className="text-theme-text mb-4">Description</p>
  <button className="bg-theme-accent text-white px-4 py-2 rounded">
    Action
  </button>
</div>
```

### Pattern 3: Sections
```tsx
<section className="py-20 bg-theme-background">
  <div className="container mx-auto">
    <h2 className="text-4xl font-bold text-theme-primary mb-4">
      Section Title
    </h2>
    <p className="text-theme-neutral text-lg">
      Section description
    </p>
  </div>
</section>
```

### Pattern 4: Gradients
```tsx
// Background gradient
<div className="gradient-theme-primary text-white p-8 rounded-xl">
  Content
</div>

// Custom gradient with utilities
<div style={{ background: getGradient(theme, 'secondary') }} className="text-white p-8 rounded-xl">
  Content
</div>

// Text gradient
<h1 className="text-4xl font-bold bg-clip-text text-transparent" 
    style={{ backgroundImage: getGradient(theme, 'primary') }}>
  Gradient Text
</h1>
```

## Color Mapping Reference

| Old Hardcoded | New Tailwind Class | CSS Variable | Utility Function |
|---------------|-------------------|--------------|------------------|
| `#3B82F6` | `bg-theme-primary` | `var(--color-primary)` | `getThemeColor(theme, 'primary_color', '#3B82F6')` |
| `#1E40AF` | `bg-theme-secondary` | `var(--color-secondary)` | `getThemeColor(theme, 'secondary_color', '#1E40AF')` |
| `#10B981` | `bg-theme-accent` | `var(--color-accent)` | `getThemeColor(theme, 'accent_color', '#10B981')` |
| `#6B7280` | `bg-theme-neutral` | `var(--color-neutral)` | `getThemeColor(theme, 'neutral_color', '#6B7280')` |
| `#FFFFFF` | `bg-theme-background` | `var(--color-background)` | `getThemeColor(theme, 'background_color', '#FFFFFF')` |
| `#1F2937` | `text-theme-text` | `var(--color-text)` | `getThemeColor(theme, 'text_color', '#1F2937')` |

## Components Already Updated

✅ App.tsx - ThemeProvider wrapper
✅ LandingPage.tsx - Theme context integration
✅ Header.tsx - Dynamic colors with utilities
✅ Features.tsx - Dynamic colors with utilities

## Components to Update

Update these components following the patterns above:

- [ ] Benefits.tsx
- [ ] CardSections.tsx
- [ ] CTA.tsx
- [ ] FAQ.tsx
- [ ] Footer.tsx
- [ ] GlassNavbar.tsx
- [ ] HowItWorks.tsx
- [ ] Pricing.tsx
- [ ] ProblemSolution.tsx
- [ ] Testimonials.tsx
- [ ] VideoSection.tsx
- [ ] All components in features/ directory

## Testing Checklist

After migration, test:

1. ✅ Colors load from Wagtail API
2. ✅ Fallback colors work when API fails
3. ✅ Theme changes reflect immediately
4. ✅ All gradients render correctly
5. ✅ Text contrast is readable
6. ✅ Hover states use theme colors
7. ✅ Mobile responsive with theme colors

## Pro Tips

1. **Prefer Tailwind classes** for simple color applications
2. **Use CSS variables** for dynamic inline styles
3. **Use utility functions** when you need conditional logic
4. **Always provide fallbacks** in utility functions
5. **Test with different themes** to ensure good contrast
6. **Use semantic colors** (primary for actions, accent for highlights)

## Need Help?

Check `ThemeShowcase.tsx` for live examples of all theming methods!
