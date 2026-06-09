import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="landing">
      {/* NAV */}
      <nav className="landing-nav">
        <span className="landing-logo">Qwilio</span>
        <div className={`landing-nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#features">Solutions</a>
          <a href="#about">About</a>
        </div>
        <div className="landing-nav-right">
          <button className="btn-ghost">Login</button>
          <button className="btn-orange" onClick={() => navigate("/dashboard")}>
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <p className="landing-eyebrow">AI-Powered Marketing Ops</p>
          <h1 className="landing-headline">
            Digital Marketing
            <br />
            made <em>Easier</em>
          </h1>
          <p className="landing-subtext">
            Qwilio brings your copy generation, campaign reporting, and client
            conversations into one intelligent workspace — built for marketing
            teams that move fast.
          </p>
          <div className="landing-hero-cta">
            <button className="btn-orange btn-lg" onClick={() => navigate("/dashboard")}>
              Open Dashboard
            </button>
            <button className="btn-outline btn-lg">See how it works</button>
          </div>
        </div>
        <div className="landing-hero-visual">
          <div className="hero-card hero-card-1">
            <span className="hero-card-label">CopyCrafter</span>
            <p>Generated 3 ad copies for Instagram — Fashion brand, casual tone.</p>
          </div>
          <div className="hero-card hero-card-2">
            <span className="hero-card-label">Report Generator</span>
            <p>ROAS 4.2x · CTR 3.8% · 120 conversions this period.</p>
          </div>
          <div className="hero-card hero-card-3">
            <span className="hero-card-label">Conversations</span>
            <p>2 pending tasks · Draft reply ready for client Ahmad.</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="landing-features" id="features">
        <p className="section-eyebrow">What's inside</p>
        <h2 className="section-title">Three tools. One platform.</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">✦</div>
            <h3>CopyCrafter</h3>
            <p>
              Generate platform-specific ad copy in seconds. Set your tone,
              format, and audience — get copy that converts.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">◈</div>
            <h3>Report Generator</h3>
            <p>
              Feed in your Google and Meta metrics. Get a client-ready
              performance report with analysis and recommendations.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">◎</div>
            <h3>Conversations</h3>
            <p>
              Log client messages, get AI summaries, surface pending tasks, and
              generate professional draft replies instantly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="landing-cta-strip">
        <h2>Ready to simplify your workflow?</h2>
        <button className="btn-orange btn-lg" onClick={() => navigate("/dashboard")}>
          Open Qwilio
        </button>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <span className="landing-logo">Qwilio</span>
        <p>© 2025 Qwilio. All rights reserved.</p>
      </footer>
    </div>
  );
}