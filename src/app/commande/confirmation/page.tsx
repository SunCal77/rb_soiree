"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PromoBar } from "@/components/PromoBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Silhouette } from "@/components/Silhouette";
import { formatEUR } from "@/lib/format";
import type { ProductKind } from "@/data/types";

type SavedOrder = {
  id: string;
  firstName: string;
  total: number;
  lines: Array<{
    productId: string;
    name: string;
    sub: string;
    kind: ProductKind;
    tone: string;
    bg: string;
    color: string | null;
    size: string | null;
    qty: number;
    unitPrice: number;
  }>;
};

const FALLBACK: SavedOrder = {
  id: "ML-2026-04812",
  firstName: "Camille",
  total: 4310,
  lines: [
    { productId: "p1",  name: "Robe Lior",   sub: "Soie sablée, noir",   kind: "dress", tone: "#1D1D1F", bg: "#EFEAE0", color: "Noir",       size: "38", qty: 1, unitPrice: 1290 },
    { productId: "p9",  name: "Sac Aurore",  sub: "Cuir grainé, fauve",  kind: "bag",   tone: "#A78866", bg: "#F2EAE0", color: "Fauve",      size: null, qty: 1, unitPrice:  980 },
    { productId: "p11", name: "Carré Aria",  sub: "Soie, ton champagne", kind: "scarf", tone: "#C9A96E", bg: "#F4ECDB", color: "Champagne",  size: null, qty: 2, unitPrice:  320 },
  ],
};

export default function ConfirmationPage() {
  const [order, setOrder] = useState<SavedOrder>(FALLBACK);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("ml.last-order");
      if (raw) setOrder(JSON.parse(raw) as SavedOrder);
    } catch {}
  }, []);

  const itemCount = order.lines.reduce((s, l) => s + l.qty, 0);

  return (
    <div className="ml-screen ml-screen--confirm" data-screen-label="06 Confirmation">
      <PromoBar />
      <Navbar active="boutique" />

      <div className="ml-confirm">
        <div className="ml-confirm__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1>Commande confirmée.</h1>
        <p className="ml-confirm__num">
          Commande N° {order.id} · {order.firstName} {order.firstName ? "" : ""}
        </p>
        <p
          style={{
            fontSize: 17,
            color: "var(--fg-secondary)",
            marginTop: 18,
            lineHeight: 1.5,
            maxWidth: 520,
            marginInline: "auto",
          }}
        >
          Merci de votre confiance. Vous recevrez un courriel dès que votre commande sera prête à retirer.
        </p>

        <div className="ml-stepper">
          <div className="ml-stepper__line" />
          <div className="ml-stepper__line-fill" style={{ left: "12.5%", width: "37.5%" }} />
          <div className="ml-stepper__step is-done">
            <div className="ml-stepper__dot">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="ml-stepper__label">Confirmée</div>
          </div>
          <div className="ml-stepper__step is-current">
            <div className="ml-stepper__dot" style={{ fontSize: 11 }}>2</div>
            <div className="ml-stepper__label">En préparation</div>
          </div>
          <div className="ml-stepper__step">
            <div className="ml-stepper__dot" style={{ fontSize: 11 }}>3</div>
            <div className="ml-stepper__label">Prête à retirer</div>
          </div>
          <div className="ml-stepper__step">
            <div className="ml-stepper__dot" style={{ fontSize: 11 }}>4</div>
            <div className="ml-stepper__label">Retirée</div>
          </div>
        </div>

        <div className="ml-confirm__panel">
          <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
            <h3>Retrait en boutique</h3>
            <span className="ml-chip" style={{ background: "#1D1D1F", color: "#fff" }}>
              Apportez ce numéro
            </span>
          </div>
          <div className="ml-confirm__pickup">
            <div className="ml-confirm__pickup__block">
              <span className="ml-confirm__pickup__label">Adresse</span>
              <span className="ml-confirm__pickup__value">
                Maison Lior
                <br />
                12 rue d&apos;Aboukir
                <br />
                75002 Paris
              </span>
            </div>
            <div className="ml-confirm__pickup__block">
              <span className="ml-confirm__pickup__label">Horaires</span>
              <span className="ml-confirm__pickup__value">
                Mardi → samedi · 11h00 → 19h00
                <br />
                Fermé dimanche et lundi
              </span>
            </div>
            <div className="ml-confirm__pickup__block">
              <span className="ml-confirm__pickup__label">Disponibilité</span>
              <span className="ml-confirm__pickup__value">
                Estimée pour <b>vendredi 8 mai</b>
                <br />
                <span className="muted" style={{ fontSize: 13 }}>
                  Confirmation par courriel sous 24h.
                </span>
              </span>
            </div>
            <div className="ml-confirm__pickup__block">
              <span className="ml-confirm__pickup__label">À présenter</span>
              <span className="ml-confirm__pickup__value">
                Numéro de commande
                <br />
                Pièce d&apos;identité au nom du client
              </span>
            </div>
          </div>
        </div>

        <div className="ml-confirm__panel">
          <h3>Articles ({itemCount})</h3>
          <div className="ml-confirm__items">
            {order.lines.map((l, i) => (
              <div className="ml-confirm__item" key={`${l.productId}-${i}`}>
                <div className="ml-confirm__item__img">
                  <Silhouette kind={l.kind} tone={l.tone} bg={l.bg} full />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#1D1D1F" }}>
                    {l.name}
                    {l.qty > 1 ? ` × ${l.qty}` : ""}
                  </div>
                  <div className="muted" style={{ fontSize: 13, marginTop: 2 }}>
                    {l.color ?? l.sub}
                    {l.size ? ` · Taille ${l.size}` : ""}
                  </div>
                </div>
                <div style={{ fontSize: 14, fontVariantNumeric: "tabular-nums" }}>
                  {formatEUR(l.unitPrice * l.qty)}
                </div>
              </div>
            ))}
          </div>
          <div className="ml-summary__row is-total" style={{ marginTop: 4 }}>
            <span>Total payé</span>
            <span>{formatEUR(order.total)}</span>
          </div>
        </div>

        <div className="row" style={{ justifyContent: "center", gap: 12, marginTop: 16 }}>
          <Link href="/boutique" className="ml-btn ml-btn--primary ml-btn--lg">
            Retour à la boutique
          </Link>
          <a href="#" className="ml-link-blue" style={{ fontSize: 15 }}>
            Suivre ma commande ›
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
