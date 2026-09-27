import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Bed,
  EnvelopeSimple,
  IdentificationCard,
  MapPin,
  Phone,
  Wallet,
} from "@phosphor-icons/react";
import "./Footer.css";

const departments = [
  {
    title: "Billetterie & hôtels",
    Icon: Bed,
    numbers: ["+212 6 66 74 27 78", "+212 6 66 69 70 04"],
  },
  {
    title: "Visas Chine & Égypte",
    Icon: IdentificationCard,
    numbers: ["+212 6 69 59 44 73", "+212 6 66 63 10 94"],
  },
  {
    title: "Visas Schengen & USA",
    Icon: IdentificationCard,
    numbers: ["+212 6 69 96 71 28"],
  },
  {
    title: "Service financier",
    Icon: Wallet,
    numbers: ["+212 6 69 34 13 58"],
  },
];
const email = "unitedtravelandservice@gmail.com";
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Résidence Le Médina, Avenue Hassan II, Casablanca, Maroc")}`;

export default function Footer({ services, destinations, onContact, onDestination }) {
  return (
    <footer id="contact" className="site-footer">
      <div className="container">
        <div className="footer-welcome">
          <div>
            <p className="footer-eyebrow">De Casablanca, vers le monde</p>
            <h2>L’ailleurs <em>commence ici.</em></h2>
            <p className="footer-welcome-copy">
              Une envie d’évasion, un projet à organiser ? Parlons-en.
            </p>
          </div>
          <div className="footer-conversation">
            <span>Votre prochain voyage commence par un appel</span>
            <a className="footer-phone" href="tel:+212521248346">
              <span className="footer-phone-icon"><Phone weight="light" /></span>
              +212 5 21 24 83 46
            </a>
            <button className="footer-text-link" onClick={() => onContact()}>
              Ou confiez-nous vos envies <ArrowUpRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="footer-directory">
          <div className="footer-identity">
            <a href="#accueil" className="footer-logo" aria-label="United events & services — accueil">
              <img src="/assets/logo-officiel.png" alt="United events & services" width="168" height="168" loading="lazy" />
            </a>
            <p>
              Des séjours aux voyages sur mesure, des billets d’avion aux événements :
              votre agence vous accompagne à chaque étape.
            </p>
            <span className="footer-signature">Voyager, c’est vivre plus.</span>
          </div>

          <nav className="footer-link-group" aria-labelledby="footer-services-title">
            <h3 id="footer-services-title">Vos envies de voyage</h3>
            <ul>
              {services.map((service) => (
                <li key={service.title}>
                  <button onClick={() => onContact(service.title)}>{service.short}</button>
                </li>
              ))}
            </ul>
            <a className="footer-text-link" href="#services">Tous nos services <ArrowRight aria-hidden="true" /></a>
          </nav>

          <nav className="footer-link-group" aria-labelledby="footer-destinations-title">
            <h3 id="footer-destinations-title">Le monde vous attend</h3>
            <ul className="footer-destination-links">
              {destinations.map((destination) => (
                <li key={destination.name}>
                  <button onClick={() => onDestination(destination)}>{destination.name}</button>
                </li>
              ))}
            </ul>
            <a className="footer-text-link" href="#destinations">Explorer les destinations <ArrowRight aria-hidden="true" /></a>
          </nav>

          <div className="footer-agency">
            <h3>Retrouvons-nous</h3>
            <address>
              <div className="footer-address-row">
                <MapPin weight="light" aria-hidden="true" />
                <div>
                  <strong>Notre agence à Casablanca</strong>
                  <p>Avenue Hassan II,<br />Résidence Le Médina, 1er étage,<br />N° 9 – Casablanca</p>
                  <a className="footer-text-link" href={mapUrl} target="_blank" rel="noopener noreferrer">
                    Voir l’itinéraire <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </div>
              <a className="footer-email" href={`mailto:${email}`}>
                <EnvelopeSimple weight="light" aria-hidden="true" />
                <span>{email}</span>
              </a>
            </address>
          </div>
        </div>

        <section className="footer-specialists" aria-labelledby="footer-specialists-title">
          <div className="footer-specialists-heading">
            <h3 id="footer-specialists-title">À chaque projet, votre interlocuteur.</h3>
            <span>Nos lignes directes</span>
          </div>
          <div className="footer-departments">
            {departments.map(({ title, Icon, numbers }) => (
              <div className="footer-department" key={title}>
                <Icon weight="light" aria-hidden="true" />
                <div>
                  <h4>{title}</h4>
                  {numbers.map((number) => (
                    <a key={number} href={`tel:${number.replaceAll(" ", "")}`}>{number}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="footer-utility">
          <nav aria-label="Navigation de bas de page">
            <a href="#accueil">Accueil</a>
            <a href="#a-propos">À propos</a>
            <a href="#services">Nos services</a>
            <a href="#destinations">Destinations</a>
            <button onClick={() => onContact()}>Contact</button>
          </nav>
          <a href="#accueil" className="footer-to-top">Retour en haut <span><ArrowUp aria-hidden="true" /></span></a>
        </div>
        <div className="footer-copyright">
          <span>© {new Date().getFullYear()} United events & services. Tous droits réservés.</span>
          <span>Des voyages d’aujourd’hui, de plus beaux lendemains.</span>
        </div>
      </div>
    </footer>
  );
}
