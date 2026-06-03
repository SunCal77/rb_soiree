"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PromoBar } from "@/components/PromoBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { FilterSection } from "@/components/FilterSection";
import {
  getAllProducts,
  getCategories,
  getCategory,
  getProductsByCategory,
  countByCategory,
} from "@/lib/catalog";

export function BoutiqueContent() {
  // Filtrage CÔTÉ CLIENT : compatible export statique (pas de lecture
  // serveur de l'URL). Le paramètre ?cat=<slug> pilote la catégorie.
  const params = useSearchParams();
  const catParam = params.get("cat");
  const category = catParam ? getCategory(catParam) : undefined;

  const filtered = category
    ? getProductsByCategory(category.slug)
    : getAllProducts();

  const heading = category ? category.title : "La collection.";
  const count = filtered.length;
  const categories = getCategories();

  return (
    <div className="ml-screen ml-screen--boutique" data-screen-label="02 Boutique">
      <PromoBar />
      <Navbar active={category ? category.slug : "boutique"} />

      <div className="ml-container">
        <div className="ml-cat-head">
          <p className="ml-cat-head__crumbs">
            Boutique &nbsp;/&nbsp;{" "}
            <span>{category ? category.label : "La collection"}</span>
          </p>
          <div className="ml-cat-head__row">
            <h1>{heading}</h1>
            <span className="ml-cat-head__count">{count} pièces</span>
          </div>
        </div>

        <div className="ml-cat-toolbar">
          <div className="ml-cat-toolbar__chips">
            {category && (
              <span className="ml-chip">
                {category.label}
                <Link className="ml-chip__x" aria-label="Retirer" href="/boutique">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </Link>
              </span>
            )}
            {category && (
              <Link className="ml-chip" href="/boutique" style={{ background: "transparent", color: "var(--fg-secondary)" }}>
                Tout effacer
              </Link>
            )}
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
              <label className="ml-filter__item">
                <Link href="/boutique" style={{ color: "inherit", textDecoration: "none", flex: 1 }}>
                  Toutes les pièces
                </Link>
                <span className="ml-filter__count">{getAllProducts().length}</span>
              </label>
              {categories.map((c) => (
                <label className="ml-filter__item" key={c.slug}>
                  <input type="checkbox" readOnly checked={category?.slug === c.slug} />
                  <Link href={`/boutique?cat=${c.slug}`} style={{ color: "inherit", textDecoration: "none", flex: 1 }}>
                    {c.label}
                  </Link>
                  <span className="ml-filter__count">{countByCategory(c.slug)}</span>
                </label>
              ))}
            </FilterSection>

            <FilterSection title="Matière">
              <label className="ml-filter__item"><input type="checkbox" defaultChecked /> Soie <span className="ml-filter__count">14</span></label>
              <label className="ml-filter__item"><input type="checkbox" /> Crêpe <span className="ml-filter__count">9</span></label>
              <label className="ml-filter__item"><input type="checkbox" /> Velours <span className="ml-filter__count">6</span></label>
              <label className="ml-filter__item"><input type="checkbox" /> Mousseline <span className="ml-filter__count">5</span></label>
              <label className="ml-filter__item"><input type="checkbox" /> Cuir <span className="ml-filter__count">4</span></label>
            </FilterSection>

            <FilterSection title="Couleur">
              <div className="ml-filter__color">
                <span className="ml-swatch is-active" style={{ background: "#1D1D1F" }} title="Noir" />
                <span className="ml-swatch" style={{ background: "#F4ECDB" }} title="Ivoire" />
                <span className="ml-swatch" style={{ background: "#C9A96E" }} title="Champagne" />
                <span className="ml-swatch" style={{ background: "#3A1E2C" }} title="Prune" />
                <span className="ml-swatch" style={{ background: "#1B2540" }} title="Bleu nuit" />
                <span className="ml-swatch" style={{ background: "#7A1E27" }} title="Bordeaux" />
                <span className="ml-swatch" style={{ background: "#2E3A2A" }} title="Vert sombre" />
                <span className="ml-swatch" style={{ background: "#D4A5A5" }} title="Poudre" />
              </div>
            </FilterSection>

            <FilterSection title="Taille">
              <div className="ml-size-grid">
                {["32","34","36","38","40","42","44","46"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`ml-size-chip ${s === "38" ? "is-active" : ""}`}
                    disabled={s === "32" || s === "46"}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Prix">
              <div className="ml-range">
                <div className="ml-range__bar">
                  <div className="ml-range__fill" style={{ left: "12%", width: "62%" }} />
                  <div className="ml-range__handle" style={{ left: "12%" }} />
                  <div className="ml-range__handle" style={{ left: "74%" }} />
                </div>
                <div className="ml-range__values">
                  <span>€ 95</span>
                  <span>€ 1 850</span>
                </div>
              </div>
            </FilterSection>
          </aside>

          <main>
            {filtered.length === 0 ? (
              <p className="muted" style={{ padding: "48px 0" }}>
                Aucune pièce dans cette catégorie pour le moment.
              </p>
            ) : (
              <div className="ml-grid">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            <p className="t-caption" style={{ textAlign: "center", padding: "48px 0 24px" }}>
              {count} sur {count} pièces
            </p>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
