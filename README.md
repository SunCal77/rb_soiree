# Ma Robe Soirée — vitrine e-commerce

Vitrine en ligne de **Ma Robe Soirée**, boutique de robes de soirée et
accessoires pour femmes (50 rue des Lys, 91150 Étampes — entrée pharmacie, dans
le magasin Leclerc). La boutique sert de **point de retrait** : en V1, la
livraison se fait **uniquement en click-and-collect**.

> Coordonnées centralisées dans [`src/data/site.ts`](src/data/site.ts).

Catalogue : **robes, sacs, chaussures, cravates, accessoires**.

> **État** : démo statique déployable. Le catalogue est alimenté par des
> **données mock** (aucun backend). L'esthétique est **inspirée d'Apple**
> (palette neutre, boutons « pill », ombres douces, typo Inter).

🔗 **Démo** : `https://<user>.github.io/<repo>/` (une fois le déploiement Pages activé — voir plus bas).

---

## Stack technique

| | |
|---|---|
| Framework | **Next.js 16** (App Router) |
| Langage | TypeScript (strict) |
| UI | React 19 |
| Styling | CSS maison via design tokens (`src/styles/`), esthétique Apple |
| Données | Fichiers statiques `src/data/` via une couche d'accès `src/lib/catalog.ts` (mode **mock**) |
| Build | Export **100% statique** (`output: export`) → compatible GitHub Pages |
| État panier | React Context + `localStorage` |

> ℹ️ Cette version de Next.js comporte des changements d'API. Voir
> [`AGENTS.md`](AGENTS.md) avant de coder.

---

## Démarrage rapide (local)

Prérequis : **Node.js 20+**.

```bash
npm install        # installe les dépendances
npm run dev        # serveur de dev → http://localhost:3000
```

Autres commandes :

```bash
npm run build      # build d'export statique → dossier out/
npm run lint       # ESLint
npx serve out      # sert le build statique localement (après build)
```

---

## Mode mock (données sans serveur)

La démo tourne **par défaut en mode mock** : tout le catalogue vient de
`src/data/`, **aucun appel réseau**. C'est ce qui la rend déployable sur un
hébergement purement statique.

Le mode est piloté par la variable `NEXT_PUBLIC_DATA_MODE` (voir
[`.env.example`](.env.example)) :

| Valeur | Effet |
|---|---|
| `mock` *(défaut)* | Lit `src/data/` — 100% statique. |
| `api` | Réservé à la V2 : branchera un vrai backend. **Non implémenté** (lève une erreur explicite). |

Toute l'UI lit le catalogue **uniquement** via `src/lib/catalog.ts`. Pour
brancher un backend plus tard, il suffira d'implémenter la branche `api` de ce
module — **aucun composant à modifier**.

Pour forcer le mode localement, créez un `.env.local` :

```bash
NEXT_PUBLIC_DATA_MODE=mock
```

---

## Déploiement sur GitHub Pages

Le dépôt inclut un workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
qui build et déploie à **chaque push sur `main`**.

### Étapes (une seule fois)

1. Poussez le code sur un dépôt GitHub (branche **`main`**).
2. Dans le dépôt : **Settings → Pages → Build and deployment → Source** =
   **GitHub Actions**.
3. Le prochain push sur `main` déclenche le build. Le site sera en ligne sur
   `https://<user>.github.io/<repo>/`.

> Vous pouvez aussi lancer le déploiement à la main depuis l'onglet **Actions**
> (« Run workflow »).

### Base path

Un site « projet » Pages est servi sous **`/<repo>`**, pas sous `/`. Le workflow
règle ça automatiquement : il passe `PAGES_BASE_PATH=/<nom-du-repo>` au build
(voir [`next.config.ts`](next.config.ts)).

- **Site projet** (`github.com/user/maboutique`) → URL `…github.io/maboutique/`
  → base path `/maboutique` (auto). Rien à faire.
- **Site utilisateur** (dépôt nommé `user.github.io`) → servi à la racine →
  mettez `PAGES_BASE_PATH: ""` dans le workflow.

En local, `PAGES_BASE_PATH` est vide → le site tourne à la racine
(`localhost:3000`).

---

## Ajouter du contenu

Tout le catalogue est **data-driven** : ajouter du contenu = éditer de la
**donnée**, jamais du code.

### Ajouter un produit

Éditez [`src/data/products.ts`](src/data/products.ts) et ajoutez une entrée
`product({ … })`. Champs clés :

```ts
product({
  id: "p17", slug: "robe-celeste",       // slug = URL /boutique/robe-celeste
  name: "Robe Céleste", sub: "Soie, bleu",
  categorySlug: "robes",                  // doit exister dans categories.ts
  collection: "Édition", priceNum: 1340, badge: "Nouveau",
  tone: "#1B2540", bg: "#E8E9EE", kind: "dress",   // silhouette placeholder
  material: "Soie", composition: "100% soie.",
  colors: [{ name: "Bleu nuit", hex: "#1B2540" }],
  sizes: ["36", "38", "40"],              // [] pour une pièce sans taille
}),
```

Les **variantes** (taille × couleur) et leur **stock** sont générées
automatiquement à partir de `sizes` + `colors`. Pour fixer un stock précis,
passez `stock: [..]` (un nombre par variante).

### Ajouter une catégorie

Éditez [`src/data/categories.ts`](src/data/categories.ts) et ajoutez une entrée.
La **navbar**, la **home**, le **footer** et la **boutique** s'adaptent
automatiquement — aucun composant à toucher.

```ts
{
  slug: "ceintures", label: "Ceintures", navLabel: "Ceintures",
  title: "Ceintures.", blurb: "…", order: 6,
  featuredOnHome: false, kind: "accessoires",
}
```

Puis créez le dossier d'images `public/images/products/ceintures/`.

### Ajouter des images

Voir la convention détaillée dans
[`public/images/products/README.md`](public/images/products/README.md).
En résumé : déposez `public/images/products/<categorie>/<slug>-1.webp`
(détourée, ratio 4/5). Tant qu'aucune photo n'existe, une silhouette SVG
s'affiche — pas d'image cassée.

---

## Structure du dépôt

```
.
├── .github/workflows/deploy.yml   Déploiement GitHub Pages (Actions)
├── next.config.ts                 Export statique + base path
├── src/
│   ├── app/                       Routes (Home, Boutique, PDP, Commande, 404)
│   ├── components/                Navbar, Footer, ProductCard, PDP, Silhouette…
│   ├── data/                      ★ Catalogue mock : types, categories, products
│   ├── lib/                       catalog.ts (accès données), cart-context, format
│   └── styles/                    Design tokens + styles (esthétique Apple)
├── public/
│   ├── images/products/<cat>/     Emplacement des vraies photos (à venir)
│   └── brand/                     Logos
└── design/                        Prototypes & specs design (référence, non livrés)
```

---

## Roadmap

- **V1 (actuelle)** — vitrine statique, catalogue mock, click-and-collect,
  déploiement Pages. **Robes : vraies photos détourées intégrées** (galerie
  swipe sur la fiche produit).
- **Prochaines étapes**
  - 📷 Photos pour sacs, accessoires, chaussures, cravates (silhouettes pour
    l'instant) — il suffira de déposer les fichiers et de renseigner `images:`.
  - 🧮 Enrichir le catalogue (chaussures, cravates, accessoires).
  - 🛠️ **Interface admin** (gestion catalogue / stocks / commandes) — *hors V1*.
  - 🔌 Brancher un **backend réel** (mode `api` de `catalog.ts`) + paiement.
  - 🚚 **V2 livraison** : activer point-relais et livraison à domicile
    (déjà prévus, désactivés en V1).

## Hors scope V1

Interface admin · vrai backend / paiement / base de données · point-relais &
livraison à domicile. La direction visuelle (esthétique Apple) est à préserver.
