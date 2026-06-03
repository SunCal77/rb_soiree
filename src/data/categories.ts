// ─────────────────────────────────────────────────────────────────────────────
// Taxonomie — les 5 catégories prévues existent dès la V1.
// ─────────────────────────────────────────────────────────────────────────────
// Pour ajouter une catégorie : ajoutez une entrée ici (+ des produits dans
// products.ts). La navbar, la home et la boutique s'adaptent automatiquement.

import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    slug: "robes",
    label: "Robes",
    navLabel: "Robes",
    title: "Robes.",
    blurb: "Pièces de soirée confectionnées à Paris, en éditions numérotées.",
    order: 1,
    featuredOnHome: true,
    kind: "dress",
  },
  {
    slug: "sacs",
    label: "Sacs",
    navLabel: "Sacs",
    title: "Sacs.",
    blurb: "Maroquinerie en cuir pleine fleur, façonnée à la main.",
    order: 2,
    featuredOnHome: true,
    kind: "bag",
  },
  {
    slug: "chaussures",
    label: "Chaussures",
    navLabel: "Chaussures",
    title: "Chaussures.",
    blurb: "Escarpins et sandales, montés sur des formes italiennes.",
    order: 3,
    featuredOnHome: false,
    kind: "shoe",
  },
  {
    slug: "cravates",
    label: "Cravates",
    navLabel: "Cravates",
    title: "Cravates.",
    blurb: "Soies tissées et nœuds papillon, pour une silhouette nette.",
    order: 4,
    featuredOnHome: false,
    kind: "tie",
  },
  {
    slug: "accessoires",
    label: "Accessoires",
    navLabel: "Accessoires",
    title: "Accessoires.",
    blurb: "Carrés de soie, bijoux et petites pièces qui signent un ensemble.",
    order: 5,
    featuredOnHome: true,
    kind: "jewel",
  },
];
