/* global React */

/* ============================================================
   Shared product silhouettes — placeholder editorial visuals
   ============================================================ */

function Silhouette({ kind, tone, accent, bg, full }) {
  const _bg = bg || "#F5F5F7";
  const _accent = accent || tone;
  if (kind === "dress" || kind === "dress-long") {
    return (
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid meet" style={full ? { width: "100%", height: "100%" } : null}>
        <rect width="320" height="400" fill={_bg}/>
        {/* shoulders + body */}
        <path d="M160 70 Q140 90 130 120 Q108 180 96 360 L224 360 Q212 180 190 120 Q180 90 160 70 Z"
              fill={tone}/>
        {/* head */}
        <circle cx="160" cy="60" r="14" fill={tone} opacity="0.9"/>
        {/* neckline highlight */}
        <path d="M148 78 Q160 92 172 78" stroke={_accent} strokeWidth="1" fill="none" opacity="0.4"/>
        {/* fabric fold */}
        <path d="M160 130 Q156 220 148 358" stroke={_accent} strokeWidth="1" fill="none" opacity="0.25"/>
      </svg>
    );
  }
  if (kind === "dress-short") {
    return (
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid meet" style={full ? { width: "100%", height: "100%" } : null}>
        <rect width="320" height="400" fill={_bg}/>
        <path d="M160 80 Q138 100 130 130 Q118 170 100 250 L220 250 Q202 170 190 130 Q182 100 160 80 Z" fill={tone}/>
        <circle cx="160" cy="68" r="13" fill={tone} opacity="0.9"/>
        {/* legs */}
        <rect x="142" y="250" width="8" height="100" fill={tone} opacity="0.85"/>
        <rect x="170" y="250" width="8" height="100" fill={tone} opacity="0.85"/>
      </svg>
    );
  }
  if (kind === "bag") {
    return (
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid meet" style={full ? { width: "100%", height: "100%" } : null}>
        <rect width="320" height="400" fill={_bg}/>
        <path d="M120 160 Q120 110 160 110 Q200 110 200 160" stroke={tone} strokeWidth="6" fill="none" strokeLinecap="round"/>
        <rect x="100" y="160" width="120" height="140" rx="6" fill={tone}/>
        <line x1="100" y1="190" x2="220" y2="190" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <rect x="152" y="220" width="16" height="6" rx="2" fill="rgba(255,255,255,0.4)"/>
      </svg>
    );
  }
  if (kind === "scarf") {
    return (
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid meet" style={full ? { width: "100%", height: "100%" } : null}>
        <rect width="320" height="400" fill={_bg}/>
        <rect x="80" y="120" width="160" height="160" fill={tone} transform="rotate(8 160 200)"/>
        <rect x="80" y="120" width="160" height="160" fill="none" stroke="rgba(0,0,0,0.1)" transform="rotate(8 160 200)"/>
        <rect x="92" y="132" width="136" height="136" fill="none" stroke="rgba(255,255,255,0.25)" transform="rotate(8 160 200)"/>
      </svg>
    );
  }
  if (kind === "jewel") {
    return (
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid meet" style={full ? { width: "100%", height: "100%" } : null}>
        <rect width="320" height="400" fill={_bg}/>
        <circle cx="160" cy="200" r="64" fill="none" stroke={tone} strokeWidth="6"/>
        <circle cx="160" cy="136" r="6" fill={tone}/>
      </svg>
    );
  }
  if (kind === "shoe") {
    return (
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid meet" style={full ? { width: "100%", height: "100%" } : null}>
        <rect width="320" height="400" fill={_bg}/>
        <path d="M80 240 Q80 200 120 200 L220 200 Q240 200 240 220 L240 240 Q220 248 200 248 L100 248 Q80 248 80 240 Z" fill={tone}/>
        <path d="M220 200 L228 168 Q228 158 220 158 Q210 158 210 170 L210 200 Z" fill={tone}/>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 320 400" style={full ? { width: "100%", height: "100%" } : null}><rect width="320" height="400" fill={_bg}/></svg>
  );
}

/* ============================================================
   Navbar
   ============================================================ */
function Navbar({ cartCount = 0, onOpenCart, active }) {
  const items = [
    { id: "boutique", label: "Boutique" },
    { id: "robes", label: "Robes" },
    { id: "sacs", label: "Sacs" },
    { id: "access", label: "Accessoires" },
    { id: "edition", label: "Édition limitée" },
  ];
  return (
    <header className="ml-nav">
      <div className="ml-nav__inner">
        <a className="ml-nav__brand" href="#">Maison Lior</a>
        <nav className="ml-nav__menu">
          {items.map(i => (
            <a key={i.id} href="#" style={active === i.id ? { opacity: 1, fontWeight: 500 } : null}>{i.label}</a>
          ))}
        </nav>
        <div className="ml-nav__icons">
          <button className="ml-iconbtn" aria-label="Recherche">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          </button>
          <button className="ml-iconbtn" aria-label="Compte">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="9" r="3.5"/><path d="M5 20c0-4 3-6 7-6s7 2 7 6"/></svg>
          </button>
          <button className="ml-iconbtn" aria-label="Panier" onClick={onOpenCart}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7h12l-1.5 12h-9z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg>
            {cartCount > 0 && <span className="ml-cart-count">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   Promo bar
   ============================================================ */
function PromoBar({ children }) {
  return (
    <div className="ml-promo">
      {children || <>Livraison offerte dès 500 €. Retours sous 30 jours. <a href="#">En savoir plus</a></>}
    </div>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  return (
    <footer className="ml-footer">
      <div className="ml-container ml-footer__inner">
        <div>
          <p className="t-eyebrow">Boutique</p>
          <ul>
            <li><a href="#">Robes</a></li>
            <li><a href="#">Sacs</a></li>
            <li><a href="#">Accessoires</a></li>
            <li><a href="#">Nouveautés</a></li>
            <li><a href="#">Édition limitée</a></li>
          </ul>
        </div>
        <div>
          <p className="t-eyebrow">Aide</p>
          <ul>
            <li><a href="#">Livraison &amp; retrait</a></li>
            <li><a href="#">Retours</a></li>
            <li><a href="#">Guide des tailles</a></li>
            <li><a href="#">Entretien des matières</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="t-eyebrow">Maison Lior</p>
          <ul>
            <li><a href="#">L'atelier</a></li>
            <li><a href="#">Le magasin</a></li>
            <li><a href="#">Carrières</a></li>
            <li><a href="#">Presse</a></li>
          </ul>
        </div>
        <div>
          <p className="t-eyebrow">Lettre</p>
          <p className="ml-footer__news">Recevez nos nouveautés, deux fois par saison. Sans bruit.</p>
          <form className="ml-footer__form" onSubmit={e => e.preventDefault()}>
            <input className="ml-input" placeholder="vous@exemple.fr"/>
            <button className="ml-btn ml-btn--primary ml-btn--sm" type="submit">S'inscrire</button>
          </form>
        </div>
      </div>
      <div className="ml-container ml-footer__legal">
        <span>© 2026 Maison Lior — 12 rue d'Aboukir, 75002 Paris</span>
        <span><a href="#">Mentions légales</a> · <a href="#">CGV</a> · <a href="#">Confidentialité</a> · <a href="#">Cookies</a></span>
      </div>
    </footer>
  );
}

/* ============================================================
   Catalogue: dataset
   ============================================================ */
const PRODUCTS = [
  { id: "p1", name: "Robe Lior",      sub: "Soie sablée, noir",          price: "1 290 €", priceNum: 1290, badge: "Nouveau",          tone: "#1D1D1F", bg: "#EFEAE0", kind: "dress",        sizes: ["34","36","38","40"] },
  { id: "p2", name: "Robe Calliope",  sub: "Crêpe, ivoire",              price: "1 450 €", priceNum: 1450, badge: "Édition limitée",  tone: "#E5DFD0", bg: "#FAF7F0", kind: "dress",        sizes: ["36","38","40"] },
  { id: "p3", name: "Robe Octavie",   sub: "Velours, prune profond",     price: "1 690 €", priceNum: 1690, badge: null,               tone: "#3A1E2C", bg: "#EDE3E1", kind: "dress",        sizes: ["34","36","38","40","42"] },
  { id: "p4", name: "Robe Aurélie",   sub: "Mousseline, écru",           price: "1 380 €", priceNum: 1380, badge: "Nouveau",          tone: "#E8E0CF", bg: "#F5F0E5", kind: "dress-short",  sizes: ["34","36","38"] },
  { id: "p5", name: "Robe Margaux",   sub: "Sergé de laine, noir",       price: "1 180 €", priceNum: 1180, badge: null,               tone: "#1D1D1F", bg: "#F5F5F7", kind: "dress-short",  sizes: ["34","36","38","40"] },
  { id: "p6", name: "Robe Iliane",    sub: "Satin duchesse, bleu nuit",  price: "1 520 €", priceNum: 1520, badge: null,               tone: "#1B2540", bg: "#E8E9EE", kind: "dress",        sizes: ["36","38","40"] },
  { id: "p7", name: "Robe Soraya",    sub: "Tulle brodé, champagne",     price: "1 850 €", priceNum: 1850, badge: "Édition limitée",  tone: "#C9A96E", bg: "#F4ECDB", kind: "dress",        sizes: ["36","38"] },
  { id: "p8", name: "Robe Olympe",    sub: "Crêpe Georgette, écru",      price: "1 220 €", priceNum: 1220, badge: null,               tone: "#EDE5D5", bg: "#F5F0E5", kind: "dress-short",  sizes: ["34","36","38","40"] },
  { id: "p9", name: "Sac Aurore",     sub: "Cuir grainé, fauve",         price: "980 €",   priceNum: 980,  badge: null,               tone: "#A78866", bg: "#F2EAE0", kind: "bag",          sizes: [] },
  { id: "p10", name: "Sac Émilie",    sub: "Cuir lisse, noir",           price: "1 120 €", priceNum: 1120, badge: "Stock limité",     tone: "#1D1D1F", bg: "#F5F5F7", kind: "bag",          sizes: [] },
  { id: "p11", name: "Carré Aria",    sub: "Soie, ton champagne",        price: "320 €",   priceNum: 320,  badge: null,               tone: "#C9A96E", bg: "#F4ECDB", kind: "scarf",        sizes: [] },
  { id: "p12", name: "Bracelet Iris", sub: "Or jaune 18 ct",             price: "780 €",   priceNum: 780,  badge: null,               tone: "#D8B26A", bg: "#F4ECDB", kind: "jewel",        sizes: [] },
];

/* ============================================================
   Product card (with hover quick-view)
   ============================================================ */
function ProductCard({ p, onClick, showQuick = true }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      className={`ml-pcard ${hover ? "is-hover" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div className="ml-pcard__img">
        {p.badge && <span className={`ml-badge ${p.badge === "Édition limitée" ? "is-warm" : "is-dark"}`}>{p.badge}</span>}
        <div className="ml-pcard__inner">
          <Silhouette kind={p.kind} tone={p.tone} bg={p.bg} full/>
        </div>
        {showQuick && (
          <button className="ml-pcard__quick" onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}>Vue rapide</button>
        )}
      </div>
      <div className="ml-pcard__meta">
        <div className="ml-pcard__name">{p.name}</div>
        <div className="ml-pcard__sub">{p.sub}</div>
        <div className="ml-pcard__price">{p.price}</div>
      </div>
    </article>
  );
}

/* ============================================================
   Editorial photo placeholders (for hero, edito band)
   ============================================================ */
function HeroPhoto() {
  return (
    <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="herobg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2EBDC"/>
          <stop offset="1" stopColor="#D8C7AA"/>
        </linearGradient>
        <linearGradient id="herofloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C9B894"/>
          <stop offset="1" stopColor="#A89677"/>
        </linearGradient>
        <radialGradient id="herospot" cx="0.65" cy="0.3" r="0.7">
          <stop offset="0" stopColor="rgba(255,255,255,0.45)"/>
          <stop offset="1" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#herobg)"/>
      <rect y="700" width="1600" height="200" fill="url(#herofloor)" opacity="0.55"/>
      <rect width="1600" height="900" fill="url(#herospot)"/>

      {/* Model with long dress, off-center to right */}
      <g transform="translate(1080 260)">
        <ellipse cx="0" cy="640" rx="220" ry="14" fill="rgba(0,0,0,0.07)"/>
        {/* dress */}
        <path d="M0 0
                 Q-30 60 -42 130
                 Q-58 220 -82 460
                 Q-94 580 -120 640
                 L120 640
                 Q94 580 82 460
                 Q58 220 42 130
                 Q30 60 0 0 Z"
              fill="#1D1D1F"/>
        {/* fabric folds */}
        <path d="M0 20 Q-4 250 -40 630" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none"/>
        <path d="M0 20 Q4 250 40 630" stroke="rgba(255,255,255,0.06)" strokeWidth="2" fill="none"/>
        {/* shoulders + neck */}
        <path d="M-42 -8 Q0 -18 42 -8 L40 8 Q0 -2 -40 8 Z" fill="#1D1D1F"/>
        {/* skin highlights */}
        <path d="M-38 -10 Q-10 -28 0 -28 Q10 -28 38 -10" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none"/>
        {/* head */}
        <ellipse cx="0" cy="-56" rx="32" ry="38" fill="#E5C9A6"/>
        {/* hair */}
        <path d="M-32 -76 Q-36 -94 -8 -96 Q22 -98 30 -78 L30 -52 Q24 -64 0 -68 Q-22 -64 -32 -52 Z" fill="#2A1F18"/>
        {/* arms hint */}
        <path d="M-46 4 Q-70 80 -78 200" stroke="#1D1D1F" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.95"/>
        <path d="M46 4 Q70 80 78 200" stroke="#1D1D1F" strokeWidth="14" fill="none" strokeLinecap="round" opacity="0.95"/>
      </g>

      {/* film grain overlay */}
      <rect width="1600" height="900" fill="rgba(0,0,0,0.02)"/>
    </svg>
  );
}

function EditorialPhoto({ tone = "#E5DFD0", accent = "#1D1D1F" }) {
  return (
    <svg viewBox="0 0 800 640" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="ed-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={tone}/>
          <stop offset="1" stopColor="#C5BBA3"/>
        </linearGradient>
      </defs>
      <rect width="800" height="640" fill="url(#ed-bg)"/>
      <rect x="60" y="60" width="680" height="520" fill="none" stroke="rgba(0,0,0,0.05)"/>
      {/* Hands sewing — abstract */}
      <g transform="translate(400 360)" opacity="0.95">
        <path d="M-200 0 Q-120 -40 0 -30 Q120 -20 200 -10" stroke={accent} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.45"/>
        <ellipse cx="-180" cy="0" rx="60" ry="36" fill="#E5C9A6"/>
        <ellipse cx="180" cy="20" rx="60" ry="36" fill="#E5C9A6"/>
        <path d="M-30 -40 L30 -30 L36 30 L-36 40 Z" fill={accent} opacity="0.85"/>
        <line x1="-30" y1="-40" x2="40" y2="-50" stroke="#fff" strokeWidth="1.5" opacity="0.6"/>
      </g>
      <rect width="800" height="640" fill="rgba(0,0,0,0.015)"/>
    </svg>
  );
}

function UniversArt({ kind }) {
  if (kind === "robes") {
    return (
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="u-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E8DDC9"/><stop offset="1" stopColor="#C8B79B"/>
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#u-r)"/>
        <g transform="translate(200 130)">
          <ellipse cx="0" cy="320" rx="120" ry="8" fill="rgba(0,0,0,0.06)"/>
          <path d="M0 0 Q-18 40 -28 80 Q-44 180 -70 320 L70 320 Q44 180 28 80 Q18 40 0 0 Z" fill="#1D1D1F"/>
          <ellipse cx="0" cy="-22" rx="20" ry="22" fill="#E5C9A6"/>
          <path d="M-22 -40 Q-22 -52 0 -54 Q22 -52 22 -40 L22 -22 Q12 -32 0 -32 Q-12 -32 -22 -22 Z" fill="#2A1F18"/>
        </g>
      </svg>
    );
  }
  if (kind === "sacs") {
    return (
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="u-s" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F0E8DA"/><stop offset="1" stopColor="#D8C7AA"/>
          </linearGradient>
        </defs>
        <rect width="400" height="500" fill="url(#u-s)"/>
        <g transform="translate(200 230)">
          <ellipse cx="0" cy="180" rx="140" ry="10" fill="rgba(0,0,0,0.06)"/>
          <path d="M-90 -30 Q-90 -90 -30 -90 Q30 -90 30 -30" stroke="#A6855E" strokeWidth="8" fill="none" strokeLinecap="round"/>
          <rect x="-110" y="-30" width="220" height="200" rx="8" fill="#A6855E"/>
          <line x1="-110" y1="20" x2="110" y2="20" stroke="rgba(0,0,0,0.18)"/>
          <rect x="-12" y="50" width="24" height="8" rx="2" fill="rgba(255,255,255,0.4)"/>
        </g>
      </svg>
    );
  }
  // accessoires — flat lay
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="u-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F4EBD9"/><stop offset="1" stopColor="#D8C18C"/>
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#u-a)"/>
      <g transform="translate(200 250)">
        <rect x="-160" y="-100" width="200" height="200" fill="#C9A96E" transform="rotate(-12 -60 0)"/>
        <circle cx="60" cy="-40" r="60" fill="none" stroke="#1D1D1F" strokeWidth="6"/>
        <circle cx="60" cy="-100" r="6" fill="#1D1D1F"/>
        <rect x="40" y="60" width="120" height="20" rx="10" fill="#1D1D1F"/>
        <rect x="-100" y="80" width="60" height="40" rx="8" fill="#1D1D1F"/>
      </g>
    </svg>
  );
}

window.Silhouette = Silhouette;
window.Navbar = Navbar;
window.PromoBar = PromoBar;
window.Footer = Footer;
window.PRODUCTS = PRODUCTS;
window.ProductCard = ProductCard;
window.HeroPhoto = HeroPhoto;
window.EditorialPhoto = EditorialPhoto;
window.UniversArt = UniversArt;
