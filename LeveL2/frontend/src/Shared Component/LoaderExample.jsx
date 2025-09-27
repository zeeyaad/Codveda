import React, { useState, useEffect } from 'react';
import Loader from './Loader';

const LoaderExample = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  // Auto-hide overlay after 3 seconds
  useEffect(() => {
    if (showOverlay) {
      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showOverlay]);

  const loaderTypes = [
    'spinner', 'dots', 'bars', 'pulse', 'wave', 'bounce', 'skeleton'
  ];

  const colors = [
    'primary', 'secondary', 'success', 'danger', 'warning', 'info'
  ];

  const sizes = ['small', 'medium', 'large', 'xlarge'];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Loader Component Examples</h1>
      
      {/* Basic Usage */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Basic Usage</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <Loader />
          <Loader text="Loading..." />
          <Loader type="dots" text="Processing..." />
          <Loader type="bars" color="success" text="Saving..." />
        </div>
      </section>

      {/* All Loader Types */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>All Loader Types</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {loaderTypes.map(type => (
            <div key={type} style={{ 
              padding: '1rem', 
              border: '1px solid #ddd', 
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3 style={{ textTransform: 'capitalize', marginBottom: '1rem' }}>
                {type}
              </h3>
              <Loader type={type} text={`${type} loader`} />
            </div>
          ))}
        </div>
      </section>

      {/* Different Colors */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Different Colors</h2>
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {colors.map(color => (
            <div key={color} style={{ textAlign: 'center' }}>
              <Loader 
                type="spinner" 
                color={color} 
                text={color}
                size="medium"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Different Sizes */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Different Sizes</h2>
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          {sizes.map(size => (
            <div key={size} style={{ textAlign: 'center' }}>
              <Loader 
                type="dots" 
                size={size} 
                text={size}
                color="primary"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Overlay Loader */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Overlay Loader</h2>
        <button 
          onClick={() => setShowOverlay(true)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Show Overlay Loader
        </button>
        
        {showOverlay && (
          <Loader 
            type="spinner"
            text="Loading data..."
            overlay={true}
            color="primary"
            size="large"
          />
        )}
      </section>

      {/* Custom Styling */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Custom Styling</h2>
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <Loader 
            type="pulse" 
            color="danger" 
            size="large"
            text="Custom Loader"
            className="custom-loader"
          />
          <Loader 
            type="wave" 
            color="success" 
            size="medium"
            text="Another Custom"
            className="custom-loader"
          />
        </div>
      </section>

      {/* Skeleton Loader Example */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Skeleton Loader (Content Placeholder)</h2>
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '1rem',
          maxWidth: '400px'
        }}>
          <Loader type="skeleton" />
        </div>
      </section>

      {/* Usage in Context */}
      <section style={{ marginBottom: '3rem' }}>
        <h2>Usage in Context</h2>
        <div style={{ 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          padding: '1rem',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Loader 
            type="dots" 
            text="Fetching user data..." 
            color="info"
            size="medium"
          />
        </div>
      </section>

    </div>
  );
};

export default LoaderExample;
