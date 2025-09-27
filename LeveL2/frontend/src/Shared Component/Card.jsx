import React from 'react';
import './Card.css';

const Card = ({
  children,
  variant = 'default',
  size = 'medium',
  hover = false,
  clickable = false,
  className = '',
  onClick,
  header,
  footer,
  image,
  imageAlt = '',
  title,
  subtitle,
  actions,
  ...props
}) => {
  const cardClasses = [
    'card',
    `card-${variant}`,
    `card-${size}`,
    hover ? 'card-hover' : '',
    clickable ? 'card-clickable' : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (clickable && onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e) => {
    if (clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick && onClick(e);
    }
  };

  return (
    <div
      className={cardClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={clickable ? 0 : -1}
      role={clickable ? 'button' : undefined}
      aria-label={clickable ? title || 'Clickable card' : undefined}
      {...props}
    >
      {/* Image */}
      {image && (
        <div className="card-image">
          <img src={image} alt={imageAlt} />
        </div>
      )}

      {/* Header */}
      {(header || title || subtitle) && (
        <div className="card-header">
          {header || (
            <>
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </>
          )}
        </div>
      )}

      {/* Body */}
      <div className="card-body">
        {children}
      </div>

      {/* Actions */}
      {actions && (
        <div className="card-actions">
          {actions}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
