# Vérification United Events & Services

final result: passed

## 2026-09-27 — CTA final plus compact

- À la demande de l’utilisateur, hauteur du bloc « Prêt pour votre prochaine aventure ? » réduite : image plafonnée à 760 × 380px, minimum de section abaissé de 430 à 320px, padding du texte de 60 à 32px. À 1440px, hauteur de 518 à 380px ; à 2048px, de 737 à 380px (environ −48%).
- Panorama intégral conservé en 2:1 sans découpe ni déformation. Tailles responsive de l’image mises à jour ; titre, bouton et contenu conservés.
- Mobile : padding de 38/20 à 28/12px. Contrôle visuel à 390 × 844 : bloc de 459px, image de 390 × 195px, texte lisible et aucune largeur excédentaire. Desktop contrôlé à 1440 et 2048px ; hauteur plafonnée à 380px.
- Captures : `qa/cta-compact-desktop.png`, `qa/cta-compact-mobile.png`. Build de production réussi.

## 2026-09-27 — Vérification mobile complète et corrections

Contrôle du parcours complet dans le navigateur intégré, avec captures de cette session dans `qa/mobile-audit/` et rapport illustré `qa/mobile-audit/report.html`.

1. Accueil : à 320px le point d’exclamation passait seul à la ligne, les CTA chevauchaient l’image et les raccourcis étaient écrits en 9px. Correction : titre fluide sur deux lignes, même visuel placé dans le flux mobile, raccourcis en 3 colonnes avec texte 12px. Hero desktop conservé.
2. Menus : Voyages, Vols et Événements contrôlés en accordéon ; liens et fermeture fonctionnels. À 844 × 390, navigation limitée aux 300px disponibles et défilement interne jusqu’aux derniers liens. Aucun débordement du menu Événements à 320px.
3. Recherche : défaut confirmé sur Hôtels/Séjours/sur mesure à 320px (colonne implicite, champ réduit à 60px et bouton coupé). Correction : champs pleine largeur, quatre onglets visibles en grille, inversion des villes sur une cible 44px. Les quatre modes produisent les bons récapitulatifs, date future et 2 voyageurs ; inversion Istanbul/Casablanca vérifiée. Validation native des champs obligatoires et date testée. Texte des inputs à 16px.
4. Services, destinations et confiance : petites flèches de 28px remplacées par des commandes 44px, espaces adaptés. Huit destinations accessibles, dernière carte Kuala Lumpur, fiche et demande de devis fonctionnelles ; photographies chargées sans échec. Confiance lisible.
5. Témoignages et chiffres : cinq avis accessibles via pagination, carte finale sans coupure à 320px, lecture automatique observée hors survol/focus, commandes pause et navigation manuelle. Valeurs finales des quatre compteurs visibles. Flèches 44px et pagination élargie.
6. CTA, footer et contact : compact CTA conservé, coordonnées et sept liens téléphoniques corrects, e-mail correct, retour en haut fonctionnel. Contact valide nom/email requis et refuse une adresse mal formée. À 320 × 568, dialogue de 509px défilant jusqu’au bouton d’envoi (bas 448px dans un dialogue finissant à 540px). Fermeture accessible 44px. Aucun message envoyé.

Balayage DOM de 320, 375, 390, 430, 600, 768 et 844px : scrollWidth égale à la largeur du viewport ; aucune coupure trouvée parmi titres, textes et commandes, hors pistes horizontales intentionnelles. Rendu desktop à 1440px contrôlé : visuel mobile masqué, composition originale conservée. Console finale sans erreur ni avertissement.

Implémentation : ajustements isolés dans `src/Mobile.css` ; variante de présentation du même fond hero ajoutée dans `src/App.jsx`, sans nouvel asset ni dépendance. `npm run build` réussi ; `npm run test:sites` 4/4.

Limites : tailles de viewport simulées dans le navigateur intégré, sans téléphone physique ni lecteur d’écran ; pas de certification WCAG complète. L’ouverture d’une application téléphone/e-mail et la livraison de messages n’ont pas été déclenchées. Le moteur prépare une demande de devis, conformément à son fonctionnement existant.

## 2026-09-27 — Réduction des mégamenus desktop

- Correction demandée à partir de la capture utilisateur montrant un panneau massif et coupé en bas. Ajustements limités à `src/MegaMenu.css` : largeur maximale 1240px, padding 18px, titres 16px, liens 13px, sous-textes 11.5px, icônes 25px et vignettes 58 × 44px ; liens/CTA d’au moins 44px.
- À 1440 × 900, panneau Voyages de 677 à 485px de haut (−28%), largeur de 1400 à 1240px. Les huit lignes des colonnes et les boutons inférieurs sont visibles sans défilement, avec environ 300px de page visibles dessous.
- À 1366 × 768, Voyages et Vols 485px, Événements 488px ; aucun défilement caché ni texte débordant. À 1024 × 768, trois colonnes et bande promotionnelle de 88px : panneau 528px, dernier bouton entièrement visible. À 1280 × 600, descriptions secondaires masquées pour obtenir 420px, sans débordement vertical interne.
- Hauteur maximale liée au viewport ; défilement interne conservé comme fallback pour des fenêtres encore plus courtes. Tous les intitulés, actions, photos et interactions existants sont conservés.
- Accordéon mobile vérifié à 320, 375, 390, 430, 600, 768 et 844px en paysage : largeur égale au viewport et navigation contenue dans la hauteur disponible. Les règles de compaction sont limitées au desktop.
- Captures : `qa/mega-compact-desktop.png`, `qa/mega-compact-events-laptop.png`, `qa/mega-compact-1024.png`. Build de production réussi.

## Sources et preuves

Références : `/Users/salaheddinemimouni/Downloads/ChatGPT Image Sep 27, 2026, 10_20_04 AM.png` (composition globale 1122×1402), `10_20_27 AM.png` (hero 1672×941), `10_21_18 AM.png` (services/destinations 1672×941), `10_22_57 AM.png` (logo 1254×1254).

Captures de viewport : `qa/desktop-hero-final.png`, `qa/desktop-services-final.png`, `qa/desktop-footer-final.png`, `qa/mobile-hero-final.png`, `qa/mobile-footer-final.png`.
Desktop : 1672×941 CSS et pixels. Mobile : 390×844 CSS et pixels. Pas de correction de densité nécessaire. Captures de sections additionnelles examinées dans le navigateur intégré. Comparaisons source/rendu réunies : `qa/hero-comparison-final.png`, `qa/services-comparison-final.png`. La comparaison des services aligne la section (suppression des 112 pixels précédant celle-ci dans la capture). Les captures pleine page ont un défaut de stitching de l’outil et sont exclues de la validation.

## Historique des corrections

- Erreur initiale d’export React : import corrigé, build de production réussi et page rendue.
- P1 : pictogrammes provenant de la capture du hero visibles derrière les contrôles. Masquage local corrigé et raccord adouci, capture finale vérifiée.
- P2 : cartes services trop hautes, boutons décalés. Hauteur desktop ramenée à 166 px pour le corps ; boutons alignés en bas ; comparaison avec les cartes source.
- P2 : débordement horizontal à 1024 px, largeur totale 1162 px. Grille destinations avec minmax(0,1fr), min-width:0 sur le contenu. Nouvelle mesure : 1024/1024.
- P2 : cadrage du visuel de confiance laissant un fragment du titre source. Recadrage à x483 et contrôle visuel.
- Détails : pictogrammes services, annotation manuscrite et ombre de palmier extraits des fichiers fournis ; fondu des limites de la décoration. Logo conservé sans modification.

## Surfaces de fidélité

- Typographie : titres serif DM Serif Display, corps DM Sans ; tailles et hiérarchie rapprochées des blocs, titres français demandés conservés. Polices non identifiées dans les PNG : équivalents visuels, pas de promesse de correspondance typographique mathématique.
- Espacements : sections pleine largeur, conteneur interne maximum 1560 px, hero immersif, six cartes desktop et adaptation à trois/deux colonnes. Destinations en défilement horizontal sur les petites largeurs.
- Couleurs : blanc/crème, or #a67c2d, médaillons crème, footer brun sombre.
- Images : sources locales, WebP qualité 94 ; photographies gardées à leur ratio ; logo PNG original inchangé (SHA-256 identique : 9d7e2c2e18880ab3574650c170c4aaf1c308ac690413a334457f5868e7380f66).
- Textes : neuf sections demandées présentes, quatre avantages et chiffres clés conformes. Coordonnées visibles reprises ; contacts par téléphone et email.

## Interactions testées

- Menu hamburger, sous-menu Voyages, ancre Destinations.
- Recherche Casablanca → Istanbul, deux voyageurs, date future ; validation native d’une date vide ; récapitulatif correct puis formulaire de demande.
- Destination suivante sur mobile, fiche Dubai, demande de devis et fermeture de dialogue.
- Témoignage suivant : Salma → Karim ; ordre des cartes et texte vérifiés.
- Aucune image cassée. Largeurs 360, 390, 768, 1024 et 1440 sans débordement de page après correction. Desktop 1672 et mobile examinés visuellement.
- Console : erreur d’import du premier lancement conservée dans l’historique, corrigée ; aucun nouveau message d’erreur constaté dans les parcours ultérieurs.

## Limites explicites / adaptations attendues

- Le vrai logo fourni est vertical, contrairement au logo horizontal des maquettes. Son intégrité prime conformément à la demande.
- Les titres et sections explicitement demandés priment lorsque la maquette globale et les blocs divergent. Le CTA secondaire est « Nous contacter », présent dans la maquette globale ; aucune vidéo fournie.
- Recherche frontend : demande de disponibilités, sans API de réservation. Contact via mailto avec envoi manuel ; aucun faux message d’envoi réussi.
- Aucun profil social officiel fourni : pas de destinations sociales inventées.
- Les images sont extraites des PNG : leur résolution source limite la finesse sur les écrans très haute densité. Une livraison des photographies originales permettrait un gain supplémentaire.
- P3 : variations mineures de métrique typographique et de texture des fonds, photo recadrée pour les formats mobiles. Aucun visuel mobile fourni ; adaptation responsive contrôlée selon les contraintes textuelles.

## Checklist

- [x] React et sections natives, pas de capture globale comme page.
- [x] Logo d’origine vérifié par hash.
- [x] Navigation, recherche, dialogues et témoignages fonctionnels.
- [x] Vérification desktop/mobile et correction du breakpoint laptop.
- [x] Build de production.

## Mise à jour — mégamenus et survol

- Composant réutilisable `src/MegaMenu.jsx` pour Voyages, Vols et Événements : deux colonnes de rubriques, carte visuelle et contact.
- Ouverture au survol souris desktop, transition légère, indicateur doré et chevron animé. Délai de fermeture 150 ms pour le passage vers le panneau.
- Ouverture au clic mobile, défilement vertical du menu ; aucun débordement à 390 px.
- Clavier : flèche bas ouvre le panneau, Échap ferme et restitue le focus au déclencheur ; éléments fermés inertes et exclus du parcours clavier. Clic extérieur ferme.
- Vérification navigateur : survol Vols, déplacement vers son panneau (reste ouvert), action Rechercher un vol, demande Événements privés et fiche Istanbul sur mobile. Échap vérifié avec aria-expanded=false.
- Capture desktop 1440×950 : `qa/megamenu-desktop.png`. Contrôle visuel mobile 390×844 dans le navigateur. Build de production réussi.
- final result: passed

## Mise à jour — hero généré

Remplacement demandé du hero pixellisé par un nouveau photomontage produit avec image_gen, inspiré de la composition existante. Source générée 1672×941, sauvegardée dans `output/imagegen/hero-v2-original.png` ; version web `public/assets/hero-v2.webp`, qualité 96, sans agrandissement. Prompt exact archivé dans `output/imagegen/hero-v2-prompt.md`. Contrôle visuel du cadrage desktop 1440×950 et mobile 390×844 : texte lisible, univers voyage et proportions conservés. Captures `qa/hero-v2-desktop.png` et `qa/hero-v2-mobile.png`. Build réussi. Seul le visuel du hero est remplacé, l’ancien reste disponible.

## Mise à jour — animations du hero

- Entrée du paysage : fondu et léger zoom sur 1,65 s ; titre doré révélé horizontalement ; texte, CTA et services décalés ; formulaire avec légère arrivée en hauteur.
- Survol souris : parallaxe plafonnée à ±9 px horizontalement et ±6 px verticalement, lumière douce liée au pointeur, reflet sur le CTA et inclinaison de sa flèche. Retour au repos vérifié par lecture des variables CSS après sortie du pointeur.
- Hook avec requestAnimationFrame, annulation et nettoyage des écouteurs ; aucun rendu React à chaque mouvement. Effet souris limité au pointeur fin. CSS et JS respectent prefers-reduced-motion.
- Vérifications navigateur : animations CSS actives au chargement, translation mesurée (6,375 px / -2,381 px) puis remise à zéro, rendu final desktop 1440 px et mobile 390 px sans débordement ; ouverture/fermeture du formulaire de contact fonctionnelle après animation. Build réussi.

## Mise à jour — survol des six services

Sur la rangée indiquée par la capture utilisateur : soulèvement des pastilles de 8 px, agrandissement de 10 %, contour doré et libellé doré souligné. Six gestes CSS distincts joués une fois par survol (avion, hôtel, visa, palmier, groupe et événement). Vérification au pointeur dans le navigateur : les six noms d’animation sont actifs individuellement, puis tous reviennent à none hors survol. Aucun déplacement de mise en page ; largeur desktop 1440/1440. Mouvement désactivé avec prefers-reduced-motion, actions tactiles conservées. Build réussi.

## Mise à jour — animation du bloc Services

Entrée unique à l’intersection avec le viewport : titre révélé, annotation manuscrite et cartes avec apparition décalée de 70 ms. Survol : inclinaison bornée à ±2,5° / ±3°, soulèvement, reflet discret, zoom photo de 7,5 %, pictogramme et flèche animés. IntersectionObserver déconnecté après chaque révélation ; écouteurs et frame nettoyés ; accès clavier et prefers-reduced-motion pris en charge.

Vérifications desktop 1440×950 : six cartes visibles après la cascade, retards 0 / .07 / .14 / .21 / .28 / .35 s ; inclinaison Hôtels mesurée 1,92° / 2,02°, photo scale 1,074 ; CTA Hôtels ouvre le bon formulaire ; retour au repos vérifié. Mobile 390×844 : quatre cartes visibles puis six après défilement, sans débordement (390/390). Aucun changement de contenu ni de ratio d’image. Build de production réussi.

## Mise à jour — animation des Destinations

Le bloc « Des lieux qui font rêver » reprend l’entrée progressive et le survol du bloc Services. Hook commun useCardsMotion pour les deux sections : révélation unique par IntersectionObserver, tilt discret limité aux pointeurs fins, nettoyage du mouvement à la sortie et au défilement, respect de prefers-reduced-motion. Photos dans un cadre pour contenir le zoom ; marge interne du carrousel pour ne pas couper le soulèvement des cartes.

Contrôles navigateur : cinq cartes desktop à opacité 1, délais 0/.08/.16/.24/.32 s, survol de Dubai avec inclinaison mesurée et zoom, fiche Dubai fonctionnelle. Mobile 390 px : carte Maldives révélée après navigation du carrousel, fiche Maldives ouverte et vérifiée visuellement. Aucun débordement (1440/1440 et 390/390). Build réussi. La section Services conserve son fonctionnement via le hook partagé.

## 2026-09-27 — Carrousel destinations et photos HD

- 8 destinations : ajout de Bali, Phuket et Kuala Lumpur. Les fiches et la vue « toutes les destinations » réutilisent les mêmes données et photos.
- Anciennes vignettes de 198 × 209 px remplacées par des photos Pexels locales, WebP 800/1600 px avec `srcset`, ratio préservé, cadrage CSS. Sources, auteurs et licence consignés dans `public/assets/destinations-credits.md`.
- Défilement natif responsive : positions recalculées via ResizeObserver, synchronisation des points après scroll, bouclage précédent/suivant, Home/End/flèches clavier. Lecture automatique de 5 s, pause au survol/focus, arrêt après navigation manuelle, suspension hors écran/onglet masqué/modale. Préférence reduced-motion prise en compte.
- Vérification navigateur 1440 × 950 et 390 × 844 : pas de débordement horizontal de la page ; huit photos chargées ; flèche suivante avance immédiatement ; dernier arrêt affiche les nouvelles destinations ; retour au premier arrêt ; pagination mobile ; défilement horizontal natif ; Home ramène à Istanbul ; fiche Bali ouvre la photo et la description attendues.
- Lecture automatique observée de 01–05 à 04–08. Survol détecté et position stabilisée. Console sans erreurs ni avertissements.
- Captures : `qa/destinations-carousel-desktop.png`, `qa/destinations-carousel-mobile.png`.
- `npm run build` : succès. `npm run test:sites` : 4/4. Aucun déploiement distant.

## 2026-09-27 — Animation du bloc « Une expérience en toute confiance »

- Réemploi de useCardsMotion pour observer séparément le titre, les quatre avantages et le visuel ; déclenchement une seule fois à l’entrée dans la fenêtre.
- Entrée échelonnée du contenu, tracé doré du titre, arrivée douce du visuel et du cartouche. Survol : relief mesuré des avantages, halo et geste unique des pictogrammes, légère inclinaison/zoom de la photo et cartouche relevé.
- Mobile : délais raccourcis, disposition et lisibilité conservées. Aucun bouton ou arrêt clavier artificiel ajouté aux contenus informatifs. Les effets souris sont réservés aux pointeurs fins ; fallback réduit sans masquage ni mouvement.
- Vérifications navigateur 1440 × 950 et 390 × 844 : état initial non révélé puis six éléments révélés, transforms et surbrillances déclenchés au survol, photo 302.64 px desktop et 240 px mobile, largeur de page égale au viewport, aucune erreur/alerte console.
- Captures : qa/trust-motion-desktop.png et qa/trust-motion-mobile.png. Build Vite réussi.

## 2026-09-27 — Nouveau visuel HD du bloc confiance

- Ancienne image de 637 × 319 remplacée par une nouvelle génération native de 1774 × 887 (2:1), proche de la composition fournie : voyageuse de dos, avion, lagon, tour Eiffel, pyramides, Sphinx et skyline de Dubai.
- Export WebP pleine résolution (~564 Ko) et variante 900 × 450 (~169 Ko), srcset/sizes et dimensions explicites. Aucun agrandissement artificiel ; original PNG et prompt exact conservés dans output/imagegen/.
- Cartouche HTML et animations conservés. Nouveau visuel sans texte incrusté.
- Chargement du fichier HD vérifié en desktop à 1440 px, capture `qa/trust-photo-v2-desktop.png`. Build Vite réussi.
- Contrôle mobile à 390 × 844 : variante 900px chargée, image 354 × 240px, aucun débordement (scrollWidth = 390), capture `qa/trust-photo-v2-mobile.png`.

## 2026-09-27 — Slider et animations des témoignages

- Section extraite dans `src/Testimonials.jsx` : 5 cartes dont les 3 avis de la maquette, plus 2 exemples explicitement signalés avec avatars en initiales. Aucun portrait fictif présenté comme celui d’un client.
- Défilement horizontal natif, positions recalculées selon la largeur, pagination synchronisée, flèches et bouclage ; 3 cartes desktop, 2 tablette, 1 mobile. Contrôleur réutilisable `src/useScrollCarousel.js` sans nouvelle dépendance.
- Lecture automatique toutes les 6 s uniquement dans la fenêtre ; pause au survol/focus, suspension avec une modale ou un onglet masqué ; arrêt lors d’une navigation manuelle. Commande pause/lecture explicite. `prefers-reduced-motion` désactive le lancement automatique et les animations.
- Apparition unique du titre et des cartes, survol avec relief mesuré, bordure/halo dorés, portrait légèrement relevé et étoiles animées une seule fois. Compositions, couleurs, textes et portraits existants préservés.
- Contrôle à 1440 × 950 : 5 cartes de 383.5px, 3 positions, pagination du premier au dernier arrêt, retour à 0, lecture automatique observée, révélation des nouvelles cartes et survol mesurés (transform, halo et avatar).
- Contrôle à 390 × 844 : 5 cartes de 268px accessibles, 5 positions, exemples lisibles, navigation clavier End vers le cinquième avis, aucune largeur de page excédentaire. Captures `qa/testimonials-slider-desktop.png` et `qa/testimonials-slider-mobile.png`.
- Build Vite réussi.

## 2026-09-27 — Nouvelle bande des chiffres clés

- Bande crème pleine largeur, quatre cartes inspirées des billets de voyage : découpes, talons à pointillés, pictogrammes et dernière carte olive sombre. Chiffres et libellés conservés.
- Apparition décalée de 100 ms et compteurs progressifs sur 1,5 s, déclenchés une seule fois à l’intersection. Survol avec relief de 8 px, inclinaison selon le pointeur, pictogramme relevé et accents dorés. Aucun mouvement continu ni nouvelle dépendance.
- Valeurs finales stables pour les lecteurs d’écran ; réduction des mouvements prise en charge en CSS et dans le compteur. Nettoyage des observers et frames.
- Vérification desktop 1440 × 950 : quatre cartes, états masqués puis révélés, valeurs finales 10 000 / 50 / 100 / 15 ; transform 3D et mouvement du pictogramme mesurés au survol. Capture `qa/stats-desktop.png`.
- Vérification visuelle mobile 390 × 844 : grille 2 × 2 lisible, capture `qa/stats-mobile.png`. Contrôle complémentaire 320 px : aucun débordement de page, de chiffres ou de libellés. Console sans erreurs ni avertissements.
- Build de production réussi. Aucun déploiement distant.


## 2026-09-27 — Footer premium enrichi

- Remplacement des trois anciennes bandes par un footer pleine largeur vert profond et doré : titre éditorial, call center, logo officiel intact, présentation de l’agence, six services, huit destinations et coordonnées.
- Annuaire des quatre services avec les six numéros directs, en complément du call center. Adresse et e-mail conservés ; lien d’itinéraire Google Maps à partir de l’adresse fournie. Aucun compte social, horaire ou label inventé.
- Composant `src/Footer.jsx`, styles isolés `src/Footer.css`. Anciennes règles footer/contact-strip supprimées. Aucun ajout de dépendance.
- Vérification navigateur desktop 1440 × 1100 et mobile 390 × 844 ; aucune largeur excédentaire à 320, 390, 1024 et 1440 px. Logo carré non recadré, quatre rubriques desktop et réorganisation mobile.
- Actions testées : destination Bali, formulaire général, demande Assistance visa, fermeture des dialogues et retour en haut. Les sept liens téléphoniques et le lien e-mail ont les valeurs originales. Console sans erreur ni avertissement.
- Captures : `qa/footer-premium-desktop.png`, `qa/footer-premium-mobile-top.png`, `qa/footer-premium-mobile-directory.png`, `qa/footer-premium-mobile-bottom.png`.
- Build de production réussi. Aperçu local conservé ; aucun déploiement distant.


## 2026-09-27 — Panorama IA du CTA final

- Nouvelle image générée une fois avec l’outil intégré image_gen : avion, lagon, pyramides, tour Eiffel, Burj Khalifa, Burj Al Arab et accessoires de voyage entièrement dans le cadre. Aucun texte incrusté. Original natif 1774 × 887 dans `output/imagegen/cta-v2-original.png`, prompt exact `output/imagegen/cta-v2-prompt.md`.
- WebP pleine résolution 467 046 octets et variante 900 × 450 de 137 322 octets, sans agrandissement.
- Ancien background `hero.webp` remplacé dans ce seul bloc par une image HTML avec srcset/sizes, dimensions intrinsèques et hauteur automatique. Ratio 2:1 intégral, pas de cover ni de découpe. Desktop : image à droite et texte à gauche ; mobile : photo entière sous le contenu.
- Contrôle visuel 1440 × 950 : image 1036,8 × 518,4, fichier pleine résolution chargé, tous les sujets visibles. Mobile 390 × 844 : image 390 × 195, variante 900px chargée après rechargement, aucun débordement. Fondu mobile réduit à 4% pour préserver le sommet des monuments.
- Captures `qa/cta-v2-desktop.png` et `qa/cta-v2-mobile.png`. Bouton de contact fonctionnel ; console sans erreur/avertissement. Build réussi. Aucun déploiement distant.


## 2026-09-27 — Pictogrammes de services vectoriels

- Les six bitmaps de 54 × 54 px ont été remplacés par des SVG dans les raccourcis du hero et les cartes Services (12 instances). Composant partagé `ServiceMedallion`, icônes Phosphor déjà disponibles et pictogramme passeport géométrique ; aucune nouvelle dépendance.
- Pastilles dorées restituées en CSS avec dégradé et reflet discret ; dimensions, six sujets et libellés conservés. Logo officiel inchangé.
- Sélecteur des gestes au survol adapté aux SVG ; animation `service-takeoff` et transform de soulèvement mesurés dans le navigateur. Lien du hero vers Services testé. Les autres gestes réutilisent les six keyframes existantes et leur fallback reduced-motion.
- Desktop 1440 × 950 : six SVG hero et six SVG Services, aucune image bitmap dans les pastilles. Mobile 390 × 844 : six icônes de 22,3 px nettes, page sans débordement. Console sans erreur/avertissement.
- Captures : `qa/service-icons-vector-desktop.png`, `qa/service-icons-vector-cards.png`, `qa/service-icons-vector-mobile.png`. Build réussi.

## 2026-09-27 — Mégamenus selon la nouvelle référence

Source : image jointe « ChatGPT Image Sep 27, 2026, 10_49_04 AM.png », visible dans la conversation à 1774 × 887. Le fichier annoncé dans Downloads est absent ; la comparaison utilise donc l’image jointe, sans prétendre avoir enregistré une copie locale de cette référence.

Les trois mégamenus Voyages, Vols et Événements partagent désormais le panneau blanc arrondi, trois colonnes séparées et une grande carte photo promotionnelle. Voyages reprend les rubriques Destinations / Types de voyages / Services pratiques, six régions illustrées et huit entrées dans chacune des deux autres colonnes. Vols et Événements déclinent cette même composition avec leurs propres contenus et visuels. Composant déclaratif `src/MegaMenu.jsx`, styles isolés `src/MegaMenu.css`, anciennes règles retirées ; aucune dépendance ajoutée.

Comparaison finale des cinq surfaces de fidélité à 1774 × 887 :

- Composition : panneau x=32, largeur=1710px, y≈113px et hauteur≈724px, proche de la référence x=32, y≈108px et hauteur≈726px. Trois colonnes de liens puis photo verticale ; séparateurs et largeurs cohérents.
- Typographie : hiérarchie titre/description, titres sombres, descriptions gris bleuté, annotation manuscrite blanche sur la photo et CTA lisibles. Le header conserve le logo officiel carré fourni, conformément à l’interdiction de le recomposer.
- Espacement et densité : six vignettes, huit lignes par colonne de services, boutons dorés en bas, marges internes et respirations proches de la référence.
- Couleurs et finitions : fond blanc, arrondis généreux, filets discrets, icônes vectorielles dorées, pilules or clair, transition douce et survol mesuré ; réduction des mouvements conservée.
- Imagerie : le premier choix de photo de côte s’écartait de la référence ; remplacé après contrôle par une crique méditerranéenne générée en 1024 × 1536. Ciel bleu, eau turquoise, falaises et branche en haut à droite correspondent à l’intention. Photos locales HD pour Paris, New York, avion et salle de réception ; crédits dans `public/assets/megamenu-credits.md`. Original IA et prompt exact conservés dans `output/imagegen/mega-cove-*`.

Corrections fonctionnelles effectuées pendant la QA : un clic souris refermait le menu déjà ouvert par survol ; il le maintient maintenant ouvert. La flèche bas ne plaçait pas toujours le focus sur le premier lien ; le placement après relâchement de la touche est vérifié. Escape ferme et restitue le focus au déclencheur.

Vérifications navigateur :

- 1774 × 887 : sept images Voyages chargées, trois menus contrôlés visuellement, ouverture au survol/clic. « Voir toutes les destinations » ouvre les huit destinations ; « Rechercher mon vol » active le formulaire Vols ; « Organiser mon événement » ouvre la demande correspondante.
- 1440 × 900 : ArrowDown place le focus sur Europe, Escape ferme et revient sur Voyages ; aucune largeur excédentaire.
- 1024 × 768 : panneau de 984px, défilement intérieur de 290px, carte promotionnelle et dernier CTA accessibles (bas du CTA 726px, bas du panneau 751px), page de 1024px sans débordement.
- 390 × 844 : accordéon mobile, colonne unique lisible, navigation défilante dans la hauteur disponible ; aucune largeur excédentaire. « Lune de miel » ouvre le bon formulaire et ferme le menu mobile.
- Build de production réussi après les dernières corrections. La console conserve deux anciens messages HMR apparus pendant la création du nouveau fichier CSS ; aucune nouvelle erreur d’exécution observée pendant les contrôles finaux.

Captures : `qa/megamenu-v2-voyages-desktop.png`, `qa/megamenu-v2-vols-desktop.png`, `qa/megamenu-v2-evenements-desktop.png`, `qa/megamenu-v2-mobile.png`, `qa/megamenu-v2-laptop.png`, `qa/megamenu-v2-laptop-bottom.png`.

Aucun écart P0/P1/P2 restant identifié dans le périmètre demandé. Aperçu local conservé ; aucun déploiement distant.

final result: passed
