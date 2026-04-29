import { useEffect, useRef, useState } from "react";

const scenes = [
  {
    eyebrow: "HELLO",
    title: "World!",
    text: "We are a small digital design studio committed to creating exceptional online experiences that empower brands to elevate their digital presence.",
    visual: "world",
  },
  {
    eyebrow: "BRAND IDENTITY",
    title: "Bringing Vibrancy To Your Identity",
    text: "We create memorable visual systems that make your business feel clear, bold, and recognizable across every digital touchpoint.",
    visual: "identity",
  },
  {
    eyebrow: "STORYTELLING",
    title: "Crafting Great Brand Narrative",
    text: "We shape digital spaces that tell your story through atmosphere, movement, layout, and emotional visual direction.",
    visual: "narrative",
  },
];

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const update = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const current = -rect.top;

      setProgress(clamp(current / scrollableDistance));
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

function getSceneStyle(progress, index, total) {
  const target = index / (total - 1);
  const segment = 1 / (total - 1);
  const distance = Math.abs(progress - target);

  const opacity = clamp(1 - distance / (segment * 0.75));
  const scale = 0.94 + opacity * 0.08;
  const y = (1 - opacity) * 44;

  return {
    opacity,
    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
    pointerEvents: opacity > 0.2 ? "auto" : "none",
  };
}

function WorldVisual() {
  return (
    <div className="story-visual story-world">
      <div className="world-wall" />
      <div className="world-floor" />

      <div className="world-poster">
        <span />
        <span />
        <span />
      </div>

      <div className="world-lamp">
        <div />
      </div>

      <div className="world-desk">
        <div className="world-monitor" />
        <div className="world-chair" />
      </div>

      <div className="story-light-beam" />
    </div>
  );
}

function IdentityVisual() {
  return (
    <div className="story-visual story-identity">
      <div className="identity-backdrop" />

      <div className="identity-platform platform-left">
        <div className="small-product black" />
      </div>

      <div className="identity-platform platform-center">
        <div className="shirt-shape" />
        <div className="round-object" />
      </div>

      <div className="identity-platform platform-right">
        <div className="bottle-product" />
        <div className="bag-product" />
      </div>

      <div className="identity-stairs">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function NarrativeVisual() {
  return (
    <div className="story-visual story-narrative">
      <div className="garden-sky" />
      <div className="garden-arches">
        <span />
        <span />
        <span />
      </div>

      <div className="pool">
        <div />
      </div>

      <div className="rock rock-one" />
      <div className="rock rock-two" />

      <div className="plant plant-one">
        <span />
        <span />
        <span />
      </div>

      <div className="plant plant-two">
        <span />
        <span />
        <span />
      </div>

      <div className="palm palm-left" />
      <div className="palm palm-right" />
    </div>
  );
}

function SceneVisual({ type }) {
  if (type === "identity") return <IdentityVisual />;
  if (type === "narrative") return <NarrativeVisual />;
  return <WorldVisual />;
}

export default function StoryScroller() {
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);

  return (
    <section ref={sectionRef} className="story-scroll-section" id="studio">
      <div className="story-sticky">
        <div className="story-orange-glow" />

        {scenes.map((scene, index) => {
          const style = getSceneStyle(progress, index, scenes.length);

          return (
            <article className="story-scene" style={style} key={scene.title}>
              <SceneVisual type={scene.visual} />

              <div className={`story-copy story-copy-${scene.visual}`}>
                <p>{scene.eyebrow}</p>
                <h2>{scene.title}</h2>
                <span>{scene.text}</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
