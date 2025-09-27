# Card Component

A comprehensive, reusable React card component with multiple variants, sizes, and interactive features.

## Features

- ✅ **6 Card Variants** - Default, Elevated, Outlined, Flat, Gradient, Glass
- ✅ **5 Size Options** - Small, Medium, Large, XL, Full
- ✅ **Interactive Features** - Hover effects, clickable cards, loading states
- ✅ **Flexible Structure** - Header, body, footer, actions, image support
- ✅ **Accessibility** - Keyboard navigation, ARIA labels, focus management
- ✅ **Responsive** - Mobile-first design with adaptive layouts
- ✅ **Animations** - Smooth transitions and loading states
- ✅ **Dark Mode** - Automatic dark mode support

## Installation

```jsx
import Card from './Shared Component/Card';
import './Shared Component/Card.css';
```

## Basic Usage

```jsx
// Simple card
<Card title="My Card" subtitle="Card description">
  <p>Card content goes here</p>
</Card>

// Card with image
<Card 
  title="Product Card"
  image="https://example.com/image.jpg"
  imageAlt="Product image"
>
  <p>Product description</p>
</Card>

// Interactive card
<Card 
  title="Clickable Card"
  clickable={true}
  onClick={() => console.log('Card clicked!')}
>
  <p>Click me!</p>
</Card>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Card content |
| `variant` | string | "default" | Card style variant |
| `size` | string | "medium" | Card size |
| `hover` | boolean | false | Enable hover effects |
| `clickable` | boolean | false | Make card clickable |
| `onClick` | function | - | Click handler |
| `className` | string | "" | Additional CSS classes |
| `header` | ReactNode | - | Custom header content |
| `footer` | ReactNode | - | Custom footer content |
| `image` | string | - | Image URL |
| `imageAlt` | string | "" | Image alt text |
| `title` | string | - | Card title |
| `subtitle` | string | - | Card subtitle |
| `actions` | ReactNode | - | Action buttons/content |

## Card Variants

### 1. Default
```jsx
<Card variant="default" title="Default Card">
  <p>Standard card with subtle shadow</p>
</Card>
```

### 2. Elevated
```jsx
<Card variant="elevated" title="Elevated Card">
  <p>Card with prominent shadow</p>
</Card>
```

### 3. Outlined
```jsx
<Card variant="outlined" title="Outlined Card">
  <p>Card with border outline</p>
</Card>
```

### 4. Flat
```jsx
<Card variant="flat" title="Flat Card">
  <p>Minimal card design</p>
</Card>
```

### 5. Gradient
```jsx
<Card variant="gradient" title="Gradient Card">
  <p>Card with gradient background</p>
</Card>
```

### 6. Glass
```jsx
<Card variant="glass" title="Glass Card">
  <p>Glass morphism effect</p>
</Card>
```

## Card Sizes

- `small` - Compact size (280px max-width)
- `medium` - Standard size (400px max-width) - Default
- `large` - Large size (500px max-width)
- `xl` - Extra large (600px max-width)
- `full` - Full width (100%)

## Interactive Features

### Hover Effects
```jsx
<Card hover={true} title="Hover Card">
  <p>Hover over this card to see the effect</p>
</Card>
```

### Clickable Cards
```jsx
<Card 
  clickable={true}
  title="Clickable Card"
  onClick={() => handleCardClick()}
>
  <p>Click this card</p>
</Card>
```

### Loading State
```jsx
<Card 
  title="Loading Card"
  className={isLoading ? 'card-loading' : ''}
>
  <p>Content here</p>
</Card>
```

## Card Structure

### Image
```jsx
<Card 
  image="https://example.com/image.jpg"
  imageAlt="Description"
  title="Card with Image"
>
  <p>Content below image</p>
</Card>
```

### Header
```jsx
<Card 
  title="Card Title"
  subtitle="Card subtitle"
>
  <p>Card content</p>
</Card>
```

### Custom Header
```jsx
<Card 
  header={
    <div style={{ padding: '1rem', background: '#f0f0f0' }}>
      <h3>Custom Header</h3>
    </div>
  }
>
  <p>Card content</p>
</Card>
```

### Actions
```jsx
<Card 
  title="Card with Actions"
  actions={
    <div>
      <button>Action 1</button>
      <button>Action 2</button>
    </div>
  }
>
  <p>Card content</p>
</Card>
```

### Footer
```jsx
<Card 
  title="Card with Footer"
  footer={<div>Footer content</div>}
>
  <p>Card content</p>
</Card>
```

## Specialized Card Types

### Product Card
```jsx
<Card 
  className="card-product"
  title="Product Name"
  image="product.jpg"
  actions={<button>Add to Cart</button>}
>
  <div className="price">$99.99</div>
  <div className="rating">★★★★★ (128 reviews)</div>
  <p>Product description</p>
</Card>
```

### User Card
```jsx
<Card 
  className="card-user"
  title="John Doe"
  subtitle="Software Engineer"
  image="profile.jpg"
>
  <p>User bio and information</p>
</Card>
```

### Stats Card
```jsx
<Card className="card-stats" title="Analytics">
  <div className="stat-number">1,234</div>
  <div className="stat-label">Total Users</div>
</Card>
```

## Animations

### Built-in Animations
```jsx
<Card className="card-fade-in" title="Fade In">Content</Card>
<Card className="card-slide-up" title="Slide Up">Content</Card>
<Card className="card-scale-in" title="Scale In">Content</Card>
```

### Custom Animations
```jsx
<Card 
  className="my-custom-animation"
  title="Custom Animation"
>
  <p>Use CSS to create custom animations</p>
</Card>
```

## Accessibility

- **Keyboard Navigation** - Clickable cards support Enter and Space keys
- **ARIA Labels** - Proper labeling for screen readers
- **Focus Management** - Visible focus indicators
- **Semantic HTML** - Proper heading hierarchy

## Responsive Design

The card component is fully responsive and adapts to different screen sizes:

- **Mobile** - Single column layout with adjusted padding
- **Tablet** - Flexible grid layout
- **Desktop** - Multi-column grid layout

## Dark Mode

Automatic dark mode support with `prefers-color-scheme: dark`:

```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles are automatically applied */
}
```

## Customization

### CSS Variables
```css
:root {
  --card-border-radius: 8px;
  --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  --card-padding: 1.5rem;
}
```

### Custom Classes
```jsx
<Card 
  className="my-custom-card"
  title="Custom Card"
>
  <p>Content</p>
</Card>
```

## Best Practices

1. **Use appropriate variants:**
   - `default` for general content
   - `elevated` for featured content
   - `outlined` for clean layouts
   - `gradient` for hero sections

2. **Choose the right size:**
   - `small` for sidebars
   - `medium` for content grids
   - `large` for featured content
   - `full` for full-width layouts

3. **Make cards accessible:**
   ```jsx
   <Card 
     clickable={true}
     title="Accessible Card"
     onClick={handleClick}
   >
     <p>Content</p>
   </Card>
   ```

4. **Use loading states:**
   ```jsx
   <Card 
     className={loading ? 'card-loading' : ''}
     title="Loading Card"
   >
     <p>Content</p>
   </Card>
   ```

5. **Optimize for mobile:**
   - Use appropriate sizes
   - Test touch interactions
   - Ensure readable text

## Examples

See `CardExample.jsx` for comprehensive usage examples including:
- All card variants and sizes
- Interactive features
- Specialized card types
- Animation examples
- Real-world usage patterns

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- IE11+ (with CSS Grid polyfill)

## Performance

- Lightweight CSS animations
- No external dependencies
- Optimized for 60fps animations
- Minimal bundle impact
