import React, { useState } from 'react';
import { useThemeColors } from '../contexts/ColorContext';

const ThemeSwitcher = ({ className = '' }) => {
  const { switchScheme, availableSchemes, currentScheme } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);

  const getSchemeDisplayName = (scheme) => {
    const names = {
      current: 'Current Palette',
      ocean: 'Ocean Blue',
      forest: 'Forest Green'
    };
    return names[scheme] || scheme;
  };

  const getSchemeDescription = (scheme) => {
    const descriptions = {
      current: 'Space Cadet, Tan & Coffee',
      ocean: 'Blue ocean theme',
      forest: 'Green forest theme'
    };
    return descriptions[scheme] || 'Custom theme';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all hover:scale-105"
        style={{
          backgroundColor: 'var(--color-tan-100)',
          borderColor: 'var(--color-coffee)',
          color: 'var(--color-charcoal)'
        }}
      >
        <span className="text-lg">🎨</span>
        <span className="font-medium">Theme</span>
        <span className="text-sm opacity-75">({getSchemeDisplayName(currentScheme)})</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Theme Options */}
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-80 rounded-lg shadow-xl border-2 z-50"
          style={{
            backgroundColor: 'var(--color-tan-100)',
            borderColor: 'var(--color-coffee)'
          }}
        >
          <div className="p-4">
            <h3 className="font-bold mb-3" style={{ color: 'var(--color-charcoal)' }}>
              Choose Color Scheme
            </h3>
            
            <div className="space-y-2">
              {availableSchemes.map(scheme => (
                <button
                  key={scheme}
                  onClick={() => {
                    switchScheme(scheme);
                    setIsOpen(false);
                  }}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    scheme === currentScheme ? 'ring-2 ring-offset-2' : ''
                  } hover:scale-102`}
                  style={{
                    backgroundColor: scheme === currentScheme 
                      ? 'var(--color-caput-mortuum)' 
                      : 'var(--color-tan-50)',
                    borderColor: scheme === currentScheme
                      ? 'var(--color-caput-mortuum)'
                      : 'var(--color-coffee)',
                    color: scheme === currentScheme
                      ? 'white'
                      : 'var(--color-charcoal)',
                    ringColor: scheme === currentScheme
                      ? 'var(--color-caput-mortuum)'
                      : 'transparent'
                  }}
                >
                  <div className="font-medium">
                    {getSchemeDisplayName(scheme)}
                    {scheme === currentScheme && ' ✓'}
                  </div>
                  <div className="text-sm opacity-75">
                    {getSchemeDescription(scheme)}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t text-xs" style={{ borderColor: 'var(--color-coffee)' }}>
              <p style={{ color: 'var(--color-slate-500)' }}>
                💡 Tip: Colors change instantly across the entire site!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
