import Link from "next/link";
import { Header } from "@/components/Header";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata = {
  title: "Orbi UI — Premium Headless Component Framework",
  description: "Designer-first, developer-owned. A component framework built on clear principles: token-driven, fully typed, zero compromise.",
};

export default function Home() {
  return (
    <div className="home-shell">
      <Header />
      
      <main className="home-content">
        {/* Hero Section */}
        <section className="home-hero">
          <div className="home-hero__container">
            <div className="home-hero__badge">
              <span className="home-hero__badge-accent">Alpha Release</span>
              <span>v0.1.0-alpha</span>
            </div>
            
            <h1 className="home-hero__title">
              The Component Framework<br />
              <span className="home-hero__highlight">Built for Clarity</span>
            </h1>
            
            <p className="home-hero__subtitle">
              Orbi UI combines the flexibility of headless logic with the clarity of token-driven design. 
              No surprises. No hidden complexity. Just well-designed components you can own.
            </p>
            
            <div className="home-hero__cta">
              <Link href="/docs/installation" className="home-cta-primary">
                Get Started
              </Link>
              <a href="https://github.com/orbi-ui" target="_blank" rel="noopener noreferrer" className="home-cta-secondary">
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Positioning Section */}
        <section className="home-positioning">
          <div className="home-positioning__container">
            <h2 className="home-section-title">Why Orbi UI?</h2>
            
            <div className="home-positioning__grid">
              <div className="home-positioning__card">
                <h3 className="home-card-title">Designer-First Philosophy</h3>
                <p className="home-card-body">
                  Every component starts with design tokens. Colors, spacing, typography, and motion 
                  are defined once and flow through your entire product. No hardcoded values. No guessing.
                </p>
              </div>
              
              <div className="home-positioning__card">
                <h3 className="home-card-title">Developer Owned</h3>
                <p className="home-card-body">
                  Separation of concerns is a first-class principle. Headless hooks in Core, styled 
                  React components in React. You pick what you need and extend what you don't.
                </p>
              </div>
              
              <div className="home-positioning__card">
                <h3 className="home-card-title">Type-Safe by Default</h3>
                <p className="home-card-body">
                  Strict TypeScript throughout. Every prop, variant, and state is typed. Token types 
                  are generated from source. Less errors. Less friction. Better DX.
                </p>
              </div>
              
              <div className="home-positioning__card">
                <h3 className="home-card-title">Accessible from the Ground Up</h3>
                <p className="home-card-body">
                  WCAG compliance isn't an afterthought. Semantic HTML, ARIA patterns, and keyboard 
                  navigation are built into every component's core.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Differentiation Section */}
        <section className="home-differentiation">
          <div className="home-differentiation__container">
            <h2 className="home-section-title">Orbi UI vs The Field</h2>
            
            <div className="home-comparison">
              <div className="home-comparison__row home-comparison__header">
                <div className="home-comparison__cell">Feature</div>
                <div className="home-comparison__cell">Orbi UI</div>
                <div className="home-comparison__cell">Radix / Headless</div>
                <div className="home-comparison__cell">Material UI</div>
              </div>
              
              <div className="home-comparison__row">
                <div className="home-comparison__cell">Headless Hooks</div>
                <div className="home-comparison__cell">✓</div>
                <div className="home-comparison__cell">✓</div>
                <div className="home-comparison__cell">—</div>
              </div>
              
              <div className="home-comparison__row">
                <div className="home-comparison__cell">Token-Driven Design</div>
                <div className="home-comparison__cell">✓</div>
                <div className="home-comparison__cell">—</div>
                <div className="home-comparison__cell">✓</div>
              </div>
              
              <div className="home-comparison__row">
                <div className="home-comparison__cell">Zero External Dependencies</div>
                <div className="home-comparison__cell">✓</div>
                <div className="home-comparison__cell">✓</div>
                <div className="home-comparison__cell">—</div>
              </div>
              
              <div className="home-comparison__row">
                <div className="home-comparison__cell">Full Type Safety</div>
                <div className="home-comparison__cell">✓</div>
                <div className="home-comparison__cell">Partial</div>
                <div className="home-comparison__cell">Partial</div>
              </div>
              
              <div className="home-comparison__row">
                <div className="home-comparison__cell">Component Theme Layer</div>
                <div className="home-comparison__cell">✓</div>
                <div className="home-comparison__cell">—</div>
                <div className="home-comparison__cell">✓</div>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="home-architecture">
          <div className="home-architecture__container">
            <h2 className="home-section-title">Clear Architecture</h2>
            
            <div className="home-architecture__diagram">
              <div className="home-architecture__layer">
                <div className="home-architecture__layer-label">Tokens</div>
                <p className="home-architecture__layer-desc">Design system at the foundation: colors, spacing, typography, motion</p>
              </div>
              
              <div className="home-architecture__arrow">↑</div>
              
              <div className="home-architecture__layer">
                <div className="home-architecture__layer-label">Core (Headless)</div>
                <p className="home-architecture__layer-desc">useButton, useInput, useDialog — pure logic, zero styling</p>
              </div>
              
              <div className="home-architecture__arrow">↑</div>
              
              <div className="home-architecture__layer">
                <div className="home-architecture__layer-label">React Components</div>
                <p className="home-architecture__layer-desc">Styled wrappers consuming Core hooks + Token variables</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="home-vision">
          <div className="home-vision__container">
            <h2 className="home-section-title">Our Vision</h2>
            
            <p className="home-vision__text">
              Orbi UI is being built toward a future where component frameworks don't impose decisions. 
              Where you collaborate with the framework instead of working against it. Where design and 
              development move as one.
            </p>
            
            <p className="home-vision__text">
              We're starting with a curated set of foundational components. Each one demonstrates the 
              principles we care about: clarity, composability, and consistency. Each one proves that you 
              don't need bloat to be powerful.
            </p>
            
            <div className="home-vision__roadmap">
              <h3 className="home-vision__roadmap-title">What's Next</h3>
              <ul className="home-vision__list">
                <li>Advanced form validation states</li>
                <li>Component composition patterns</li>
                <li>Theme customization guide</li>
                <li>Advanced accessibility patterns</li>
                <li>Motion and micro-interaction library</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Target Audience */}
        <section className="home-audience">
          <div className="home-audience__container">
            <h2 className="home-section-title">Built For</h2>
            
            <div className="home-audience__grid">
              <div className="home-audience__segment">
                <h3 className="home-audience__label">Product Teams</h3>
                <p className="home-audience__desc">
                  Who believe consistency is a feature, and where your design system is as much code as it is design.
                </p>
              </div>
              
              <div className="home-audience__segment">
                <h3 className="home-audience__label">Developers</h3>
                <p className="home-audience__desc">
                  Who want to understand the components they use, and want components that don't surprise them.
                </p>
              </div>
              
              <div className="home-audience__segment">
                <h3 className="home-audience__label">Design Teams</h3>
                <p className="home-audience__desc">
                  Who need their decisions to be reflected in code without compromise, and who want real collabortion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alpha Disclaimer */}
        <section className="home-disclaimer">
          <div className="home-disclaimer__container">
            <div className="home-disclaimer__content">
              <svg className="home-disclaimer__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 2v20M2 12h20" />
              </svg>
              <div>
                <h3 className="home-disclaimer__title">Alpha Release Notice</h3>
                <p className="home-disclaimer__text">
                  Orbi UI v0.1.0-alpha is production-ready but under active development. 
                  Component APIs may change based on feedback. Please file issues and contribute 
                  to help shape the future of this project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="home-footer-cta">
          <div className="home-footer-cta__container">
            <h2 className="home-footer-cta__title">Ready to Get Started?</h2>
            <Link href="/docs/installation" className="home-cta-primary home-cta-large">
              See Installation Guide
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
