"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { getCategories } from "@/lib/catalog";

// Menu data-driven : « Boutique » + chaque catégorie de la taxonomie. Ajouter
// une catégorie dans src/data/categories.ts l'affiche ici automatiquement.
const ITEMS: { id: string; label: string; href: string }[] = [
  { id: "boutique", label: "Boutique", href: "/boutique" },
  ...getCategories().map((c) => ({
    id: c.slug,
    label: c.navLabel,
    href: `/boutique?cat=${c.slug}`,
  })),
];

export function Navbar({ active }: { active?: string }) {
  const { count, openCart } = useCart();
  return (
    <header className="ml-nav">
      <div className="ml-nav__inner">
        <Link className="ml-nav__brand" href="/">
          Maison Lior
        </Link>
        <nav className="ml-nav__menu">
          {ITEMS.map((i) => (
            <Link
              key={i.id}
              href={i.href}
              style={active === i.id ? { opacity: 1, fontWeight: 500 } : undefined}
            >
              {i.label}
            </Link>
          ))}
        </nav>
        <div className="ml-nav__icons">
          <button className="ml-iconbtn" aria-label="Recherche" type="button">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>
          <button className="ml-iconbtn" aria-label="Compte" type="button">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="9" r="3.5" />
              <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
            </svg>
          </button>
          <button
            className="ml-iconbtn"
            aria-label="Panier"
            type="button"
            onClick={openCart}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 7h12l-1.5 12h-9z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            {count > 0 && <span className="ml-cart-count">{count}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}
