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

## Brancher une photo dans le code (déjà en place)

Le mécanisme est **implémenté** — pour ajouter des photos, il suffit de :

1. Déposer les fichiers ici en respectant le nommage `<slug>-<n>`.
2. Renseigner le champ **`images`** du produit dans
   [`src/data/products.ts`](../../../src/data/products.ts), via le helper
   `photos(categorie, slug, count)` :

   ```ts
   images: photos("robes", "robe-lior", 5), // → robe-lior-1.png … robe-lior-5.png
   ```

C'est tout. Le composant [`ProductImage`](../../../src/components/ProductImage.tsx)
affiche la **couverture** (1ʳᵉ image) sur les cartes, le panier et le checkout ;
la **fiche produit** (PDP) affiche une **galerie swipe** sur tout le tableau.
Sans photo, le produit retombe automatiquement sur la silhouette SVG — pas
d'image cassée.

> ⚠️ **Base path GitHub Pages** : ne jamais coder un chemin absolu en dur.
> `ProductImage` passe par le helper [`asset()`](../../../src/lib/asset.ts) qui
> préfixe `NEXT_PUBLIC_BASE_PATH` (`/<repo>`). `next/image` en mode
> `unoptimized` ne le fait PAS tout seul — c'est `asset()` qui s'en charge.
