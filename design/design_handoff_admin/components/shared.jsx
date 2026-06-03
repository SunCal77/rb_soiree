/* global React, Silhouette, PRODUCTS */

/* ============================================================
   Maison Lior — Admin: shared chrome
   ============================================================ */

const Icon = ({ name, size = 18 }) => {
  const s = size;
  const props = { viewBox: "0 0 24 24", width: s, height: s, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "dashboard":
      return (<svg {...props}><rect x="3" y="3" width="8" height="10" rx="1.5"/><rect x="13" y="3" width="8" height="6" rx="1.5"/><rect x="3" y="15" width="8" height="6" rx="1.5"/><rect x="13" y="11" width="8" height="10" rx="1.5"/></svg>);
    case "products":
      return (<svg {...props}><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M8 6V4a4 4 0 0 1 8 0v2"/></svg>);
    case "tag":
      return (<svg {...props}><path d="M20.5 13L13 20.5a1.5 1.5 0 0 1-2.1 0L3.5 13.1a1.5 1.5 0 0 1-.4-1L3.5 5a1.5 1.5 0 0 1 1.4-1.4l7-.5a1.5 1.5 0 0 1 1.1.4L20.5 11a1.5 1.5 0 0 1 0 2z"/><circle cx="8" cy="8" r="1.5"/></svg>);
    case "orders":
      return (<svg {...props}><path d="M4 7h16l-1.4 11.4a2 2 0 0 1-2 1.6H7.4a2 2 0 0 1-2-1.6L4 7z"/><path d="M9 7V5a3 3 0 0 1 6 0v2"/></svg>);
    case "settings":
      return (<svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1A2 2 0 1 1 4.3 17l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1A2 2 0 1 1 7 4.3l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1A2 2 0 1 1 19.7 7l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>);
    case "logout":
      return (<svg {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>);
    case "search":
      return (<svg {...props}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>);
    case "plus":
      return (<svg {...props}><path d="M12 5v14M5 12h14"/></svg>);
    case "minus":
      return (<svg {...props}><path d="M5 12h14"/></svg>);
    case "menu":
      return (<svg {...props}><path d="M3 6h18M3 12h18M3 18h18"/></svg>);
    case "x":
      return (<svg {...props}><path d="M18 6L6 18M6 6l12 12"/></svg>);
    case "check":
      return (<svg {...props}><polyline points="20 6 9 17 4 12"/></svg>);
    case "chevron-right":
      return (<svg {...props}><polyline points="9 18 15 12 9 6"/></svg>);
    case "chevron-down":
      return (<svg {...props}><polyline points="6 9 12 15 18 9"/></svg>);
    case "kebab":
      return (<svg {...props}><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>);
    case "arrow-up":
      return (<svg {...props}><path d="M12 19V5M5 12l7-7 7 7"/></svg>);
    case "arrow-down":
      return (<svg {...props}><path d="M12 5v14M19 12l-7 7-7-7"/></svg>);
    case "user":
      return (<svg {...props}><circle cx="12" cy="9" r="3.5"/><path d="M5 20c0-4 3-6 7-6s7 2 7 6"/></svg>);
    case "store":
      return (<svg {...props}><path d="M4 9V7l2-4h12l2 4v2"/><path d="M4 9h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M9 13h6"/></svg>);
    case "alert":
      return (<svg {...props}><path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>);
    case "package":
      return (<svg {...props}><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7L12 12l8.7-5"/><path d="M12 22V12"/></svg>);
    case "card":
      return (<svg {...props}><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 11h20"/></svg>);
    case "truck":
      return (<svg {...props}><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7z"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>);
    case "more":
      return (<svg {...props}><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>);
    case "trash":
      return (<svg {...props}><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1.4 14.4a2 2 0 0 1-2 1.6H8.4a2 2 0 0 1-2-1.6L5 6"/><path d="M10 11v6M14 11v6"/></svg>);
    case "image":
      return (<svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>);
    case "drag":
      return (<svg {...props}><circle cx="9" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="18" r="1"/></svg>);
    case "money":
      return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M9 9h5a2 2 0 0 1 0 4h-4a2 2 0 0 0 0 4h5"/><path d="M12 6v3M12 17v2"/></svg>);
    case "bell":
      return (<svg {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>);
    case "calendar":
      return (<svg {...props}><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>);
    case "edit":
      return (<svg {...props}><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>);
    case "external":
      return (<svg {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14L21 3"/></svg>);
    default: return null;
  }
};

/* ---------- Sidebar (desktop) ---------- */
function AdminSidebar({ active = "dashboard" }) {
  const items = [
    { id: "dashboard",  label: "Tableau de bord", icon: "dashboard" },
    { id: "products",   label: "Produits",        icon: "products" },
    { id: "categories", label: "Catégories",      icon: "tag" },
    { id: "orders",     label: "Commandes",       icon: "orders", badge: 3 },
    { id: "settings",   label: "Paramètres",      icon: "settings" },
  ];
  return (
    <aside className="adm-sidebar">
      <div className="adm-sidebar__brand">
        Maison Lior
        <span className="muted">Administration</span>
      </div>
      <nav className="adm-nav">
        {items.map(it => (
          <a key={it.id} href="#" className={`adm-nav__item ${active === it.id ? "is-active" : ""}`}>
            <Icon name={it.icon} size={17}/>
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.badge && <span className="adm-pill__count" style={{ background: active === it.id ? "rgba(255,255,255,0.18)" : "#F5F5F7", color: active === it.id ? "#fff" : "#1D1D1F" }}>{it.badge}</span>}
          </a>
        ))}
        <div className="adm-nav__sep"/>
        <a href="#" className="adm-nav__item">
          <Icon name="logout" size={17}/>
          <span>Déconnexion</span>
        </a>
      </nav>
      <div className="adm-nav__profile">
        <div className="adm-nav__avatar">CL</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Camille L.</div>
          <div style={{ fontSize: 11, color: "var(--fg-secondary)" }}>Propriétaire</div>
        </div>
        <button className="adm-iconbtn"><Icon name="bell" size={16}/></button>
      </div>
    </aside>
  );
}

/* ---------- Mobile header ---------- */
function AdminMHeader({ title, action, onBack, showSearch }) {
  return (
    <div className="adm-mhead">
      <div className="adm-row" style={{ gap: 8 }}>
        {onBack ? (
          <button className="adm-iconbtn" aria-label="Retour"><Icon name="chevron-right" size={18} /></button>
        ) : (
          <button className="adm-iconbtn" aria-label="Menu"><Icon name="menu" size={18}/></button>
        )}
        <h1>{title}</h1>
      </div>
      <div className="adm-mhead__icons">
        {showSearch && <button className="adm-iconbtn"><Icon name="search" size={17}/></button>}
        {action ? action : <button className="adm-iconbtn"><Icon name="bell" size={17}/></button>}
      </div>
    </div>
  );
}

/* ---------- Mobile bottom nav ---------- */
function AdminMBottom({ active = "dashboard" }) {
  const items = [
    { id: "dashboard", label: "Accueil",   icon: "dashboard" },
    { id: "products",  label: "Produits",  icon: "products" },
    { id: "orders",    label: "Commandes", icon: "orders" },
    { id: "more",      label: "Plus",      icon: "more" },
    { id: "profile",   label: "Profil",    icon: "user" },
  ];
  return (
    <nav className="adm-mbottom">
      {items.map(it => (
        <a key={it.id} href="#" className={`adm-mbottom__item ${active === it.id ? "is-active" : ""}`}>
          <Icon name={it.icon} size={20}/>
          <span>{it.label}</span>
        </a>
      ))}
    </nav>
  );
}

/* ---------- Status badge ---------- */
function StatusBadge({ kind, children }) {
  const cls = {
    paid: "adm-status-success", success: "adm-status-success", ready: "adm-status-success", picked: "adm-status-neutral", confirmed: "adm-status-info", new: "adm-status-info",
    pending: "adm-status-warning", prep: "adm-status-warning", warning: "adm-status-warning",
    canceled: "adm-status-danger", danger: "adm-status-danger", low: "adm-status-danger",
    draft: "adm-status-neutral", neutral: "adm-status-neutral",
  }[kind] || "adm-status-neutral";
  return <span className={`adm-badge ${cls}`}><span className="adm-badge__dot"/>{children}</span>;
}

/* ---------- Demo data ---------- */
const ADM_ORDERS = [
  { id: "ML-2026-04812", client: "Camille D.",   date: "Aujourd'hui · 14:32", total: 4310, payment: "paid",    status: "prep",      statusLabel: "En préparation" },
  { id: "ML-2026-04811", client: "Inès M.",      date: "Aujourd'hui · 11:08", total: 1290, payment: "paid",    status: "confirmed", statusLabel: "Confirmée" },
  { id: "ML-2026-04810", client: "Sarah B.",     date: "Hier · 18:42",         total: 2230, payment: "paid",    status: "ready",     statusLabel: "Prête à retirer" },
  { id: "ML-2026-04809", client: "Léa T.",       date: "Hier · 15:14",         total: 980,  payment: "paid",    status: "picked",    statusLabel: "Retirée" },
  { id: "ML-2026-04808", client: "Margaux V.",   date: "06 mai · 12:55",       total: 1690, payment: "pending", status: "confirmed", statusLabel: "Confirmée" },
  { id: "ML-2026-04807", client: "Hélène R.",    date: "06 mai · 09:30",       total: 1380, payment: "paid",    status: "ready",     statusLabel: "Prête à retirer" },
  { id: "ML-2026-04806", client: "Aurore F.",    date: "05 mai · 21:12",       total: 320,  payment: "paid",    status: "picked",    statusLabel: "Retirée" },
  { id: "ML-2026-04805", client: "Pauline G.",   date: "05 mai · 17:48",       total: 1450, payment: "paid",    status: "prep",      statusLabel: "En préparation" },
  { id: "ML-2026-04804", client: "Béatrice K.",  date: "05 mai · 11:02",       total: 780,  payment: "paid",    status: "picked",    statusLabel: "Retirée" },
  { id: "ML-2026-04803", client: "Clémence O.",  date: "04 mai · 19:30",       total: 1120, payment: "canceled", status: "canceled", statusLabel: "Annulée" },
];

const ADM_LOWSTOCK = [
  { ...PRODUCTS[1], qty: 1, size: "38" },
  { ...PRODUCTS[2], qty: 2, size: "36" },
  { ...PRODUCTS[6], qty: 1, size: "38" },
  { ...PRODUCTS[9], qty: 2, size: null },
];

window.AdmIcon = Icon;
window.AdminSidebar = AdminSidebar;
window.AdminMHeader = AdminMHeader;
window.AdminMBottom = AdminMBottom;
window.StatusBadge = StatusBadge;
window.ADM_ORDERS = ADM_ORDERS;
window.ADM_LOWSTOCK = ADM_LOWSTOCK;
