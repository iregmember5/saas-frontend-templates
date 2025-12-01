import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ColorTheme } from '../types/landing';

interface ThemeContextType {
  theme: ColorTheme | null;
  setTheme: (theme: ColorTheme | null) => void;
}

const defaultTheme: ColorTheme = {
  id: 0,
  name: 'Default',
  primary_color: '#3B82F6',
  secondary_color: '#1E40AF',
  accent_color: '#10B981',
  neutral_color: '#6B7280',
  background_color: '#FFFFFF',
  text_color: '#1F2937',
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ColorTheme | null>(defaultTheme);

  useEffect(() => {
    if (theme) {
      const root = document.documentElement;
      root.style.setProperty('--color-primary', theme.primary_color);
      root.style.setProperty('--color-secondary', theme.secondary_color);
      root.style.setProperty('--color-accent', theme.accent_color);
      root.style.setProperty('--color-neutral', theme.neutral_color);
      root.style.setProperty('--color-background', theme.background_color === '#6B7280' ? '#FFFFFF' : theme.background_color);
      root.style.setProperty('--color-text', theme.text_color);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
