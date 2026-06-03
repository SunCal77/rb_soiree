# Photos produits — convention

Ce dossier accueille les **vraies photos détourées** des produits. Tant qu'une
photo n'existe pas, le site affiche une **silhouette SVG placeholder**
(composant [`Silhouette`](../../../src/components/Silhouette.tsx)) — aucune
image cassée.

## Arborescence

Une sous-dossier par catégorie de la taxonomie :

```
public/images/products/
├── robes/
├── sacs/
├── chaussures/
├── cravates/
└── accessoires/
```

## Nommage des fichiers

Le nom de fichier reprend le **`slug`** du produit (défini dans
[`src/data/products.ts`](../../../src/data/products.ts)), suivi d'un index :

```
<slug>-<n>.<ext>
```

- `<slug>` — exactement le `slug` du produit (ex. `robe-lior`, `escarpin-vesane`).
- `<n>` — numéro de vue, à partir de `1`. `1` = image principale (vignette + carte).
- `<ext>` — `webp` de préférence (plus léger), sinon `png` (transparence).

### Exemples

```
robes/robe-lior-1.webp        ← image principale de "Robe Lior"
robes/robe-lior-2.webp        ← vue alternative
sacs/sac-aurore-1.webp
chaussures/escarpin-vesane-1.webp
```

## Format attendu

- **Détourées** sur fond transparent (PNG) ou fond uni neutre (WebP).
- Ratio **4/5** (portrait) pour coller aux emplacements `aspect-ratio: 4/5`.
- Optimisées (largeur ~1200 px max, compression raisonnable).
- Pas de service externe de retouche : on dépose des fichiers déjà prêts.

## Brancher une photo dans le code (à venir)

Le modèle de données prévoit déjà l'emplacement. Lorsqu'on passera des
silhouettes aux photos, on ajoutera un champ `image` au produit et on
remplacera `<Silhouette …/>` par une `<img>` / `next/image` pointant vers
`/<basePath>/images/products/<categorie>/<slug>-1.webp`.

> ⚠️ Sur GitHub Pages, les chemins d'images doivent inclure le **base path**
> (`/<repo>`). Utilisez un helper qui préfixe `process.env.PAGES_BASE_PATH`
> plutôt qu'un chemin absolu en dur.
