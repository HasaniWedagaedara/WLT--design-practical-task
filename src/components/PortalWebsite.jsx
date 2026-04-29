import { useEffect, useRef, useState } from "react";

const screens = [
  {
    id: "hero",
    shape: "light",
    origin: "50% 43%",
  },
  {
    id: "hello",
    shape: "light",
    origin: "50% 48%",
  },
  {
    id: "identity",
    shape: "circle",
    origin: "51% 50%",
  },
  {
    id: "narrative",
    shape: "circle",
    origin: "50% 52%",
  },
];

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(value) {
  const x = clamp(value);
  return x * x * (3 - 2 * x);
}

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const current = -rect.top;

      setProgress(clamp(current / scrollable));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}

function getClipPath(shape, amount, origin) {
  if (shape === "circle") {
    const radius = 4 + amount * 155;
    return `circle(${radius}% at ${origin})`;
  }

  const width = 3 + amount * 165;
  const height = 7 + amount * 165;

  return `ellipse(${width}% ${height}% at ${origin})`;
}

function Header() {
  return (
    <header className="site-header">
      <button
        className="logo-shell"
        aria-label="Go to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <span className="brand-mark">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div className="menu-shell">
        <button
          className="menu-pill"
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          MENU
        </button>

        <button
          className="hamburger"
          aria-label="Open menu"
          onClick={() =>
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            })
          }
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function HeroScreen({ open = 0 }) {
  const style = {
    "--portal-scale": 1 + open * 21,
    "--portal-opacity": 1 - open * 0.2,
  };

  return (
    <section className="screen scene-hero" style={style}>
      <div className="hero-base-line hero-base-line-one" />
      <div className="hero-base-line hero-base-line-two" />

      <div className="hero-beam" />

      <div className="portal-light hero-portal-light">
        <span />
      </div>

      <div className="floating-dot dot-one" />
      <div className="floating-dot dot-two" />
      <div className="floating-dot dot-three" />

      <div className="hero-copy">
        <p>HI, WE ARE WLT DESIGN</p>
        <h1>
          Elevate Your
          <br />
          Digital Presence
        </h1>
      </div>

      <div className="hero-note">
        <strong>We make great digital experiences.</strong>
        <span>Scroll to find out how we do it.</span>
      </div>
    </section>
  );
}

function HelloScreen({ open = 0 }) {
  const style = {
    "--portal-scale": 1 + open * 20,
    "--portal-opacity": 1 - open * 0.25,
  };

  return (
    <section className="screen scene-hello" style={style}>
      <div className="hello-wall" />
      <div className="hello-floor" />
      <div className="hello-window" />

      <div className="portal-light hello-portal-light">
        <span />
      </div>

      <div className="hello-desk">
        <div className="hello-monitor" />
        <div className="hello-keyboard" />
        <div className="hello-chair" />
      </div>

      <div className="hello-copy">
        <p>Hello</p>
        <h2>World!</h2>
      </div>

      <div className="hello-text">
        <p>
          We are a small digital design studio committed to creating exceptional
          online experiences that empower brands to elevate their digital
          presence.
        </p>
      </div>
    </section>
  );
}

function IdentityScreen({ open = 0 }) {
  const style = {
    "--portal-scale": 1 + open * 17,
    "--portal-opacity": 1 - open * 0.2,
  };

  return (
    <section className="screen scene-identity" style={style}>
      <div className="identity-room" />

      <div className="identity-copy">
        <h2>
          Bringing Vibrancy
          <br />
          To Your Identity
        </h2>
      </div>

      <div className="identity-platform platform-left">
        <div className="black-product" />
      </div>

      <div className="identity-platform platform-center">
        <div className="shirt-product" />
        <div className="yellow-ball" />
      </div>

      <div className="identity-platform platform-right">
        <div className="poster-frame" />
        <div className="orange-box" />
      </div>

      <div className="identity-stairs">
        <span />
        <span />
        <span />
      </div>

      <div className="portal-circle identity-portal-circle" />
    </section>
  );
}

function NarrativeScreen({ open = 0 }) {
  const style = {
    "--portal-scale": 1 + open * 16,
    "--portal-opacity": 1 - open * 0.15,
  };

  return (
    <section className="screen scene-narrative" style={style}>
      <div className="garden-sky" />
      <div className="garden-arches">
        <span />
        <span />
        <span />
      </div>

      <div className="pool">
        <span />
      </div>

      <div className="garden-copy">
        <h2>
          Crafting Great
          <br />
          Brand Narrative
        </h2>
      </div>

      <div className="plant plant-left">
        <span />
        <span />
        <span />
      </div>

      <div className="plant plant-right">
        <span />
        <span />
        <span />
      </div>

      <div className="rock rock-left" />
      <div className="rock rock-right" />

      <div className="portal-circle narrative-portal-circle" />
    </section>
  );
}

function ServicesScreen() {
  const services = [
    "Website Design & Development",
    "3D Interactive Web Design",
    "Ecommerce Web Development",
    "Branding & Graphic Design",
  ];

  return (
    <section className="screen services-screen">
      <div className="services-scene">
        <div className="services-rings">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="services-desk">
          <div className="services-monitor" />
          <div className="services-keyboard" />
          <div className="services-mouse" />
          <div className="services-cup" />
          <div className="services-lamp" />
        </div>
      </div>

      <div className="services-content">
        <p>WHAT WE DO</p>

        <div className="services-title-row">
          <h2>SERVICES</h2>
          <span>
            We make great digital experiences by combining design, motion,
            interaction, and development.
          </span>
        </div>

        <div className="service-cards">
          {services.map((service, index) => (
            <article key={service}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <h3>{service}</h3>
              <p>
                Premium digital solutions crafted for strong visual impact,
                smooth user experience, and scalable web performance.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Screen({ id, open }) {
  if (id === "hero") return <HeroScreen open={open} />;
  if (id === "hello") return <HelloScreen open={open} />;
  if (id === "identity") return <IdentityScreen open={open} />;
  if (id === "narrative") return <NarrativeScreen open={open} />;

  return <ServicesScreen />;
}

export default function PortalWebsite() {
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);

  const transitionCount = screens.length;
  const raw = progress * transitionCount;

  const currentIndex = Math.min(Math.floor(raw), screens.length - 1);
  const localProgress = clamp(raw - currentIndex);

  const currentScreen = screens[currentIndex];
  const nextScreen =
    currentIndex < screens.length - 1
      ? screens[currentIndex + 1]
      : { id: "services" };

  const open = smoothstep((localProgress - 0.08) / 0.82);
  const clipPath = getClipPath(currentScreen.shape, open, currentScreen.origin);

  const currentScale = 1 + open * 0.18;
  const nextScale = 1.08 - open * 0.08;

  return (
    <section
      ref={sectionRef}
      className="portal-scroll-website"
      style={{ height: `${(transitionCount + 1) * 100}vh` }}
    >
      <div className="portal-sticky">
        <Header />

        <div
          className="scene-layer scene-layer-current"
          style={{
            transform: `scale(${currentScale})`,
          }}
        >
          <Screen id={currentScreen.id} open={open} />
        </div>

        <div
          className="scene-layer scene-layer-next"
          style={{
            clipPath,
            WebkitClipPath: clipPath,
            transform: `scale(${nextScale})`,
            opacity: open > 0.02 ? 1 : 0,
          }}
        >
          <Screen id={nextScreen.id} open={0} />
        </div>

        <div
          className="portal-flash"
          style={{
            opacity: open,
            transform: `translate(-50%, -50%) scale(${1 + open * 18})`,
          }}
        />
      </div>
    </section>
  );
}
