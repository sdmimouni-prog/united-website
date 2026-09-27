import { useEffect, useRef } from "react";

export default function useCardsMotion(
  introSelector = ".services-intro",
  cardSelector = ".service-card",
) {
  const ref = useRef(null);
  useEffect(() => {
    const section = ref.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = matchMedia("(hover: hover) and (pointer: fine)");
    const items = [
      ...section.querySelectorAll(`${introSelector}, ${cardSelector}`),
    ];
    let observer;
    let frame = 0;
    let active = null;
    let bounds = null;
    function resetCard() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (active) {
        active.style.setProperty("--card-rx", "0deg");
        active.style.setProperty("--card-ry", "0deg");
        active.classList.remove("is-pointed");
      }
      active = null;
      bounds = null;
    }
    function move(event) {
      if (reduced.matches || !mouse.matches || event.pointerType !== "mouse")
        return;
      const card = event.target.closest(cardSelector);
      if (!card || !section.contains(card)) {
        resetCard();
        return;
      }
      if (active !== card) {
        resetCard();
        active = card;
        bounds = card.getBoundingClientRect();
        card.classList.add("is-pointed");
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = Math.max(
          0,
          Math.min(1, (event.clientX - bounds.left) / bounds.width),
        );
        const y = Math.max(
          0,
          Math.min(1, (event.clientY - bounds.top) / bounds.height),
        );
        card.style.setProperty("--card-rx", `${(0.5 - y) * 5}deg`);
        card.style.setProperty("--card-ry", `${(x - 0.5) * 6}deg`);
        card.style.setProperty("--shine-x", `${x * 100}%`);
        card.style.setProperty("--shine-y", `${y * 100}%`);
        frame = 0;
      });
    }
    function revealFocused(event) {
      const target = event.target.closest(cardSelector);
      target?.classList.add("is-revealed");
      if (target) observer?.unobserve(target);
    }
    function preferencesChanged() {
      resetCard();
      if (reduced.matches) {
        observer?.disconnect();
        section.classList.remove("motion-armed");
        items.forEach((item) => item.classList.add("is-revealed"));
      }
    }
    if (!reduced.matches && "IntersectionObserver" in window) {
      section.classList.add("motion-armed");
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
      );
      items.forEach((item) => observer.observe(item));
    }
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", resetCard);
    section.addEventListener("pointercancel", resetCard);
    section.addEventListener("focusin", revealFocused);
    section.addEventListener("scroll", resetCard, true);
    reduced.addEventListener("change", preferencesChanged);
    mouse.addEventListener("change", resetCard);
    return () => {
      observer?.disconnect();
      resetCard();
      section.classList.remove("motion-armed");
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", resetCard);
      section.removeEventListener("pointercancel", resetCard);
      section.removeEventListener("focusin", revealFocused);
      section.removeEventListener("scroll", resetCard, true);
      reduced.removeEventListener("change", preferencesChanged);
      mouse.removeEventListener("change", resetCard);
    };
  }, [introSelector, cardSelector]);
  return ref;
}
