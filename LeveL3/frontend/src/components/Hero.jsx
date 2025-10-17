// src/components/Hero.jsx
import { Link } from "react-router-dom";

export default function Hero() {
    return (
      <section class="hero" id="home">
        <div class="hero-background"></div>
        <div class="hero-image"></div>
        <div class="hero-overlay"></div>
        <div class="hero-content">
            <h1>Drive Your Dreams Today</h1>
            <p>Premium car rentals and sales at your fingertips. Experience luxury, performance, and convenience like never before.</p>
            <div class="hero-buttons">
                <button class="primary-btn">
                  <Link to={"/Cars"} className="no-underline"style={{color: "white"}}>
                    Rent Now
                  </Link>
                </button>
                <button class="secondary-btn">
                  <Link to={"/Cars"} className="no-underline" style={{color: "white"}}>
                    Browse Cars
                  </Link>
                </button>
            </div>
        </div>
    </section>
    );
  }
