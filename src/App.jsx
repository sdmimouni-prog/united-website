import React, { useState, useRef, useEffect } from "react";
import {
  AirplaneTilt,
  Bed,
  IdentificationCard,
  Island,
  TreePalm,
  UsersThree,
  CalendarStar,
  ShieldCheck,
  Headset,
  ArrowRight,
  ArrowLeft,
  ArrowsLeftRight,
  Phone,
  MagnifyingGlass,
  MapPin,
  CalendarBlank,
  User,
  CaretDown,
  List,
  X,
  CheckCircle,
  Envelope,
  Clock,
  Medal,
  InstagramLogo,
  FacebookLogo,
} from "@phosphor-icons/react";
import "./styles.css";
import MegaMenu from "./MegaMenu.jsx";
import useHeroMotion from "./useHeroMotion.js";
import Testimonials from "./Testimonials.jsx";
import Stats from "./Stats.jsx";
import Footer from "./Footer.jsx";
import ServiceMedallion, { PassportIcon } from "./ServiceMedallion.jsx";
import useCardsMotion from "./useCardsMotion.js";
import DestinationCarousel, {
  DestinationPhoto,
} from "./DestinationCarousel.jsx";
import "./Mobile.css";
const A = "/assets/";
const services = [
  {
    title: "Réservation billets d’avion",
    short: "Billets d’avion",
    desc: "Toutes les compagnies aériennes, partout dans le monde.",
    icon: AirplaneTilt,
  },
  {
    title: "Réservation hôtels",
    short: "Hôtels dans le monde",
    desc: "Un large choix d’hébergements, partout dans le monde.",
    icon: Bed,
  },
  {
    title: "Assistance visa",
    short: "Assistance visa",
    desc: "USA, Schengen, Dubai, Égypte, Chine, Turquie, Qatar, Japon et autres destinations.",
    icon: PassportIcon,
  },
  {
    title: "Séjours & programmes",
    short: "Séjours & programmes",
    desc: "Istanbul, Antalya, Le Caire, Sharm, Dubai et bien d’autres destinations.",
    icon: TreePalm,
  },
  {
    title: "Voyages en groupe",
    short: "Voyages en groupe",
    desc: "Programmes familiaux, entre amis ou d’entreprise.",
    icon: UsersThree,
  },
  {
    title: "Événements & services",
    short: "Événements & services",
    desc: "Organisation d’événements, voyages incentive, séminaires et voyages d’affaires.",
    icon: CalendarStar,
    iconWeight: "bold",
  },
];
const destinations = [
  {
    name: "Istanbul",
    desc: "Histoire et modernité",
    detail:
      "Découvrez la magie d’Istanbul, entre les rives du Bosphore et ses monuments emblématiques.",
    price: "8 330",
    img: 0,
  },
  {
    name: "Dubai",
    desc: "Luxe et émerveillement",
    detail:
      "Une escapade entre architecture spectaculaire, plages et aventures dans le désert.",
    img: 1,
    position: "center top",
  },
  {
    name: "Antalya",
    desc: "Nature et détente",
    detail:
      "Soleil, plages et détente sur la Riviera turque. Un séjour balnéaire à votre rythme.",
    price: "6 900",
    img: 2,
  },
  {
    name: "Le Caire",
    desc: "Sur les traces des pharaons",
    detail:
      "Découvrez les pyramides et l’histoire millénaire de l’Égypte. Séjour au Caire et croisière sur le Nil.",
    price: "13 500",
    img: 3,
    position: "32% center",
  },
  {
    name: "Maldives",
    desc: "Évasion et sérénité",
    detail:
      "Des lagons turquoise, des plages de sable blanc et une parenthèse hors du temps.",
    price: "14 900",
    img: 4,
  },
  {
    name: "Bali",
    desc: "Temples et douceur de vivre",
    detail:
      "Laissez-vous séduire par les temples au bord de l’eau, les rizières et les plages de Bali. Une escapade entre culture et nature.",
    img: 5,
  },
  {
    name: "Phuket",
    desc: "Une parenthèse tropicale",
    detail:
      "Cap sur les plages de Phuket, les eaux de la mer d’Andaman et les saveurs de la Thaïlande. Composez votre séjour selon vos envies.",
    img: 6,
  },
  {
    name: "Kuala Lumpur",
    desc: "Au carrefour des cultures",
    detail:
      "Explorez Kuala Lumpur, ses tours Petronas, ses quartiers animés et sa cuisine aux multiples influences. Une porte d’entrée sur la Malaisie.",
    img: 7,
    position: "center top",
  },
];
function RoundArrow({ left = false, ...props }) {
  return (
    <button className="round-arrow" {...props}>
      {left ? <ArrowLeft /> : <ArrowRight />}
    </button>
  );
}
function Heading({ eyebrow, children }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
    </div>
  );
}
export default function App() {
  const heroRef = useHeroMotion();
  const servicesRef = useCardsMotion();
  const destinationsRef = useCardsMotion(
    ".destinations-intro",
    ".destination-card",
  );
  const trustRef = useCardsMotion(
    ".trust-copy > .section-heading",
    ".benefit, .trust-image",
  );
  const [menu, setMenu] = useState(false),
    [dropdown, setDropdown] = useState(""),
    [tab, setTab] = useState("Vols"),
    [from, setFrom] = useState(""),
    [to, setTo] = useState(""),
    [date, setDate] = useState(""),
    [travelers, setTravelers] = useState("1"),
    [modal, setModal] = useState(null),
    [prepared, setPrepared] = useState(false);
  const dialog = useRef(null),
    lastFocus = useRef(null);
  useEffect(() => {
    if (modal) {
      lastFocus.current = document.activeElement;
      dialog.current.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current.close();
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);
  function openContact(subject = "Votre prochain voyage") {
    setPrepared(false);
    setModal({ type: "contact", title: subject });
  }
  const headerRef = useRef(null);
  const hoverTimer = useRef(null);
  const triggers = useRef({});
  function cancelClose() {
    clearTimeout(hoverTimer.current);
  }
  function hoverOpen(label, event) {
    if (
      event.pointerType !== "mouse" ||
      !window.matchMedia("(min-width: 1001px)").matches
    )
      return;
    cancelClose();
    setDropdown(label);
  }
  function hoverClose(event) {
    if (
      event.pointerType !== "mouse" ||
      !window.matchMedia("(min-width: 1001px)").matches
    )
      return;
    cancelClose();
    hoverTimer.current = setTimeout(() => setDropdown(""), 150);
  }
  useEffect(() => {
    function outside(event) {
      if (!headerRef.current?.contains(event.target)) {
        cancelClose();
        setDropdown("");
        setMenu(false);
      }
    }
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("pointerdown", outside);
      cancelClose();
    };
  }, []);
  function menuAction(action, title) {
    closeNav();
    if (action === "destinations" || action === "search") {
      if (action === "search") setTab("Vols");
      document
        .getElementById(action === "search" ? "recherche" : "destinations")
        .scrollIntoView({ behavior: "smooth" });
    } else if (action === "all-destinations") {
      setModal({ type: "destinations", title: "Toutes nos destinations" });
    } else if (action === "destination") {
      const d = destinations.find((item) => item.name === title);
      setModal({ type: "destination", title: d.name, d });
    } else openContact(title);
  }
  function closeNav() {
    cancelClose();
    setMenu(false);
    setDropdown("");
  }
  function search(e) {
    e.preventDefault();
    setModal({
      type: "search",
      title: "Votre projet de voyage",
      summary: `${tab} · ${tab === "Vols" ? from + " → " : ""}${to} · ${new Date(date + "T12:00:00").toLocaleDateString("fr-FR")} · ${travelers} voyageur${travelers === "1" ? "" : "s"}`,
    });
  }
  return (
    <>
      <header
        className="header"
        ref={headerRef}
        onPointerLeave={hoverClose}
        onPointerEnter={cancelClose}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            cancelClose();
            if (dropdown) {
              triggers.current[dropdown]?.focus();
              setDropdown("");
            } else setMenu(false);
          }
        }}
      >
        <div className="container header-inner">
          <a
            className="brand"
            href="#accueil"
            aria-label="United Events & Services — Accueil"
          >
            <img src={A + "logo-officiel.png"} alt="United events & services" />
          </a>
          <button
            className="menu-toggle"
            aria-label={menu ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menu}
            onClick={() => {
              cancelClose();
              setMenu(!menu);
              setDropdown("");
            }}
          >
            {menu ? <X /> : <List />}
          </button>
          <nav
            className={menu ? "navigation open" : "navigation"}
            aria-label="Navigation principale"
          >
            <a className="active" href="#accueil" onClick={closeNav}>
              Accueil
            </a>
            {[
              "Voyages",
              "Hôtels",
              "Vols",
              "Assistance Visa",
              "Événements",
              "À propos",
              "Contact",
            ].map((label) =>
              ["Voyages", "Vols", "Événements"].includes(label) ? (
                <div
                  className="nav-dropdown"
                  key={label}
                  onPointerEnter={(event) => hoverOpen(label, event)}
                  onPointerLeave={hoverClose}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      cancelClose();
                      setDropdown("");
                    }
                  }}
                >
                  <button
                    ref={(el) => {
                      triggers.current[label] = el;
                    }}
                    aria-expanded={dropdown === label}
                    aria-controls={`mega-${label}`}
                    onClick={(event) => {
                      cancelClose();
                      const mouseHover =
                        event.detail > 0 &&
                        window.matchMedia("(min-width: 1001px) and (hover: hover) and (pointer: fine)").matches;
                      setDropdown(mouseHover ? label : dropdown === label ? "" : label);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        cancelClose();
                        setDropdown(label);
                      }
                    }}
                    onKeyUp={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        requestAnimationFrame(() =>
                          document
                            .getElementById(`mega-${label}`)
                            ?.querySelector("button")
                            ?.focus(),
                        );
                      }
                    }}
                  >
                    {label}
                    <CaretDown size={13} />
                  </button>
                  <MegaMenu
                    label={label}
                    open={dropdown === label}
                    onAction={menuAction}
                  />
                </div>
              ) : (
                <a
                  key={label}
                  href={
                    label === "À propos"
                      ? "#a-propos"
                      : label === "Contact"
                        ? "#contact"
                        : "#services"
                  }
                  onClick={() => {
                    closeNav();
                    if (label === "Hôtels") {
                      setTab("Hôtels");
                    }
                    if (label === "Assistance Visa")
                      openContact("Assistance visa");
                  }}
                >
                  {label}
                </a>
              ),
            )}
          </nav>
          <a href="tel:+212521248346" className="phone-cta">
            <Phone weight="fill" />
            <span>+212 5 21 24 83 46</span>
          </a>
        </div>
      </header>
      <main>
        <section id="accueil" className="hero hero-motion" ref={heroRef}>
          <div
            className="hero-art"
            role="img"
            aria-label="Avion, tour Eiffel, pyramides et destinations de rêve"
          />
          <div className="hero-light" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="eyebrow">
                Votre agence de voyage de confiance
              </span>
              <h1>
                Voyagez
                <br />
                <span>sans limites !</span>
              </h1>
              <p>
                Billets d’avion, hôtels, séjours, assistance visa,
                <br className="desktop-br" /> voyages sur mesure et plus encore.
              </p>
              <div className="hero-actions">
                <a href="#destinations" className="button gold">
                  Découvrir nos offres{" "}
                  <span className="button-arrow">
                    <ArrowRight />
                  </span>
                </a>
                <button
                  className="button outline"
                  onClick={() => openContact()}
                >
                  <Phone /> Nous contacter
                </button>
              </div>
              <div
                className="hero-art hero-art--mobile"
                role="img"
                aria-label="Avion, tour Eiffel, pyramides et destinations de rêve"
              />
              <div className="hero-services">
                {services.map((s) => (
                  <a key={s.short} href="#services">
                    <ServiceMedallion icon={s.icon} weight={s.iconWeight} />
                    <span>{s.short}</span>
                  </a>
                ))}
              </div>
            </div>
            <form className="search-panel" id="recherche" onSubmit={search}>
              <div
                className="search-tabs"
                role="tablist"
                aria-label="Type de voyage"
              >
                {[
                  ["Vols", AirplaneTilt],
                  ["Hôtels", Bed],
                  ["Séjours", Island],
                  ["Voyages sur mesure", MapPin],
                ].map(([name, Icon]) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={tab === name}
                    className={tab === name ? "selected" : ""}
                    onClick={() => setTab(name)}
                    key={name}
                  >
                    <Icon size={25} />
                    {name}
                  </button>
                ))}
              </div>
              <div
                className={
                  "search-fields " + (tab !== "Vols" ? "no-origin" : "")
                }
              >
                {tab === "Vols" && (
                  <>
                    <label className="search-field">
                      <AirplaneTilt />
                      <span>
                        De
                        <input
                          required
                          placeholder="Ville de départ"
                          value={from}
                          onChange={(e) => setFrom(e.target.value)}
                          list="cities"
                        />
                      </span>
                    </label>
                    <button
                      type="button"
                      className="swap"
                      aria-label="Inverser les villes"
                      onClick={() => {
                        setFrom(to);
                        setTo(from);
                      }}
                    >
                      <ArrowsLeftRight />
                    </button>
                  </>
                )}
                <label className="search-field">
                  <MapPin />
                  <span>
                    {tab === "Vols" ? "À" : "Destination"}
                    <input
                      required
                      placeholder={
                        tab === "Vols"
                          ? "Ville d’arrivée"
                          : "Où souhaitez-vous partir ?"
                      }
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      list="cities"
                    />
                  </span>
                </label>
                <label className="search-field">
                  <CalendarBlank />
                  <span>
                    Dates
                    <input
                      type="date"
                      required
                      aria-label="Date de départ"
                      min={new Date().toLocaleDateString("en-CA")}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </span>
                </label>
                <label className="search-field">
                  <User />
                  <span>
                    Voyageurs
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option value={n} key={n}>
                          {n} voyageur{n > 1 ? "s" : ""}, Éco
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
                <button className="button gold search-submit">
                  <MagnifyingGlass /> Rechercher
                </button>
              </div>
              <datalist id="cities">
                {[
                  "Casablanca",
                  "Marrakech",
                  "Rabat",
                  "Paris",
                  "Istanbul",
                  "Dubai",
                  "Antalya",
                  "Le Caire",
                  "Maldives",
                  "Bali",
                ].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </datalist>
            </form>
            <div className="hero-bottom">
              <span>
                Le monde vous attend <span className="small-line" />
              </span>
              <span>
                Votre partenaire voyage,
                <br />
                ici et partout dans le monde
              </span>
            </div>
          </div>
        </section>
        <section
          id="services"
          className="services section services-motion"
          ref={servicesRef}
        >
          <div className="container">
            <div className="services-intro">
              <Heading eyebrow="Nos services">
                Tout pour un voyage
                <br />
                <em>sans contraintes</em>
              </Heading>
              <img
                className="handwriting"
                src={A + "services-note.webp"}
                alt="Profitez, on s’occupe de tout !"
              />
            </div>
            <div className="services-grid">
              {services.map((s, i) => (
                <article
                  className="service-card"
                  key={s.title}
                  style={{ "--reveal-delay": `${i * 70}ms` }}
                >
                  <div className="service-photo-frame">
                    <img
                      className="service-photo"
                      src={`${A}service-${i}.webp`}
                      alt={s.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="service-body">
                    <ServiceMedallion icon={s.icon} weight={s.iconWeight} />
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <RoundArrow
                      aria-label={"En savoir plus : " + s.title}
                      onClick={() => openContact(s.title)}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          id="destinations"
          className="destinations section destinations-motion"
          ref={destinationsRef}
        >
          <div className="container destinations-layout">
            <div className="destinations-intro">
              <Heading eyebrow="Destinations phares">
                Des lieux
                <br />
                <em>qui font rêver</em>
              </Heading>
              <p>
                Plages paradisiaques, villes mythiques ou escapades culturelles,
                découvrez notre sélection de destinations incontournables.
              </p>
              <button
                className="button gold compact"
                onClick={() =>
                  setModal({
                    type: "destinations",
                    title: "Explorez nos destinations",
                  })
                }
              >
                Voir toutes les destinations{" "}
                <span className="button-arrow">
                  <ArrowRight />
                </span>
              </button>
            </div>
            <DestinationCarousel
              destinations={destinations}
              suspended={Boolean(modal)}
              onSelect={(d) =>
                setModal({ type: "destination", title: d.name, d })
              }
            />
          </div>
        </section>
        <section
          id="a-propos"
          className="trust section trust-motion"
          ref={trustRef}
        >
          <div className="container trust-layout">
            <div className="trust-copy">
              <Heading eyebrow="Pourquoi nous choisir">
                Une expérience
                <br />
                <em>en toute confiance</em>
              </Heading>
              <div className="benefits">
                {[
                  [
                    Medal,
                    "Meilleurs tarifs",
                    "Des offres sélectionnées pour voyager au meilleur prix.",
                  ],
                  [
                    UsersThree,
                    "Service personnalisé",
                    "Des experts à votre écoute pour un voyage qui vous ressemble.",
                  ],
                  [
                    Headset,
                    "Assistance 24/7",
                    "Une équipe disponible à chaque étape de votre voyage.",
                  ],
                  [
                    ShieldCheck,
                    "Partenaire de confiance",
                    "Un accompagnement fiable, du premier conseil au retour.",
                  ],
                ].map(([Icon, title, desc], i) => (
                  <div
                    className="benefit"
                    key={title}
                    style={{ "--reveal-delay": `${140 + i * 95}ms` }}
                  >
                    <span className="icon-medallion">
                      <Icon weight="fill" />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="trust-image">
              <div className="trust-photo-frame">
                <img
                  src={A + "trust-v2.webp"}
                  srcSet={`${A}trust-v2-small.webp 900w, ${A}trust-v2.webp 1774w`}
                  sizes="(max-width: 1000px) 92vw, (min-width: 1720px) 745px, 44vw"
                  width={1774}
                  height={887}
                  alt="Une voyageuse découvre les merveilles du monde"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="trust-note">
                <ShieldCheck size={30} />
                <span>
                  Votre voyage, notre engagement.
                  <small>À vos côtés depuis 15 ans</small>
                </span>
              </span>
            </div>
          </div>
        </section>
        <Testimonials suspended={Boolean(modal)} />
        <Stats />
        <section className="final-cta" id="votre-aventure">
          <div className="final-cta-visual" aria-hidden="true">
            <img
              src="/assets/cta-v2.webp"
              srcSet="/assets/cta-v2-small.webp 900w, /assets/cta-v2.webp 1774w"
              sizes="(max-width: 700px) 100vw, (min-width: 1056px) 760px, 72vw"
              width="1774"
              height="887"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="container">
            <div className="final-cta-copy">
              <span className="eyebrow">Le monde n’attend que vous</span>
              <h2>
                Prêt pour votre
                <br />
                prochaine aventure ?
              </h2>
              <p>Confiez-nous vos envies, nous imaginons la suite.</p>
              <button className="button gold" onClick={() => openContact()}>
                Nous contacter <ArrowRight />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer
        services={services}
        destinations={destinations}
        onContact={openContact}
        onDestination={(d) => setModal({ type: "destination", title: d.name, d })}
      />
      <dialog
        ref={dialog}
        onCancel={() => setModal(null)}
        onClick={(e) => {
          if (e.target === dialog.current) setModal(null);
        }}
        aria-labelledby="dialog-title"
      >
        <button
          className="modal-close"
          aria-label="Fermer"
          onClick={() => setModal(null)}
        >
          <X />
        </button>
        {modal && (
          <>
            <span className="eyebrow">United events & services</span>
            <h2 id="dialog-title">{modal.title}</h2>
            {modal.type === "destination" && (
              <>
                <DestinationPhoto
                  destination={modal.d}
                  className="modal-photo"
                  sizes="(max-width: 700px) 90vw, 640px"
                />
                <p>{modal.d.detail}</p>
                {modal.d.price && (
                  <p className="price">
                    À partir de <strong>{modal.d.price} DHS</strong>
                    <small>
                      Tarif indicatif de la maquette, à confirmer selon les
                      dates et disponibilités.
                    </small>
                  </p>
                )}
                <button
                  className="button gold"
                  onClick={() => openContact("Voyage à " + modal.d.name)}
                >
                  Demander un devis <ArrowRight />
                </button>
              </>
            )}
            {modal.type === "destinations" && (
              <div className="modal-destinations">
                {destinations.map((d) => (
                  <button
                    key={d.name}
                    onClick={() =>
                      setModal({ type: "destination", title: d.name, d })
                    }
                  >
                    <DestinationPhoto
                      destination={d}
                      alt=""
                      sizes="(max-width: 600px) 45vw, 280px"
                    />
                    <span>
                      {d.name}
                      <ArrowRight />
                    </span>
                  </button>
                ))}
              </div>
            )}
            {modal.type === "search" && (
              <>
                <p className="search-summary">{modal.summary}</p>
                <p>
                  Notre équipe vérifie les disponibilités et vous propose une
                  offre adaptée. Contactez-nous pour recevoir votre devis
                  personnalisé.
                </p>
                <button
                  className="button gold"
                  onClick={() => openContact(modal.summary)}
                >
                  Demander les disponibilités <ArrowRight />
                </button>
                <a className="contact-alternative" href="tel:+212521248346">
                  <Phone /> Appeler un conseiller
                </a>
              </>
            )}
            {modal.type === "contact" && (
              <form
                className="contact-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  const body = `Bonjour,\nJe souhaite être contacté(e) pour : ${modal.title}.\nNom : ${data.get("name")}\nEmail : ${data.get("email")}\nTéléphone : ${data.get("phone")}\n${data.get("message")}`;
                  window.location.href =
                    "mailto:unitedtravelandservice@gmail.com?subject=" +
                    encodeURIComponent(modal.title) +
                    "&body=" +
                    encodeURIComponent(body);
                  setPrepared(true);
                }}
              >
                <p>
                  Parlez-nous de vos envies. Notre équipe vous accompagne dans
                  la préparation de votre voyage.
                </p>
                <label>
                  Votre nom
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    placeholder="Nom et prénom"
                  />
                </label>
                <div className="form-row">
                  <label>
                    Email
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="vous@exemple.com"
                    />
                  </label>
                  <label>
                    Téléphone
                    <input
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+212…"
                    />
                  </label>
                </div>
                <label>
                  Votre message
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Destination, dates, nombre de voyageurs…"
                  />
                </label>
                <button className="button gold" type="submit">
                  Préparer mon email <ArrowRight />
                </button>
                <small>
                  Votre messagerie s’ouvre avec votre demande préremplie.
                  L’envoi se fait depuis votre messagerie.
                </small>
                {prepared && (
                  <p className="success" role="status">
                    <CheckCircle /> Votre email est préparé. Si votre messagerie
                    ne s’ouvre pas, appelez-nous au +212 5 21 24 83 46.
                  </p>
                )}
              </form>
            )}
          </>
        )}
      </dialog>
    </>
  );
}
