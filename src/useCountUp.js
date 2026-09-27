import { useEffect } from "react";

const format = new Intl.NumberFormat("fr-FR");

/** Animate once in view; assistive technology keeps the final value throughout. */
export default function useCountUp(rootRef) {
  useEffect(() => {
    const counters = [...rootRef.current.querySelectorAll("[data-count]")];
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const frames = new Map();
    let observer;
    function finish() {
      observer?.disconnect();
      frames.forEach(cancelAnimationFrame);
      frames.clear();
      counters.forEach((node) => {
        node.textContent = format.format(Number(node.dataset.count));
      });
    }
    function animate(node) {
      const target = Number(node.dataset.count);
      const start = performance.now() + Number(node.dataset.delay || 0);
      node.textContent = "0";
      function tick(now) {
        const progress = Math.min(1, Math.max(0, (now - start) / 1500));
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = format.format(Math.round(target * eased));
        if (progress < 1) frames.set(node, requestAnimationFrame(tick));
        else frames.delete(node);
      }
      frames.set(node, requestAnimationFrame(tick));
    }
    if (!reduced.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            animate(entry.target);
          });
        },
        { threshold: 0.5 },
      );
      counters.forEach((node) => observer.observe(node));
    }
    const onPreference = () => {
      if (reduced.matches) finish();
    };
    reduced.addEventListener("change", onPreference);
    return () => {
      finish();
      reduced.removeEventListener("change", onPreference);
    };
  }, [rootRef]);
}
