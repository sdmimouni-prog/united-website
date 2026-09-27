import {
  ArrowRight, CaretRight, AirplaneTilt, AirplaneTakeoff, AirplaneLanding,
  UsersThree, CalendarStar, Headset, ShieldCheck, MapPin, Bed, SuitcaseSimple,
  MapTrifold, Compass, Heart, Briefcase, Boat, Bank, Mountains, Gear, Car,
  User, Bell, Ticket, ArrowsClockwise, GlobeHemisphereWest, Wine,
  PresentationChart, Confetti, Lightbulb, Buildings, IdentificationCard,
} from "@phosphor-icons/react";
import "./MegaMenu.css";

const regions = [
  ["Europe", "France, Espagne, Italie…", "mega-paris.webp"],
  ["Moyen-Orient", "Dubai, Turquie, Arabie Saoudite…", "destination-1-small.webp"],
  ["Afrique", "Maroc, Égypte, Afrique du Sud…", "destination-3-small.webp"],
  ["Asie", "Thaïlande, Malaisie, Indonésie…", "destination-5-small.webp"],
  ["Amérique", "États-Unis, Canada, Brésil…", "mega-new-york.webp"],
  ["Îles & séjours balnéaires", "Maldives, Seychelles, Île Maurice…", "destination-4-small.webp"],
];
const practical = [
  ["Réservation de vols", "Toutes les compagnies aériennes", AirplaneTilt, "search"],
  ["Réservation d’hôtels", "Un large choix d’hébergements", Bed],
  ["Assistance visa", "Visa, documentation et suivi", IdentificationCard],
  ["Assurance voyage", "Voyagez en toute tranquillité", ShieldCheck],
  ["Transferts & transport", "Aéroports, hôtels, circuits", Car],
  ["Guides & excursions", "Des expériences uniques", User],
  ["Location de voiture", "À destination", Car],
  ["Conciergerie voyage", "Un accompagnement personnalisé", Bell],
];
const content = {
  Voyages: {
    groups: [
      { title: "Destinations", subtitle: "Nos meilleures sélections", icon: MapPin,
        photos: regions, cta: "Voir toutes les destinations", action: "all-destinations" },
      { title: "Types de voyages", subtitle: "Des expériences pour tous", icon: SuitcaseSimple,
        items: [
          ["Séjours & circuits", "Découverte et évasion", MapTrifold],
          ["Voyages sur mesure", "Un itinéraire à votre image", Compass],
          ["Voyages en groupe", "Entre amis, en famille ou d’entreprise", UsersThree],
          ["Lune de miel", "Des moments inoubliables", Heart],
          ["Voyages d’affaires", "Alliez business et sérénité", Briefcase],
          ["Croisières", "Explorez le monde par la mer", Boat],
          ["Voyages culturels", "Histoire, patrimoine et traditions", Bank],
          ["Aventures & nature", "Trekking, safaris, grands espaces", Mountains],
        ] },
      { title: "Services pratiques", subtitle: "Pour un voyage en toute sérénité", icon: Gear, items: practical },
    ],
    image: "mega-cove.webp", position: "50% center",
    note: "Des destinations\nqui font rêver !", imageTitle: "Explorez le monde",
    imageText: "avec United events & services", cta: "Voir nos offres spéciales",
    action: "destinations", subject: "Nos offres de voyage",
  },
  Vols: {
    groups: [
      { title: "Vos destinations", subtitle: "Des départs vers le monde", icon: GlobeHemisphereWest,
        photos: regions, prefix: "Vols — ", cta: "Rechercher un vol", action: "search" },
      { title: "Réserver un vol", subtitle: "Le départ qui vous ressemble", icon: Ticket,
        items: [
          ["Rechercher un vol", "Préparez votre prochain départ", AirplaneTilt, "search"],
          ["Vol aller-retour", "Partez l’esprit tranquille", ArrowsClockwise],
          ["Vol aller simple", "La liberté de votre itinéraire", AirplaneTakeoff],
          ["Vols multi-destinations", "Plusieurs escales, un seul voyage", MapTrifold],
          ["Vols en groupe", "Voyagez ensemble, simplement", UsersThree],
          ["Vol + hôtel", "Réunissez l’essentiel de votre séjour", Bed],
          ["Classe affaires", "Confort et sérénité à bord", Briefcase],
          ["Voyages professionnels", "Vos déplacements accompagnés", Buildings],
        ] },
      { title: "Avant votre départ", subtitle: "Nos conseils et notre assistance", icon: Headset,
        items: [
          ["Billetterie & assistance", "Un conseiller pour votre réservation", Headset],
          ["Modification de billet", "Faites le point avec votre conseiller", CalendarStar],
          ["Bagages & conditions", "Préparez vos valises sereinement", SuitcaseSimple],
          ["Enregistrement", "Les étapes avant l’embarquement", Ticket],
          ["Assistance visa", "Documents et formalités de voyage", IdentificationCard],
          ["Assurance voyage", "Partez en toute tranquillité", ShieldCheck],
          ["Transfert aéroport", "Votre arrivée en toute simplicité", Car],
          ["Assistance à l’arrivée", "Un accompagnement à destination", AirplaneLanding],
        ] },
    ],
    image: "mega-flights.webp", position: "46% center",
    note: "Votre prochaine\nescale vous attend.", imageTitle: "Prenez votre envol",
    imageText: "Un conseiller à vos côtés, du départ au retour.", cta: "Rechercher mon vol",
    action: "search", subject: "Réservation billets d’avion",
  },
  Événements: {
    groups: [
      { title: "Vos événements", subtitle: "Des moments qui rassemblent", icon: CalendarStar,
        photos: [
          ["Séminaires", "Travail, échanges et cohésion", "mega-events.webp"],
          ["Conférences", "Des rendez-vous professionnels soignés", "service-5.webp"],
          ["Réceptions & soirées", "Une attention à chaque détail", "mega-events.webp"],
          ["Événements privés", "Des célébrations à votre image", "service-5.webp"],
          ["Team building", "Une expérience à partager", "service-4.webp"],
          ["Voyages incentive", "Inspirez et récompensez vos équipes", "destination-4-small.webp"],
        ], cta: "Parlons de votre événement", subject: "Organiser un événement" },
      { title: "Entreprises & équipes", subtitle: "Donnons vie à vos projets", icon: Briefcase,
        items: [
          ["Séminaires & conférences", "Vos rencontres professionnelles", PresentationChart],
          ["Voyages incentive", "Récompensez vos collaborateurs", AirplaneTilt],
          ["Team building", "Renforcez les liens de votre équipe", UsersThree],
          ["Voyages d’affaires", "Des déplacements bien organisés", Briefcase],
          ["Lancements de produits", "Mettez votre projet en lumière", Lightbulb],
          ["Réceptions d’entreprise", "Rassemblez vos partenaires", Wine],
          ["Séjours de groupe", "Un programme adapté à votre équipe", Bed],
          ["Organisation sur mesure", "De l’idée au jour J", Compass],
        ] },
      { title: "Chaque détail compte", subtitle: "Un accompagnement de A à Z", icon: Gear,
        items: [
          ["Lieux & espaces", "Le cadre de votre événement", Buildings],
          ["Hébergement des invités", "Un accueil soigné pour chacun", Bed],
          ["Transport & transferts", "Des déplacements coordonnés", Car],
          ["Accueil & coordination", "Une équipe à votre écoute", Headset],
          ["Réceptions & restauration", "Des moments de convivialité", Wine],
          ["Activités & excursions", "Prolongez l’expérience ensemble", Mountains],
          ["Animation & célébrations", "Des souvenirs à partager", Confetti],
          ["Suivi de votre projet", "Un interlocuteur dédié", ShieldCheck],
        ] },
    ],
    image: "mega-events.webp", position: "55% center",
    note: "Des moments\nqui vous ressemblent.", imageTitle: "Créons l’exception",
    imageText: "Votre événement, notre savoir-faire.", cta: "Organiser mon événement",
    subject: "Organiser un événement",
  },
};

function MenuGroup({ group, onAction }) {
  const GroupIcon = group.icon;
  return (
    <section className={`mega-group ${group.photos ? "mega-photo-group" : ""}`}>
      <div className="mega-group-heading">
        <GroupIcon weight="regular" aria-hidden="true" />
        <div><h3>{group.title}</h3><p>{group.subtitle}</p></div>
      </div>
      <ul className="mega-link-list">
        {group.photos ? group.photos.map(([title, description, image]) => (
          <li key={title}>
            <button className="mega-link mega-photo-link" onClick={() => onAction(undefined, `${group.prefix || ""}${title}`)}>
              <img src={`/assets/${image}`} alt="" width="88" height="70" loading="lazy" decoding="async" />
              <span className="mega-link-copy"><strong>{title}</strong><small>{description}</small></span>
              <CaretRight className="mega-link-arrow" aria-hidden="true" />
            </button>
          </li>
        )) : group.items.map(([title, description, Icon, action]) => (
          <li key={title}>
            <button className="mega-link" onClick={() => onAction(action, title)}>
              <span className="mega-icon"><Icon weight="regular" aria-hidden="true" /></span>
              <span className="mega-link-copy"><strong>{title}</strong><small>{description}</small></span>
              <CaretRight className="mega-link-arrow" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      {group.cta && <button className="mega-gold-button" onClick={() => onAction(group.action, group.subject || group.cta)}>{group.cta}<ArrowRight aria-hidden="true" /></button>}
    </section>
  );
}

export default function MegaMenu({ label, open, onAction }) {
  const data = content[label];
  return (
    <div className={`mega-menu ${open ? "is-open" : ""}`} id={`mega-${label}`} aria-label={`Explorer ${label}`} aria-hidden={!open} inert={!open}>
      <div className="mega-grid">
        {data.groups.map(group => <MenuGroup group={group} onAction={onAction} key={group.title} />)}
        <button className="mega-feature" onClick={() => onAction(data.action, data.subject)} aria-label={data.cta}>
          <img src={`/assets/${data.image}`} alt="" loading="lazy" decoding="async" style={{objectPosition:data.position}} />
          <span className="mega-feature-note">{data.note}<Heart aria-hidden="true" weight="light" /></span>
          <span className="mega-feature-copy">
            <strong>{data.imageTitle}</strong><small>{data.imageText}</small>
            <span className="mega-gold-button">{data.cta}<ArrowRight aria-hidden="true" /></span>
          </span>
        </button>
      </div>
    </div>
  );
}
