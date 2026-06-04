// ─────────────────────────────────────────────────────────────────────────────
// Modèle de données du catalogue (data-driven, extensible)
// ─────────────────────────────────────────────────────────────────────────────
// Tout le catalogue est décrit par de la DONNÉE, pas par du code. Ajouter une
// catégorie ou un produit = éditer `categories.ts` / `products.ts`, sans toucher
// aux composants. C'est la promesse du brief : « ajouter une catégorie = ajouter
// de la donnée, pas réécrire du code ».

/** Silhouette de rendu (placeholder SVG, voir components/Silhouette.tsx). */
export type ProductKind =
  | "dress"
  | "dress-long"
  | "dress-short"
  | "bag"
  | "scarf"
  | "jewel"
  | "shoe"
  | "tie";

/**
 * Identifiant de catégorie. Les 5 catégories prévues existent dès la V1, même
 * si certaines n'ont que des produits placeholder. L'UI sait déjà gérer N
 * catégories.
 */
export type CategorySlug =
  | "robes"
  | "sacs"
  | "chaussures"
  | "cravates"
  | "accessoires";

/** Une catégorie de la taxonomie. */
export type Category = {
  slug: CategorySlug;
  /** Libellé affiché (ex. « Robes »). */
  label: string;
  /** Libellé dans la barre de navigation. */
  navLabel: string;
  /** Titre de la page boutique (ex. « Robes. »). */
  title: string;
  /** Courte accroche éditoriale. */
  blurb: string;
  /** Ordre d'affichage (navbar, home, boutique). */
  order: number;
  /** Mise en avant sur la home (grille « univers » à 3 tuiles). */
  featuredOnHome: boolean;
  /** Silhouette représentative (placeholder en l'absence de photo). */
  kind: ProductKind;
};

/** Une couleur disponible (attribut « couleur »). */
export type ColorOption = {
  name: string;
  hex: string;
};

/**
 * Une variante = une combinaison d'attributs (taille × couleur × matière) avec
 * son propre stock. C'est l'unité vendable réelle. Un attribut absent vaut
 * `null` (ex. un sac sans taille).
 */
export type Variant = {
  size: string | null;
  color: string | null; // doit correspondre à un ColorOption.name du produit
  material: string | null;
  /** Stock disponible pour cette combinaison précise. */
  stock: number;
};

/** Un produit du catalogue. */
export type Product = {
  id: string;
  slug: string;
  name: string;
  sub: string;
  categorySlug: CategorySlug;
  collection: string;
  description: string;
  composition: string;
  care: string;
  /** Prix de base en euros (entier). Le formatage passe par lib/format.ts. */
  priceNum: number;
  badge: string | null;
  /** Couleur dominante pour la silhouette placeholder. */
  tone: string;
  /** Couleur de fond de la silhouette placeholder. */
  bg: string;
  kind: ProductKind;
  /**
   * Photos réelles, ordonnées (la 1ʳᵉ = couverture / vignette). Chemins relatifs
   * à `public/` (ex. "/images/products/robes/robe-lior-1.png"). Le base path
   * GitHub Pages est appliqué au rendu via le composant image, jamais en dur.
   * Tableau vide → l'UI retombe sur la silhouette SVG placeholder.
   */
  images: string[];
  // ── Attributs disponibles (dérivables des variantes, listés pour l'UI) ──
  colors: ColorOption[];
  materials: string[];
  sizes: string[];
  /** Variantes multi-attributs avec stock par variante. */
  variants: Variant[];
};
