import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ 
  brand = "MyApp", 
  links = [], 
  showMobileMenu = true,
  className = "",
  onLinkClick 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (link) => {
    if (onLinkClick) {
      onLinkClick(link);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${className}`}>
      <div className="navbar-container">
        {/* Brand/Logo */}
        <div className="navbar-brand">
          <a href="/" className="brand-link">
            {brand}
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar-menu desktop-menu">
          <ul className="navbar-links">
            {links.map((link, index) => (
              <li key={index} className="navbar-item">
                <a 
                  href={link.href} 
                  className="navbar-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link);
                  }}
                >
                  {link.icon && <span className="link-icon">{link.icon}</span>}
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Button */}
        {showMobileMenu && (
          <button 
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        )}

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="mobile-navbar-links">
              {links.map((link, index) => (
                <li key={index} className="mobile-navbar-item">
                  <a 
                    href={link.href} 
                    className="mobile-navbar-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link);
                    }}
                  >
                    {link.icon && <span className="link-icon">{link.icon}</span>}
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;