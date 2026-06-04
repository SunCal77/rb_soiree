"use client";

import { useState } from "react";
import type { Product } from "@/data/types";
import { useCart } from "@/lib/cart-context";
import { getCategory, isSizeAvailable, stockFor } from "@/lib/catalog";
import { formatEUR } from "@/lib/format";
import { Silhouette } from "./Silhouette";
import { ProductImage } from "./ProductImage";

function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`ml-acc ${open ? "is-open" : ""}`}>
      <div className="ml-acc__head" onClick={() => setOpen((o) => !o)}>
        <span>{title}</span>
        <svg className="ml-acc__chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="ml-acc__body">{children}</div>
    </div>
  );
}

export function PDPInteractive({ product }: { product: Product }) {
  const { addLine, openCart } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(0);

  const colors = product.colors;
  const colorName = colors[color]?.name ?? null;

  // Default to the first size that is in stock for the selected colour.
  const defaultSize =
    product.sizes.find((s) => isSizeAvailable(product, s, colorName)) ??
    product.sizes[0] ??
    null;
  const [size, setSize] = useState<string | null>(defaultSize);

  const category = getCategory(product.categorySlug);
  // Gallery placeholders — same silhouette, varied tones from the colour range.
  const tones = colors.length ? colors.map((c) => c.hex) : [product.tone];

  // Galerie : vraies photos si disponibles, sinon silhouettes placeholder.
  const hasPhotos = product.images.length > 0;
  const slideCount = hasPhotos ? product.images.length : 5;
  const go = (dir: number) =>
    setActiveImg((i) => (i + dir + slideCount) % slideCount);
  const [touchX, setTouchX] = useState<number | null>(null);
  function onTouchEnd(endX: number) {
    if (touchX === null) return;
    const dx = endX - touchX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); // swipe gauche → suivante
    setTouchX(null);
  }

  // Real stock for the current attribute selection (taille × couleur).
  const selStock = stockFor(product, {
    color: colorName,
    ...(product.sizes.length ? { size } : {}),
  });
  const soldOut = selStock <= 0;

  function handleAdd() {
    if (soldOut) return;
    addLine({
      productId: product.id,
      size,
      color: colorName,
      qty: 1,
    });
    openCart();
  }

  return (
    <div className="ml-pdp">
      <div className="ml-pdp__gallery">
        <div className="ml-pdp__thumbs">
          {Array.from({ length: slideCount }).map((_, i) => (
            <div
              key={i}
              className={`ml-pdp__thumb ${activeImg === i ? "is-active" : ""}`}
              onClick={() => setActiveImg(i)}
            >
              {hasPhotos ? (
                <ProductImage product={product} index={i} sizes="80px" />
              ) : (
                <Silhouette
                  kind={product.kind}
                  tone={tones[i % tones.length]}
                  bg={product.bg}
                  full
                />
              )}
            </div>
          ))}
        </div>
        <div
          className="ml-pdp__main"
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
        >
          {hasPhotos ? (
            <ProductImage
              product={product}
              index={activeImg}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <Silhouette
              kind={product.kind}
              tone={tones[activeImg % tones.length]}
              bg={product.bg}
              full
            />
          )}
          <span className="ml-badge is-light" style={{ top: 18, left: 18 }}>
            Édition numérotée · 12/40
          </span>

          {slideCount > 1 && (
            <>
              <button
                type="button"
                aria-label="Photo précédente"
                className="ml-gallery-nav ml-gallery-nav--prev"
                onClick={() => go(-1)}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Photo suivante"
                className="ml-gallery-nav ml-gallery-nav--next"
                onClick={() => go(1)}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
              <div className="ml-gallery-dots">
                {Array.from({ length: slideCount }).map((_, i) => (
                  <span
                    key={i}
                    className={`ml-gallery-dot ${activeImg === i ? "is-active" : ""}`}
                    onClick={() => setActiveImg(i)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="ml-pdp__info">
        <p className="ml-pdp__crumbs">
          Boutique &nbsp;/&nbsp; {category?.label ?? "Boutique"} &nbsp;/&nbsp;{" "}
          <span style={{ color: "#1D1D1F" }}>{product.name}</span>
        </p>
        <div>
          <h1 className="ml-pdp__title">{product.name}</h1>
          <p className="ml-pdp__sub">
            {product.sub}. Pièce confectionnée en France.
          </p>
        </div>
        <p className="ml-pdp__price">{formatEUR(product.priceNum)}</p>

        {colors.length > 0 && (
          <div className="ml-pdp__group">
            <div className="ml-pdp__group__head">
              <span style={{ fontWeight: 500, color: "#1D1D1F" }}>
                Couleur{" "}
                <span className="muted" style={{ fontWeight: 400 }}>
                  · {colorName}
                </span>
              </span>
            </div>
            <div className="ml-pdp__colors">
              {colors.map((c, i) => (
                <span
                  key={c.name}
                  className={`ml-pdp__color ${color === i ? "is-active" : ""}`}
                  style={{ background: c.hex }}
                  onClick={() => setColor(i)}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        )}

        {product.sizes.length > 0 && (
          <div className="ml-pdp__group">
            <div className="ml-pdp__group__head">
              <span style={{ fontWeight: 500, color: "#1D1D1F" }}>Taille</span>
              <a href="#">Guide des tailles</a>
            </div>
            <div className="ml-pdp__sizes">
              {product.sizes.map((s) => {
                const available = isSizeAvailable(product, s, colorName);
                return (
                  <button
                    key={s}
                    type="button"
                    className={`ml-pdp__size ${size === s ? "is-active" : ""}`}
                    disabled={!available}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <p className="t-caption" style={{ marginTop: 4 }}>
              {soldOut
                ? `Épuisé${size ? ` en taille ${size}` : ""} dans ce coloris.`
                : `Stock limité — il reste ${selStock} exemplaire${
                    selStock > 1 ? "s" : ""
                  }${size ? ` en ${size}` : ""}.`}
            </p>
          </div>
        )}

        <div className="ml-pdp__pickup">
          <span className="ml-pdp__pickup__icon">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-6 9 6v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
              <path d="M9 21V12h6v9" />
            </svg>
          </span>
          <div>
            <div style={{ fontWeight: 500, color: "#1D1D1F" }}>
              Disponible — 12 rue d&apos;Aboukir, Paris 2ᵉ
            </div>
            <div className="muted" style={{ fontSize: 13 }}>
              Réservez en ligne, retrait sous 2 heures du mardi au samedi.
            </div>
          </div>
        </div>

        <div className="ml-pdp__cta">
          <button
            type="button"
            className="ml-btn ml-btn--primary ml-btn--lg ml-btn--block"
            onClick={handleAdd}
            disabled={soldOut}
          >
            {soldOut ? "Épuisé" : "Ajouter au panier"}
          </button>
          <a
            href="#"
            className="ml-link-blue"
            style={{ fontSize: 14, textAlign: "center", padding: "8px 0" }}
          >
            Réserver et retirer en magasin ›
          </a>
        </div>

        <div style={{ marginTop: 8 }}>
          <Accordion title="Description & matière" defaultOpen>
            <p>{product.description}</p>
            <p style={{ marginTop: 10 }}>Composition : {product.composition}</p>
          </Accordion>
          <Accordion title="Livraison & retours">
            <p>Livraison offerte dès 500 € en France. Expédition sous 24h ouvrées.</p>
            <p style={{ marginTop: 10 }}>
              Retour gratuit sous 30 jours, pièces non portées et étiquette d&apos;origine. Possibilité de retour en magasin.
            </p>
          </Accordion>
          <Accordion title="Entretien">
            <p>{product.care}</p>
          </Accordion>
          <Accordion title="L&apos;atelier">
            <p>Patronage et confection à Paris, rue d&apos;Aboukir. Numérotée 12/40 — édition limitée.</p>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
