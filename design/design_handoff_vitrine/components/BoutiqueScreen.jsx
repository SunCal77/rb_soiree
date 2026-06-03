/* global React, Navbar, PromoBar, Footer, ProductCard, PRODUCTS */

const { useState: useStateBoutique } = React;

function FilterSection({ title, children, openByDefault = true }) {
  const [open, setOpen] = useStateBoutique(openByDefault);
  return (
    <div className="ml-filter">
      <div className="ml-filter__head" onClick={() => setOpen(o => !o)}>
        <span className="ml-filter__title">{title}</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"
             style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 200ms" }}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {open && <div className="ml-filter__list">{children}</div>}
    </div>
  );
}

function BoutiqueScreen() {
  const cat = [...PRODUCTS, ...PRODUCTS.slice(0, 4).map((p, i) => ({ ...p, id: p.id + "-b" + i }))];
  // Build a 12-card grid
  const grid = cat.slice(0, 12);

  return (
    <div className="ml-screen ml-screen--boutique" data-screen-label="02 Boutique">
      <PromoBar/>
      <Navbar cartCount={2} active="robes"/>

      <div className="ml-container">
        <div className="ml-cat-head">
          <p className="ml-cat-head__crumbs">Boutique &nbsp;/&nbsp; <span>Robes</span></p>
          <div className="ml-cat-head__row">
            <h1>Robes.</h1>
            <span className="ml-cat-head__count">38 pièces</span>
          </div>
        </div>

        <div className="ml-cat-toolbar">
          <div className="ml-cat-toolbar__chips">
            <span className="ml-chip">Soie
              <button className="ml-chip__x" aria-label="Retirer">
                <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M6 18L18 6"/></svg>
              </button>
            </span>
            <span className="ml-chip">38
              <button className="ml-chip__x" aria-label="Retirer">
                <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M6 18L18 6"/></svg>
              </button>
            </span>
            <button className="ml-chip" style={{ background: "transparent", color: "var(--fg-secondary)" }}>Tout effacer</button>
          </div>
          <div className="ml-cat-toolbar__sort">
            <span>Trier par</span>
            <select defaultValue="new">
              <option value="new">Nouveautés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="alpha">A → Z</option>
            </select>
          </div>
        </div>

        <div className="ml-cat">
          <aside className="ml-cat__sidebar">
            <FilterSection title="Catégorie">
              <label className="ml-filter__item"><input type="checkbox" defaultChecked/> Robes longues <span className="ml-filter__count">22</span></label>
              <label className="ml-filter__item"><input type="checkbox"/> Robes courtes <span className="ml-filter__count">11</span></label>
              <label className="ml-filter__item"><input type="checkbox"/> Robes de cocktail <span className="ml-filter__count">8</span></label>
              <label className="ml-filter__item"><input type="checkbox"/> Robes de soirée <span className="ml-filter__count">15</span></label>
            </FilterSection>

            <FilterSection title="Matière">
              <label className="ml-filter__item"><input type="checkbox" defaultChecked/> Soie <span className="ml-filter__count">14</span></label>
              <label className="ml-filter__item"><input type="checkbox"/> Crêpe <span className="ml-filter__count">9</span></label>
              <label className="ml-filter__item"><input type="checkbox"/> Velours <span className="ml-filter__count">6</span></label>
              <label className="ml-filter__item"><input type="checkbox"/> Mousseline <span className="ml-filter__count">5</span></label>
              <label className="ml-filter__item"><input type="checkbox"/> Tulle brodé <span className="ml-filter__count">4</span></label>
            </FilterSection>

            <FilterSection title="Couleur">
              <div className="ml-filter__color">
                <span className="ml-swatch is-active" style={{ background: "#1D1D1F" }} title="Noir"/>
                <span className="ml-swatch" style={{ background: "#F4ECDB" }} title="Ivoire"/>
                <span className="ml-swatch" style={{ background: "#C9A96E" }} title="Champagne"/>
                <span className="ml-swatch" style={{ background: "#3A1E2C" }} title="Prune"/>
                <span className="ml-swatch" style={{ background: "#1B2540" }} title="Bleu nuit"/>
                <span className="ml-swatch" style={{ background: "#7A1E27" }} title="Bordeaux"/>
                <span className="ml-swatch" style={{ background: "#2E3A2A" }} title="Vert sombre"/>
                <span className="ml-swatch" style={{ background: "#D4A5A5" }} title="Poudre"/>
              </div>
            </FilterSection>

            <FilterSection title="Taille">
              <div className="ml-size-grid">
                {["32","34","36","38","40","42","44","46"].map((s, i) => (
                  <button key={s} className={`ml-size-chip ${s === "38" ? "is-active" : ""}`}
                          disabled={s === "32" || s === "46"}>{s}</button>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Prix">
              <div className="ml-range">
                <div className="ml-range__bar">
                  <div className="ml-range__fill" style={{ left: "12%", width: "62%" }}/>
                  <div className="ml-range__handle" style={{ left: "12%" }}/>
                  <div className="ml-range__handle" style={{ left: "74%" }}/>
                </div>
                <div className="ml-range__values">
                  <span>€ 320</span>
                  <span>€ 1 690</span>
                </div>
              </div>
            </FilterSection>
          </aside>

          <main>
            <div className="ml-grid">
              {grid.map(p => <ProductCard key={p.id} p={p}/>)}
            </div>

            <div style={{ display: "flex", justifyContent: "center", padding: "48px 0 24px" }}>
              <button className="ml-btn ml-btn--secondary">Charger plus de pièces</button>
            </div>
            <p className="t-caption" style={{ textAlign: "center" }}>12 sur 38 pièces</p>
          </main>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

window.BoutiqueScreen = BoutiqueScreen;
