# Loader Component

A comprehensive, reusable React loader component with multiple animation types, colors, and sizes.

## Features

- ✅ **7 Different Loader Types** - Spinner, Dots, Bars, Pulse, Wave, Bounce, Skeleton
- ✅ **Multiple Colors** - Primary, Secondary, Success, Danger, Warning, Info, White
- ✅ **4 Size Options** - Small, Medium, Large, XLarge
- ✅ **Overlay Mode** - Full-screen overlay with backdrop
- ✅ **Custom Text** - Optional loading text
- ✅ **Accessibility** - Respects reduced motion preferences
- ✅ **Responsive** - Works on all screen sizes
- ✅ **Dark Mode** - Automatic dark mode support

## Installation

```jsx
import Loader from './Shared Component/Loader';
import './Shared Component/Loader.css';
```

## Basic Usage

```jsx
// Simple spinner
<Loader />

// With text
<Loader text="Loading..." />

// Different type
<Loader type="dots" text="Processing..." />

// Custom color and size
<Loader type="bars" color="success" size="large" text="Saving..." />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | "spinner" | Loader animation type |
| `size` | string | "medium" | Loader size |
| `color` | string | "primary" | Loader color theme |
| `text` | string | "" | Optional loading text |
| `overlay` | boolean | false | Show as full-screen overlay |
| `className` | string | "" | Additional CSS classes |

## Loader Types

### 1. Spinner (Default)
```jsx
<Loader type="spinner" />
```
Classic rotating ring spinner.

### 2. Dots
```jsx
<Loader type="dots" />
```
Three bouncing dots animation.

### 3. Bars
```jsx
<Loader type="bars" />
```
Four vertical bars with wave animation.

### 4. Pulse
```jsx
<Loader type="pulse" />
```
Pulsing circle animation.

### 5. Wave
```jsx
<Loader type="wave" />
```
Five bars with wave-like animation.

### 6. Bounce
```jsx
<Loader type="bounce" />
```
Three dots with bouncing animation.

### 7. Skeleton
```jsx
<Loader type="skeleton" />
```
Content placeholder with shimmer effect.

## Colors

- `primary` - Blue gradient (default)
- `secondary` - Gray
- `success` - Green
- `danger` - Red
- `warning` - Yellow
- `info` - Cyan
- `white` - White

## Sizes

- `small` - Compact size
- `medium` - Standard size (default)
- `large` - Larger size
- `xlarge` - Extra large size

## Overlay Mode

```jsx
<Loader 
  type="spinner"
  text="Loading data..."
  overlay={true}
  color="primary"
  size="large"
/>
```

The overlay mode creates a full-screen loader with:
- Semi-transparent backdrop
- Blur effect
- Centered loader with white background
- High z-index (9999)

## Advanced Usage

### Custom Styling
```jsx
<Loader 
  type="pulse" 
  color="danger" 
  size="large"
  text="Custom Loader"
  className="my-custom-loader"
/>
```

### Skeleton Loader for Content
```jsx
<div style={{ maxWidth: '400px' }}>
  <Loader type="skeleton" />
</div>
```

### Conditional Loading
```jsx
const [isLoading, setIsLoading] = useState(false);

return (
  <div>
    {isLoading ? (
      <Loader type="dots" text="Loading data..." />
    ) : (
      <div>Content loaded!</div>
    )}
  </div>
);
```

### API Loading State
```jsx
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  setLoading(true);
  try {
    const response = await api.getData();
    // Handle response
  } finally {
    setLoading(false);
  }
};

return (
  <div>
    <button onClick={fetchData}>Load Data</button>
    {loading && <Loader type="spinner" text="Fetching data..." />}
  </div>
);
```

## CSS Custom Properties

You can customize colors using CSS variables:

```css
:root {
  --loader-primary: #667eea;
  --loader-secondary: #6c757d;
  --loader-success: #28a745;
  --loader-danger: #dc3545;
  --loader-warning: #ffc107;
  --loader-info: #17a2b8;
}
```

## Accessibility

- Respects `prefers-reduced-motion` setting
- Proper ARIA labels for screen readers
- Keyboard navigation support
- High contrast support

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- IE11+ (with CSS Grid polyfill)

## Performance

- Lightweight CSS animations
- No external dependencies
- Optimized for 60fps animations
- Minimal bundle impact

## Examples

See `LoaderExample.jsx` for comprehensive usage examples including:
- All loader types
- Different colors and sizes
- Overlay implementation
- Custom styling
- Real-world usage patterns

## Best Practices

1. **Use appropriate loader types:**
   - `spinner` for general loading
   - `dots` for quick operations
   - `skeleton` for content placeholders
   - `pulse` for single actions

2. **Provide meaningful text:**
   ```jsx
   <Loader text="Saving your changes..." />
   ```

3. **Use overlay for blocking operations:**
   ```jsx
   <Loader overlay={true} text="Processing payment..." />
   ```

4. **Match loader to your brand:**
   ```jsx
   <Loader color="primary" size="large" />
   ```

5. **Consider user experience:**
   - Show loaders for operations > 200ms
   - Use skeleton loaders for content
   - Provide progress feedback when possible
