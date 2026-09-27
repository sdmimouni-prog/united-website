import { useCallback, useEffect, useRef, useState } from "react";

/** Native swipe/scroll, responsive stops and controlled automatic playback. */
export default function useScrollCarousel({
  rootRef,
  count,
  suspended,
  delay = 6000,
}) {
  const trackRef = useRef(null);
  const positions = useRef([]);
  const current = useRef(0);
  const [stops, setStops] = useState([]);
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [playing, setPlaying] = useState(
    () => !matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    let frame;
    let settle;
    const sync = () => {
      const list = positions.current;
      if (!list.length) return;
      const next = list.reduce(
        (best, stop, i) =>
          Math.abs(stop.left - track.scrollLeft) <
          Math.abs(list[best].left - track.scrollLeft)
            ? i
            : best,
        0,
      );
      current.current = next;
      setIndex(next);
    };
    const measure = () => {
      const cards = [...track.children];
      if (!cards.length) return;
      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      const list = [];
      cards.forEach((card, cardIndex) => {
        const left = Math.min(card.offsetLeft - cards[0].offsetLeft, max);
        if (!list.length || left - list.at(-1).left > 2)
          list.push({ left, cardIndex });
      });
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      setVisibleCount(
        Math.max(
          1,
          Math.round((track.clientWidth + gap) / (cards[0].offsetWidth + gap)),
        ),
      );
      positions.current = list;
      setStops(list);
      sync();
    };
    const onScroll = () => {
      clearTimeout(settle);
      settle = setTimeout(sync, 120);
    };
    const resize = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    resize.observe(track);
    measure();
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("scrollend", sync);
    return () => {
      resize.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", sync);
    };
  }, [count]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(rootRef.current);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      if (reduced.matches) setPlaying(false);
    };
    reduced.addEventListener("change", change);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", change);
    };
  }, [rootRef]);

  const goTo = useCallback((next) => {
    const list = positions.current;
    if (!list.length) return;
    const target = (next + list.length) % list.length;
    current.current = target;
    setIndex(target);
    trackRef.current.scrollTo({
      left: list[target].left,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }, []);

  useEffect(() => {
    if (
      !playing ||
      !inView ||
      hovered ||
      focused ||
      suspended ||
      stops.length < 2
    )
      return;
    const timer = setInterval(() => {
      if (!document.hidden) goTo(current.current + 1);
    }, delay);
    return () => clearInterval(timer);
  }, [
    playing,
    inView,
    hovered,
    focused,
    suspended,
    stops.length,
    index,
    delay,
    goTo,
  ]);

  function navigate(next) {
    setPlaying(false);
    goTo(next);
  }
  return {
    trackRef,
    stops,
    index,
    visibleCount,
    playing,
    togglePlayback: () => setPlaying((value) => !value),
    navigate,
    previous: () => navigate(current.current - 1),
    next: () => navigate(current.current + 1),
    regionProps: {
      onPointerEnter: (event) => {
        if (event.pointerType === "mouse") setHovered(true);
      },
      onPointerLeave: () => setHovered(false),
      onFocusCapture: () => setFocused(true),
      onBlurCapture: (event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      },
    },
    trackProps: {
      onPointerDown: (event) => {
        if (event.pointerType !== "mouse") setPlaying(false);
      },
      onWheel: (event) => {
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) setPlaying(false);
      },
      onKeyDown: (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
          return;
        event.preventDefault();
        navigate(
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? positions.current.length - 1
              : current.current + (event.key === "ArrowRight" ? 1 : -1),
        );
      },
    },
  };
}
