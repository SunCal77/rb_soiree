"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

// Carrousel d'images avec fondu enchaîné.
// - mode "auto"  : défile tout seul (utilisé pour les grandes box de la home).
// - mode "hover" : défile au survol, revient à la couverture en sortant
//   (utilisé pour les cartes produit). Les images secondaires ne sont chargées
//   qu'au 1er survol → page initiale légère.
export function Carousel({
  images,
  alt,
  sizes = "(max-width: 768px) 50vw, 25vw",
  mode = "auto",
  fit = "cover",
  bg,
  interval = 3200,
  showDots = false,
  priority = false,
}: {
  images: string[];
  alt: string;
  sizes?: string;
  mode?: "auto" | "hover";
  fit?: "cover" | "contain";
  bg?: string;
  interval?: number;
  showDots?: boolean;
  priority?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  const [activated, setActivated] = useState(mode === "auto");

  const playing = mode === "auto" || (mode === "hover" && hover);

  useEffect(() => {
    if (!playing || images.length <= 1) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % images.length),
      interval,
    );
    return () => clearInterval(id);
  }, [playing, images.length, interval]);

  // En mode survol, on revient à la couverture quand on quitte la carte.
  useEffect(() => {
    if (mode === "hover" && !hover) setIdx(0);
  }, [hover, mode]);

  const list = activated ? images : images.slice(0, 1);

  return (
    <div
      className="ml-carousel"
      style={bg ? { background: bg } : undefined}
      onMouseEnter={
        mode === "hover"
          ? () => {
              setActivated(true);
              setHover(true);
            }
          : undefined
      }
      onMouseLeave={mode === "hover" ? () => setHover(false) : undefined}
    >
      {list.map((src, i) => (
        <Image
          key={src}
          src={asset(src)}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority && i === 0}
          className="ml-carousel__img"
          style={{ objectFit: fit, opacity: i === idx ? 1 : 0 }}
        />
      ))}
      {showDots && images.length > 1 && (
        <div className="ml-carousel__dots">
          {images.map((_, i) => (
            <span
              key={i}
              className={`ml-carousel__dot ${i === idx ? "is-active" : ""}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
