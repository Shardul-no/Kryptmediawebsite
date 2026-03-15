/**
 * Centralized Color Palette Configuration
 * 
 * Update colors here and they'll be reflected across the entire application
 * through CSS custom properties and Tailwind utilities.
 */

export const COLOR_PALETTE = {
  // Primary Colors
  primary: {
    main: '#25344F',        // Space Cadet - Primary dark / main text
    muted: '#617891',       // Slate Gray - Secondary text / muted elements
  },
  
  // Background Colors
  background: {
    main: '#f0e6d6',       // Tan-100 - Main background
    light: '#f5ede0',      // Tan-50 - Light background
    medium: '#D5B893',     // Tan-200 - Cards / surfaces
    dark: '#c9a97a',       // Tan-300 - Darker backgrounds
  },
  
  // Accent Colors
  accent: {
    primary: '#632024',     // Caput Mortuum - Primary action / buttons / highlights
    secondary: '#6F4D38',   // Coffee - Borders / hover states / secondary accents
  },
  
  // Text Colors
  text: {
    primary: '#25344F',     // Space Cadet - Main text
    secondary: '#617891',   // Slate Gray - Secondary text
    muted: '#617891',       // Slate Gray - Muted text
  },
  
  // Border Colors
  border: {
    light: '#6F4D3830',    // Coffee with opacity
    medium: '#6F4D3850',   // Coffee with higher opacity
    dark: '#6F4D38',        // Solid Coffee
  }
};

// CSS Custom Properties Generator
export const generateCSSVariables = () => {
  return `
@theme {
  /* Background Colors */
  --color-tan-50: ${COLOR_PALETTE.background.light};
  --color-tan-100: ${COLOR_PALETTE.background.main};
  --color-tan-200: ${COLOR_PALETTE.background.medium};
  --color-tan-300: ${COLOR_PALETTE.background.dark};
  
  /* Primary Colors */
  --color-slate-400: ${COLOR_PALETTE.primary.muted};
  --color-slate-500: ${COLOR_PALETTE.text.secondary};
  --color-slate-600: ${COLOR_PALETTE.primary.main};
  --color-slate-700: #1a2a3f;
  
  /* Text Colors */
  --color-charcoal: ${COLOR_PALETTE.text.primary};
  --color-charcoal-muted: ${COLOR_PALETTE.text.muted};
  --color-space-cadet: ${COLOR_PALETTE.primary.main};
  
  /* Accent Colors */
  --color-coffee: ${COLOR_PALETTE.accent.secondary};
  --color-caput-mortuum: ${COLOR_PALETTE.accent.primary};
}`;
};

// Tailwind Color Extensions
export const tailwindColors = {
  tan: {
    50: COLOR_PALETTE.background.light,
    100: COLOR_PALETTE.background.main,
    200: COLOR_PALETTE.background.medium,
    300: COLOR_PALETTE.background.dark,
  },
  slate: {
    400: COLOR_PALETTE.primary.muted,
    500: COLOR_PALETTE.text.secondary,
    600: COLOR_PALETTE.primary.main,
    700: '#1a2a3f',
  },
  'space-cadet': COLOR_PALETTE.primary.main,
  coffee: COLOR_PALETTE.accent.secondary,
  charcoal: COLOR_PALETTE.text.primary,
  'charcoal-muted': COLOR_PALETTE.text.muted,
  'caput-mortuum': COLOR_PALETTE.accent.primary,
};

// Utility functions for programmatic color access
export const getColor = (path) => {
  const keys = path.split('.');
  let value = COLOR_PALETTE;
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      console.warn(`Color path "${path}" not found in COLOR_PALETTE`);
      return null;
    }
  }
  
  return value;
};

// Preset color schemes for easy switching
export const COLOR_SCHEMES = {
  current: COLOR_PALETTE,
  
  // Alternative schemes for future use
  ocean: {
    primary: {
      main: '#1e3a8a',
      muted: '#64748b',
    },
    background: {
      main: '#f0f9ff',
      light: '#ffffff',
      medium: '#e0f2fe',
      dark: '#bae6fd',
    },
    accent: {
      primary: '#0284c7',
      secondary: '#0ea5e9',
    },
    text: {
      primary: '#1e3a8a',
      secondary: '#64748b',
      muted: '#94a3b8',
    },
    border: {
      light: '#0ea5e930',
      medium: '#0ea5e950',
      dark: '#0ea5e9',
    }
  },
  
  forest: {
    primary: {
      main: '#14532d',
      muted: '#64748b',
    },
    background: {
      main: '#f0fdf4',
      light: '#ffffff',
      medium: '#dcfce7',
      dark: '#bbf7d0',
    },
    accent: {
      primary: '#16a34a',
      secondary: '#22c55e',
    },
    text: {
      primary: '#14532d',
      secondary: '#64748b',
      muted: '#94a3b8',
    },
    border: {
      light: '#22c55e30',
      medium: '#22c55e50',
      dark: '#22c55e',
    }
  }
};

// Function to switch color schemes dynamically
export const switchColorScheme = (schemeName) => {
  const scheme = COLOR_SCHEMES[schemeName];
  if (!scheme) {
    console.error(`Color scheme "${schemeName}" not found`);
    return false;
  }
  
  // Update the CSS variables
  const root = document.documentElement;
  Object.entries(scheme).forEach(([category, colors]) => {
    Object.entries(colors).forEach(([variant, color]) => {
      const cssVarName = `--color-${category}-${variant}`;
      root.style.setProperty(cssVarName, color);
    });
  });
  
  return true;
};