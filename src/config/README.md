# 🎨 Centralized Color System

This project now includes a centralized color management system that makes it easy to change and maintain color palettes across the entire application.

## 📁 File Structure

```
src/
├── config/
│   └── colors.js          # Centralized color configuration
├── contexts/
│   └── ColorContext.jsx    # React context for color management
├── components/
│   └── ColorSystemDemo.jsx # Demo component showing usage
└── index.css              # CSS custom properties
```

## 🚀 How to Use

### 1. **Update Colors Globally**

Edit `src/config/colors.js` to change colors:

```javascript
export const COLOR_PALETTE = {
  primary: {
    main: '#25344F',        // Change this to update primary color
    muted: '#617891',       // Change this to update muted color
  },
  background: {
    main: '#f0e6d6',       // Change main background color
    light: '#f5ede0',      // Change light background
    medium: '#D5B893',     // Change card/surface background
    dark: '#c9a97a',       // Change dark background
  },
  accent: {
    primary: '#632024',     // Change primary accent (buttons, highlights)
    secondary: '#6F4D38',   // Change secondary accent (borders, hover)
  },
  // ... more colors
};
```

### 2. **Use in Components**

#### Method A: Using React Context (Recommended)

```jsx
import { useThemeColors } from '../contexts/ColorContext';

function MyComponent() {
  const { theme } = useThemeColors();
  
  return (
    <div style={{ backgroundColor: theme.bgMain }}>
      <h1 style={{ color: theme.textPrimary }}>Hello World</h1>
      <button style={{ backgroundColor: theme.accentPrimary }}>
        Click Me
      </button>
    </div>
  );
}
```

#### Method B: Using CSS Classes (Current Approach)

```jsx
function MyComponent() {
  return (
    <div className="bg-tan-100 text-charcoal">
      <h1 className="text-charcoal">Hello World</h1>
      <button className="bg-caput-mortuum text-white">
        Click Me
      </button>
    </div>
  );
}
```

#### Method C: Using CSS Custom Properties

```jsx
function MyComponent() {
  return (
    <div style={{ backgroundColor: 'var(--color-tan-100)' }}>
      <h1 style={{ color: 'var(--color-charcoal)' }}>Hello World</h1>
      <button style={{ backgroundColor: 'var(--color-caput-mortuum)' }}>
        Click Me
      </button>
    </div>
  );
}
```

### 3. **Switch Color Schemes Dynamically**

```jsx
import { useThemeColors } from '../contexts/ColorContext';

function ThemeSwitcher() {
  const { switchScheme, availableSchemes, currentScheme } = useThemeColors();
  
  return (
    <div>
      <p>Current: {currentScheme}</p>
      {availableSchemes.map(scheme => (
        <button key={scheme} onClick={() => switchScheme(scheme)}>
          Switch to {scheme}
        </button>
      ))}
    </div>
  );
}
```

## 🎨 Available Color Schemes

The system includes predefined color schemes:

- **current** - Current Space Cadet/Tan/Coffee palette
- **ocean** - Blue-based color scheme
- **forest** - Green-based color scheme

## 🛠️ Advanced Usage

### Get Specific Colors Programmatically

```javascript
import { getColor } from '../config/colors';

const primaryColor = getColor('primary.main'); // '#25344F'
const backgroundColor = getColor('background.main'); // '#f0e6d6'
```

### Update Individual Colors

```javascript
import { updateColor } from '../contexts/ColorContext';

function MyComponent() {
  const { updateColor } = useThemeColors();
  
  const handleColorChange = () => {
    updateColor('accent.primary', '#ff0000'); // Change accent to red
  };
  
  return <button onClick={handleColorChange}>Make Accent Red</button>;
}
```

### Create Custom Color Schemes

```javascript
// In src/config/colors.js
export const COLOR_SCHEMES = {
  // ... existing schemes
  
  myCustomScheme: {
    primary: {
      main: '#1a1a1a',
      muted: '#666666',
    },
    background: {
      main: '#ffffff',
      light: '#f8f8f8',
      medium: '#f0f0f0',
      dark: '#e0e0e0',
    },
    accent: {
      primary: '#ff6b6b',
      secondary: '#4ecdc4',
    },
    // ... rest of the colors
  }
};
```

## 🔄 Migration Benefits

### Before (Manual Updates)
- Had to search and replace colors in 20+ files
- Easy to miss some references
- No way to preview changes easily
- Inconsistent color usage

### After (Centralized System)
- ✅ Change colors in ONE place
- ✅ Instant preview with dynamic switching
- ✅ Consistent color usage guaranteed
- ✅ Easy to create and test new palettes
- ✅ Programmatic color access
- ✅ Type-safe color references

## 🚀 Quick Start

1. **Try the demo component:**
   ```jsx
   import ColorSystemDemo from './components/ColorSystemDemo';
   
   // Add to any page to see the color system in action
   <ColorSystemDemo />
   ```

2. **Update colors:**
   - Edit `src/config/colors.js`
   - Changes apply immediately

3. **Switch themes:**
   - Use the `switchScheme()` function
   - Try different predefined schemes

## 💡 Tips

- **For production:** Use CSS classes for better performance
- **For prototyping:** Use the React context for easy experimentation
- **For dynamic theming:** Combine both approaches
- **For accessibility:** Ensure sufficient contrast ratios in your color schemes

## 🔧 Future Enhancements

- Dark mode support
- User preference persistence
- Accessibility-focused color schemes
- Brand color extraction from images
- AI-powered color palette generation
