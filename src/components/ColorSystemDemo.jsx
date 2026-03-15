import React from 'react';
import { useThemeColors, ColorProvider } from '../contexts/ColorContext';

// Demo component showing color usage
const ColorDemo = () => {
  const { theme, switchScheme, availableSchemes, currentScheme } = useThemeColors();

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h3 className="text-xl font-bold mb-4" style={{ color: theme.textPrimary }}>
        Color System Demo
      </h3>
      
      {/* Current Scheme Info */}
      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: theme.bgLight }}>
        <p className="font-semibold mb-2">Current Scheme: {currentScheme}</p>
        <div className="flex flex-wrap gap-2">
          {availableSchemes.map(scheme => (
            <button
              key={scheme}
              onClick={() => switchScheme(scheme)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                scheme === currentScheme 
                  ? 'text-white' 
                  : 'text-gray-700'
              }`}
              style={{
                backgroundColor: scheme === currentScheme ? theme.accentPrimary : theme.borderLight
              }}
            >
              {scheme}
            </button>
          ))}
        </div>
      </div>

      {/* Color Palette Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div 
            className="w-full h-20 rounded mb-2" 
            style={{ backgroundColor: theme.main }}
          />
          <p className="text-sm font-medium">Primary</p>
          <p className="text-xs text-gray-600">{theme.main}</p>
        </div>
        
        <div className="text-center">
          <div 
            className="w-full h-20 rounded mb-2" 
            style={{ backgroundColor: theme.bgMain }}
          />
          <p className="text-sm font-medium">Background</p>
          <p className="text-xs text-gray-600">{theme.bgMain}</p>
        </div>
        
        <div className="text-center">
          <div 
            className="w-full h-20 rounded mb-2" 
            style={{ backgroundColor: theme.accentPrimary }}
          />
          <p className="text-sm font-medium">Accent</p>
          <p className="text-xs text-gray-600">{theme.accentPrimary}</p>
        </div>
        
        <div className="text-center">
          <div 
            className="w-full h-20 rounded mb-2 border-2" 
            style={{ 
              backgroundColor: theme.bgLight,
              borderColor: theme.borderDark 
            }}
          />
          <p className="text-sm font-medium">Border</p>
          <p className="text-xs text-gray-600">{theme.borderDark}</p>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="mt-6 space-y-3">
        <h4 className="font-semibold" style={{ color: theme.textPrimary }}>
          Usage Examples:
        </h4>
        
        <button
          className="px-4 py-2 rounded text-white font-medium transition-colors hover:opacity-90"
          style={{ backgroundColor: theme.accentPrimary }}
        >
          Primary Button
        </button>
        
        <div 
          className="p-3 rounded border-2"
          style={{ 
            backgroundColor: theme.bgLight,
            borderColor: theme.borderMedium,
            color: theme.textPrimary
          }}
        >
          Card with theme colors
        </div>
        
        <p style={{ color: theme.textMuted }}>
          Muted text example
        </p>
      </div>
    </div>
  );
};

// Wrapper component with ColorProvider
const ColorSystemDemo = () => {
  return (
    <ColorProvider>
      <ColorDemo />
    </ColorProvider>
  );
};

export default ColorSystemDemo;
