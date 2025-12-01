import type { ColorTheme, Theme } from "../../../types/features-page";

export const createTheme = (colorTheme?: ColorTheme): Theme => ({
  primaryColor: colorTheme?.primary_color || "#3B82F6",
  secondaryColor: colorTheme?.secondary_color || "#1E40AF",
  accentColor: colorTheme?.accent_color || "#10B981",
  textColor: colorTheme?.text_color || "#1F2937",
  neutralColor: colorTheme?.neutral_color || "#6B7280",
  bgColor: colorTheme?.background_color || "#FFFFFF",
});

export const getGradientBg = (
  primaryColor: string,
  accentColor: string
): string => `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`;

export const getGradientHover = (
  primaryColor: string,
  accentColor: string
): string => `linear-gradient(135deg, ${accentColor} 0%, ${primaryColor} 100%)`;
