import { useEffect, useRef } from "react";

/** A single frame-batched pointer update; no timers or React renders on movement. */
export default function useHeroMotion() {
  const ref = useRef(null);
  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      element.style.setProperty("--scene-x", "0px");
      element.style.setProperty("--scene-y", "0px");
      element.style.setProperty("--light-opacity", "0");
    }
    function move(event) {
      if (
        preference.matches ||
        !pointer.matches ||
        event.pointerType !== "mouse"
      )
        return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const x = Math.max(
          0,
          Math.min(1, (event.clientX - bounds.left) / bounds.width),
        );
        const y = Math.max(
          0,
          Math.min(1, (event.clientY - bounds.top) / bounds.height),
        );
        element.style.setProperty("--scene-x", `${(x - 0.5) * 18}px`);
        element.style.setProperty("--scene-y", `${(y - 0.5) * 12}px`);
        element.style.setProperty("--light-x", `${x * 100}%`);
        element.style.setProperty("--light-y", `${y * 100}%`);
        element.style.setProperty("--light-opacity", ".22");
        frame = 0;
      });
    }
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", reset);
    element.addEventListener("pointercancel", reset);
    preference.addEventListener("change", reset);
    pointer.addEventListener("change", reset);
    return () => {
      reset();
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("pointercancel", reset);
      preference.removeEventListener("change", reset);
      pointer.removeEventListener("change", reset);
    };
  }, []);
  return ref;
}
