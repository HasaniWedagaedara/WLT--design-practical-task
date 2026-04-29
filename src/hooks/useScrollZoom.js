import { useEffect } from "react";

function lerp(a, b, t) {
  return a + (b - a) * t;
}
function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}
function easeInCubic(t) {
  return t * t * t;
}
function easeInQuad(t) {
  return t * t;
}

export default function useScrollZoom() {
  useEffect(() => {
    const scenes = [
      {
        container: document.getElementById("s1-sticky"),
        element: document.getElementById("light1"),
        maxScale: 35,
        ease: easeInCubic,
      },
      {
        container: document.getElementById("s2-sticky"),
        element: document.getElementById("light2"),
        maxScale: 35,
        ease: easeInCubic,
      },
      {
        container: document.getElementById("s3-sticky"),
        element: document.getElementById("glow-circle"),
        maxScale: 40,
        ease: easeInQuad,
      },
    ];

    function getScrollProgress(container) {
      const rect = container.getBoundingClientRect();
      const totalHeight = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      return clamp(scrolled / totalHeight, 0, 1);
    }

    function update() {
      scenes.forEach((s) => {
        if (!s.container || !s.element) return;

        const progress = getScrollProgress(s.container);
        const eased = s.ease(progress);
        const scale = lerp(1, s.maxScale, eased);

        s.element.style.transform = `
  perspective(800px)
  rotateY(60deg)
  rotateX(5deg)
  scale(${scale})
`;

        const opacity = progress < 0.05 ? progress / 0.05 : 1;
        s.element.style.opacity = opacity;

        if (scale > 20) {
          const blur = Math.min((scale - 20) * 0.5, 8);
          s.element.style.filter = `blur(${blur}px)`;
        } else {
          s.element.style.filter = "none";
        }
      });
    }

    window.addEventListener("scroll", update);
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);
}
