import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Pause,
  Play,
} from "@phosphor-icons/react";

export function DestinationPhoto({ destination, ...props }) {
  return (
    <img
      src={`/assets/destination-${destination.img}.webp`}
      srcSet={`/assets/destination-${destination.img}-small.webp 800w, /assets/destination-${destination.img}.webp 1600w`}
      sizes="(max-width: 600px) 240px, (max-width: 1000px) 35vw, 320px"
      alt={destination.name}
      style={{ objectPosition: destination.position || "center" }}
      decoding="async"
      {...props}
    />
  );
}

export default function DestinationCarousel({
  destinations,
  onSelect,
  suspended,
}) {
  const trackRef = useRef(null);
  const carouselRef = useRef(null);
  const targetIndex = useRef(0);
  const stopsRef = useRef([]);
  const [stops, setStops] = useState([]);
  const [index, setIndex] = useState(0);
  const [range, setRange] = useState([1, 5]);
  const [playing, setPlaying] = useState(
    () => !matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    let settle;
    let frame;
    const measure = () => {
      const cards = [...track.children];
      const max = Math.max(0, track.scrollWidth - track.clientWidth);
      const nextStops = [];
      cards.forEach((card, cardIndex) => {
        const left = Math.min(card.offsetLeft - cards[0].offsetLeft, max);
        if (!nextStops.length || left - nextStops.at(-1).left > 2)
          nextStops.push({ left, cardIndex });
      });
      stopsRef.current = nextStops;
      setStops(nextStops);
      sync();
    };
    const sync = () => {
      const list = stopsRef.current;
      if (!list.length) return;
      const closest = list.reduce(
        (best, stop, i) =>
          Math.abs(stop.left - track.scrollLeft) <
          Math.abs(list[best].left - track.scrollLeft)
            ? i
            : best,
        0,
      );
      targetIndex.current = closest;
      setIndex(closest);
      const cards = [...track.children];
      const origin = cards[0].offsetLeft;
      const visible = cards
        .map((card, i) => ({
          i,
          left: card.offsetLeft - origin,
          width: card.offsetWidth,
        }))
        .filter(
          (card) =>
            card.left + card.width > track.scrollLeft + 20 &&
            card.left < track.scrollLeft + track.clientWidth - 20,
        );
      if (visible.length) setRange([visible[0].i + 1, visible.at(-1).i + 1]);
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
      clearTimeout(settle);
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("scrollend", sync);
    };
  }, [destinations]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(carouselRef.current);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = () => {
      if (reduced.matches) setPlaying(false);
    };
    reduced.addEventListener("change", onPreference);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", onPreference);
    };
  }, []);

  const goTo = useCallback((next) => {
    const list = stopsRef.current;
    if (!list.length) return;
    const target = (next + list.length) % list.length;
    targetIndex.current = target;
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
      hovered ||
      focused ||
      !inView ||
      suspended ||
      stops.length < 2
    )
      return;
    const timer = setInterval(() => {
      if (!document.hidden) goTo(targetIndex.current + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [playing, hovered, focused, inView, suspended, stops.length, index, goTo]);

  function navigate(next) {
    setPlaying(false);
    goTo(next);
  }

  return (
    <div
      className="destinations-content"
      ref={carouselRef}
      role="region"
      aria-roledescription="carrousel"
      aria-label="Destinations phares"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div
        className="destinations-track"
        id="destinations-carousel"
        ref={trackRef}
        tabIndex={0}
        aria-label="Parcourir les destinations avec les flèches du clavier"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") setPlaying(false);
        }}
        onKeyDown={(event) => {
          if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
            return;
          event.preventDefault();
          navigate(
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? stops.length - 1
                : targetIndex.current + (event.key === "ArrowRight" ? 1 : -1),
          );
        }}
      >
        {destinations.map((destination, i) => (
          <button
            type="button"
            className="destination-card"
            style={{ "--reveal-delay": `${Math.min(i, 4) * 65}ms` }}
            key={destination.name}
            onClick={() => onSelect(destination)}
          >
            <span className="destination-photo-frame">
              <DestinationPhoto destination={destination} loading="lazy" />
            </span>
            <span className="destination-caption">
              <MapPin weight="fill" />
              <span>
                <strong>{destination.name}</strong>
                <small>{destination.desc}</small>
              </span>
              <span className="mini-arrow">
                <ArrowRight />
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="slider-controls destination-controls">
        <button
          type="button"
          className="round-arrow"
          aria-label="Destination précédente"
          aria-controls="destinations-carousel"
          onClick={() => navigate(targetIndex.current - 1)}
        >
          <ArrowLeft />
        </button>
        <div className="destination-dots">
          {stops.map((stop, i) => (
            <button
              type="button"
              key={stop.cardIndex}
              className={`dot ${i === index ? "current" : ""}`}
              aria-label={`Afficher les destinations à partir de ${destinations[stop.cardIndex].name}`}
              aria-current={i === index ? "true" : undefined}
              aria-controls="destinations-carousel"
              onClick={() => navigate(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="round-arrow"
          aria-label="Destination suivante"
          aria-controls="destinations-carousel"
          onClick={() => navigate(targetIndex.current + 1)}
        >
          <ArrowRight />
        </button>
        <button
          type="button"
          className="carousel-playback"
          aria-label={
            playing
              ? "Mettre le défilement en pause"
              : "Activer le défilement automatique"
          }
          title={playing ? "Mettre en pause" : "Défilement automatique"}
          onClick={() => setPlaying((value) => !value)}
        >
          {playing ? <Pause weight="fill" /> : <Play weight="fill" />}
        </button>
      </div>
      <p
        className="destination-count"
        aria-live={playing ? "off" : "polite"}
        aria-atomic="true"
      >
        <span>
          {String(range[0]).padStart(2, "0")} —{" "}
          {String(range[1]).padStart(2, "0")}
        </span>{" "}
        / {destinations.length} destinations
      </p>
    </div>
  );
}
