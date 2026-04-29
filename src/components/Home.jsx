import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import HeroScene from "./HeroScene.jsx";

function useSectionScroll(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const current = -rect.top;

      const nextProgress = Math.min(
        Math.max(current / scrollableDistance, 0),
        1,
      );

      setProgress(nextProgress);
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return progress;
}

export default function Home() {
  const homeRef = useRef(null);
  const progress = useSectionScroll(homeRef);

  const textOpacity = Math.max(1 - progress * 1.4, 0);
  const noteOpacity = Math.max(1 - progress * 1.7, 0);
  const nextOpacity = Math.max((progress - 0.55) / 0.45, 0);

  return (
    <section ref={homeRef} className="home-scroll" id="home">
      <div className="home-sticky">
        <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
          <HeroScene progress={progress} />
        </Canvas>

        <div className="grain-overlay" />
        <div className="warm-vignette" />

        <div
          className="hero-copy"
          style={{
            opacity: textOpacity,
            transform: `translateY(${-progress * 90}px)`,
          }}
        >
          <p>HI, WE ARE WLT DESIGN</p>
          <h1>
            Elevate Your
            <br />
            Digital Presence
          </h1>
        </div>

        <div
          className="hero-note"
          style={{
            opacity: noteOpacity,
            transform: `translateY(${progress * 70}px)`,
          }}
        >
          <strong>We make great digital experiences.</strong>
          <span>Scroll to find out how we do it.</span>
        </div>

        <div
          className="next-preview"
          style={{
            opacity: nextOpacity,
            transform: `scale(${0.82 + nextOpacity * 0.18}) translateY(${
              40 - nextOpacity * 40
            }px)`,
          }}
        >
          <p>NEXT</p>
          <h2>We craft digital experiences</h2>
        </div>
      </div>
    </section>
  );
}
