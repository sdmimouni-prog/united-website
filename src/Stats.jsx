import {
  UsersThree,
  GlobeHemisphereWest,
  CalendarStar,
  Medal,
} from "@phosphor-icons/react";
import useCardsMotion from "./useCardsMotion.js";
import useCountUp from "./useCountUp.js";
import "./Stats.css";

const statistics = [
  {
    value: 10000,
    suffix: "+",
    label: "Voyageurs satisfaits",
    Icon: UsersThree,
  },
  { value: 50, suffix: "+", label: "Destinations", Icon: GlobeHemisphereWest },
  {
    value: 100,
    suffix: "+",
    label: "Événements organisés",
    Icon: CalendarStar,
  },
  { value: 15, suffix: "ans", label: "d’expérience", Icon: Medal },
];
const format = new Intl.NumberFormat("fr-FR");

export default function Stats() {
  const sectionRef = useCardsMotion(".stats-caption", ".stats-ticket");
  useCountUp(sectionRef);
  return (
    <section
      id="chiffres-cles"
      className="stats stats-motion"
      ref={sectionRef}
      aria-label="United Events & Services en quelques chiffres"
    >
      <div className="container">
        <ul className="stats-grid" role="list">
          {statistics.map(({ value, suffix, label, Icon }, i) => (
            <li
              className={`stats-ticket ${i === 3 ? "stats-ticket-signature" : ""}`}
              key={label}
              style={{
                "--reveal-delay": `${i * 100}ms`,
                "--ticket-angle": `${i % 2 ? 0.8 : -0.8}deg`,
              }}
            >
              <div className="stats-ticket-body">
                <span className="stats-symbol" aria-hidden="true">
                  <Icon weight="duotone" />
                </span>
                <p className="stats-label">{label}</p>
                <p className="stats-value">
                  <span className="visually-hidden">
                    {format.format(value)}
                    {suffix === "ans" ? " ans" : "+"}
                  </span>
                  <span
                    className="stats-number"
                    data-count={value}
                    data-delay={i * 100}
                    aria-hidden="true"
                  >
                    {format.format(value)}
                  </span>
                  <span
                    className={`stats-suffix ${suffix === "ans" ? "stats-years" : ""}`}
                    aria-hidden="true"
                  >
                    {suffix}
                  </span>
                </p>
              </div>
              <div className="stats-ticket-stub" aria-hidden="true">
                <span className="stats-ticket-index">0{i + 1}</span>
                <span className="stats-ticket-rule" />
                <span className="stats-ticket-dot" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
