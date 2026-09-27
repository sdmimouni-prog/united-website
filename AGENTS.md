# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Header navigation preference
- Voyages, Vols and Événements use image-backed mega menus, opening on mouse hover on desktop, with subtle transitions. Preserve click/touch and keyboard access and the mobile accordion behavior.
- The user's preferred reference is the attached “ChatGPT Image Sep 27, 2026, 10_49_04 AM.png”: a generous white rounded panel with three separated link columns and a tall promotional photo at right, gold outlined icons, real destination thumbnails, handwritten photo heading and gold pill CTAs. Voyages uses Destinations / Types de voyages / Services pratiques; adapt the same anatomy to Vols and Événements.
- Use the generated Mediterranean cove `mega-cove.webp` for Voyages and the local HD plane/ballroom photos for the other menus. Keep the official logo unchanged. On smaller laptops the promotional card moves below the three columns; mobile becomes a scrollable accordion with stacked columns.
- Desktop mouse clicks must keep a hover-open menu open. ArrowDown places focus on its first link; Escape closes it and returns focus to the trigger. Link actions must use existing search, destinations and contact dialogs.
- Latest user feedback overrides the reference's oversized dimensions: desktop mega menus must be compact, max-width 1240px, approximately 485px high, with smaller icons/thumbnails/type and 44px link rows. Keep all link titles and CTAs. Hide secondary descriptions only on small laptops or short screens; the small-laptop promotional card is an 88px horizontal strip. Keep viewport-aware height and internal scrolling as a fallback, and preserve mobile accordion touch sizes.

## Hero motion preference
- Hero has a subtle cinematic page-load reveal, staggered copy and services, a travel-card search entrance, and fine-pointer parallax with a soft light response. Preserve the static accessible experience for reduced-motion and touch users. Keep the generated hero image and existing composition.
- The six hero service shortcuts have a clearly visible hover: lifted gold medallion, fine halo, gold label underline and a distinct one-shot gesture per service (takeoff, settle, passport tilt, breeze, gather, celebration). Use crisp vector pictograms; no continuous looping.

## Service pictogram clarity
- At the user's request, replace the original pixelated 54px service pictogram bitmaps with SVG icons in both hero shortcuts and service cards. Use shared ServiceMedallion, filled Phosphor travel symbols and the geometric passport icon; preserve the six subjects, gold medallions, sizes and existing hover gestures. Never alter the official logo.

## Services block motion
- “Tout pour un voyage sans contraintes” reveals once when entering the viewport: heading, handwritten note and staggered postcard-style service cards. Fine-pointer hover adds restrained 3D tilt, photo zoom, gold highlight, lifted icon and moving CTA. Preserve touch/keyboard usability, reduced-motion behavior and all original content/assets.

## Destinations block motion
- “Des lieux qui font rêver” shares the Services reveal and hover treatment: staggered postcard entrance, title reveal, restrained tilt, photo zoom, gold accents and rotating arrow. Retain horizontal mobile scrolling and reveal cards as they enter the visible carousel area. Use the shared useCardsMotion hook.

## Destinations carousel and imagery
- The destinations row is a real eight-destination carousel, including Bali, Phuket and Kuala Lumpur. Use local HD Pexels photos with 800/1600px WebP variants; preserve sources/credits in public/assets/destinations-credits.md.
- Preserve native touch scrolling, responsive scroll positions, keyboard arrows, pagination, and detail dialogs. Auto-advance every 5 seconds only while visible; pause for hover, focus, dialogs, hidden tabs and reduced motion. Manual navigation stops automatic playback until explicitly reactivated.

## Trust block motion
- “Une expérience en toute confiance” reveals once on viewport entry: title and gold underline, four staggered benefits, then the travel photo and assurance note. Reuse useCardsMotion.
- Fine-pointer hover lifts each gold medallion with a one-shot icon gesture, a soft cream highlight and subtle tilt. The large photo has restrained tilt/zoom and a lifted assurance note. Preserve static content semantics, responsive layout and reduced-motion fallback; no continuous animation.
- Trust visual replaced at the user's request with a newly generated photo montage: `trust-v2.webp` (1774 × 887) with 900px responsive variant. Preserve this HD version, its 2:1 ratio, existing hover effects and separate HTML assurance card. Original and generation prompt are in `output/imagegen/trust-v2-*`.

## Testimonials carousel and motion
- Five testimonials, including two newly authored demonstration examples explicitly labelled “Exemple de témoignage” and using initial avatars. Replace these with supplied authentic customer reviews when available; do not remove their example labels without that replacement.
- Preserve automatic 6-second scrolling, pause on hover/focus, manual pause/play, arrows, responsive pagination, keyboard navigation and native touch scrolling. Three cards on desktop, two on tablet, one on mobile. Manual navigation stops autoplay; reduced-motion disables it by default.
- Reuse useCardsMotion for one-time staggered entrance and restrained hover relief, gold border/glow, portrait lift and one-shot star motion. Native scroll controller is src/useScrollCarousel.js.

## Key figures style and motion
- Replace the plain statistics strip with travel-ticket cards: cream paper, gold figures, perforated stubs and a dark olive signature card for 15 years of experience. Keep all four original figures and full-width background.
- Stagger the cards on first viewport entry and count up once to the final numbers. Fine-pointer hover adds restrained tilt, lift, icon motion and a gold highlight. Respect reduced motion and expose stable final values to screen readers. Four columns on desktop, two on mobile; no continuous animation.

## Footer direction
- The user requests a substantial, rich, premium footer. Use deep olive, warm white and gold, generous editorial typography, the unchanged official logo on white, an agency introduction and dedicated service/destination directories.
- Preserve all seven supplied phone numbers and the original email/address. Give departments a clear direct-contact area; link services and destinations to the existing dialogs, with functional telephone/email, map and back-to-top links. No invented social profiles, opening hours or certifications.
- Keep the footer full-width with the shared internal container and readable responsive sections. Component and styles live in src/Footer.jsx and src/Footer.css.

## Final CTA travel image
- The user rejects cropped/pixelated imagery in the final adventure CTA. Use the new AI-generated `cta-v2.webp` panorama (1774 × 887) with its 900px variant; original and exact prompt are in output/imagegen/cta-v2-*.
- Preserve the full 2:1 image with intrinsic height, no cover/background crop or stretch. On desktop place it beside/behind the left copy with a soft left fade; on mobile place the complete image below the text. Keep the top mobile fade within 4% so tower peaks stay clear.
- The user finds this CTA too tall and empty. Keep it compact: cap the desktop visual at 760px wide (380px high), with 32px copy padding and a 320px section minimum. Mobile copy padding is 28px above and 12px below. Do not let its height grow proportionally with large screens.

## Mobile QA baseline
- Maintain the mobile fixes in `src/Mobile.css`: fluid two-line hero title, the same hero artwork in document flow on phones, six service shortcuts in a readable three-column grid, two-by-two search tabs and full-width search fields below 600px. Do not restore the implicit third-column bug in non-flight searches.
- Keep input text at 16px on mobile/tablet, key touch controls at least 44px, complete search buttons, and scrollable dialogs/menus on short landscape screens. Pagination dots have separate 32px/36px targets.
- Verify at 320, 375, 390, 430, 600, 768px and 844px landscape after responsive changes; preserve desktop layout. Contact uses a prepared mailto message, not automatic email delivery or a booking API.
