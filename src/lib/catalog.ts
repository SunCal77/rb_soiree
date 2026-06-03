// ─────────────────────────────────────────────────────────────────────────────
// Couche d'accès aux données (abstraction + mode mock).
// ─────────────────────────────────────────────────────────────────────────────
// TOUTE l'UI lit le catalogue via ce module — jamais directement via src/data.
// Aujourd'hui, en mode "mock" (défaut), les données viennent de fichiers
// statiques (src/data) : zéro appel réseau → compatible GitHub Pages.
//
// Pour brancher un vrai backend plus tard (V2), il suffira d'implémenter la
// branche "api" de chaque fonction ci-dessous. Aucun composant n'aura à changer.

import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import type {
  Category,
  CategorySlug,
  Product,
  Variant,
} from "@/data/types";

export type DataMode = "mock" | "api";

/** Mode de données courant. Piloté par NEXT_PUBLIC_DATA_MODE (défaut: mock). */
export function getDataMode(): DataMode {
  return process.env.NEXT_PUBLIC_DATA_MODE === "api" ? "api" : "mock";
}

function notImplemented(fn: string): never {
  throw new Error(
    `catalog.${fn}: le mode "api" n'est pas encore implémenté. ` +
      `La démo tourne en mode "mock" (NEXT_PUBLIC_DATA_MODE=mock).`,
  );
}

// ── Catégories ────────────────────────────────────────────────────────────────

export function getCategories(): Category[] {
  if (getDataMode() === "api") notImplemented("getCategories");
  return [...CATEGORIES].sort((a, b) => a.order - b.order);
}

export function getCategory(slug: string): Category | undefined {
  return getCategories().find((c) => c.slug === slug);
}

export function getFeaturedCategories(): Category[] {
  return getCategories().filter((c) => c.featuredOnHome);
}

// ── Produits ──────────────────────────────────────────────────────────────────

export function getAllProducts(): Product[] {
  if (getDataMode() === "api") notImplemented("getAllProducts");
  return PRODUCTS;
}

export function getProduct(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: CategorySlug | string): Product[] {
  return getAllProducts().filter((p) => p.categorySlug === slug);
}

/** Nombre de produits par catégorie (pour les compteurs « N pièces »). */
export function countByCategory(slug: CategorySlug | string): number {
  return getProductsByCategory(slug).length;
}

// ── Variantes / stock ─────────────────────────────────────────────────────────

export type VariantSelection = {
  size?: string | null;
  color?: string | null;
  material?: string | null;
};

/** Retrouve la variante correspondant exactement à une sélection d'attributs. */
export function findVariant(
  product: Product,
  sel: VariantSelection,
): Variant | undefined {
  return product.variants.find(
    (v) =>
      (sel.size === undefined || v.size === sel.size) &&
      (sel.color === undefined || v.color === sel.color) &&
      (sel.material === undefined || v.material === sel.material),
  );
}

/** Stock disponible pour une sélection (somme si la sélection est partielle). */
export function stockFor(product: Product, sel: VariantSelection): number {
  return product.variants
    .filter(
      (v) =>
        (sel.size === undefined || v.size === sel.size) &&
        (sel.color === undefined || v.color === sel.color) &&
        (sel.material === undefined || v.material === sel.material),
    )
    .reduce((sum, v) => sum + v.stock, 0);
}

/** Stock total toutes variantes confondues. */
export function totalStock(product: Product): number {
  return product.variants.reduce((sum, v) => sum + v.stock, 0);
}

/** Une taille est-elle disponible (stock > 0) pour la couleur donnée ? */
export function isSizeAvailable(
  product: Product,
  size: string,
  color?: string | null,
): boolean {
  return stockFor(product, { size, ...(color !== undefined ? { color } : {}) }) > 0;
}
