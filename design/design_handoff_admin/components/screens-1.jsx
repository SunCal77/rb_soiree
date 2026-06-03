/* global React, Silhouette, PRODUCTS, AdmIcon, AdminSidebar, AdminMHeader, AdminMBottom, StatusBadge, ADM_ORDERS, ADM_LOWSTOCK */

const Ic = AdmIcon;

/* ========================================================================
   ÉCRAN 1 — LOGIN (desktop + mobile)
   ======================================================================== */
function LoginScreen({ mobile }) {
  return (
    <div className={`adm-screen ${mobile ? "adm-screen--mobile" : "adm-screen--desktop"}`} style={{ background: "#F5F5F7" }}>
      <div className={`adm-login ${mobile ? "adm-login--mobile" : ""}`}>
        <div className="adm-login__brand">Maison Lior</div>
        <div className="adm-login__card">
          <div>
            <h2>Espace administrateur</h2>
            <div className="adm-muted" style={{ fontSize: 13, marginTop: 6 }}>Connectez-vous pour gérer la boutique.</div>
          </div>
          <div className="adm-field">
            <label>Adresse e-mail</label>
            <input className="adm-input" defaultValue="camille@maisonlior.fr"/>
          </div>
          <div className="adm-field">
            <label>Mot de passe</label>
            <input className="adm-input" type="password" defaultValue="••••••••••"/>
          </div>
          <button className="adm-btn adm-btn--primary adm-btn--lg adm-btn--block" style={{ marginTop: 6 }}>Se connecter</button>
          <div className="adm-login__forgot"><a href="#">Mot de passe oublié</a></div>
        </div>
        <div style={{ marginTop: 20, fontSize: 12, color: "var(--fg-secondary)", textAlign: "center" }}>© Maison Lior · Bordeaux</div>
      </div>
    </div>
  );
}

/* ========================================================================
   ÉCRAN 2 — DASHBOARD
   ======================================================================== */
function StatCard({ label, value, deltaPct, deltaUp = true, suffix }) {
  return (
    <div className="adm-card">
      <div className="adm-card__label">{label}</div>
      <div className="adm-card__value">{value}{suffix && <span style={{ fontSize: 18, fontWeight: 400, color: "var(--fg-secondary)", marginLeft: 4 }}>{suffix}</span>}</div>
      <div className={`adm-card__delta ${deltaUp ? "adm-delta-up" : "adm-delta-down"}`}>
        <Ic name={deltaUp ? "arrow-up" : "arrow-down"} size={13}/>{deltaPct} <span className="adm-muted" style={{ marginLeft: 4 }}>vs hier</span>
      </div>
    </div>
  );
}

function DashboardDesktop() {
  return (
    <div className="adm-screen adm-screen--desktop">
      <AdminSidebar active="dashboard"/>
      <main className="adm-main">
        <div className="adm-toolbar">
          <div>
            <h1>Bonjour Camille</h1>
            <div className="adm-muted" style={{ fontSize: 14, marginTop: 6 }}>Voici ce qu'il se passe à la boutique aujourd'hui.</div>
          </div>
          <div className="adm-toolbar__actions">
            <button className="adm-btn adm-btn--secondary"><Ic name="calendar" size={15}/> Cette semaine</button>
            <button className="adm-btn adm-btn--primary"><Ic name="plus" size={15}/> Ajouter un produit</button>
          </div>
        </div>

        <div className="adm-stats">
          <StatCard label="CA du jour"             value="4 310 €"  deltaPct="+18 %"/>
          <StatCard label="Commandes à préparer"   value="5"        deltaPct="+2"/>
          <StatCard label="Commandes prêtes"       value="3"        deltaPct="+1"/>
          <StatCard label="Stock faible"           value="7"        deltaPct="−2" deltaUp={false} suffix="articles"/>
        </div>

        <div className="adm-section">
          <div className="adm-section__head">
            <div className="adm-section__title">Commandes récentes</div>
            <a href="#" className="adm-section__see">Voir toutes les commandes →</a>
          </div>
          <table className="adm-table">
            <thead>
              <tr>
                <th>N° commande</th><th>Cliente</th><th>Date</th><th>Total</th><th>Paiement</th><th>Statut</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ADM_ORDERS.slice(0, 8).map(o => (
                <tr key={o.id}>
                  <td className="adm-table__num">{o.id}</td>
                  <td>{o.client}</td>
                  <td className="adm-muted">{o.date}</td>
                  <td className="adm-table__price">{o.total.toLocaleString("fr-FR")} €</td>
                  <td><StatusBadge kind={o.payment}>{o.payment === "paid" ? "Payé" : o.payment === "pending" ? "En attente" : "Annulé"}</StatusBadge></td>
                  <td><StatusBadge kind={o.status}>{o.statusLabel}</StatusBadge></td>
                  <td><a href="#" className="adm-table__action">Voir →</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="adm-section">
          <div className="adm-section__head">
            <div>
              <div className="adm-section__title">Stock faible</div>
              <div className="adm-muted" style={{ fontSize: 13, marginTop: 4 }}>Articles dont la quantité est inférieure à 3.</div>
            </div>
            <a href="#" className="adm-section__see">Tout voir →</a>
          </div>
          {ADM_LOWSTOCK.map(p => (
            <div key={p.id} className="adm-stockline">
              <div className="adm-stockline__img"><Silhouette kind={p.kind} accent={p.accent}/></div>
              <div>
                <div className="adm-stockline__name">{p.name}</div>
                <div className="adm-stockline__sub">{p.size ? `Taille ${p.size} · ` : ""}{p.color}</div>
              </div>
              <div className="adm-row" style={{ gap: 16 }}>
                <div className="adm-stockline__qty">{p.qty} restant{p.qty > 1 ? "s" : ""}</div>
                <a href="#" className="adm-table__action">Modifier →</a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function DashboardMobile() {
  return (
    <div className="adm-screen adm-screen--mobile">
      <AdminMHeader title="Tableau de bord"/>
      <main className="adm-mmain">
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.018em" }}>Bonjour Camille</div>
          <div className="adm-muted" style={{ fontSize: 13, marginTop: 4 }}>Mardi 12 mai · 4 commandes aujourd'hui</div>
        </div>

        <div className="adm-stats adm-stats--mobile" style={{ marginBottom: 22 }}>
          <StatCard label="CA du jour"           value="4 310 €" deltaPct="+18 %"/>
          <StatCard label="À préparer"           value="5"       deltaPct="+2"/>
          <StatCard label="Prêtes à retirer"     value="3"       deltaPct="+1"/>
          <StatCard label="Stock faible"         value="7"       deltaPct="−2" deltaUp={false}/>
        </div>

        <div className="adm-section">
          <div className="adm-section__head">
            <div className="adm-section__title">Commandes récentes</div>
            <a href="#" className="adm-section__see">Tout</a>
          </div>
          {ADM_ORDERS.slice(0, 4).map(o => (
            <div key={o.id} style={{ padding: "14px 0", borderBottom: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{o.id}</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{o.total.toLocaleString("fr-FR")} €</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, color: "var(--fg-secondary)" }}>{o.client} · {o.date.replace("Aujourd'hui · ", "").replace("Hier · ", "Hier ")}</span>
                <StatusBadge kind={o.status}>{o.statusLabel}</StatusBadge>
              </div>
            </div>
          ))}
        </div>

        <div className="adm-section">
          <div className="adm-section__head">
            <div className="adm-section__title">Stock faible</div>
            <a href="#" className="adm-section__see">Tout</a>
          </div>
          {ADM_LOWSTOCK.slice(0, 3).map(p => (
            <div key={p.id} className="adm-stockline">
              <div className="adm-stockline__img"><Silhouette kind={p.kind} accent={p.accent}/></div>
              <div>
                <div className="adm-stockline__name">{p.name}</div>
                <div className="adm-stockline__sub">{p.size ? `T. ${p.size} · ` : ""}{p.color}</div>
              </div>
              <div className="adm-stockline__qty">{p.qty} restant{p.qty > 1 ? "s" : ""}</div>
            </div>
          ))}
        </div>
      </main>
      <AdminMBottom active="dashboard"/>
    </div>
  );
}

/* ========================================================================
   ÉCRAN 3 — LISTE PRODUITS
   ======================================================================== */
function ProductCardAdm({ p, draft }) {
  return (
    <div className="adm-pcard">
      <div className="adm-pcard__img"><Silhouette kind={p.kind} accent={p.accent}/></div>
      <button className="adm-pcard__kebab"><Ic name="kebab" size={14}/></button>
      <div>
        <div className="adm-pcard__name">{p.name}</div>
        <div className="adm-pcard__sub">{p.collection || "Collection"}</div>
      </div>
      <div className="adm-pcard__row">
        <span className="adm-pcard__price">{p.price.toLocaleString("fr-FR")} €</span>
        {draft ? <StatusBadge kind="draft">Brouillon</StatusBadge> : <StatusBadge kind={p.stock < 4 ? "low" : "neutral"}>{p.stock} en stock</StatusBadge>}
      </div>
    </div>
  );
}

const ADM_PRODUCTS_TABLE = PRODUCTS.slice(0, 10).map((p, i) => ({
  ...p,
  category: ["Robes", "Robes", "Robes", "Robes", "Sacs", "Sacs", "Robes", "Sacs", "Accessoires", "Accessoires"][i] || "Robes",
  draft: i === 9,
}));

function ProductsListDesktop() {
  return (
    <div className="adm-screen adm-screen--desktop">
      <AdminSidebar active="products"/>
      <main className="adm-main">
        <div className="adm-toolbar">
          <div>
            <h1>Produits</h1>
            <div className="adm-muted" style={{ fontSize: 14, marginTop: 6 }}>42 articles · 38 publiés · 4 brouillons</div>
          </div>
          <div className="adm-toolbar__actions">
            <button className="adm-btn adm-btn--secondary">Importer</button>
            <button className="adm-btn adm-btn--primary"><Ic name="plus" size={15}/> Ajouter un produit</button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
          <div className="adm-search" style={{ flex: 1 }}>
            <Ic name="search" size={16}/>
            <input placeholder="Rechercher par nom, référence ou catégorie…"/>
            <span className="adm-search__hint">⌘K</span>
          </div>
          <div className="adm-row" style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: 12, padding: 4, gap: 0 }}>
            <button className="adm-btn adm-btn--sm adm-btn--primary" style={{ borderRadius: 8 }}><Ic name="dashboard" size={14}/> Grille</button>
            <button className="adm-btn adm-btn--sm adm-btn--ghost" style={{ borderRadius: 8 }}>Tableau</button>
          </div>
        </div>

        <div className="adm-pillrow" style={{ marginBottom: 22 }}>
          <button className="adm-pill is-active">Toutes <span className="adm-pill__count">42</span></button>
          <button className="adm-pill">Robes <span className="adm-pill__count">24</span></button>
          <button className="adm-pill">Sacs <span className="adm-pill__count">11</span></button>
          <button className="adm-pill">Accessoires <span className="adm-pill__count">7</span></button>
          <button className="adm-pill">Stock faible <span className="adm-pill__count" style={{ color: "#C0271C" }}>7</span></button>
          <button className="adm-pill">Brouillons <span className="adm-pill__count">4</span></button>
        </div>

        <div className="adm-pgrid">
          {ADM_PRODUCTS_TABLE.map(p => <ProductCardAdm key={p.id} p={p} draft={p.draft}/>)}
        </div>
      </main>
    </div>
  );
}

function ProductsListMobile() {
  return (
    <div className="adm-screen adm-screen--mobile">
      <AdminMHeader title="Produits" showSearch action={<button className="adm-iconbtn"><Ic name="plus" size={18}/></button>}/>
      <main className="adm-mmain">
        <div className="adm-search" style={{ marginBottom: 14 }}>
          <Ic name="search" size={16}/>
          <input placeholder="Rechercher un produit…"/>
        </div>
        <div className="adm-pillrow" style={{ marginBottom: 16 }}>
          <button className="adm-pill is-active">Toutes</button>
          <button className="adm-pill">Robes</button>
          <button className="adm-pill">Sacs</button>
          <button className="adm-pill">Access.</button>
          <button className="adm-pill">Stock faible</button>
        </div>
        <div className="adm-pgrid adm-pgrid--mobile">
          {ADM_PRODUCTS_TABLE.slice(0, 6).map(p => <ProductCardAdm key={p.id} p={p} draft={p.draft}/>)}
        </div>
        <button className="adm-btn adm-btn--secondary adm-btn--block" style={{ marginTop: 18 }}>Charger plus</button>
      </main>
      <AdminMBottom active="products"/>
    </div>
  );
}

window.LoginScreen = LoginScreen;
window.DashboardDesktop = DashboardDesktop;
window.DashboardMobile = DashboardMobile;
window.ProductsListDesktop = ProductsListDesktop;
window.ProductsListMobile = ProductsListMobile;
