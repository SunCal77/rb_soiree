"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PromoBar } from "@/components/PromoBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductImage } from "@/components/ProductImage";
import { useCart } from "@/lib/cart-context";
import { formatEUR } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const { resolvedLines, subtotal, clear } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(2);
  const [identity, setIdentity] = useState({
    firstName: "Camille",
    lastName: "Dufresne",
    email: "camille.dufresne@exemple.fr",
    phone: "+33 6 12 34 56 78",
  });

  const total = subtotal; // pickup is free

  function handlePay() {
    // Stub: in production this calls /api/checkout to create a Stripe Checkout
    // session, then redirects to its URL. For now we simulate success.
    const orderId = "ML-2026-" + String(Math.floor(Math.random() * 99999)).padStart(5, "0");
    sessionStorage.setItem(
      "ml.last-order",
      JSON.stringify({
        id: orderId,
        firstName: identity.firstName,
        lines: resolvedLines.map((l) => ({
          productId: l.productId,
          name: l.product.name,
          sub: l.product.sub,
          kind: l.product.kind,
          tone: l.product.tone,
          bg: l.product.bg,
          image: l.product.images[0] ?? null,
          color: l.color,
          size: l.size,
          qty: l.qty,
          unitPrice: l.product.priceNum,
        })),
        total,
      }),
    );
    clear();
    router.push("/commande/confirmation");
  }

  return (
    <div className="ml-screen ml-screen--checkout" data-screen-label="05 Commande">
      <PromoBar />
      <Navbar active="boutique" />

      <div className="ml-container">
        <div style={{ padding: "32px 0 8px" }}>
          <Link href="/boutique" className="muted" style={{ fontSize: 13 }}>
            ← Retour au panier
          </Link>
        </div>
        <div style={{ padding: "8px 0 32px" }}>
          <h1 style={{ fontSize: 48, fontWeight: 600, letterSpacing: "-0.022em", color: "#1D1D1F" }}>
            Commande.
          </h1>
        </div>

        <div className="ml-checkout">
          <div className="ml-checkout__main">
            <section className={`ml-step ${step > 1 ? "is-done" : step === 1 ? "is-active" : ""}`}>
              <div className="ml-step__head" onClick={() => setStep(1)}>
                <div className="ml-step__num">
                  {step > 1 ? (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    "1"
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="ml-step__title">Identification</div>
                </div>
                {step > 1 && (
                  <a className="ml-step__edit" onClick={(e) => { e.stopPropagation(); setStep(1); }}>
                    Modifier
                  </a>
                )}
              </div>
              {step === 1 && (
                <div className="ml-step__body">
                  <div className="ml-field-row">
                    <div className="ml-field">
                      <label>Prénom</label>
                      <input className="ml-input" value={identity.firstName} onChange={(e) => setIdentity({ ...identity, firstName: e.target.value })} />
                    </div>
                    <div className="ml-field">
                      <label>Nom</label>
                      <input className="ml-input" value={identity.lastName} onChange={(e) => setIdentity({ ...identity, lastName: e.target.value })} />
                    </div>
                  </div>
                  <div className="ml-field">
                    <label>Email</label>
                    <input className="ml-input" type="email" value={identity.email} onChange={(e) => setIdentity({ ...identity, email: e.target.value })} />
                  </div>
                  <div className="ml-field">
                    <label>Téléphone</label>
                    <input className="ml-input" value={identity.phone} onChange={(e) => setIdentity({ ...identity, phone: e.target.value })} />
                  </div>
                  <button className="ml-btn ml-btn--primary ml-btn--lg" type="button" style={{ alignSelf: "flex-start" }} onClick={() => setStep(2)}>
                    Continuer
                  </button>
                </div>
              )}
              {step > 1 && (
                <div className="ml-step__summary">
                  {identity.firstName} {identity.lastName} · {identity.email} · {identity.phone}
                </div>
              )}
            </section>

            <section className={`ml-step ${step > 2 ? "is-done" : step === 2 ? "is-active" : ""}`}>
              <div className="ml-step__head" onClick={() => setStep(2)}>
                <div className="ml-step__num">
                  {step > 2 ? (
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    "2"
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="ml-step__title">Mode de retrait</div>
                </div>
              </div>
              {step === 2 && (
                <div className="ml-step__body">
                  <div className="ml-radio-card is-active">
                    <span className="ml-radio-card__circle" />
                    <div style={{ flex: 1 }}>
                      <div className="ml-radio-card__title">
                        Retrait en boutique{" "}
                        <span className="muted" style={{ fontWeight: 400 }}>· Offert</span>
                      </div>
                      <div className="ml-radio-card__sub">
                        Maison Lior — 12 rue d&apos;Aboukir, 75002 Paris
                        <br />
                        Du mardi au samedi, 11h à 19h. Disponible sous 2 heures.
                      </div>
                    </div>
                  </div>
                  <div className="ml-radio-card is-disabled">
                    <span className="ml-radio-card__circle" />
                    <div style={{ flex: 1 }}>
                      <div className="ml-radio-card__title">Livraison à domicile</div>
                      <div className="ml-radio-card__sub">
                        Bientôt disponible. Nous vous préviendrons par courriel.
                      </div>
                    </div>
                  </div>
                  <div className="ml-radio-card is-disabled">
                    <span className="ml-radio-card__circle" />
                    <div style={{ flex: 1 }}>
                      <div className="ml-radio-card__title">Point relais</div>
                      <div className="ml-radio-card__sub">Bientôt disponible.</div>
                    </div>
                  </div>
                  <button
                    className="ml-btn ml-btn--primary ml-btn--lg"
                    type="button"
                    style={{ alignSelf: "flex-start", marginTop: 8 }}
                    onClick={() => setStep(3)}
                  >
                    Continuer
                  </button>
                </div>
              )}
              {step > 2 && (
                <div className="ml-step__summary">
                  Retrait en boutique — 12 rue d&apos;Aboukir, 75002 Paris (offert)
                </div>
              )}
            </section>

            <section className={`ml-step ${step === 3 ? "is-active" : ""}`}>
              <div className="ml-step__head" onClick={() => setStep(3)}>
                <div className="ml-step__num">3</div>
                <div style={{ flex: 1 }}>
                  <div className="ml-step__title">Paiement</div>
                </div>
              </div>
              <div className="ml-step__body" style={{ opacity: step === 3 ? 1 : 0.55 }}>
                <div className="ml-radio-card is-active">
                  <span className="ml-radio-card__circle" />
                  <div style={{ flex: 1 }}>
                    <div className="ml-radio-card__title">Carte bancaire</div>
                    <div className="ml-radio-card__sub">Visa · Mastercard · Amex</div>
                  </div>
                  <div className="row" style={{ gap: 6 }}>
                    <span className="ml-chip" style={{ background: "#fff", border: "1px solid var(--border)" }}>VISA</span>
                    <span className="ml-chip" style={{ background: "#fff", border: "1px solid var(--border)" }}>MC</span>
                  </div>
                </div>
                <div className="ml-field">
                  <label>Numéro de carte</label>
                  <input className="ml-input" placeholder="0000 0000 0000 0000" disabled={step !== 3} />
                </div>
                <div className="ml-field-row">
                  <div className="ml-field">
                    <label>Expiration</label>
                    <input className="ml-input" placeholder="MM / AA" disabled={step !== 3} />
                  </div>
                  <div className="ml-field">
                    <label>Cryptogramme</label>
                    <input className="ml-input" placeholder="CVC" disabled={step !== 3} />
                  </div>
                </div>
                {step === 3 && (
                  <button
                    className="ml-btn ml-btn--primary ml-btn--lg ml-btn--block"
                    type="button"
                    onClick={handlePay}
                    disabled={resolvedLines.length === 0}
                    style={{ marginTop: 8 }}
                  >
                    Régler {formatEUR(total)}
                  </button>
                )}
              </div>
            </section>
          </div>

          <aside className="ml-summary">
            <div className="ml-summary__title">Récapitulatif</div>
            <div className="ml-summary__lines">
              {resolvedLines.length === 0 && (
                <p className="muted" style={{ fontSize: 13 }}>
                  Votre panier est vide.{" "}
                  <Link href="/boutique" className="ml-link-blue">
                    Découvrir
                  </Link>
                  .
                </p>
              )}
              {resolvedLines.map((l) => (
                <div key={`${l.productId}-${l.size ?? "_"}`} className="ml-summary__line">
                  <div className="ml-summary__line__img">
                    <ProductImage product={l.product} sizes="60px" />
                  </div>
                  <div>
                    <div className="ml-summary__line__name">
                      {l.product.name}
                      {l.qty > 1 ? ` × ${l.qty}` : ""}
                    </div>
                    <div className="ml-summary__line__sub">
                      {l.color ?? l.product.sub}
                      {l.size ? ` · T. ${l.size}` : ""}
                    </div>
                  </div>
                  <div className="ml-summary__line__price">{formatEUR(l.lineTotal)}</div>
                </div>
              ))}
            </div>
            <div className="ml-summary__row">
              <span>Sous-total</span>
              <span>{formatEUR(subtotal)}</span>
            </div>
            <div className="ml-summary__row">
              <span>Retrait en boutique</span>
              <span>Offert</span>
            </div>
            <div className="ml-summary__row is-total">
              <span>Total</span>
              <span>{formatEUR(total)}</span>
            </div>
            <div className="ml-summary__row" style={{ paddingTop: 8 }}>
              <span className="muted">TVA incluse · Paiement sécurisé</span>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
