"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { formatEUR } from "@/lib/format";
import { ProductImage } from "./ProductImage";

export function CartDrawer() {
  const { isOpen, closeCart, resolvedLines, count, subtotal, setQty, removeLine } =
    useCart();

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="ml-scrim"
        style={{ position: "fixed", zIndex: 90 }}
        onClick={closeCart}
      />
      <aside
        className="ml-drawer"
        style={{ position: "fixed", zIndex: 100 }}
        role="dialog"
        aria-label="Panier"
      >
        <header className="ml-drawer__head">
          <h3>
            Votre panier{" "}
            <span className="muted" style={{ fontWeight: 400 }}>({count})</span>
          </h3>
          <button
            className="ml-iconbtn"
            aria-label="Fermer"
            type="button"
            onClick={closeCart}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </header>

        <div className="ml-drawer__body">
          {resolvedLines.length === 0 && (
            <div style={{ padding: "48px 8px", textAlign: "center", color: "var(--fg-secondary)" }}>
              <p style={{ fontSize: 17, color: "#1D1D1F", marginBottom: 6 }}>
                Votre panier est vide.
              </p>
              <p className="t-caption">
                Découvrez les pièces de la saison.
              </p>
              <div style={{ marginTop: 18 }}>
                <Link
                  href="/boutique"
                  className="ml-btn ml-btn--primary"
                  onClick={closeCart}
                >
                  Découvrir la boutique
                </Link>
              </div>
            </div>
          )}

          {resolvedLines.map((l) => (
            <div className="ml-line" key={`${l.productId}-${l.size ?? "_"}`}>
              <div className="ml-line__img">
                <ProductImage product={l.product} sizes="80px" />
              </div>
              <div>
                <div className="ml-line__name">{l.product.name}</div>
                <div className="ml-line__sub">
                  {l.color ?? l.product.sub}
                  {l.size ? ` · Taille ${l.size}` : ""}
                </div>
                <div className="ml-line__qty">
                  <button
                    aria-label="Diminuer"
                    type="button"
                    onClick={() => setQty(l.productId, l.size, l.qty - 1)}
                  >
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <span>{l.qty}</span>
                  <button
                    aria-label="Augmenter"
                    type="button"
                    onClick={() => setQty(l.productId, l.size, l.qty + 1)}
                  >
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="ml-line__price">{formatEUR(l.lineTotal)}</div>
                <button
                  className="ml-line__remove"
                  type="button"
                  onClick={() => removeLine(l.productId, l.size)}
                >
                  Retirer
                </button>
              </div>
            </div>
          ))}
        </div>

        {resolvedLines.length > 0 && (
          <footer className="ml-drawer__foot">
            <div className="ml-drawer__sub">
              <span>Sous-total</span>
              <span>{formatEUR(subtotal)}</span>
            </div>
            <div className="ml-drawer__sub">
              <span>Livraison</span>
              <span className="muted">Calculée à l&apos;étape suivante</span>
            </div>
            <div className="ml-drawer__sub is-total">
              <span>Total</span>
              <span>{formatEUR(subtotal)}</span>
            </div>
            <div style={{ height: 18 }} />
            <Link
              href="/commande"
              className="ml-btn ml-btn--primary ml-btn--lg ml-btn--block"
              onClick={closeCart}
            >
              Passer commande
            </Link>
            <p className="ml-drawer__note">
              Paiement sécurisé · Livraison offerte dès 500 €
            </p>
          </footer>
        )}
      </aside>
    </>
  );
}
