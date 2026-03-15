import React, { createContext, useContext, useState, useEffect } from 'react';
import { COLOR_PALETTE, COLOR_SCHEMES, switchColorScheme } from '../config/colors';

// Create context for color theme
const ColorContext = createContext();

export const useColors = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColors must be used within a ColorProvider');
  }
  return context;
};

export const ColorProvider = ({ children }) => {
  const [currentScheme, setCurrentScheme] = useState('current');
  const [colors, setColors] = useState(COLOR_PALETTE);

  // Function to switch color schemes
  const switchScheme = (schemeName) => {
    const success = switchColorScheme(schemeName);
    if (success) {
      setCurrentScheme(schemeName);
      setColors(COLOR_SCHEMES[schemeName]);
    }
    return success;
  };

  // Function to get a specific color
  const getColor = (path) => {
    const keys = path.split('.');
    let value = colors;
    
    for (const key of keys) {
      value = value[key];
      if (value === undefined) {
        console.warn(`Color path "${path}" not found in current color scheme`);
        return null;
      }
    }
    
    return value;
  };

  // Function to update a specific color in the current scheme
  const updateColor = (path, newColor) => {
    const keys = path.split('.');
    const newColors = { ...colors };
    let current = newColors;
    
    // Navigate to the parent of the target
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
      if (!current) {
        console.error(`Cannot update color path "${path}" - path not found`);
        return false;
      }
    }
    
    // Update the target color
    const lastKey = keys[keys.length - 1];
    current[lastKey] = newColor;
    
    // Update state and CSS variables
    setColors(newColors);
    const cssVarName = `--color-${path.replace('.', '-')}`;
    document.documentElement.style.setProperty(cssVarName, newColor);
    
    return true;
  };

  // Apply colors on mount and when scheme changes
  useEffect(() => {
    // Apply all colors as CSS variables
    Object.entries(colors).forEach(([category, colorGroup]) => {
      Object.entries(colorGroup).forEach(([variant, color]) => {
        const cssVarName = `--color-${category}-${variant}`;
        document.documentElement.style.setProperty(cssVarName, color);
      });
    });
  }, [colors]);

  const value = {
    colors,
    currentScheme,
    availableSchemes: Object.keys(COLOR_SCHEMES),
    switchScheme,
    getColor,
    updateColor,
    // Convenience getters
    primary: colors.primary,
    background: colors.background,
    accent: colors.accent,
    text: colors.text,
    border: colors.border,
  };

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
};

// Hook for easy color access in components
export const useThemeColors = () => {
  const { getColor, primary, background, accent, text, border } = useColors();
  
  return {
    // Direct access to color categories
    primary,
    background,
    accent,
    text,
    border,
    
    // Dynamic color access
    getColor,
    
    // Common color combinations
    theme: {
      main: primary.main,
      muted: primary.muted,
      bgMain: background.main,
      bgLight: background.light,
      bgMedium: background.medium,
      accentPrimary: accent.primary,
      accentSecondary: accent.secondary,
      textPrimary: text.primary,
      textSecondary: text.secondary,
      textMuted: text.muted,
      borderLight: border.light,
      borderMedium: border.medium,
      borderDark: border.dark,
    }
  };
};
