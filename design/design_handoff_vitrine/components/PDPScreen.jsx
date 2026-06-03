/* global React, Navbar, PromoBar, Footer, ProductCard, PRODUCTS, Silhouette */

const { useState: useStatePDP } = React;

function Accordion({ title, defaultOpen = false, children }) {
  const [open, setOpen] = useStatePDP(defaultOpen);
  return (
    <div className={`ml-acc ${open ? "is-open" : ""}`}>
      <div className="ml-acc__head" onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        <svg className="ml-acc__chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="ml-acc__body">{children}</div>
    </div>
  );
}

function PDPScreen() {
  const product = PRODUCTS[0]; // Robe Lior
  const [activeImg, setActiveImg] = useStatePDP(0);
  const [size, setSize] = useStatePDP("38");
  const [color, setColor] = useStatePDP(0);
  const colors = [
    { name: "Noir",      val: "#1D1D1F" },
    { name: "Ivoire",    val: "#EDE6D6" },
    { name: "Bleu nuit", val: "#1B2540" },
  ];
  const tones = [product.tone, "#2A2A2C", "#3A1E2C", "#1B2540"];
  const cross = [PRODUCTS[1], PRODUCTS[2], PRODUCTS[5], PRODUCTS[8]];

  return (
    <div className="ml-screen ml-screen--pdp" data-screen-label="03 Fiche produit">
      <PromoBar/>
      <Navbar cartCount={2} active="robes"/>

      <div className="ml-container">
        <div className="ml-pdp">
          {/* Gallery */}
          <div className="ml-pdp__gallery">
            <div className="ml-pdp__thumbs">
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i}
                     className={`ml-pdp__thumb ${activeImg === i ? "is-active" : ""}`}
                     onClick={() => setActiveImg(i)}>
                  <Silhouette kind={i % 2 === 0 ? "dress" : "dress-short"} tone={tones[i % tones.length]} bg={product.bg} full/>
                </div>
              ))}
            </div>
            <div className="ml-pdp__main">
              <Silhouette kind={activeImg % 2 === 0 ? "dress" : "dress-short"} tone={tones[activeImg % tones.length]} bg={product.bg} full/>
              <span className="ml-badge is-light" style={{ top: 18, left: 18 }}>Édition numérotée · 12/40</span>
            </div>
          </div>

          {/* Info */}
          <div className="ml-pdp__info">
            <p className="ml-pdp__crumbs">Boutique &nbsp;/&nbsp; Robes &nbsp;/&nbsp; <span style={{ color: "#1D1D1F" }}>Robe Lior</span></p>
            <div>
              <h1 className="ml-pdp__title">Robe Lior</h1>
              <p className="ml-pdp__sub">Robe longue en soie sablée. Coupe droite, ouverture dos. Fabriquée en France.</p>
            </div>
            <p className="ml-pdp__price">1 290 €</p>

            <div className="ml-pdp__group">
              <div className="ml-pdp__group__head">
                <span style={{ fontWeight: 500, color: "#1D1D1F" }}>Couleur <span className="muted" style={{ fontWeight: 400 }}>· {colors[color].name}</span></span>
              </div>
              <div className="ml-pdp__colors">
                {colors.map((c, i) => (
                  <span key={c.name}
                        className={`ml-pdp__color ${color === i ? "is-active" : ""}`}
                        style={{ background: c.val }}
                        onClick={() => setColor(i)}
                        title={c.name}/>
                ))}
              </div>
            </div>

            <div className="ml-pdp__group">
              <div className="ml-pdp__group__head">
                <span style={{ fontWeight: 500, color: "#1D1D1F" }}>Taille</span>
                <a href="#">Guide des tailles</a>
              </div>
              <div className="ml-pdp__sizes">
                {["34","36","38","40","42","44"].map(s => (
                  <button key={s}
                          className={`ml-pdp__size ${size === s ? "is-active" : ""}`}
                          disabled={s === "44"}
                          onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
              <p className="t-caption" style={{ marginTop: 4 }}>Stock limité — il reste 3 exemplaires en {size}.</p>
            </div>

            <div className="ml-pdp__pickup">
              <span className="ml-pdp__pickup__icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-6 9 6v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21V12h6v9"/>
                </svg>
              </span>
              <div>
                <div style={{ fontWeight: 500, color: "#1D1D1F" }}>Disponible — 12 rue d'Aboukir, Paris 2ᵉ</div>
                <div className="muted" style={{ fontSize: 13 }}>Réservez en ligne, retrait sous 2 heures du mardi au samedi.</div>
              </div>
            </div>

            <div className="ml-pdp__cta">
              <button className="ml-btn ml-btn--primary ml-btn--lg ml-btn--block">Ajouter au panier</button>
              <a href="#" className="ml-link-blue" style={{ fontSize: 14, textAlign: "center", padding: "8px 0" }}>
                Réserver et retirer en magasin ›
              </a>
            </div>

            <div style={{ marginTop: 8 }}>
              <Accordion title="Description &amp; matière" defaultOpen>
                <p>Robe longue, coupe droite ajustée à la taille. Encolure ras-de-cou, bretelles fines, ouverture dos boutonnée. Doublure intégrale.</p>
                <p style={{ marginTop: 10 }}>Composition&nbsp;: 100% soie sablée. Doublure&nbsp;: 100% cupro. Tissu tissé à Côme, Italie.</p>
              </Accordion>
              <Accordion title="Livraison &amp; retours">
                <p>Livraison offerte dès 500 € en France. Expédition sous 24h ouvrées.</p>
                <p style={{ marginTop: 10 }}>Retour gratuit sous 30 jours, pièces non portées et étiquette d'origine. Possibilité de retour en magasin.</p>
              </Accordion>
              <Accordion title="Entretien">
                <p>Nettoyage à sec uniquement. Conservez la pièce dans la housse fournie.</p>
              </Accordion>
              <Accordion title="L'atelier">
                <p>Patronage et confection à Paris, rue d'Aboukir. Numérotée 12/40 — édition limitée.</p>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Cross-sell */}
        <section className="ml-section ml-section--tight" style={{ borderTop: "1px solid var(--border)", padding: "72px 0" }}>
          <header className="ml-section__head ml-section__head--row">
            <div className="col" style={{ gap: 6 }}>
              <p className="t-eyebrow">Vous aimerez aussi</p>
              <h2 className="t-h1" style={{ fontSize: 40 }}>Pour aller avec.</h2>
            </div>
            <a href="#" className="ml-link-blue" style={{ fontSize: 15 }}>Voir tout</a>
          </header>
          <div className="ml-grid">
            {cross.map(p => <ProductCard key={p.id} p={p}/>)}
          </div>
        </section>
      </div>

      <Footer/>
    </div>
  );
}

window.PDPScreen = PDPScreen;
