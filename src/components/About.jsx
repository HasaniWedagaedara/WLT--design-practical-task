import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-shell">
        <Reveal>
          <p className="section-label">WHO WE ARE</p>
        </Reveal>

        <Reveal delay={120}>
          <h2 className="about-title">
            We are a creative digital studio building immersive websites,
            memorable brands, and smooth online experiences.
          </h2>
        </Reveal>

        <div className="about-grid">
          <Reveal delay={180}>
            <div className="about-card about-card-dark">
              <span>01</span>
              <h3>Strategy first</h3>
              <p>
                Every website starts with a clear purpose. We define the story,
                structure, and visual direction before touching the final
                design.
              </p>
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="about-card">
              <span>02</span>
              <h3>Design with emotion</h3>
              <p>
                We use motion, lighting, contrast, typography, and interaction
                to make your brand feel premium and unforgettable.
              </p>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="about-card">
              <span>03</span>
              <h3>Built for performance</h3>
              <p>
                Beautiful design is only powerful when it loads fast, works
                smoothly, and feels natural across every screen size.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
