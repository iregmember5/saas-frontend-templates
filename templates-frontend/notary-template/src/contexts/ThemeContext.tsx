import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ColorTheme } from '../types/wagtail';

interface ThemeContextType {
  theme: ColorTheme | null;
  setTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ColorTheme | null>(null);

  useEffect(() => {
    if (theme) {
      document.documentElement.style.setProperty('--color-primary', theme.primary_color);
      document.documentElement.style.setProperty('--color-secondary', theme.secondary_color);
      document.documentElement.style.setProperty('--color-accent', theme.accent_color);
      document.documentElement.style.setProperty('--color-neutral', theme.neutral_color);
      document.documentElement.style.setProperty('--color-background', theme.background_color);
      document.documentElement.style.setProperty('--color-text', theme.text_color);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
