/* global React, Silhouette, PRODUCTS, AdmIcon, AdminSidebar, AdminMHeader, AdminMBottom, StatusBadge, ADM_ORDERS */

const Ic3 = AdmIcon;

/* ========================================================================
   ÉCRAN 5 — CATÉGORIES & ATTRIBUTS
   ======================================================================== */

const ADM_CATEGORIES = [
  { id: "robes",  name: "Robes",        count: 24, kind: "dress",   accent: "#1A1A1A", desc: "Soirée, cocktail et mariage" },
  { id: "sacs",   name: "Sacs",         count: 11, kind: "bag",     accent: "#5A1A1F", desc: "Sacs à main et pochettes" },
  { id: "access", name: "Accessoires",  count: 7,  kind: "scarf",   accent: "#0E2A4A", desc: "Foulards, ceintures, bijoux" },
];

const ADM_ATTRIBUTES = [
  { name: "Taille",    type: "Liste",   values: ["XS","S","M","L","XL"], cats: ["Robes"] },
  { name: "Couleur",   type: "Couleur", values: ["Noir","Bordeaux","Champagne","Bleu nuit","Ivoire"], cats: ["Robes","Sacs","Accessoires"] },
  { name: "Matière",   type: "Texte",   values: ["Crêpe","Soie","Cuir grainé","Cachemire"], cats: ["Robes","Sacs","Accessoires"] },
  { name: "Dimensions", type: "Texte",  values: ["Petit (≤ 22cm)","Moyen (22–32cm)","Grand (≥ 32cm)"], cats: ["Sacs"] },
  { name: "Longueur",  type: "Liste",   values: ["Mini","Genou","Mi-mollet","Cheville","Long"], cats: ["Robes"] },
];

function CategoriesDesktop() {
  const [tab, setTab] = React.useState("cat");
  return (
    <div className="adm-screen adm-screen--desktop">
      <AdminSidebar active="categories"/>
      <main className="adm-main">
        <div className="adm-toolbar">
          <h1>Catégories & attributs</h1>
          <button className="adm-btn adm-btn--primary"><Ic3 name="plus" size={15}/> {tab === "cat" ? "Nouvelle catégorie" : "Nouvel attribut"}</button>
        </div>

        <div className="adm-row" style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: 4, gap: 0, alignSelf: "flex-start", display: "inline-flex", marginBottom: 24 }}>
          <button onClick={() => setTab("cat")} className={`adm-btn adm-btn--sm ${tab === "cat" ? "adm-btn--primary" : "adm-btn--ghost"}`} style={{ borderRadius: 8 }}>Catégories</button>
          <button onClick={() => setTab("att")} className={`adm-btn adm-btn--sm ${tab === "att" ? "adm-btn--primary" : "adm-btn--ghost"}`} style={{ borderRadius: 8 }}>Attributs</button>
        </div>

        {tab === "cat" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {ADM_CATEGORIES.map(c => (
              <div key={c.id} className="adm-card" style={{ padding: 0, overflow: "hidden", gap: 0 }}>
                <div style={{ aspectRatio: "16/10", background: "#F5F5F7" }}><Silhouette kind={c.kind} accent={c.accent}/></div>
                <div style={{ padding: 18 }}>
                  <div className="adm-row" style={{ justifyContent: "space-between", marginBottom: 4 }}>
                    <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>{c.name}</div>
                    <span className="adm-pill__count">{c.count} produits</span>
                  </div>
                  <div className="adm-muted" style={{ fontSize: 13, marginBottom: 14 }}>{c.desc}</div>
                  <div className="adm-row" style={{ gap: 8 }}>
                    <button className="adm-btn adm-btn--secondary adm-btn--sm" style={{ flex: 1 }}>Modifier</button>
                    <button className="adm-iconbtn"><Ic3 name="kebab" size={14}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="adm-section" style={{ padding: 0 }}>
            <table className="adm-table">
              <thead><tr><th>Attribut</th><th>Type</th><th>Valeurs</th><th>S'applique à</th><th>Actions</th></tr></thead>
              <tbody>
                {ADM_ATTRIBUTES.map(a => (
                  <tr key={a.name}>
                    <td style={{ fontWeight: 500 }}>{a.name}</td>
                    <td><StatusBadge kind="neutral">{a.type}</StatusBadge></td>
                    <td>
                      <div className="adm-row" style={{ flexWrap: "wrap", gap: 6 }}>
                        {a.values.slice(0, 4).map(v => <span key={v} className="adm-pill" style={{ padding: "4px 10px", fontSize: 12 }}>{v}</span>)}
                        {a.values.length > 4 && <span className="adm-muted" style={{ fontSize: 12, alignSelf: "center" }}>+{a.values.length - 4}</span>}
                      </div>
                    </td>
                    <td className="adm-muted">{a.cats.join(", ")}</td>
                    <td><a href="#" className="adm-table__action">Modifier →</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal preview */}
        {tab === "att" && (
          <div className="adm-modal-scrim" style={{ position: "absolute", inset: "auto", display: "none" }}/>
        )}
      </main>
    </div>
  );
}

function CategoriesMobile() {
  return (
    <div className="adm-screen adm-screen--mobile">
      <AdminMHeader title="Catégories" action={<button className="adm-iconbtn"><Ic3 name="plus" size={18}/></button>}/>
      <main className="adm-mmain">
        <div className="adm-row" style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: 4, marginBottom: 16 }}>
          <button className="adm-btn adm-btn--sm adm-btn--primary" style={{ flex: 1, borderRadius: 8 }}>Catégories</button>
          <button className="adm-btn adm-btn--sm adm-btn--ghost" style={{ flex: 1, borderRadius: 8 }}>Attributs</button>
        </div>
        <div className="adm-col" style={{ gap: 12 }}>
          {ADM_CATEGORIES.map(c => (
            <div key={c.id} className="adm-card" style={{ padding: 0, overflow: "hidden", flexDirection: "row", gap: 0, alignItems: "stretch" }}>
              <div style={{ width: 110, background: "#F5F5F7", flexShrink: 0 }}><Silhouette kind={c.kind} accent={c.accent}/></div>
              <div style={{ padding: 14, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{c.name}</div>
                  <div className="adm-muted" style={{ fontSize: 12, marginTop: 2 }}>{c.count} produits · {c.desc}</div>
                </div>
                <button className="adm-btn adm-btn--secondary adm-btn--sm" style={{ alignSelf: "flex-start", marginTop: 8 }}>Modifier</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <AdminMBottom active="more"/>
    </div>
  );
}

/* ========================================================================
   ÉCRAN 6 — LISTE COMMANDES
   ======================================================================== */
function OrdersListDesktop() {
  return (
    <div className="adm-screen adm-screen--desktop">
      <AdminSidebar active="orders"/>
      <main className="adm-main">
        <div className="adm-toolbar">
          <div>
            <h1>Commandes</h1>
            <div className="adm-muted" style={{ fontSize: 14, marginTop: 6 }}>10 commandes · 5 à traiter</div>
          </div>
          <div className="adm-toolbar__actions">
            <button className="adm-btn adm-btn--secondary">Exporter CSV</button>
          </div>
        </div>

        <div className="adm-search" style={{ marginBottom: 16 }}>
          <Ic3 name="search" size={16}/>
          <input placeholder="Rechercher par n° de commande ou nom de cliente…"/>
        </div>
        <div className="adm-pillrow" style={{ marginBottom: 22 }}>
          <button className="adm-pill is-active">Toutes <span className="adm-pill__count">10</span></button>
          <button className="adm-pill">À traiter <span className="adm-pill__count">2</span></button>
          <button className="adm-pill">En préparation <span className="adm-pill__count">2</span></button>
          <button className="adm-pill">Prêtes à retirer <span className="adm-pill__count">2</span></button>
          <button className="adm-pill">Retirées <span className="adm-pill__count">3</span></button>
          <button className="adm-pill">Annulées <span className="adm-pill__count">1</span></button>
        </div>

        <div className="adm-section" style={{ padding: 0 }}>
          <table className="adm-table">
            <thead><tr><th>N° commande</th><th>Cliente</th><th>Date</th><th>Total</th><th>Paiement</th><th>Statut</th><th>Action</th></tr></thead>
            <tbody>
              {ADM_ORDERS.map(o => (
                <tr key={o.id}>
                  <td className="adm-table__num">{o.id}</td>
                  <td>{o.client}</td>
                  <td className="adm-muted">{o.date}</td>
                  <td className="adm-table__price">{o.total.toLocaleString("fr-FR")} €</td>
                  <td><StatusBadge kind={o.payment}>{o.payment === "paid" ? "Payé" : o.payment === "pending" ? "En attente" : "Annulé"}</StatusBadge></td>
                  <td><StatusBadge kind={o.status}>{o.statusLabel}</StatusBadge></td>
                  <td><a href="#" className="adm-table__action">Détails →</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function OrdersListMobile() {
  return (
    <div className="adm-screen adm-screen--mobile">
      <AdminMHeader title="Commandes" showSearch/>
      <main className="adm-mmain">
        <div className="adm-pillrow" style={{ marginBottom: 14 }}>
          <button className="adm-pill is-active">Toutes</button>
          <button className="adm-pill">À traiter <span className="adm-pill__count">2</span></button>
          <button className="adm-pill">Préparation</button>
          <button className="adm-pill">Prêtes</button>
          <button className="adm-pill">Retirées</button>
        </div>
        <div className="adm-col" style={{ gap: 10 }}>
          {ADM_ORDERS.slice(0, 7).map(o => (
            <div key={o.id} className="adm-card" style={{ padding: 16, gap: 8 }}>
              <div className="adm-row" style={{ justifyContent: "space-between" }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{o.id}</span>
                <StatusBadge kind={o.status}>{o.statusLabel}</StatusBadge>
              </div>
              <div className="adm-row" style={{ justifyContent: "space-between" }}>
                <span style={{ fontSize: 14 }}>{o.client}</span>
                <span style={{ fontSize: 14, fontVariantNumeric: "tabular-nums" }}>{o.total.toLocaleString("fr-FR")} €</span>
              </div>
              <div className="adm-row" style={{ justifyContent: "space-between" }}>
                <span className="adm-muted" style={{ fontSize: 12 }}>{o.date}</span>
                <StatusBadge kind={o.payment}>{o.payment === "paid" ? "Payé" : o.payment === "pending" ? "En attente" : "Annulé"}</StatusBadge>
              </div>
            </div>
          ))}
        </div>
      </main>
      <AdminMBottom active="orders"/>
    </div>
  );
}

/* ========================================================================
   ÉCRAN 7 — DÉTAIL COMMANDE
   ======================================================================== */
function Stepper({ steps, currentIdx }) {
  const fillPct = currentIdx === 0 ? 0 : (currentIdx / (steps.length - 1)) * 75;
  return (
    <div className="adm-stepper">
      <div className="adm-stepper__line"/>
      <div className="adm-stepper__line-fill" style={{ width: `${fillPct}%` }}/>
      {steps.map((s, i) => {
        const cls = i < currentIdx ? "is-done" : i === currentIdx ? "is-current" : "";
        return (
          <div key={i} className={`adm-stepper__step ${cls}`}>
            <div className="adm-stepper__dot">{i < currentIdx ? <Ic3 name="check" size={12}/> : i + 1}</div>
            <div className="adm-stepper__label">{s}</div>
          </div>
        );
      })}
    </div>
  );
}

const ADM_ORDER_ITEMS = [
  { p: PRODUCTS[0], qty: 1, size: "M", color: "Noir d'ébène",   price: 1290 },
  { p: PRODUCTS[4], qty: 1, size: null, color: "Cognac",          price: 720 },
  { p: PRODUCTS[2], qty: 2, size: "S", color: "Champagne pâle",   price: 1150 },
];

function SidebarCard({ title, children, action }) {
  return (
    <div className="adm-section" style={{ padding: 18, marginBottom: 0 }}>
      <div className="adm-row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</span>
        {action}
      </div>
      {children}
    </div>
  );
}

function OrderDetailDesktop() {
  return (
    <div className="adm-screen adm-screen--desktop">
      <AdminSidebar active="orders"/>
      <main className="adm-main">
        <div className="adm-row" style={{ marginBottom: 16, fontSize: 13, color: "var(--fg-secondary)", gap: 6 }}>
          <a href="#">Commandes</a><Ic3 name="chevron-right" size={12}/><span>ML-2026-04812</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, alignItems: "start" }}>
          <div className="adm-col" style={{ gap: 16 }}>
            <div className="adm-section">
              <div className="adm-row" style={{ justifyContent: "space-between", marginBottom: 22 }}>
                <div>
                  <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.018em" }}>Commande ML-2026-04812</h1>
                  <div className="adm-muted" style={{ fontSize: 13, marginTop: 4 }}>Passée le mardi 12 mai 2026 à 14:32 · 4 articles</div>
                </div>
                <StatusBadge kind="prep">En préparation</StatusBadge>
              </div>

              <Stepper steps={["Confirmée", "En préparation", "Prête à retirer", "Retirée"]} currentIdx={1}/>

              <div className="adm-row" style={{ gap: 10, marginTop: 28, paddingTop: 22, borderTop: "1px solid var(--border)" }}>
                <button className="adm-btn adm-btn--primary adm-btn--lg"><Ic3 name="check" size={15}/> Marquer prête à retirer</button>
                <button className="adm-btn adm-btn--secondary">Imprimer le bon</button>
                <span style={{ flex: 1 }}/>
                <button className="adm-btn adm-btn--danger">Annuler la commande</button>
              </div>
            </div>

            <div className="adm-section">
              <div className="adm-section__head">
                <div className="adm-section__title">Articles commandés</div>
                <span className="adm-muted" style={{ fontSize: 13 }}>{ADM_ORDER_ITEMS.reduce((s,i) => s+i.qty, 0)} articles</span>
              </div>
              {ADM_ORDER_ITEMS.map((it, i) => (
                <div key={i} className="adm-orderitem">
                  <div className="adm-orderitem__img"><Silhouette kind={it.p.kind} accent={it.p.accent}/></div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{it.p.name}</div>
                    <div className="adm-muted" style={{ fontSize: 12, marginTop: 4 }}>{it.size ? `Taille ${it.size} · ` : ""}{it.color}</div>
                  </div>
                  <div style={{ fontSize: 13, color: "var(--fg-secondary)" }}>× {it.qty}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>{(it.price * it.qty).toLocaleString("fr-FR")} €</div>
                </div>
              ))}

              <div className="adm-divider"/>
              {[
                ["Sous-total", "4 310 €"],
                ["Click & collect", "Gratuit"],
                ["TVA (20%)", "718 €"],
              ].map(([k, v]) => (
                <div key={k} className="adm-row" style={{ justifyContent: "space-between", padding: "6px 0", fontSize: 13, color: "var(--fg-secondary)" }}>
                  <span>{k}</span><span style={{ fontVariantNumeric: "tabular-nums" }}>{v}</span>
                </div>
              ))}
              <div className="adm-row" style={{ justifyContent: "space-between", paddingTop: 12, marginTop: 8, borderTop: "1px solid var(--border)", fontSize: 16, fontWeight: 600 }}>
                <span>Total</span><span style={{ fontVariantNumeric: "tabular-nums" }}>4 310 €</span>
              </div>
            </div>
          </div>

          <aside style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 14 }}>
            <SidebarCard title="Cliente" action={<a href="#" className="adm-table__action">Historique →</a>}>
              <div className="adm-row" style={{ gap: 12, marginBottom: 12 }}>
                <div className="adm-nav__avatar" style={{ width: 44, height: 44, fontSize: 14 }}>CD</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>Camille Dubois</div>
                  <div className="adm-muted" style={{ fontSize: 12 }}>Cliente fidèle · 7 commandes</div>
                </div>
              </div>
              <div className="adm-col" style={{ gap: 6, fontSize: 13 }}>
                <div className="adm-row" style={{ gap: 8, color: "var(--fg-secondary)" }}><Ic3 name="external" size={13}/> camille.dubois@email.fr</div>
                <div className="adm-row" style={{ gap: 8, color: "var(--fg-secondary)" }}><Ic3 name="card" size={13}/> 06 78 91 23 45</div>
              </div>
            </SidebarCard>

            <SidebarCard title="Paiement">
              <div className="adm-row" style={{ justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 500, fontVariantNumeric: "tabular-nums" }}>4 310 €</span>
                <StatusBadge kind="paid">Payé</StatusBadge>
              </div>
              <div className="adm-col" style={{ gap: 4, fontSize: 12, color: "var(--fg-secondary)" }}>
                <div>Carte Visa •••• 4242</div>
                <div>Stripe · ID ch_3PkW8…q1Z</div>
                <div>12 mai 2026 · 14:32</div>
              </div>
            </SidebarCard>

            <SidebarCard title="Retrait">
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Click & collect — Magasin</div>
              <div style={{ fontSize: 13, color: "var(--fg-secondary)", lineHeight: 1.5 }}>
                12 rue Sainte-Catherine, 33000 Bordeaux<br/>
                Créneau&nbsp;: jeudi 14 mai · 11h–13h
              </div>
            </SidebarCard>

            <SidebarCard title="Notes internes">
              <textarea className="adm-textarea" style={{ minHeight: 70, fontSize: 13 }} defaultValue="Cliente fidèle, prévoir emballage cadeau."/>
            </SidebarCard>
          </aside>
        </div>
      </main>
    </div>
  );
}

function OrderDetailMobile() {
  return (
    <div className="adm-screen adm-screen--mobile">
      <AdminMHeader title="ML-2026-04812" onBack/>
      <main className="adm-mmain" style={{ paddingBottom: 110 }}>
        <div className="adm-section">
          <div className="adm-row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
            <span className="adm-muted" style={{ fontSize: 12 }}>Mardi 12 mai · 14:32</span>
            <StatusBadge kind="prep">En préparation</StatusBadge>
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.018em", marginBottom: 16 }}>4 310 €</div>
          <Stepper steps={["Confirmée", "Préparation", "Prête", "Retirée"]} currentIdx={1}/>
        </div>

        <SidebarCard title="Cliente">
          <div className="adm-row" style={{ gap: 10 }}>
            <div className="adm-nav__avatar" style={{ width: 38, height: 38 }}>CD</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>Camille Dubois</div>
              <div className="adm-muted" style={{ fontSize: 12 }}>06 78 91 23 45</div>
            </div>
          </div>
        </SidebarCard>

        <SidebarCard title="Articles">
          {ADM_ORDER_ITEMS.map((it, i) => (
            <div key={i} className="adm-orderitem" style={{ gridTemplateColumns: "48px 1fr auto" }}>
              <div className="adm-orderitem__img"><Silhouette kind={it.p.kind} accent={it.p.accent}/></div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{it.p.name}</div>
                <div className="adm-muted" style={{ fontSize: 12 }}>{it.size ? `T. ${it.size} · ` : ""}{it.color} · ×{it.qty}</div>
              </div>
              <div style={{ fontSize: 13, fontVariantNumeric: "tabular-nums" }}>{(it.price * it.qty).toLocaleString("fr-FR")} €</div>
            </div>
          ))}
        </SidebarCard>

        <SidebarCard title="Retrait">
          <div style={{ fontSize: 13 }}>Magasin · 12 rue Sainte-Catherine</div>
          <div className="adm-muted" style={{ fontSize: 12, marginTop: 4 }}>Jeudi 14 mai · 11h–13h</div>
        </SidebarCard>
      </main>
      <div style={{ position: "sticky", bottom: 0, padding: "10px 16px 14px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
        <button className="adm-btn adm-btn--secondary">Annuler</button>
        <button className="adm-btn adm-btn--primary" style={{ flex: 1 }}>Marquer prête à retirer</button>
      </div>
    </div>
  );
}

/* ========================================================================
   ÉCRAN 8 — PARAMÈTRES
   ======================================================================== */
function SettingsDesktop() {
  return (
    <div className="adm-screen adm-screen--desktop">
      <AdminSidebar active="settings"/>
      <main className="adm-main">
        <div className="adm-toolbar">
          <h1>Paramètres</h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 24, alignItems: "start" }}>
          <div className="adm-vtabs">
            <div className="adm-vtab is-active">Boutique</div>
            <div className="adm-vtab">Magasin physique</div>
            <div className="adm-vtab">Paiement</div>
            <div className="adm-vtab">Livraison</div>
            <div className="adm-vtab">Compte</div>
          </div>

          <div className="adm-col" style={{ gap: 16 }}>
            <div className="adm-section">
              <div className="adm-section__head">
                <div className="adm-section__title">Identité de la boutique</div>
              </div>
              <div className="adm-col" style={{ gap: 14 }}>
                <div className="adm-field-row">
                  <div className="adm-field"><label>Nom</label><input className="adm-input" defaultValue="Maison Lior"/></div>
                  <div className="adm-field"><label>Devise</label><select className="adm-select"><option>Euro (€)</option></select></div>
                </div>
                <div className="adm-field"><label>Description</label><textarea className="adm-textarea" defaultValue="Robes de soirée, sacs et accessoires fabriqués à Bordeaux."/></div>
                <div className="adm-field">
                  <label>Logo</label>
                  <div className="adm-row" style={{ gap: 14, padding: 16, background: "#FAFAFC", border: "1px solid var(--border)", borderRadius: 12 }}>
                    <div style={{ width: 64, height: 64, background: "#1D1D1F", color: "#fff", borderRadius: 12, display: "grid", placeItems: "center", fontFamily: "var(--font-display)", letterSpacing: "0.04em", fontSize: 13 }}>ML</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>maison-lior-mark.svg</div>
                      <div className="adm-muted" style={{ fontSize: 12, marginTop: 2 }}>SVG · 4,2 Ko · ratio 1:1</div>
                    </div>
                    <button className="adm-btn adm-btn--secondary adm-btn--sm">Remplacer</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="adm-section">
              <div className="adm-section__head">
                <div className="adm-section__title">Modes de livraison</div>
              </div>
              <div className="adm-col" style={{ gap: 0 }}>
                {[
                  { name: "Click & collect — Bordeaux", desc: "Retrait au magasin · Gratuit", on: true, badge: null },
                  { name: "Point relais", desc: "Mondial Relay, Relais Colis", on: false, badge: "Bientôt" },
                  { name: "Livraison à domicile", desc: "Colissimo, Chronopost", on: false, badge: "Bientôt" },
                ].map(m => (
                  <div key={m.name} className="adm-row" style={{ padding: "16px 0", borderBottom: "1px solid var(--border)", justifyContent: "space-between" }}>
                    <div>
                      <div className="adm-row" style={{ gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 500 }}>{m.name}</span>
                        {m.badge && <StatusBadge kind="warning">{m.badge}</StatusBadge>}
                      </div>
                      <div className="adm-muted" style={{ fontSize: 12, marginTop: 2 }}>{m.desc}</div>
                    </div>
                    <span className={`adm-toggle ${m.on ? "is-on" : ""}`}><span className="adm-toggle__track"><span className="adm-toggle__thumb"/></span></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="adm-section">
              <div className="adm-section__head">
                <div className="adm-section__title">Paiement</div>
                <StatusBadge kind="paid">Stripe connecté</StatusBadge>
              </div>
              <div className="adm-row" style={{ gap: 14, background: "#FAFAFC", border: "1px solid var(--border)", borderRadius: 12, padding: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "#635BFF", color: "#fff", display: "grid", placeItems: "center", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }}>S</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>Stripe · acct_1Pk…XYZ</div>
                  <div className="adm-muted" style={{ fontSize: 12, marginTop: 2 }}>Cartes Visa, Mastercard, Amex · Apple Pay, Google Pay</div>
                </div>
                <button className="adm-btn adm-btn--secondary">Gérer</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingsMobile() {
  return (
    <div className="adm-screen adm-screen--mobile">
      <AdminMHeader title="Paramètres"/>
      <main className="adm-mmain">
        <div className="adm-col" style={{ gap: 8 }}>
          {[
            { name: "Boutique",         desc: "Nom, logo, description",         icon: "store" },
            { name: "Magasin physique", desc: "Adresse, horaires",              icon: "package" },
            { name: "Paiement",         desc: "Stripe connecté",                icon: "card", badge: "Actif" },
            { name: "Livraison",        desc: "Click & collect activé",         icon: "truck" },
            { name: "Compte",           desc: "Mot de passe, déconnexion",      icon: "user" },
          ].map(s => (
            <a key={s.name} href="#" className="adm-card" style={{ flexDirection: "row", alignItems: "center", gap: 14, padding: 16, textDecoration: "none" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#F5F5F7", display: "grid", placeItems: "center", color: "#1D1D1F", flexShrink: 0 }}><Ic3 name={s.icon} size={18}/></div>
              <div style={{ flex: 1 }}>
                <div className="adm-row" style={{ gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{s.name}</span>
                  {s.badge && <StatusBadge kind="paid">{s.badge}</StatusBadge>}
                </div>
                <div className="adm-muted" style={{ fontSize: 12, marginTop: 2 }}>{s.desc}</div>
              </div>
              <Ic3 name="chevron-right" size={16}/>
            </a>
          ))}
        </div>
      </main>
      <AdminMBottom active="profile"/>
    </div>
  );
}

window.CategoriesDesktop = CategoriesDesktop;
window.CategoriesMobile = CategoriesMobile;
window.OrdersListDesktop = OrdersListDesktop;
window.OrdersListMobile = OrdersListMobile;
window.OrderDetailDesktop = OrderDetailDesktop;
window.OrderDetailMobile = OrderDetailMobile;
window.SettingsDesktop = SettingsDesktop;
window.SettingsMobile = SettingsMobile;
