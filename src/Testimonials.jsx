import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  Star,
} from "@phosphor-icons/react";
import useCardsMotion from "./useCardsMotion.js";
import useScrollCarousel from "./useScrollCarousel.js";

const reviews = [
  {
    name: "Salma A.",
    place: "Voyage à Istanbul",
    text: "Un service au top ! Toute l’équipe est professionnelle et à l’écoute. Notre voyage à Istanbul était parfait, merci United events & services !",
    img: 0,
  },
  {
    name: "Karim B.",
    place: "Séjour en Turquie",
    text: "Agence sérieuse et fiable. Ils nous ont accompagnés pour nos visas et notre séjour en Turquie. Tout était bien organisé !",
    img: 1,
  },
  {
    name: "Nadia E.",
    place: "Voyage sur mesure",
    text: "Une expérience exceptionnelle ! Des conseils précieux et un suivi impeccable. Je recommande vivement.",
    img: 2,
  },
  {
    name: "Lina M.",
    initials: "LM",
    place: "Séjour à Dubai",
    text: "De la réservation au retour, tout était simple et bien organisé. L’hôtel correspondait à nos envies et nous avons pleinement profité de notre séjour.",
    example: true,
  },
  {
    name: "Youssef R.",
    initials: "YR",
    place: "Voyage en famille",
    text: "Un programme adapté à toute la famille et des conseils utiles à chaque étape. Nous avons pu voyager sereinement et partager de très beaux moments.",
    example: true,
  },
];

export default function Testimonials({ suspended }) {
  const rootRef = useCardsMotion(".section-heading", ".review");
  const carousel = useScrollCarousel({
    rootRef,
    count: reviews.length,
    suspended,
  });
  const first = carousel.stops[carousel.index]?.cardIndex || 0;
  const last = Math.min(reviews.length, first + carousel.visibleCount);
  return (
    <section
      id="temoignages"
      className="testimonials section testimonials-motion"
      ref={rootRef}
      aria-roledescription="carrousel"
      aria-labelledby="testimonials-title"
      {...carousel.regionProps}
    >
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Ils nous font confiance</span>
          <h2 id="testimonials-title">Leurs voyages, leurs histoires</h2>
        </div>
        <div className="reviews-wrapper">
          <button
            className="round-arrow"
            type="button"
            aria-label="Témoignage précédent"
            aria-controls="testimonials-track"
            onClick={carousel.previous}
          >
            <ArrowLeft />
          </button>
          <div
            className="reviews"
            id="testimonials-track"
            ref={carousel.trackRef}
            tabIndex={0}
            aria-label="Parcourir les témoignages avec les flèches du clavier"
            {...carousel.trackProps}
          >
            {reviews.map((review, i) => (
              <article
                className="review"
                key={review.name}
                style={{ "--reveal-delay": `${Math.min(i, 2) * 90}ms` }}
                aria-label={`${review.example ? "Exemple de témoignage : " : "Témoignage de "}${review.name}`}
              >
                {review.img !== undefined ? (
                  <img
                    className="review-avatar"
                    src={`/assets/avatar-${review.img}.webp`}
                    alt=""
                    loading="lazy"
                    width={61}
                    height={61}
                  />
                ) : (
                  <span
                    className="review-avatar review-initials"
                    aria-hidden="true"
                  >
                    {review.initials}
                  </span>
                )}
                <div className="review-copy">
                  <h3>{review.name}</h3>
                  {review.example && (
                    <span className="review-example">
                      Exemple de témoignage
                    </span>
                  )}
                  <span
                    className="stars"
                    role="img"
                    aria-label={
                      review.example ? "Note illustrative : 5 sur 5" : "5 sur 5"
                    }
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        weight="fill"
                        style={{ "--star-delay": `${i * 55}ms` }}
                      />
                    ))}
                  </span>
                  <p>« {review.text} »</p>
                  <small>{review.place}</small>
                </div>
              </article>
            ))}
          </div>
          <button
            className="round-arrow"
            type="button"
            aria-label="Témoignage suivant"
            aria-controls="testimonials-track"
            onClick={carousel.next}
          >
            <ArrowRight />
          </button>
        </div>
        <div className="review-dots">
          {carousel.stops.map((stop, i) => (
            <button
              type="button"
              key={stop.cardIndex}
              className={`dot ${i === carousel.index ? "current" : ""}`}
              aria-label={`Afficher les témoignages ${stop.cardIndex + 1} à ${Math.min(reviews.length, stop.cardIndex + carousel.visibleCount)}`}
              aria-current={i === carousel.index ? "true" : undefined}
              aria-controls="testimonials-track"
              onClick={() => carousel.navigate(i)}
            />
          ))}
          <button
            type="button"
            className="carousel-playback"
            aria-label={
              carousel.playing
                ? "Mettre les témoignages en pause"
                : "Activer le défilement des témoignages"
            }
            onClick={carousel.togglePlayback}
          >
            {carousel.playing ? (
              <Pause weight="fill" />
            ) : (
              <Play weight="fill" />
            )}
          </button>
        </div>
        <p
          className="visually-hidden"
          aria-live={carousel.playing ? "off" : "polite"}
          aria-atomic="true"
        >
          Témoignages {first + 1} à {last} sur {reviews.length}.
        </p>
      </div>
    </section>
  );
}
