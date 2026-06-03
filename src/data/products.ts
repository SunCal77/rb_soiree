// ─────────────────────────────────────────────────────────────────────────────
// Catalogue de démonstration (données mock — 100% statiques).
// ─────────────────────────────────────────────────────────────────────────────
// Source de vérité unique du catalogue. Pour ajouter un produit, copiez une
// entrée et adaptez-la. Les variantes (taille × couleur × matière) portent
// chacune leur propre stock — c'est l'unité vendable réelle.
//
// Les images sont des silhouettes SVG (placeholders). Les vraies photos
// détourées arriveront dans public/images/products/<categorie>/ (voir README).

import type { ColorOption, Product, Variant } from "./types";

// ── Palette de couleurs réutilisable (attribut « couleur ») ──────────────────
const C = {
  noir: { name: "Noir", hex: "#1D1D1F" },
  ivoire: { name: "Ivoire", hex: "#EDE6D6" },
  champagne: { name: "Champagne", hex: "#C9A96E" },
  prune: { name: "Prune", hex: "#3A1E2C" },
  bleuNuit: { name: "Bleu nuit", hex: "#1B2540" },
  ecru: { name: "Écru", hex: "#E8E0CF" },
  fauve: { name: "Fauve", hex: "#A78866" },
  bordeaux: { name: "Bordeaux", hex: "#7A1E27" },
  or: { name: "Or", hex: "#D8B26A" },
  nude: { name: "Nude", hex: "#D9C2A6" },
} satisfies Record<string, ColorOption>;

// Stock pseudo-réaliste mais déterministe (pas d'aléa : build reproductible).
const STOCK_CYCLE = [4, 2, 6, 3, 5, 1, 7, 2];

/**
 * Construit la liste des variantes par produit cartésien
 * (tailles × couleurs), avec une matière unique. Un attribut vide vaut `null`.
 * Le stock suit un cycle déterministe, sauf override explicite.
 */
function buildVariants(
  sizes: string[],
  colors: ColorOption[],
  material: string | null,
  stockOverride?: number[],
): Variant[] {
  const sizeList: (string | null)[] = sizes.length ? sizes : [null];
  const colorList: (string | null)[] = colors.length
    ? colors.map((c) => c.name)
    : [null];
  const out: Variant[] = [];
  let i = 0;
  for (const size of sizeList) {
    for (const color of colorList) {
      const stock =
        stockOverride?.[i] ?? STOCK_CYCLE[i % STOCK_CYCLE.length];
      out.push({ size, color, material, stock });
      i += 1;
    }
  }
  return out;
}

const BASE = {
  description:
    "Pièce confectionnée à Paris, dans notre atelier rue d'Aboukir. Coupe étudiée, finitions main, étoffes choisies chez les tisseurs italiens et lyonnais.",
  care: "Nettoyage à sec uniquement. Conservez la pièce dans la housse fournie.",
};

/** Petit constructeur pour garder la liste lisible. */
function product(p: {
  id: string;
  slug: string;
  name: string;
  sub: string;
  categorySlug: Product["categorySlug"];
  collection: string;
  priceNum: number;
  badge?: string | null;
  tone: string;
  bg: string;
  kind: Product["kind"];
  composition: string;
  material: string | null;
  colors: ColorOption[];
  sizes: string[];
  description?: string;
  care?: string;
  stock?: number[];
}): Product {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    sub: p.sub,
    categorySlug: p.categorySlug,
    collection: p.collection,
    description: p.description ?? BASE.description,
    composition: p.composition,
    care: p.care ?? BASE.care,
    priceNum: p.priceNum,
    badge: p.badge ?? null,
    tone: p.tone,
    bg: p.bg,
    kind: p.kind,
    colors: p.colors,
    materials: p.material ? [p.material] : [],
    sizes: p.sizes,
    variants: buildVariants(p.sizes, p.colors, p.material, p.stock),
  };
}

const DRESS_SIZES = ["34", "36", "38", "40"];

export const PRODUCTS: Product[] = [
  // ── Robes ──────────────────────────────────────────────────────────────────
  product({
    id: "p1", slug: "robe-lior", name: "Robe Lior", sub: "Soie sablée, noir",
    categorySlug: "robes", collection: "Édition", priceNum: 1290, badge: "Nouveau",
    tone: "#1D1D1F", bg: "#EFEAE0", kind: "dress", material: "Soie sablée",
    composition: "100% soie sablée. Doublure : 100% cupro. Tissu tissé à Côme, Italie.",
    colors: [C.noir, C.bleuNuit, C.bordeaux], sizes: DRESS_SIZES,
  }),
  product({
    id: "p2", slug: "robe-calliope", name: "Robe Calliope", sub: "Crêpe, ivoire",
    categorySlug: "robes", collection: "Capsule Soirée", priceNum: 1450, badge: "Édition limitée",
    tone: "#E5DFD0", bg: "#FAF7F0", kind: "dress", material: "Crêpe",
    composition: "100% crêpe de soie. Doublure : 100% cupro.",
    colors: [C.ivoire, C.champagne], sizes: ["36", "38", "40"],
  }),
  product({
    id: "p3", slug: "robe-octavie", name: "Robe Octavie", sub: "Velours, prune profond",
    categorySlug: "robes", collection: "Édition", priceNum: 1690,
    tone: "#3A1E2C", bg: "#EDE3E1", kind: "dress", material: "Velours",
    composition: "Velours de soie 82%, élasthanne 18%. Doublure cupro.",
    colors: [C.prune, C.noir], sizes: ["34", "36", "38", "40", "42"],
  }),
  product({
    id: "p4", slug: "robe-aurelie", name: "Robe Aurélie", sub: "Mousseline, écru",
    categorySlug: "robes", collection: "Édition", priceNum: 1380, badge: "Nouveau",
    tone: "#E8E0CF", bg: "#F5F0E5", kind: "dress-short", material: "Mousseline",
    composition: "100% mousseline de soie. Doublure cupro.",
    colors: [C.ecru], sizes: ["34", "36", "38"],
  }),
  product({
    id: "p5", slug: "robe-margaux", name: "Robe Margaux", sub: "Sergé de laine, noir",
    categorySlug: "robes", collection: "Édition", priceNum: 1180,
    tone: "#1D1D1F", bg: "#F5F5F7", kind: "dress-short", material: "Sergé de laine",
    composition: "Laine vierge 96%, élasthanne 4%.",
    colors: [C.noir], sizes: DRESS_SIZES,
  }),
  product({
    id: "p6", slug: "robe-iliane", name: "Robe Iliane", sub: "Satin duchesse, bleu nuit",
    categorySlug: "robes", collection: "Capsule Soirée", priceNum: 1520,
    tone: "#1B2540", bg: "#E8E9EE", kind: "dress", material: "Satin duchesse",
    composition: "Satin duchesse 100% soie. Doublure cupro.",
    colors: [C.bleuNuit, C.noir, C.bordeaux], sizes: ["36", "38", "40"],
  }),
  product({
    id: "p7", slug: "robe-soraya", name: "Robe Soraya", sub: "Tulle brodé, champagne",
    categorySlug: "robes", collection: "Capsule Soirée", priceNum: 1850, badge: "Édition limitée",
    tone: "#C9A96E", bg: "#F4ECDB", kind: "dress", material: "Tulle brodé",
    composition: "Tulle de soie brodé main. Doublure cupro.",
    colors: [C.champagne], sizes: ["36", "38"],
  }),
  product({
    id: "p8", slug: "robe-olympe", name: "Robe Olympe", sub: "Crêpe Georgette, écru",
    categorySlug: "robes", collection: "Édition", priceNum: 1220,
    tone: "#EDE5D5", bg: "#F5F0E5", kind: "dress-short", material: "Crêpe Georgette",
    composition: "100% crêpe Georgette de soie.",
    colors: [C.ecru, C.ivoire], sizes: DRESS_SIZES,
  }),

  // ── Sacs ─────────────────────────────────────────────────────────────────
  product({
    id: "p9", slug: "sac-aurore", name: "Sac Aurore", sub: "Cuir grainé, fauve",
    categorySlug: "sacs", collection: "Édition", priceNum: 980,
    tone: "#A78866", bg: "#F2EAE0", kind: "bag", material: "Cuir grainé",
    composition: "Cuir de veau pleine fleur grainé, doublure cupro.",
    colors: [C.fauve, C.noir], sizes: [],
  }),
  product({
    id: "p10", slug: "sac-emilie", name: "Sac Émilie", sub: "Cuir lisse, noir",
    categorySlug: "sacs", collection: "Édition", priceNum: 1120, badge: "Stock limité",
    tone: "#1D1D1F", bg: "#F5F5F7", kind: "bag", material: "Cuir lisse",
    composition: "Cuir de veau lisse, doublure cupro.",
    colors: [C.noir], sizes: [], stock: [2],
  }),

  // ── Chaussures (placeholder — catalogue à enrichir) ─────────────────────────
  product({
    id: "p13", slug: "escarpin-vesane", name: "Escarpin Vésane", sub: "Cuir verni, noir",
    categorySlug: "chaussures", collection: "Édition", priceNum: 690, badge: "Nouveau",
    tone: "#1D1D1F", bg: "#F0EFEF", kind: "shoe", material: "Cuir verni",
    composition: "Cuir verni, semelle cuir. Talon 85 mm. Fabrication italienne.",
    colors: [C.noir, C.bordeaux], sizes: ["36", "37", "38", "39", "40", "41"],
  }),
  product({
    id: "p14", slug: "sandale-laetitia", name: "Sandale Lætitia", sub: "Daim, nude",
    categorySlug: "chaussures", collection: "Capsule Soirée", priceNum: 620,
    tone: "#D9C2A6", bg: "#F4EFE7", kind: "shoe", material: "Daim",
    composition: "Daim de chèvre, semelle cuir. Talon 70 mm.",
    colors: [C.nude, C.champagne], sizes: ["36", "37", "38", "39", "40"],
  }),

  // ── Cravates (placeholder — catalogue à enrichir) ───────────────────────────
  product({
    id: "p15", slug: "cravate-augustin", name: "Cravate Augustin", sub: "Soie tissée, bleu nuit",
    categorySlug: "cravates", collection: "Édition", priceNum: 140,
    tone: "#1B2540", bg: "#E8E9EE", kind: "tie", material: "Soie tissée",
    composition: "100% soie tissée. Largeur 7,5 cm.",
    colors: [C.bleuNuit, C.bordeaux, C.noir], sizes: [],
  }),
  product({
    id: "p16", slug: "noeud-papillon-leon", name: "Nœud papillon Léon", sub: "Soie jacquard, noir",
    categorySlug: "cravates", collection: "Édition", priceNum: 95,
    tone: "#1D1D1F", bg: "#F0EFEF", kind: "tie", material: "Soie jacquard",
    composition: "100% soie jacquard. Réglable, à nouer.",
    colors: [C.noir, C.ivoire], sizes: [],
  }),

  // ── Accessoires ─────────────────────────────────────────────────────────────
  product({
    id: "p11", slug: "carre-aria", name: "Carré Aria", sub: "Soie, ton champagne",
    categorySlug: "accessoires", collection: "Édition", priceNum: 320,
    tone: "#C9A96E", bg: "#F4ECDB", kind: "scarf", material: "Soie",
    composition: "100% soie, sergé. 90 × 90 cm, roulotté main.",
    colors: [C.champagne, C.ivoire, C.bleuNuit], sizes: [],
  }),
  product({
    id: "p12", slug: "bracelet-iris", name: "Bracelet Iris", sub: "Or jaune 18 ct",
    categorySlug: "accessoires", collection: "Édition", priceNum: 780,
    tone: "#D8B26A", bg: "#F4ECDB", kind: "jewel", material: "Or 18 ct",
    composition: "Or jaune 18 carats, poids 6 g.",
    colors: [C.or], sizes: [],
  }),
];
