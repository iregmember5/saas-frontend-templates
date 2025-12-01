import type { ColorTheme } from '../types/landing';

export const getThemeColor = (theme: ColorTheme | null | undefined, colorKey: keyof Omit<ColorTheme, 'id' | 'name'>, fallback: string): string => {
  if (!theme) return fallback;
  const color = theme[colorKey];
  if (colorKey === 'background_color' && color === '#6B7280') return '#FFFFFF';
  return color || fallback;
};

export const applyThemeStyles = (theme: ColorTheme | null | undefined) => {
  if (!theme) return {};
  
  return {
    '--color-primary': getThemeColor(theme, 'primary_color', '#3B82F6'),
    '--color-secondary': getThemeColor(theme, 'secondary_color', '#1E40AF'),
    '--color-accent': getThemeColor(theme, 'accent_color', '#10B981'),
    '--color-neutral': getThemeColor(theme, 'neutral_color', '#6B7280'),
    '--color-background': getThemeColor(theme, 'background_color', '#FFFFFF'),
    '--color-text': getThemeColor(theme, 'text_color', '#1F2937'),
  } as React.CSSProperties;
};

export const getGradient = (theme: ColorTheme | null | undefined, type: 'primary' | 'secondary' = 'primary'): string => {
  const primary = getThemeColor(theme, 'primary_color', '#3B82F6');
  const secondary = getThemeColor(theme, 'secondary_color', '#1E40AF');
  const accent = getThemeColor(theme, 'accent_color', '#10B981');
  
  if (type === 'primary') {
    return `linear-gradient(135deg, ${primary}, ${accent})`;
  }
  return `linear-gradient(135deg, ${secondary}, ${primary})`;
};
