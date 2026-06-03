/* global React, Silhouette, PRODUCTS, AdmIcon, AdminSidebar, AdminMHeader, AdminMBottom, StatusBadge, ADM_ORDERS */

const Ic2 = AdmIcon;

/* ========================================================================
   ÉCRAN 4 — ÉDITION PRODUIT
   ======================================================================== */
function Section({ title, action, children, defaultOpen = true, optional }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="adm-section" style={{ padding: 0 }}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", border: 0, background: "transparent", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontSize: 16, fontWeight: 600, color: "#1D1D1F", letterSpacing: "-0.01em" }}>
        <span className="adm-row" style={{ gap: 8 }}>{title}{optional && <span className="adm-muted" style={{ fontSize: 12, fontWeight: 400 }}>· optionnel</span>}</span>
        <span className="adm-row" style={{ gap: 12 }}>
          {action}
          <Ic2 name={open ? "chevron-down" : "chevron-right"} size={16}/>
        </span>
      </button>
      {open && <div style={{ padding: "0 24px 24px" }}>{children}</div>}
    </div>
  );
}

function MiniProductPreview() {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
      <div style={{ aspectRatio: "4/5", background: "#F5F5F7" }}>
        <Silhouette kind="dress" accent="#1A1A1A"/>
      </div>
      <div style={{ padding: "14px 14px 16px" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-secondary)" }}>Maison Lior · Édition</div>
        <div style={{ fontSize: 15, fontWeight: 500, marginTop: 4 }}>Robe Solène — Crêpe noir</div>
        <div className="adm-row" style={{ justifyContent: "space-between", marginTop: 8 }}>
          <span style={{ fontSize: 14 }}>1 290 €</span>
          <span style={{ fontSize: 12, color: "var(--fg-secondary)" }}>5 tailles · 2 coloris</span>
        </div>
      </div>
    </div>
  );
}

function VariantRow({ s, c, q }) {
  return (
    <div className="adm-vrow">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Ic2 name="drag" size={16}/> <span style={{ fontSize: 13 }}>Taille {s}</span></div>
      <div className="adm-row" style={{ gap: 8 }}><span className="adm-swatch" style={{ background: c.hex }}/><span style={{ fontSize: 13 }}>{c.name}</span></div>
      <div><input className="adm-input" defaultValue={`SOL-${s}-${c.code}`} style={{ fontFamily: "monospace", fontSize: 12 }}/></div>
      <div><input className="adm-input" defaultValue="1 290" /></div>
      <div><input className="adm-input" defaultValue={q}/></div>
      <button className="adm-iconbtn"><Ic2 name="trash" size={16}/></button>
    </div>
  );
}

function ProductEditDesktop() {
  return (
    <div className="adm-screen adm-screen--desktop">
      <AdminSidebar active="products"/>
      <main className="adm-main" style={{ paddingBottom: 96 }}>
        <div className="adm-row" style={{ gap: 8, marginBottom: 16, fontSize: 13, color: "var(--fg-secondary)" }}>
          <a href="#">Produits</a><Ic2 name="chevron-right" size={12}/><span>Robe Solène — Crêpe noir</span>
        </div>
        <div className="adm-toolbar">
          <div className="adm-row" style={{ gap: 16 }}>
            <h1 style={{ fontSize: 28 }}>Robe Solène — Crêpe noir</h1>
            <StatusBadge kind="success">Publié</StatusBadge>
          </div>
          <div className="adm-toolbar__actions">
            <button className="adm-btn adm-btn--secondary"><Ic2 name="external" size={14}/> Voir en ligne</button>
            <button className="adm-btn adm-btn--ghost">Dupliquer</button>
            <button className="adm-btn adm-btn--danger">Archiver</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>
          <div className="adm-col" style={{ gap: 14 }}>

            <Section title="Informations générales">
              <div className="adm-col" style={{ gap: 14 }}>
                <div className="adm-field"><label>Nom du produit</label><input className="adm-input" defaultValue="Robe Solène — Crêpe noir"/></div>
                <div className="adm-field">
                  <label>Description</label>
                  <div style={{ background: "#FAFAFC", border: "1px solid var(--border)", borderRadius: 12, padding: 4, display: "flex", gap: 2 }}>
                    {["B","I","U","¶","“ ”","•","1.","🔗"].map((t,i) => <button key={i} className="adm-btn adm-btn--sm adm-btn--ghost" style={{ padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: t === "B" ? 600 : t === "I" ? 400 : 500, fontStyle: t === "I" ? "italic" : "normal", textDecoration: t === "U" ? "underline" : "none" }}>{t}</button>)}
                  </div>
                  <textarea className="adm-textarea" style={{ minHeight: 120, borderRadius: "0 0 12px 12px", borderTop: 0 }} defaultValue={"Pièce signature de l'atelier, taillée dans un crêpe italien à la main fluide. Coupe ajustée, encolure asymétrique, longueur cheville. Doublure en cupro pour le confort.\n\nFabriquée à Bordeaux dans notre atelier."}/>
                </div>
                <div className="adm-field-row">
                  <div className="adm-field"><label>Catégorie</label><select className="adm-select"><option>Robes — Soirée</option></select></div>
                  <div className="adm-field"><label>Statut</label>
                    <div className="adm-row" style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: 12, justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14 }}>Publié</span>
                      <span className="adm-toggle is-on"><span className="adm-toggle__track"><span className="adm-toggle__thumb"/></span></span>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            <Section title="Médias" action={<span className="adm-muted" style={{ fontSize: 12 }}>4 / 8</span>}>
              <div className="adm-dropzone">
                <div style={{ width: 36, height: 36, borderRadius: 9999, background: "#fff", border: "1px solid var(--border)", display: "grid", placeItems: "center", margin: "0 auto 8px" }}><Ic2 name="image" size={16}/></div>
                <div style={{ fontSize: 14, color: "#1D1D1F", fontWeight: 500 }}>Glissez vos images ici</div>
                <div style={{ marginTop: 4 }}>JPG, PNG ou WebP · 1500×1875px min · 8 Mo max</div>
              </div>
              <div className="adm-thumbs">
                {[0,1,2,3].map(i => (
                  <div key={i} className="adm-thumb">
                    <Silhouette kind="dress" accent="#1A1A1A"/>
                    {i === 0 && <span className="adm-thumb__main">Principale</span>}
                    <button className="adm-thumb__rm"><Ic2 name="x" size={12}/></button>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Tarification">
              <div className="adm-field-row--3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <div className="adm-field"><label>Prix de vente (€)</label><input className="adm-input" defaultValue="1 290"/></div>
                <div className="adm-field"><label>Prix barré (€)</label><input className="adm-input" placeholder="—"/></div>
                <div className="adm-field"><label>TVA</label><select className="adm-select"><option>20 % (standard)</option><option>5,5 %</option></select></div>
              </div>
            </Section>

            <Section title="Attributs">
              <div className="adm-col" style={{ gap: 12 }}>
                <div className="adm-field"><label>Matière</label><input className="adm-input" defaultValue="Crêpe italien · 92% Viscose, 8% Élasthanne"/></div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--fg-secondary)", fontWeight: 500, display: "block", marginBottom: 8 }}>Couleurs disponibles</label>
                  <div className="adm-row" style={{ flexWrap: "wrap", gap: 8 }}>
                    {[{n:"Noir d'ébène",h:"#1A1A1A"},{n:"Bordeaux profond",h:"#5A1A1F"}].map(c => (
                      <div key={c.n} className="adm-row" style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 9999, padding: "6px 12px", gap: 8 }}>
                        <span className="adm-swatch" style={{ background: c.h, margin: 0 }}/>
                        <span style={{ fontSize: 13 }}>{c.n}</span>
                        <button className="adm-iconbtn" style={{ width: 22, height: 22 }}><Ic2 name="x" size={12}/></button>
                      </div>
                    ))}
                    <button className="adm-btn adm-btn--sm adm-btn--secondary"><Ic2 name="plus" size={13}/> Ajouter</button>
                  </div>
                </div>
                <button className="adm-btn adm-btn--ghost" style={{ alignSelf: "flex-start", padding: "6px 0" }}><Ic2 name="plus" size={14}/> Ajouter un attribut</button>
              </div>
            </Section>

            <Section title="Variantes & stock" action={<button className="adm-btn adm-btn--sm adm-btn--secondary" onClick={(e) => e.stopPropagation()}><Ic2 name="plus" size={13}/> Ajouter</button>}>
              <div className="adm-vrow" style={{ borderBottom: "1px solid var(--border)", paddingBottom: 8 }}>
                <div style={{ fontSize: 11, color: "var(--fg-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Taille</div>
                <div style={{ fontSize: 11, color: "var(--fg-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Couleur</div>
                <div style={{ fontSize: 11, color: "var(--fg-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>SKU</div>
                <div style={{ fontSize: 11, color: "var(--fg-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Prix</div>
                <div style={{ fontSize: 11, color: "var(--fg-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Stock</div>
                <div></div>
              </div>
              {[
                ["S",{name:"Noir",hex:"#1A1A1A",code:"NR"},5],
                ["M",{name:"Noir",hex:"#1A1A1A",code:"NR"},3],
                ["L",{name:"Noir",hex:"#1A1A1A",code:"NR"},2],
                ["S",{name:"Bordeaux",hex:"#5A1A1F",code:"BD"},4],
                ["M",{name:"Bordeaux",hex:"#5A1A1F",code:"BD"},1],
              ].map(([s,c,q],i) => <VariantRow key={i} s={s} c={c} q={q}/>)}
            </Section>

            <Section title="SEO" defaultOpen={false} optional>
              <div className="adm-col" style={{ gap: 12 }}>
                <div className="adm-field"><label>Titre méta</label><input className="adm-input" defaultValue="Robe Solène en crêpe noir — Maison Lior"/></div>
                <div className="adm-field"><label>Description méta</label><textarea className="adm-textarea" defaultValue="Robe de soirée en crêpe italien, coupe ajustée, fabriquée à Bordeaux. Disponible en noir et bordeaux."/></div>
              </div>
            </Section>
          </div>

          <aside style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 11, color: "var(--fg-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", padding: "0 4px" }}>Aperçu boutique</div>
            <MiniProductPreview/>
            <div className="adm-section" style={{ padding: 16, marginBottom: 0 }}>
              <div className="adm-row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Stock total</span>
                <span style={{ fontSize: 13, fontVariantNumeric: "tabular-nums" }}>15 unités</span>
              </div>
              <div className="adm-row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Variantes actives</span>
                <span style={{ fontSize: 13, fontVariantNumeric: "tabular-nums" }}>5 / 5</span>
              </div>
              <div className="adm-row" style={{ justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>Vendu ce mois</span>
                <span style={{ fontSize: 13, fontVariantNumeric: "tabular-nums" }}>9 unités</span>
              </div>
            </div>
          </aside>
        </div>

        <div style={{ position: "sticky", bottom: 0, marginLeft: -48, marginRight: -48, marginTop: 32, padding: "16px 48px", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="adm-muted" style={{ fontSize: 13 }}>Dernière modification il y a 4 minutes</span>
          <div className="adm-row" style={{ gap: 8 }}>
            <button className="adm-btn adm-btn--ghost">Annuler</button>
            <button className="adm-btn adm-btn--secondary">Enregistrer comme brouillon</button>
            <button className="adm-btn adm-btn--primary">Enregistrer</button>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProductEditMobile() {
  return (
    <div className="adm-screen adm-screen--mobile">
      <AdminMHeader title="Édition produit" onBack action={<button className="adm-btn adm-btn--sm adm-btn--primary">Enregistrer</button>}/>
      <main className="adm-mmain" style={{ paddingBottom: 110 }}>
        <div className="adm-row" style={{ marginBottom: 14, justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em" }}>Robe Solène</div>
            <div className="adm-muted" style={{ fontSize: 12 }}>SKU SOL-NR · 15 unités</div>
          </div>
          <StatusBadge kind="success">Publié</StatusBadge>
        </div>

        <Section title="Informations">
          <div className="adm-col" style={{ gap: 12 }}>
            <div className="adm-field"><label>Nom</label><input className="adm-input" defaultValue="Robe Solène — Crêpe noir"/></div>
            <div className="adm-field"><label>Catégorie</label><select className="adm-select"><option>Robes — Soirée</option></select></div>
            <div className="adm-field"><label>Description</label><textarea className="adm-textarea" defaultValue="Pièce signature taillée dans un crêpe italien…"/></div>
          </div>
        </Section>

        <Section title="Médias" action={<span className="adm-muted" style={{ fontSize: 12 }}>4/8</span>}>
          <div className="adm-thumbs" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[0,1,2].map(i => <div key={i} className="adm-thumb"><Silhouette kind="dress" accent="#1A1A1A"/>{i === 0 && <span className="adm-thumb__main">Principale</span>}</div>)}
          </div>
          <button className="adm-btn adm-btn--secondary adm-btn--block" style={{ marginTop: 10 }}><Ic2 name="plus" size={14}/> Ajouter une image</button>
        </Section>

        <Section title="Tarification">
          <div className="adm-field-row">
            <div className="adm-field"><label>Prix (€)</label><input className="adm-input" defaultValue="1 290"/></div>
            <div className="adm-field"><label>Prix barré</label><input className="adm-input" placeholder="—"/></div>
          </div>
        </Section>

        <Section title="Variantes & stock" defaultOpen={false}>
          <div className="adm-col" style={{ gap: 10 }}>
            {[["M","Noir",3],["L","Noir",2],["M","Bordeaux",1]].map(([s,c,q]) => (
              <div key={s+c} style={{ background: "#FAFAFC", border: "1px solid var(--border)", borderRadius: 12, padding: 14 }}>
                <div className="adm-row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>Taille {s} · {c}</span>
                  <button className="adm-iconbtn"><Ic2 name="kebab" size={14}/></button>
                </div>
                <div className="adm-row" style={{ gap: 10 }}>
                  <div className="adm-field" style={{ flex: 1 }}><label>Stock</label><input className="adm-input" defaultValue={q}/></div>
                  <div className="adm-field" style={{ flex: 1 }}><label>Prix</label><input className="adm-input" defaultValue="1 290"/></div>
                </div>
              </div>
            ))}
            <button className="adm-btn adm-btn--secondary adm-btn--block"><Ic2 name="plus" size={14}/> Ajouter une variante</button>
          </div>
        </Section>
      </main>
      <div style={{ position: "sticky", bottom: 0, padding: "10px 16px 14px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
        <button className="adm-btn adm-btn--secondary" style={{ flex: 1 }}>Brouillon</button>
        <button className="adm-btn adm-btn--primary" style={{ flex: 2 }}>Enregistrer</button>
      </div>
    </div>
  );
}

window.ProductEditDesktop = ProductEditDesktop;
window.ProductEditMobile = ProductEditMobile;
