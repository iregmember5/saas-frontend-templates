# Dynamic Theme Usage Guide

## Overview
Your website now supports dynamic theming from Wagtail backend. Colors are automatically applied across all components.

## How It Works

### 1. Backend (Wagtail)
Define colors in your `ColorTheme` model:
```python
class ColorTheme(models.Model):
    primary_color = "#3B82F6"
    secondary_color = "#1E40AF"
    accent_color = "#10B981"
    neutral_color = "#6B7280"
    background_color = "#FFFFFF"
    text_color = "#1F2937"
```

### 2. Frontend (React)
Colors are automatically injected as CSS variables and available throughout your app.

## Usage Methods

### Method 1: Tailwind Classes (Recommended)
```tsx
<div className="bg-theme-primary text-white">
  Primary colored background
</div>

<button className="bg-theme-accent hover:bg-theme-secondary">
  Accent button
</button>

<h1 className="text-theme-text">
  Dynamic text color
</h1>
```

### Method 2: CSS Variables
```tsx
<div style={{ backgroundColor: 'var(--color-primary)' }}>
  Primary background
</div>

<button style={{ 
  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' 
}}>
  Gradient button
</button>
```

### Method 3: Theme Utilities (For Complex Logic)
```tsx
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColor, getGradient } from '../utils/themeUtils';

function MyComponent() {
  const { theme } = useTheme();
  
  return (
    <div style={{
      backgroundColor: getThemeColor(theme, 'primary_color', '#3B82F6'),
      background: getGradient(theme, 'primary')
    }}>
      Content
    </div>
  );
}
```

## Available Tailwind Classes

### Background Colors
- `bg-theme-primary`
- `bg-theme-secondary`
- `bg-theme-accent`
- `bg-theme-neutral`
- `bg-theme-background`

### Text Colors
- `text-theme-primary`
- `text-theme-secondary`
- `text-theme-accent`
- `text-theme-neutral`
- `text-theme-text`

### Border Colors
- `border-theme-primary`
- `border-theme-secondary`
- `border-theme-accent`
- `border-theme-neutral`

### Gradients
- `gradient-theme-primary` (primary → accent)
- `gradient-theme-secondary` (secondary → primary)

## CSS Variables
- `--color-primary`
- `--color-secondary`
- `--color-accent`
- `--color-neutral`
- `--color-background`
- `--color-text`

## Examples

### Button with Dynamic Colors
```tsx
<button className="bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg transition-colors">
  Click Me
</button>
```

### Card with Theme Colors
```tsx
<div className="bg-theme-background border-2 border-theme-neutral rounded-xl p-6">
  <h3 className="text-theme-primary text-2xl font-bold mb-2">Title</h3>
  <p className="text-theme-text">Description text</p>
  <button className="gradient-theme-primary text-white px-4 py-2 rounded mt-4">
    Action
  </button>
</div>
```

### Gradient Background
```tsx
<section className="gradient-theme-primary text-white py-20">
  <h2 className="text-4xl font-bold">Hero Section</h2>
</section>
```

## Best Practices

1. **Always use theme colors** instead of hardcoded colors
2. **Provide fallbacks** when using utility functions
3. **Test with different themes** to ensure good contrast
4. **Use semantic naming** (primary for main actions, accent for highlights)
5. **Maintain accessibility** - ensure text has sufficient contrast

## Fallback Strategy
All theme utilities include fallback colors:
- Primary: `#3B82F6` (Blue)
- Secondary: `#1E40AF` (Dark Blue)
- Accent: `#10B981` (Green)
- Neutral: `#6B7280` (Gray)
- Background: `#FFFFFF` (White)
- Text: `#1F2937` (Dark Gray)

These ensure your site looks great even if theme data fails to load.
