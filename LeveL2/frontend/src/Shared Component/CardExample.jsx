import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';

const CardExample = () => {
  const [loading, setLoading] = useState(false);

  const handleCardClick = (cardType) => {
    console.log(`Clicked ${cardType} card`);
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Card Component Examples</h1>
      
      {/* Basic Cards */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Basic Cards</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <Card
            title="Basic Card"
            subtitle="This is a basic card with default styling"
          >
            <p>This is the card content. You can put any content here including text, images, forms, or other components.</p>
          </Card>

          <Card
            title="Card with Image"
            subtitle="Card featuring an image"
            image="https://via.placeholder.com/400x200/667eea/ffffff?text=Sample+Image"
            imageAlt="Sample image"
          >
            <p>This card includes an image at the top. Perfect for showcasing products, articles, or any visual content.</p>
          </Card>

          <Card
            title="Card with Actions"
            subtitle="Interactive card with buttons"
            actions={
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="primary" size="small">Action</Button>
                <Button variant="secondary" size="small">Cancel</Button>
              </div>
            }
          >
            <p>This card includes action buttons in the footer area.</p>
          </Card>
        </div>
      </section>

      {/* Card Variants */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Card Variants</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <Card
            variant="default"
            title="Default Card"
            subtitle="Standard card with subtle shadow"
          >
            <p>This is the default card variant with a subtle shadow.</p>
          </Card>

          <Card
            variant="elevated"
            title="Elevated Card"
            subtitle="Card with prominent shadow"
          >
            <p>This card has a more prominent shadow for better depth perception.</p>
          </Card>

          <Card
            variant="outlined"
            title="Outlined Card"
            subtitle="Card with border outline"
          >
            <p>This card uses a border instead of shadow for a clean look.</p>
          </Card>

          <Card
            variant="flat"
            title="Flat Card"
            subtitle="Minimal card design"
          >
            <p>This card has a flat design with minimal styling.</p>
          </Card>

          <Card
            variant="gradient"
            title="Gradient Card"
            subtitle="Card with gradient background"
          >
            <p>This card features a beautiful gradient background.</p>
          </Card>

          <Card
            variant="glass"
            title="Glass Card"
            subtitle="Card with glass morphism effect"
          >
            <p>This card uses glass morphism with backdrop blur effect.</p>
          </Card>
        </div>
      </section>

      {/* Card Sizes */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Card Sizes</h2>
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          flexWrap: 'wrap',
          alignItems: 'flex-start'
        }}>
          <Card
            size="small"
            title="Small Card"
            subtitle="Compact size"
          >
            <p>Perfect for sidebars or compact layouts.</p>
          </Card>

          <Card
            size="medium"
            title="Medium Card"
            subtitle="Standard size"
          >
            <p>This is the default medium size card, perfect for most use cases.</p>
          </Card>

          <Card
            size="large"
            title="Large Card"
            subtitle="Spacious size"
          >
            <p>This large card provides more space for content and is great for featured content.</p>
          </Card>

          <Card
            size="xl"
            title="Extra Large Card"
            subtitle="Maximum size"
          >
            <p>This extra large card is perfect for detailed content and comprehensive information display.</p>
          </Card>
        </div>
      </section>

      {/* Interactive Cards */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Interactive Cards</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <Card
            title="Hover Card"
            subtitle="Card with hover effects"
            hover={true}
          >
            <p>Hover over this card to see the animation effect.</p>
          </Card>

          <Card
            title="Clickable Card"
            subtitle="Card that responds to clicks"
            clickable={true}
            onClick={() => handleCardClick('clickable')}
          >
            <p>Click this card to see the interaction. It's keyboard accessible too!</p>
          </Card>

          <Card
            title="Loading Card"
            subtitle="Card with loading state"
            className={loading ? 'card-loading' : ''}
          >
            <p>This card shows a loading state. Click the button below to see it in action.</p>
            <Button onClick={handleLoading} variant="primary">
              {loading ? 'Loading...' : 'Start Loading'}
            </Button>
          </Card>
        </div>
      </section>

      {/* Specialized Cards */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Specialized Cards</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Product Card */}
          <Card
            className="card-product"
            title="Wireless Headphones"
            subtitle="Premium Audio Experience"
            image="https://via.placeholder.com/400x250/667eea/ffffff?text=Headphones"
            imageAlt="Wireless headphones"
            actions={
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="primary" size="small">Add to Cart</Button>
                <Button variant="outline" size="small">View Details</Button>
              </div>
            }
          >
            <div className="price">$299.99</div>
            <div className="rating">
              <span className="stars">★★★★★</span>
              <span className="count">(128 reviews)</span>
            </div>
            <p>High-quality wireless headphones with noise cancellation and 30-hour battery life.</p>
          </Card>

          {/* User Card */}
          <Card
            className="card-user"
            title="John Doe"
            subtitle="Software Engineer"
            image="https://via.placeholder.com/120x120/667eea/ffffff?text=JD"
            imageAlt="John Doe profile"
            actions={
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="primary" size="small">Follow</Button>
                <Button variant="secondary" size="small">Message</Button>
              </div>
            }
          >
            <p>Passionate about creating amazing user experiences and building scalable applications.</p>
          </Card>

          {/* Stats Card */}
          <Card
            className="card-stats"
            title="Website Analytics"
            subtitle="Monthly Overview"
          >
            <div className="stat-number">12,543</div>
            <div className="stat-label">Total Visitors</div>
            <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#059669' }}>
              ↗ +12% from last month
            </div>
          </Card>
        </div>
      </section>

      {/* Card with Custom Header */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Custom Header Card</h2>
        <div style={{ maxWidth: '500px' }}>
          <Card
            header={
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                margin: '-1.5rem -1.5rem 1rem -1.5rem',
                borderRadius: '8px 8px 0 0'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: 'rgba(255,255,255,0.2)', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  📊
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Analytics Dashboard</h3>
                  <p style={{ margin: 0, opacity: 0.9 }}>Real-time data insights</p>
                </div>
              </div>
            }
            footer={
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                <span>Last updated: 2 minutes ago</span>
                <span>🟢 Live</span>
              </div>
            }
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>1,234</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Active Users</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>56</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Errors</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Animation Examples */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Card Animations</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem'
        }}>
          <Card
            title="Fade In"
            subtitle="Card with fade animation"
            className="card-fade-in"
          >
            <p>This card fades in when it appears.</p>
          </Card>

          <Card
            title="Slide Up"
            subtitle="Card with slide animation"
            className="card-slide-up"
          >
            <p>This card slides up from below.</p>
          </Card>

          <Card
            title="Scale In"
            subtitle="Card with scale animation"
            className="card-scale-in"
          >
            <p>This card scales in from the center.</p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CardExample;

