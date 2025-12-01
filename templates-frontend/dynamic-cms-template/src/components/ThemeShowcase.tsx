import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeColor, getGradient } from '../utils/themeUtils';

/**
 * ThemeShowcase Component
 * Demonstrates all dynamic theming capabilities
 * Use this as a reference for implementing theme colors in your components
 */
const ThemeShowcase: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="p-8 space-y-8 bg-theme-background">
      <h1 className="text-4xl font-bold text-theme-text mb-8">
        Dynamic Theme Showcase
      </h1>

      {/* Method 1: Tailwind Classes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-theme-primary">
          Method 1: Tailwind Classes
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-theme-primary text-white p-4 rounded-lg">
            Primary
          </div>
          <div className="bg-theme-secondary text-white p-4 rounded-lg">
            Secondary
          </div>
          <div className="bg-theme-accent text-white p-4 rounded-lg">
            Accent
          </div>
          <div className="bg-theme-neutral text-white p-4 rounded-lg">
            Neutral
          </div>
          <div className="bg-theme-background border-2 border-theme-neutral p-4 rounded-lg">
            Background
          </div>
          <div className="gradient-theme-primary text-white p-4 rounded-lg">
            Gradient
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-theme-primary">Primary text color</p>
          <p className="text-theme-secondary">Secondary text color</p>
          <p className="text-theme-accent">Accent text color</p>
          <p className="text-theme-neutral">Neutral text color</p>
          <p className="text-theme-text">Default text color</p>
        </div>
      </section>

      {/* Method 2: CSS Variables */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
          Method 2: CSS Variables
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div 
            className="p-4 rounded-lg text-white"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Primary
          </div>
          <div 
            className="p-4 rounded-lg text-white"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            Secondary
          </div>
          <div 
            className="p-4 rounded-lg text-white"
            style={{ 
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' 
            }}
          >
            Custom Gradient
          </div>
        </div>
      </section>

      {/* Method 3: Theme Utilities */}
      <section className="space-y-4">
        <h2 
          className="text-2xl font-bold"
          style={{ color: getThemeColor(theme, 'primary_color', '#3B82F6') }}
        >
          Method 3: Theme Utilities
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div 
            className="p-4 rounded-lg text-white"
            style={{ 
              backgroundColor: getThemeColor(theme, 'primary_color', '#3B82F6') 
            }}
          >
            Primary
          </div>
          <div 
            className="p-4 rounded-lg text-white"
            style={{ 
              backgroundColor: getThemeColor(theme, 'secondary_color', '#1E40AF') 
            }}
          >
            Secondary
          </div>
          <div 
            className="p-4 rounded-lg text-white"
            style={{ 
              background: getGradient(theme, 'primary') 
            }}
          >
            Gradient Primary
          </div>
          <div 
            className="p-4 rounded-lg text-white"
            style={{ 
              background: getGradient(theme, 'secondary') 
            }}
          >
            Gradient Secondary
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-theme-primary">
          Button Examples
        </h2>
        
        <div className="flex flex-wrap gap-4">
          <button className="bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg transition-colors">
            Primary Button
          </button>
          
          <button className="gradient-theme-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Gradient Button
          </button>
          
          <button className="border-2 border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-white px-6 py-3 rounded-lg transition-all">
            Outline Button
          </button>
          
          <button 
            className="text-white px-6 py-3 rounded-lg transition-all hover:shadow-lg"
            style={{ background: getGradient(theme, 'secondary') }}
          >
            Custom Gradient
          </button>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-theme-primary">
          Card Examples
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-theme-background border-2 border-theme-neutral rounded-xl p-6 hover:border-theme-primary transition-colors">
            <h3 className="text-xl font-bold text-theme-primary mb-2">
              Themed Card
            </h3>
            <p className="text-theme-text mb-4">
              This card uses dynamic theme colors for all elements.
            </p>
            <button className="bg-theme-accent text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Learn More
            </button>
          </div>
          
          <div 
            className="rounded-xl p-6 text-white"
            style={{ background: getGradient(theme, 'primary') }}
          >
            <h3 className="text-xl font-bold mb-2">
              Gradient Card
            </h3>
            <p className="mb-4 opacity-90">
              This card has a dynamic gradient background.
            </p>
            <button className="bg-white text-theme-primary px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Theme Info */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-theme-primary">
          Current Theme
        </h2>
        
        {theme && (
          <div className="bg-theme-background border-2 border-theme-neutral rounded-xl p-6">
            <h3 className="text-lg font-bold text-theme-text mb-4">
              {theme.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-theme-neutral mb-1">Primary</p>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: theme.primary_color }}
                  />
                  <code className="text-xs">{theme.primary_color}</code>
                </div>
              </div>
              <div>
                <p className="text-sm text-theme-neutral mb-1">Secondary</p>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: theme.secondary_color }}
                  />
                  <code className="text-xs">{theme.secondary_color}</code>
                </div>
              </div>
              <div>
                <p className="text-sm text-theme-neutral mb-1">Accent</p>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: theme.accent_color }}
                  />
                  <code className="text-xs">{theme.accent_color}</code>
                </div>
              </div>
              <div>
                <p className="text-sm text-theme-neutral mb-1">Neutral</p>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: theme.neutral_color }}
                  />
                  <code className="text-xs">{theme.neutral_color}</code>
                </div>
              </div>
              <div>
                <p className="text-sm text-theme-neutral mb-1">Background</p>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: theme.background_color }}
                  />
                  <code className="text-xs">{theme.background_color}</code>
                </div>
              </div>
              <div>
                <p className="text-sm text-theme-neutral mb-1">Text</p>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded border"
                    style={{ backgroundColor: theme.text_color }}
                  />
                  <code className="text-xs">{theme.text_color}</code>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ThemeShowcase;
