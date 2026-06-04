import Image from "next/image";
import type { Product } from "@/data/types";
import { asset } from "@/lib/asset";
import { Silhouette } from "./Silhouette";

// Rendu d'une photo produit. On passe par `next/image`, qui applique
// automatiquement le base path (GitHub Pages) — donc aucun chemin absolu en dur.
// Si le produit n'a pas (encore) de photo, on retombe sur la silhouette SVG :
// sacs, accessoires, chaussures et cravates continuent de s'afficher sans image
// cassée.
export function ProductImage({
  product,
  index = 0,
  sizes = "(max-width: 768px) 50vw, 25vw",
  priority = false,
}: {
  product: Product;
  index?: number;
  sizes?: string;
  priority?: boolean;
}) {
  const src = product.images[index];
  if (!src) {
    return (
      <Silhouette kind={product.kind} tone={product.tone} bg={product.bg} full />
    );
  }
  return (
    <span
      style={{
        position: "relative",
        display: "block",
        width: "100%",
        height: "100%",
        background: product.bg,
      }}
    >
      <Image
        src={asset(src)}
        alt={product.name}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "contain" }}
      />
    </span>
  );
}
