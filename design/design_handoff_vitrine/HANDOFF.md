# Handoff — Maison Lior · Vitrine (storefront)

## Overview

This package is the design handoff for the **public storefront** of **Maison Lior**, an independent French boutique selling evening dresses, handbags and accessories. The storefront is the customer-facing side of the project; an admin panel is delivered in a separate handoff.

The store sells exclusively in **France**, with **Click & collect** at the Bordeaux shop as the only fulfillment method at launch (other modes are visually marked "Bientôt"). Payment is handled by **Stripe**.

## About the design files

The files in this bundle are **design references created in HTML** — interactive prototypes showing the intended look, layout, and behavior. They are **not production code to copy directly**.

Your task is to **recreate these designs in a real codebase** of your choice (or in the codebase you've already started). The HTML uses inline React/Babel and a single design-canvas wrapper to show all six screens side by side; in your implementation each screen becomes a real route/page.

Recommended stack (none imposed):
- **Next.js 14+ (App Router) + TypeScript** for the front-end — server components for catalogue pages, client components for the cart drawer
- **Tailwind CSS** with a custom config that mirrors the design tokens below
- **Stripe Checkout** for payment
- A headless CMS or database (Sanity, Strapi, Postgres + Prisma) for the catalogue — driven by the admin panel (separate handoff)

## Fidelity

**High-fidelity.** Final colors, typography, spacing, copy, and component states are decided. Recreate the UI **pixel-perfectly** in the target codebase, using its existing libraries/patterns where they exist.

## Brand & visual direction

- Aesthetic: **Apple-meets-luxury-French-boutique** — generous whitespace, restrained typography, photography-led storytelling, no decorative gradients, no emoji.
- Tone of voice (French): warm, sober, artisanal. "Maison Lior" is treated as a haute-couture maison with a real Bordeaux atelier.
- All copy is in **French**.
- Currency: **EUR (€)**, formatted `1 290 €` (thin space, suffix).

## Design tokens

Source of truth: `tokens.css`.

### Colors

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--bg-soft` | `#F7F5F0` | Section bands, cards |
| `--bg-warm` | `#EFECE6` | Hero, footer |
| `--fg` | `#1D1D1F` | Primary text, primary buttons |
| `--fg-secondary` | `#6E6E73` | Secondary text, captions |
| `--border` | `#D2D2D7` | Hairlines, input borders |
| `--border-soft` | `#E8E6E1` | Soft dividers on warm backgrounds |
| `--accent-bordeaux` | `#5A1A1F` | Brand accent #1 (sparingly) |
| `--accent-noir` | `#1A1A1A` | Brand accent #2 |
| `--accent-champagne` | `#C9A877` | Brand accent #3 (rarely) |

Status colors (used minimally on the storefront — mainly stock and confirmation):
- Success `#34C759` · Warning `#FF9500` · Danger `#FF3B30` · Info `#007AFF`

### Typography

- **Display / titles**: `"Cormorant Garamond"`, serif. Weights 400/500. Used for hero, section titles, product names in editorial contexts.
- **Body / UI**: Inter, then SF Pro fallback, then system. Weights 400/500/600.
- **Labels** (caps overlines): Inter 500, `letter-spacing: 0.06em`, `text-transform: uppercase`, 11–12px.

Scale (recreate with rem):
- H1 hero: `64–88px`, weight 400, line-height 1.05, letter-spacing `-0.02em`
- H2 section: `40–56px`, weight 500, line-height 1.1, `-0.018em`
- H3: `24–32px`, weight 500
- Body: `15–16px`, line-height 1.6
- Caption: `13px`, line-height 1.5

### Spacing, radius, shadow

- Spacing scale (px): 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128
- Radius: buttons → **pill `9999px`**, cards `18px`, inputs `12px`, modal/sheet `28px`
- Shadow (cards): `0 4px 24px rgba(0,0,0,0.04)`
- Shadow (sticky / drawer): `0 -8px 32px rgba(0,0,0,0.08)` or `-8px 0 32px rgba(0,0,0,0.08)`
- Backdrop blur (nav, drawer, modal scrim): `backdrop-filter: blur(20px) saturate(180%)`, background `rgba(255,255,255,0.78)`

## Information architecture

```
/                          Home (hero, signature, edito grid, atelier, magasin, footer)
/boutique                  Catalogue (filters + grid)
/boutique/[slug]           Fiche produit (PDP)
/panier  (drawer overlay)  Cart
/commande                  Checkout — single page, 3 steps
/commande/confirmation     Order confirmation (success)
```

Footer columns: Boutique · Maison · Service · Newsletter (email capture).

## Screens

### 1 — Home (`HomeScreen.jsx`)

Sections, top to bottom:

1. **Sticky nav** (`shared.jsx → Navbar`)
   - Background `rgba(255,255,255,0.78)` + blur 20px, height 64px
   - Left: brand wordmark "Maison Lior" (Cormorant 18px, letter-spacing 0.04em)
   - Center: 5 links — Boutique · Robes · Sacs · Accessoires · Édition limitée
   - Right: icon buttons — search, account, bag (with quantity dot)
2. **Hero** — full-bleed band on `--bg-warm`, asymmetric two-column 7/5
   - Left: overline "Maison Lior · Bordeaux" + H1 "Pour les soirées qui comptent." + 1-line lede + two CTAs (primary "Découvrir la collection" / ghost "Prendre rendez-vous")
   - Right: tall portrait silhouette (4/5 ratio) on a soft cream card with subtle shadow
3. **Signature row** — 4 silent props: "Fabriqué à Bordeaux", "Click & collect", "Retouches offertes", "Pièces numérotées". Compact icons, 13px copy.
4. **Edito grid — pièces signatures** — 6 product cards in 3 cols, with editorial captions; H2 "Les pièces de la saison."
5. **Atelier band** — full-bleed image left / text right, story copy about the atelier on Rue Sainte-Catherine
6. **Magasin band** — text left / map-style placeholder right with address, hours, "Réserver un essayage"
7. **Newsletter** — single email input + pill submit, on `--bg-soft`
8. **Footer** — 4 columns + bottom row (legal, RCS, copyright)

### 2 — Boutique (`BoutiqueScreen.jsx`)

- Page header (large H1 "La collection" + lede)
- Two-column body: 240px sticky filter sidebar + product grid
  - Sidebar groups: Catégorie, Taille, Couleur (swatches), Prix (range), Matière, Disponibilité
  - Top of grid: result count + sort dropdown ("Tri : Sélection", "Nouveautés", "Prix ↑/↓") + view toggle (4-up / 2-up)
- Grid: 4 columns desktop, 16px gutter; 12 product cards (`ProductCard` component)
  - Card: 4/5 image on `--bg-soft`, hover swap to silhouette variant, overline (collection), name, color, price. Stock-low badge when stock < 3.
- Pagination at bottom: numbered, with prev/next arrows.

### 3 — Fiche produit (`PDPScreen.jsx`)

- Breadcrumb (Boutique → Robes → Robe Solène)
- Two-column 60/40
  - Left: vertical gallery — 1 large hero image + 3 thumbnails stacked, then 1 lifestyle image full width below
  - Right (sticky from 96px top):
    - Overline "Maison Lior · Édition" + H2 product name + price (and barred price if promo)
    - 4-line description
    - Color chooser — 22px swatches with name reveal on hover
    - Size chooser — pill row with availability state (disabled = barred)
    - Quantity stepper + "Ajouter au panier" pill (full width, primary)
    - Secondary row: "Réserver un essayage en boutique" (ghost link)
    - Accordion: Composition · Entretien · Livraison & retours · Mensurations
- Below the fold:
  - "L'esprit de la pièce" — editorial 2-col text
  - "Vous aimerez aussi" — 4-card carousel
  - Reassurance band (same icons as Home signature row)

### 4 — Panier (`CommerceScreens.jsx → CartDrawerScreen`)

- Right-side drawer, 480px wide, `rgba(255,255,255,0.92)` + blur 20px
- Header: "Votre panier" + close icon
- Empty state (designed): centered illustration placeholder + "Votre panier est vide" + CTA "Découvrir la boutique"
- Filled state: list of line items
  - 96px square thumbnail · name + variant · price · stepper + remove (trash icon)
- Footer (sticky inside drawer):
  - Sub-total / Click & collect "Gratuit"
  - Total (large)
  - Reassurance line "Retrait à Bordeaux sous 48h"
  - "Passer commande" pill primary, full width
  - "Continuer mes achats" ghost

### 5 — Commande / Checkout (`CheckoutScreen`)

Single-page, two-column 60/40:
- Left column (steps as collapsible cards, expanded = active):
  1. **Vos informations** — email, prénom, nom, téléphone (4 fields, 2-col grid). Above: "J'ai déjà un compte → Se connecter".
  2. **Retrait en boutique** — radio group, only "Click & collect Bordeaux" selectable; "Point relais" and "Domicile" are visually present but disabled with a "Bientôt" badge. When selected, show address card + creneau picker (date + time slot).
  3. **Paiement** — Stripe-styled card field (placeholder), checkbox "Enregistrer ma carte", terms checkbox. Big primary "Régler 4 310 €".
- Right column (sticky 360px):
  - "Récapitulatif" with 3 line items, sub-total, retrait "Gratuit", TVA, total
  - Promo code input (collapsible)
  - Reassurance icons: paiement sécurisé Stripe · retouches offertes · CGV

### 6 — Confirmation (`CommerceScreens.jsx → ConfirmationScreen`)

- Full-bleed warm band with serene composition
- Centered: small check pill, H1 "Merci, Camille.", lede "Votre commande ML-2026-04812 est confirmée."
- Card: order number, date, total, retrait creneau (jeudi 14 mai · 11h–13h), magasin address
- Items recap (2-col grid of mini-cards)
- Next steps: 3 numbered cards — "Email de confirmation envoyé" · "SMS quand votre commande est prête" · "Présentez votre n° à la boutique"
- CTAs: "Retourner à la boutique" (primary) + "Suivre ma commande" (ghost — links to a future order-tracking page)
- Footer (same as elsewhere)

## Components inventory (`components/shared.jsx`)

- `Navbar` — top nav with brand, links, icons
- `Footer` — 4-col + bottom row
- `Btn` — pill button. Variants: `primary` (black bg, white fg), `ghost` (transparent + 1.5px border), `link` (text + underline on hover). Sizes: `sm`, `md`, `lg`. All have a hover state (`brightness 1.05` for primary, `bg rgba(0,0,0,0.04)` for ghost).
- `ProductCard` — product tile used in grids
- `Silhouette` — placeholder SVG illustration of a dress/bag/scarf, parameterized by `kind` and `accent`. **In production, replace with real product photography** (4/5 ratio, soft seamless background).
- `Section` / `Container` — layout primitives, `.ml-container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }`
- `Overline` — uppercase 11px caption with letter-spacing
- `PriceTag` — price formatter (handles barred + sale)
- `StockBadge` — pill badge for low/out-of-stock

## Interactions & behavior

- Nav stays sticky and gains a hairline border + slight shadow once scrolled past 8px.
- Cart icon shows a small red dot with the item count; clicking opens the drawer (right-side slide, 280ms ease-out).
- Clicking outside the drawer or pressing Esc closes it.
- Add-to-cart on the PDP triggers a toast bottom-right ("Ajouté au panier") and increments the nav count, then opens the drawer.
- Filters in `/boutique` update the URL query string and the grid in place (no full reload).
- Quantity steppers debounce 200ms and animate the price recalc.
- All transitions: `200ms cubic-bezier(0.2, 0.7, 0.3, 1)`.
- Focus rings: `box-shadow: 0 0 0 2px var(--fg)`. Honor `prefers-reduced-motion`.
- Mobile breakpoints (the desktop mocks are 1440px; recreate responsively):
  - `≥ 1280px` — desktop as designed
  - `768–1279px` — 2-col product grid, sidebar collapses to a "Filtres" button that opens a sheet
  - `< 768px` — single-col, sticky CTA bar on PDP, drawer becomes full-screen sheet

## State / data model

Types your front-end will need (high level):

```ts
type Product = {
  id: string;
  slug: string;
  name: string;
  collection: string;     // "Édition", "Capsule Soirée", etc.
  category: 'robes' | 'sacs' | 'accessoires';
  description: string;
  composition: string;
  care: string;
  price: number;          // in cents, EUR
  comparePrice?: number;
  images: { src: string; alt: string }[];
  variants: Variant[];
  status: 'published' | 'draft' | 'archived';
};

type Variant = {
  id: string;
  size?: string;          // "XS"–"XL", or "36"–"44", or null for accessories
  color: { name: string; hex: string };
  sku: string;
  price: number;
  stock: number;
};

type CartLine = { variantId: string; qty: number };

type Order = {
  id: string;             // "ML-2026-04812"
  customer: { firstName: string; lastName: string; email: string; phone: string };
  fulfillment: {
    mode: 'click_collect';     // others disabled at launch
    pickupSlot: string;        // ISO datetime range
    storeAddress: string;
  };
  items: { variantId: string; name: string; size?: string; color: string; qty: number; unitPrice: number }[];
  subtotal: number;
  vat: number;
  total: number;
  payment: { provider: 'stripe'; chargeId: string; status: 'paid' | 'pending' | 'failed' | 'refunded' };
  status: 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'canceled';
  createdAt: string;
};
```

Cart persists in `localStorage` under `ml.cart.v1`. On checkout, POST to your back-end which creates the Stripe Checkout session and returns the order ID.

## Assets

- **No real photos in this bundle** — silhouettes are SVG placeholders. The dev should replace with actual product photography (4/5 ratio, neutral seamless background, ≥ 1500px wide).
- Brand wordmark "Maison Lior" is set in Cormorant Garamond — there is no logo SVG yet; commission one or set the wordmark in CSS.
- Icon set: shipped as inline SVG inside `shared.jsx` (`Icon` component). Match it in production with **Lucide** (it's the same visual language).

## Files in this bundle

- `RobeSoirée - 6 écrans.html` — the design canvas hosting all six screens (open in a browser)
- `tokens.css` — design tokens (colors, type, spacing) — start your Tailwind/CSS config from here
- `boutique.css` — storefront-only styles
- `design-canvas.jsx` — the canvas wrapper (Figma-ish presentation only — **do not ship**)
- `components/shared.jsx` — Navbar, Footer, Btn, ProductCard, Silhouette, Icon, primitives
- `components/HomeScreen.jsx` — Home (1)
- `components/BoutiqueScreen.jsx` — Catalogue (2)
- `components/PDPScreen.jsx` — Fiche produit (3)
- `components/CommerceScreens.jsx` — Cart drawer (4), Checkout (5), Confirmation (6)

## Out of scope for this handoff

- Admin panel — separate handoff package (`design_handoff_admin/`)
- Customer account / order history — to be designed later
- Multi-language — French only at launch
- Other fulfillment modes (point relais, domicile) — UI shows them as "Bientôt"; back-end can ignore them for now

---

When in doubt, **open the HTML file in a browser and inspect the live design** — every spacing, color, and copy decision is encoded there.
