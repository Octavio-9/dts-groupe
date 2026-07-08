# Animations cinématiques — DTS GROUPE

**Date :** 2026-07-08
**Statut :** validé par le client

## Objectif

Ajouter une couche d'animation « cinématique » **subtile et élégante** au site
vitrine DTS GROUPE, sans dépendance externe (CSS + IntersectionObserver), en
respectant `prefers-reduced-motion` et en restant performant pour les
connexions/appareils lents de Conakry.

## Contraintes

- **Zéro dépendance** ajoutée (pas de framer-motion). Cohérent avec la base
  Next.js 16 / React 19 / Tailwind v4 actuelle.
- Tous les effets **désactivés** sous `prefers-reduced-motion: reduce`.
- Ne pas régresser le SEO / le rendu serveur : les composants restent des
  Server Components ; seuls les wrappers d'animation sont `"use client"`.
- Rester fidèle au design Banani (aucun changement de mise en page, de couleur
  ou de typographie — uniquement du mouvement).

## Déjà en place (ne pas retoucher)

- **Header** : se solidifie déjà au scroll (état `scrolled` → `shadow-soft`)
  dans `src/components/Header.tsx`.
- **Bouton WhatsApp flottant** : pulse déjà (`animate-ping`) + `hover:scale-105`
  dans `src/components/WhatsAppFloat.tsx`.

## Composants réutilisables (nouveaux)

### `src/components/Reveal.tsx` (client)

Enveloppe un contenu et le révèle en fondu-montée à l'entrée dans le viewport.

- Props : `children`, `delay?: number` (ms, pour le stagger), `className?: string`,
  `as?: keyof JSX.IntrinsicElements` (défaut `"div"`).
- État initial : `opacity: 0; translateY(20px)`. À l'intersection (seuil ~0.15,
  `once: true`) → transition vers `opacity: 1; translateY(0)` sur **0,7s** ease-out,
  avec `transition-delay` = `delay`.
- `prefers-reduced-motion: reduce` → rendu visible immédiatement, aucun
  IntersectionObserver instancié.
- Nettoie l'observer au démontage.

### `src/components/CountUp.tsx` (client)

Compteur animé pour les chiffres du Hero.

- Props : `value: string` (ex. `"200+"`, `"8"`, `"5+"`, `"500+"`), `className?`.
- Décompose `value` en préfixe / nombre entier / suffixe (regex).
- À l'entrée dans le viewport (`once: true`), anime de 0 → nombre via
  `requestAnimationFrame`, easing `easeOutCubic`, durée **~1,4s**. Réassemble
  préfixe + valeur courante + suffixe.
- `prefers-reduced-motion: reduce` → affiche la valeur finale directement.
- SSR-safe : rend la valeur finale au premier rendu serveur (pas de flash à 0
  pour les crawlers / no-JS).

## CSS (`src/app/globals.css`)

Ajouts (tous encadrés par un garde `prefers-reduced-motion`) :

- `@keyframes dts-ken-burns` : `scale(1) → scale(1.07)` + léger pan, **30s**,
  `ease-in-out`, `infinite alternate`. Classe utilitaire `.dts-kenburns`.
- `@keyframes dts-enter` (fondu + montée) + classe `.dts-enter` jouée au
  chargement, pilotée par une variable `--enter-delay` pour la cascade Hero.
- Parallaxe Hero : `@supports (animation-timeline: scroll())` → léger translate
  de l'image au scroll ; sinon rien (Ken Burns seul).
- `@view-transition { navigation: auto; }` pour un fondu natif entre les pages.
- Bloc `@media (prefers-reduced-motion: reduce)` neutralisant `.dts-kenburns`,
  `.dts-enter`, la parallaxe et les view-transitions.

## Modifications par fichier

- **`src/components/Hero.tsx`**
  - Photo : ajouter `.dts-kenburns` à la `className` de `SmartImage` (le dégradé
    overlay ne bouge pas). Parallaxe via le conteneur de fond.
  - Texte : remplacer le `.dts-reveal` unique par une cascade `.dts-enter` sur
    badge / `h1` / `p` / bloc boutons, avec `--enter-delay` = 0 / 120 / 240 / 360 ms.
  - Chiffres : `{stat.num}` → `<CountUp value={stat.num} />`.
- **`src/app/page.tsx`** : envelopper `SearchBar`, `Services`,
  `FeaturedProperties`, `WhyUs`, `CtaBanner` dans `<Reveal>` (le Hero garde sa
  cascade au chargement).
- **`src/components/Services.tsx`** : envelopper chaque `<ServiceCard>` dans
  `<Reveal delay={i * 80}>` (stagger). Conserver `h-full` sur le wrapper.
- **`src/components/FeaturedProperties.tsx`** : envelopper chaque
  `<PropertyCard>` dans `<Reveal delay={i * 80}>`.
- **`src/components/PropertyCard.tsx`** : image `group-hover:scale-105
  transition-transform duration-500` ; carte `hover:-translate-y-1 transition`
  (combiné à l'ombre existante).
- **`src/components/ServiceCard.tsx`** : `hover:-translate-y-1 transition` (+
  ombre existante).

## Autres pages

`Reveal` et les hovers de cartes étant partagés, l'effet se propage
automatiquement aux pages `/biens`, `/services`, etc. Envelopper également les
grilles/sections principales de ces pages dans `<Reveal>` là où c'est pertinent
(traitement identique à la home).

## Réglages de référence

| Paramètre | Valeur |
|---|---|
| Reveal : décalage vertical | 20px |
| Reveal : durée / easing | 0,7s ease-out |
| Reveal : stagger entre cartes | 80ms |
| Ken Burns : scale / durée | 1 → 1,07 / 30s |
| Cascade Hero : délais | 0 / 120 / 240 / 360 ms |
| Hover image : scale / durée | 1,05 / 500ms |
| Hover carte : élévation | 4px |
| CountUp : durée | ~1,4s |

## Critères de réussite

1. Au scroll, sections et cartes apparaissent en fondu-montée décalé.
2. Le Hero a un mouvement Ken Burns visible et une entrée en cascade au chargement.
3. Les 4 chiffres du Hero comptent de 0 à leur valeur à l'apparition.
4. Le survol des cartes zoome l'image et élève la carte.
5. Sous `prefers-reduced-motion`, tout est neutralisé (pas de mouvement).
6. `npm run build` passe sans erreur ; aucun décalage de mise en page (CLS) sur
   le Hero (les compteurs réservent leur place).
