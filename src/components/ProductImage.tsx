"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/types";
import { asset } from "@/lib/asset";
import { Silhouette } from "./Silhouette";

// Rendu d'une photo produit. On passe par `next/image`, et le base path
// (GitHub Pages) est appliqué via asset() — aucun chemin absolu en dur.
//
// Tolérant : si le produit n'a pas (encore) de photo, OU si le fichier est
// absent (404), on retombe sur la silhouette SVG. Conséquence pratique : on
// peut déclarer `images:` AVANT que les fichiers existent — chaque visuel
// s'affiche dès qu'il est déposé, sans image cassée entre-temps.
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
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) {
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
        onError={() => setFailedSrc(src)}
      />
    </span>
  );
}
