# Maison Lior

Boutique en ligne pour Maison Lior — robes de soirée, sacs, accessoires.
Vente exclusivement en France, retrait en boutique (12 rue d'Aboukir, Paris 2ᵉ),
paiement Stripe.

> État actuel : **phase design**. Aucune implémentation n'a encore été choisie ni écrite.

## Structure du dépôt

```
.
├── README.md                       Ce fichier — vue d'ensemble du projet
├── design_handoff_vitrine/         Design de la vitrine publique (6 écrans)
│   ├── HANDOFF.md                  Spec design détaillée (tokens, écrans, composants, modèle)
│   ├── canvas.html                 Canvas multi-écrans à ouvrir dans un navigateur
│   ├── standalone.html             Version single-file autonome (offline)
│   ├── tokens.css                  Design tokens (couleurs, type, espacement)
│   ├── boutique.css                Styles de la vitrine
│   ├── design-canvas.jsx           Wrapper du canvas Figma-like (ne pas livrer)
│   └── components/                 JSX de référence pour chaque écran
│       ├── shared.jsx              Navbar, Footer, ProductCard, silhouettes, données PRODUCTS
│       ├── HomeScreen.jsx          Écran 1 — Home
│       ├── BoutiqueScreen.jsx      Écran 2 — Catalogue
│       ├── PDPScreen.jsx           Écran 3 — Fiche produit
│       └── CommerceScreens.jsx     Écrans 4–6 — Panier, Commande, Confirmation
├── design_handoff_admin/           Design du back-office (8 écrans desktop + mobile)
│   ├── Admin.html                  Canvas admin
│   ├── standalone.html             Version single-file autonome (offline)
│   ├── admin.css                   Styles admin
│   └── components/                 JSX de référence (shared + screens-1/2/3)
├── brand/                          Identité visuelle
│   ├── monogram.svg
│   └── wordmark.svg
└── docs/
    └── design-chat.md              Historique de la conversation design (contexte d'intention)
```

Les fichiers dans `design_handoff_*` sont des **prototypes de référence** — pas du
code à recopier. Ils décrivent l'apparence et le comportement attendus ; le projet
final sera réécrit dans la stack choisie.

## Aperçu rapide

- Vitrine 6 écrans (canvas) : [design_handoff_vitrine/canvas.html](design_handoff_vitrine/canvas.html)
- Vitrine offline (single-file) : [design_handoff_vitrine/standalone.html](design_handoff_vitrine/standalone.html)
- Back-office (canvas) : [design_handoff_admin/Admin.html](design_handoff_admin/Admin.html)
- Back-office offline (single-file) : [design_handoff_admin/standalone.html](design_handoff_admin/standalone.html)
- Spec design détaillée : [design_handoff_vitrine/HANDOFF.md](design_handoff_vitrine/HANDOFF.md)
- Conversation design (intention initiale) : [docs/design-chat.md](docs/design-chat.md)

## Objectif produit

Petit e-commerce déployable, simple à opérer pour un commerçant : la vitrine pour
les client·e·s, l'admin pour gérer catalogue, stocks, prix et commandes. Premier
livrable : **un MVP de la vitrine**.

## Stack proposée

Direction validée par le client : **Next.js + Supabase ou Firebase** (back-end
léger, pas de service Python lourd).

- **Front** : Next.js 14 App Router · TypeScript · Tailwind (config dérivée de
  `design_handoff_vitrine/tokens.css`)
- **Données + auth admin** : Supabase (Postgres managé, RLS, auth) — recommandé
  pour la flexibilité SQL ; Firebase (Firestore) reste possible si on préfère
  zéro SQL
- **Paiement** : Stripe Checkout
- **Médias** : Supabase Storage (ou Firebase Storage)

À confirmer avant le scaffolding : Supabase ou Firebase.

## Prochaines étapes

1. Confirmer Supabase vs Firebase.
2. Scaffolder `frontend/` (Next.js + TS + Tailwind) avec les tokens du design.
3. Implémenter la vitrine pixel-perfect, écran par écran (Home → Boutique → PDP
   → Panier → Checkout → Confirmation).
4. Ouvrir le chantier admin une fois la vitrine MVP en ligne.
