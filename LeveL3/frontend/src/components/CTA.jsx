import React from 'react';
import { Link } from 'react-router-dom';

export default function CTA() {
    return (
        <>
            <section class="cta-section">
                <h2>Ready to Hit the Road?</h2>
                <p>Join thousands of satisfied customers who trust DriveNow for their transportation needs.</p>
                <button className="primary-btn">
                  <Link to={"/Cars"} className="no-underline" style={{ color: "white" }}>
                    Start Your Journey
                  </Link>
                </button>
            </section>
        </>
    );
}