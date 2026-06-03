/* global React, Navbar, PromoBar, Footer, ProductCard, PRODUCTS, Silhouette */

const { useState: useStateCart } = React;

/* ============================================================
   Screen 4 — Cart drawer (overlaid on a faint catalogue page)
   ============================================================ */
function CartDrawerScreen() {
  const items = [
    { ...PRODUCTS[0], qty: 1, size: "38", color: "Noir" },
    { ...PRODUCTS[8], qty: 1, size: null, color: "Fauve" },
    { ...PRODUCTS[10], qty: 2, size: null, color: "Champagne" },
  ];
  const subtotal = items.reduce((s, it) => s + it.priceNum * it.qty, 0);

  // background — a dimmed boutique page
  const grid = PRODUCTS.slice(0, 8);

  return (
    <div className="ml-screen ml-screen--cart" data-screen-label="04 Panier" style={{ position: "relative" }}>
      <PromoBar/>
      <Navbar cartCount={4} active="boutique"/>
      <div className="ml-container">
        <div className="ml-cat-head">
          <p className="ml-cat-head__crumbs">Boutique &nbsp;/&nbsp; <span>Robes</span></p>
          <div className="ml-cat-head__row">
            <h1>Robes.</h1>
            <span className="ml-cat-head__count">38 pièces</span>
          </div>
        </div>
        <div style={{ padding: "40px 0" }}>
          <div className="ml-grid">
            {grid.map(p => <ProductCard key={p.id} p={p} showQuick={false}/>)}
          </div>
        </div>
      </div>

      {/* overlay */}
      <div className="ml-scrim"/>
      <aside className="ml-drawer">
        <header className="ml-drawer__head">
          <h3>Votre panier <span className="muted" style={{ fontWeight: 400 }}>({items.reduce((s, it) => s + it.qty, 0)})</span></h3>
          <button className="ml-iconbtn" aria-label="Fermer">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg>
          </button>
        </header>

        <div className="ml-drawer__body">
          {items.map(it => (
            <div className="ml-line" key={it.id}>
              <div className="ml-line__img">
                <Silhouette kind={it.kind} tone={it.tone} bg={it.bg} full/>
              </div>
              <div>
                <div className="ml-line__name">{it.name}</div>
                <div className="ml-line__sub">
                  {it.color}{it.size ? ` · Taille ${it.size}` : ""}
                </div>
                <div className="ml-line__qty">
                  <button aria-label="Diminuer">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12h14"/></svg>
                  </button>
                  <span>{it.qty}</span>
                  <button aria-label="Augmenter">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                  </button>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="ml-line__price">{(it.priceNum * it.qty).toLocaleString("fr-FR")}&nbsp;€</div>
                <button className="ml-line__remove">Retirer</button>
              </div>
            </div>
          ))}
        </div>

        <footer className="ml-drawer__foot">
          <div className="ml-drawer__sub">
            <span>Sous-total</span>
            <span>{subtotal.toLocaleString("fr-FR")}&nbsp;€</span>
          </div>
          <div className="ml-drawer__sub">
            <span>Livraison</span>
            <span className="muted">Calculée à l'étape suivante</span>
          </div>
          <div className="ml-drawer__sub is-total">
            <span>Total</span>
            <span>{subtotal.toLocaleString("fr-FR")}&nbsp;€</span>
          </div>
          <div style={{ height: 18 }}/>
          <button className="ml-btn ml-btn--primary ml-btn--lg ml-btn--block">Passer commande</button>
          <p className="ml-drawer__note">Paiement sécurisé · Livraison offerte dès 500 €</p>
        </footer>
      </aside>
    </div>
  );
}

/* ============================================================
   Screen 5 — Checkout
   ============================================================ */
function CheckoutScreen() {
  const items = [
    { ...PRODUCTS[0], qty: 1, size: "38", color: "Noir" },
    { ...PRODUCTS[8], qty: 1, size: null, color: "Fauve" },
    { ...PRODUCTS[10], qty: 2, size: null, color: "Champagne" },
  ];
  const subtotal = items.reduce((s, it) => s + it.priceNum * it.qty, 0);
  const total = subtotal; // pickup = free

  return (
    <div className="ml-screen ml-screen--checkout" data-screen-label="05 Commande">
      <PromoBar/>
      <Navbar cartCount={4} active="boutique"/>

      <div className="ml-container">
        <div style={{ padding: "32px 0 8px" }}>
          <a href="#" className="muted" style={{ fontSize: 13 }}>← Retour au panier</a>
        </div>
        <div style={{ padding: "8px 0 32px" }}>
          <h1 style={{ fontSize: 48, fontWeight: 600, letterSpacing: "-0.022em", color: "#1D1D1F" }}>Commande.</h1>
        </div>

        <div className="ml-checkout">
          <div className="ml-checkout__main">

            {/* Step 1 — Identification — DONE */}
            <section className="ml-step is-done">
              <div className="ml-step__head">
                <div className="ml-step__num">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="ml-step__title">Identification</div>
                </div>
                <a href="#" className="ml-step__edit">Modifier</a>
              </div>
              <div className="ml-step__summary">
                Camille Dufresne · camille.dufresne@exemple.fr · +33 6 12 34 56 78
              </div>
            </section>

            {/* Step 2 — Mode de retrait — ACTIVE */}
            <section className="ml-step is-active">
              <div className="ml-step__head">
                <div className="ml-step__num">2</div>
                <div style={{ flex: 1 }}>
                  <div className="ml-step__title">Mode de retrait</div>
                </div>
              </div>
              <div className="ml-step__body">
                <div className="ml-radio-card is-active">
                  <span className="ml-radio-card__circle"/>
                  <div style={{ flex: 1 }}>
                    <div className="ml-radio-card__title">Retrait en boutique <span className="muted" style={{ fontWeight: 400 }}>· Offert</span></div>
                    <div className="ml-radio-card__sub">
                      Maison Lior — 12 rue d'Aboukir, 75002 Paris<br/>
                      Du mardi au samedi, 11h à 19h. Disponible sous 2 heures.
                    </div>
                  </div>
                </div>
                <div className="ml-radio-card is-disabled">
                  <span className="ml-radio-card__circle"/>
                  <div style={{ flex: 1 }}>
                    <div className="ml-radio-card__title">Livraison à domicile</div>
                    <div className="ml-radio-card__sub">Bientôt disponible. Nous vous préviendrons par courriel.</div>
                  </div>
                </div>
                <div className="ml-radio-card is-disabled">
                  <span className="ml-radio-card__circle"/>
                  <div style={{ flex: 1 }}>
                    <div className="ml-radio-card__title">Point relais</div>
                    <div className="ml-radio-card__sub">Bientôt disponible.</div>
                  </div>
                </div>
                <button className="ml-btn ml-btn--primary ml-btn--lg" style={{ alignSelf: "flex-start", marginTop: 8 }}>Continuer</button>
              </div>
            </section>

            {/* Step 3 — Paiement — INACTIVE preview, but show fields for fidelity */}
            <section className="ml-step">
              <div className="ml-step__head">
                <div className="ml-step__num">3</div>
                <div style={{ flex: 1 }}>
                  <div className="ml-step__title">Paiement</div>
                </div>
              </div>
              <div className="ml-step__body" style={{ opacity: 0.55 }}>
                <div className="ml-radio-card">
                  <span className="ml-radio-card__circle"/>
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
                  <input className="ml-input" placeholder="0000 0000 0000 0000"/>
                </div>
                <div className="ml-field-row">
                  <div className="ml-field">
                    <label>Expiration</label>
                    <input className="ml-input" placeholder="MM / AA"/>
                  </div>
                  <div className="ml-field">
                    <label>Cryptogramme</label>
                    <input className="ml-input" placeholder="CVC"/>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky summary */}
          <aside className="ml-summary">
            <div className="ml-summary__title">Récapitulatif</div>
            <div className="ml-summary__lines">
              {items.map(it => (
                <div key={it.id} className="ml-summary__line">
                  <div className="ml-summary__line__img">
                    <Silhouette kind={it.kind} tone={it.tone} bg={it.bg} full/>
                  </div>
                  <div>
                    <div className="ml-summary__line__name">{it.name}{it.qty > 1 ? ` × ${it.qty}` : ""}</div>
                    <div className="ml-summary__line__sub">{it.color}{it.size ? ` · T. ${it.size}` : ""}</div>
                  </div>
                  <div className="ml-summary__line__price">{(it.priceNum * it.qty).toLocaleString("fr-FR")}&nbsp;€</div>
                </div>
              ))}
            </div>
            <div className="ml-summary__row">
              <span>Sous-total</span>
              <span>{subtotal.toLocaleString("fr-FR")}&nbsp;€</span>
            </div>
            <div className="ml-summary__row">
              <span>Retrait en boutique</span>
              <span>Offert</span>
            </div>
            <div className="ml-summary__row is-total">
              <span>Total</span>
              <span>{total.toLocaleString("fr-FR")}&nbsp;€</span>
            </div>
            <div className="ml-summary__row" style={{ paddingTop: 8 }}>
              <span className="muted">TVA incluse · Paiement sécurisé</span>
            </div>
          </aside>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

/* ============================================================
   Screen 6 — Confirmation
   ============================================================ */
function ConfirmationScreen() {
  const items = [
    { ...PRODUCTS[0], qty: 1, size: "38", color: "Noir" },
    { ...PRODUCTS[8], qty: 1, size: null, color: "Fauve" },
    { ...PRODUCTS[10], qty: 2, size: null, color: "Champagne" },
  ];
  const total = items.reduce((s, it) => s + it.priceNum * it.qty, 0);

  return (
    <div className="ml-screen ml-screen--confirm" data-screen-label="06 Confirmation">
      <PromoBar/>
      <Navbar cartCount={0} active="boutique"/>

      <div className="ml-confirm">
        <div className="ml-confirm__check" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h1>Commande confirmée.</h1>
        <p className="ml-confirm__num">Commande N° ML-2026-04812 · Camille D.</p>
        <p style={{ fontSize: 17, color: "var(--fg-secondary)", marginTop: 18, lineHeight: 1.5, maxWidth: 520, marginInline: "auto" }}>
          Merci de votre confiance. Vous recevrez un courriel dès que votre commande sera prête à retirer.
        </p>

        {/* Stepper */}
        <div className="ml-stepper">
          <div className="ml-stepper__line"/>
          <div className="ml-stepper__line-fill" style={{ left: "12.5%", width: "37.5%" }}/>
          <div className="ml-stepper__step is-done">
            <div className="ml-stepper__dot">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
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

        {/* Pickup panel */}
        <div className="ml-confirm__panel">
          <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
            <h3>Retrait en boutique</h3>
            <span className="ml-chip" style={{ background: "#1D1D1F", color: "#fff" }}>Apportez ce numéro</span>
          </div>
          <div className="ml-confirm__pickup">
            <div className="ml-confirm__pickup__block">
              <span className="ml-confirm__pickup__label">Adresse</span>
              <span className="ml-confirm__pickup__value">
                Maison Lior<br/>
                12 rue d'Aboukir<br/>
                75002 Paris
              </span>
            </div>
            <div className="ml-confirm__pickup__block">
              <span className="ml-confirm__pickup__label">Horaires</span>
              <span className="ml-confirm__pickup__value">
                Mardi → samedi · 11h00 → 19h00<br/>
                Fermé dimanche et lundi
              </span>
            </div>
            <div className="ml-confirm__pickup__block">
              <span className="ml-confirm__pickup__label">Disponibilité</span>
              <span className="ml-confirm__pickup__value">
                Estimée pour <b>vendredi 8 mai</b><br/>
                <span className="muted" style={{ fontSize: 13 }}>Confirmation par courriel sous 24h.</span>
              </span>
            </div>
            <div className="ml-confirm__pickup__block">
              <span className="ml-confirm__pickup__label">À présenter</span>
              <span className="ml-confirm__pickup__value">
                Numéro de commande<br/>
                Pièce d'identité au nom du client
              </span>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="ml-confirm__panel">
          <h3>Articles ({items.reduce((s, it) => s + it.qty, 0)})</h3>
          <div className="ml-confirm__items">
            {items.map(it => (
              <div className="ml-confirm__item" key={it.id}>
                <div className="ml-confirm__item__img">
                  <Silhouette kind={it.kind} tone={it.tone} bg={it.bg} full/>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#1D1D1F" }}>{it.name}{it.qty > 1 ? ` × ${it.qty}` : ""}</div>
                  <div className="muted" style={{ fontSize: 13, marginTop: 2 }}>{it.color}{it.size ? ` · Taille ${it.size}` : ""}</div>
                </div>
                <div style={{ fontSize: 14, fontVariantNumeric: "tabular-nums" }}>{(it.priceNum * it.qty).toLocaleString("fr-FR")}&nbsp;€</div>
              </div>
            ))}
          </div>
          <div className="ml-summary__row is-total" style={{ marginTop: 4 }}>
            <span>Total payé</span>
            <span>{total.toLocaleString("fr-FR")}&nbsp;€</span>
          </div>
        </div>

        <div className="row" style={{ justifyContent: "center", gap: 12, marginTop: 16 }}>
          <button className="ml-btn ml-btn--primary ml-btn--lg">Retour à la boutique</button>
          <a href="#" className="ml-link-blue" style={{ fontSize: 15 }}>Suivre ma commande ›</a>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

window.CartDrawerScreen = CartDrawerScreen;
window.CheckoutScreen = CheckoutScreen;
window.ConfirmationScreen = ConfirmationScreen;
