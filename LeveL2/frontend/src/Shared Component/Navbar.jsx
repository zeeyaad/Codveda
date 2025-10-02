// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ brand = "MyApp", showMobileMenu = true, className = "" }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { token, role, logout } = useAuth(); // 👈 now we also use role

  const toggleMobileMenu = () => setIsMobileMenuOpen((s) => !s);

  const handleLogout = () => {
    setIsMobileMenuOpen(false);
    logout(); // clears token + role
    navigate("/login");
  };

  // 👇 build links dynamically depending on auth state
  const commonLinks = [
    { text: "Home", href: "/" },
    { text: "Products", href: "/products" },
  ];

  const authLinks = token
    ? [
        { text: "Profile", href: "/profile" },
        ...(role === "admin" ? [{ text: "Users", href: "/users" }] : []),
      ]
    : [
        { text: "Login", href: "/login" },
        { text: "Signup", href: "/signup" },
      ];

  const allLinks = [...commonLinks, ...authLinks];

  return (
    <nav className={`navbar ${className}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">{brand}</Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-menu desktop-menu">
          <ul className="navbar-links">
            {allLinks.map((link, index) => (
              <li key={index} className="navbar-item">
                <Link
                  to={link.href}
                  className="navbar-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon && <span className="link-icon">{link.icon}</span>}
                  {link.text}
                </Link>
              </li>
            ))}
            {token && (
              <li className="navbar-item">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="navbar-link logout-btn"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <>
            <button
              className="mobile-menu-button"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>

            <div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
              <ul className="mobile-navbar-links">
                {allLinks.map((link, index) => (
                  <li key={index} className="mobile-navbar-item">
                    <Link
                      to={link.href}
                      className="mobile-navbar-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.icon && (
                        <span className="link-icon">{link.icon}</span>
                      )}
                      {link.text}
                    </Link>
                  </li>
                ))}
                {token && (
                  <li className="mobile-navbar-item">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mobile-navbar-link logout-btn"
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
