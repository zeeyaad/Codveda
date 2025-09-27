import React from 'react';
import './Loader.css';

const Loader = ({ 
  type = 'spinner',
  size = 'medium',
  color = 'primary',
  text = '',
  overlay = false,
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    small: 'loader-sm',
    medium: 'loader-md',
    large: 'loader-lg',
    xlarge: 'loader-xl'
  };

  const colorClasses = {
    primary: 'loader-primary',
    secondary: 'loader-secondary',
    success: 'loader-success',
    danger: 'loader-danger',
    warning: 'loader-warning',
    info: 'loader-info',
    white: 'loader-white'
  };

  const loaderClasses = [
    'loader',
    sizeClasses[size] || sizeClasses.medium,
    colorClasses[color] || colorClasses.primary,
    className
  ].filter(Boolean).join(' ');

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className="loader-spinner">
            <div className="spinner-ring"></div>
          </div>
        );

      case 'dots':
        return (
          <div className="loader-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        );

      case 'bars':
        return (
          <div className="loader-bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        );

      case 'pulse':
        return (
          <div className="loader-pulse">
            <div className="pulse-circle"></div>
          </div>
        );

      case 'wave':
        return (
          <div className="loader-wave">
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
          </div>
        );

      case 'bounce':
        return (
          <div className="loader-bounce">
            <div className="bounce-dot"></div>
            <div className="bounce-dot"></div>
            <div className="bounce-dot"></div>
          </div>
        );

      case 'skeleton':
        return (
          <div className="loader-skeleton">
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-line medium"></div>
          </div>
        );

      default:
        return (
          <div className="loader-spinner">
            <div className="spinner-ring"></div>
          </div>
        );
    }
  };

  const loaderContent = (
    <div className={loaderClasses} {...props}>
      {renderLoader()}
      {text && <div className="loader-text">{text}</div>}
    </div>
  );

  if (overlay) {
    return (
      <div className="loader-overlay">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default Loader;
