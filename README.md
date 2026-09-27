# United Events & Services

Site React responsive de United Events & Services, intégré à partir des maquettes fournies. React 19, Vite et CSS, avec assets locaux.

## Développement

- `npm ci`
- `npm run dev -- --host 0.0.0.0 --port 4173`
- `npm run build` : fichiers de production dans `dist/client`.
- `npm run preview -- --host 0.0.0.0 --port 4173` : aperçu du build.
- `npm run test:sites` : vérification du serveur et du packaging Sites.

## Contenu et assets

- `src/App.jsx` : page, contenus, navigation et formulaires.
- `src/MegaMenu.jsx`, `src/DestinationCarousel.jsx`, `src/Testimonials.jsx`, `src/Stats.jsx`, `src/Footer.jsx` : composants réutilisables.
- `src/styles.css` et styles des composants : identité visuelle et animations. `src/Mobile.css` : ajustements mobiles.
- `public/assets/logo-officiel.png` : copie byte-for-byte du logo fourni, ratio préservé.
- Photographies optimisées en WebP, avec variantes responsive pour les grands visuels et destinations. Les sources et crédits sont dans `public/assets/*credits.md`.
- Les visuels générés du hero, du bloc confiance, du CTA et de la crique du mégamenu sont archivés avec leurs prompts dans `output/imagegen/`. Aucun logo généré.
- Les polices DM Sans, DM Serif Display et Caveat sont chargées via Google Fonts avec polices de secours.

## Interactions

Mégamenus Voyages, Vols et Événements, accordéons mobiles, ancres, quatre modes de recherche, inversion départ/arrivée, date, voyageurs et fiches destinations. Carrousels de huit destinations et cinq témoignages : défilement automatique, pause, flèches, pagination et navigation clavier. Animations légères respectant la réduction des mouvements.
La recherche affiche le récapitulatif et permet de préparer une demande de disponibilités. Elle n’est pas connectée à un GDS ou fournisseur de réservations.
Le contact ouvre un email prérempli : aucun envoi serveur ni réservation fictive. Les liens téléphoniques sont actifs.
Les tarifs sont indicatifs, issus de la maquette. Trois témoignages reprennent la maquette ; les deux ajouts sont explicitement identifiés comme exemples. Aucun lien social officiel n’a été fourni.

## Vérification

Voir `design-qa.md` pour le journal de vérification. Les captures et le rapport illustré dans `qa/` restent des artefacts locaux, exclus du dépôt. Contrôles responsive de 320 à 1440px, dont les menus, les carrousels et les validations de formulaire ; sans téléphone physique ni envoi de messages.

La compilation prépare aussi `dist/server/index.js` et `dist/.openai/hosting.json`. Le projet Vercel relié au dépôt publie `dist/client`, comme indiqué dans `vercel.json`.

## Aperçu de partage

Adresse publique : https://united-website-ten.vercel.app/

Le titre, la description, les balises Open Graph et Twitter sont dans le HTML initial (`index.html`), accessibles aux robots de prévisualisation sans JavaScript. L’image `public/assets/united-events-share.jpg` est un export JPEG de 1200 × 675px du hero, conservant sa composition complète.

En cas de changement de domaine, mettre à jour ensemble le lien canonical, `og:url` et les URLs absolues de l’image dans `index.html`. La configuration Vercel publie directement `dist/client` à la racine, afin que la page et l’image soient accessibles publiquement.
