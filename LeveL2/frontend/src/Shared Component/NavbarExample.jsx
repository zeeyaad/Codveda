import React from 'react';
import Navbar from './Navbar';

const NavbarExample = () => {
  // Example navigation links
  const navigationLinks = [
    {
      text: 'Home',
      href: '/',
      icon: '🏠'
    },
    {
      text: 'About',
      href: '/about',
      icon: 'ℹ️'
    },
    {
      text: 'Services',
      href: '/services',
      icon: '⚙️'
    },
    {
      text: 'Contact',
      href: '/contact',
      icon: '📞'
    }
  ];

  // Handle link clicks (for SPA routing)
  const handleLinkClick = (link) => {
    console.log('Navigating to:', link.href);
    // Add your routing logic here (React Router, etc.)
  };

  return (
    <div>
      {/* Basic Usage */}
      <Navbar 
        brand="MyAwesomeApp"
        links={navigationLinks}
        onLinkClick={handleLinkClick}
      />
      
      {/* Example with custom styling */}
      <Navbar 
        brand="CustomApp"
        links={navigationLinks}
        className="custom-navbar"
        showMobileMenu={true}
        onLinkClick={handleLinkClick}
      />
      
      {/* Minimal navbar without mobile menu */}
      <Navbar 
        brand="SimpleApp"
        links={navigationLinks.slice(0, 2)}
        showMobileMenu={false}
      />
    </div>
  );
};

export default NavbarExample;

