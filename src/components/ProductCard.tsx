"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/data/types";
import { formatEUR } from "@/lib/format";
import { Silhouette } from "./Silhouette";

export function ProductCard({
  product,
  showQuick = true,
}: {
  product: Product;
  showQuick?: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <article
      className={`ml-pcard ${hover ? "is-hover" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link href={`/boutique/${product.slug}`} className="ml-pcard__img" prefetch={false}>
        {product.badge && (
          <span
            className={`ml-badge ${product.badge === "Édition limitée" ? "is-warm" : "is-dark"}`}
          >
            {product.badge}
          </span>
        )}
        <div className="ml-pcard__inner">
          <Silhouette kind={product.kind} tone={product.tone} bg={product.bg} full />
        </div>
        {showQuick && (
          <span className="ml-pcard__quick">Vue rapide</span>
        )}
      </Link>
      <Link href={`/boutique/${product.slug}`} className="ml-pcard__meta" prefetch={false}>
        <div className="ml-pcard__name">{product.name}</div>
        <div className="ml-pcard__sub">{product.sub}</div>
        <div className="ml-pcard__price">{formatEUR(product.priceNum)}</div>
      </Link>
    </article>
  );
}
