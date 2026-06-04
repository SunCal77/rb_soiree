"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { PromoBar } from "@/components/PromoBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { FilterSection } from "@/components/FilterSection";
import { formatEUR } from "@/lib/format";
import {
  getAllProducts,
  getCategories,
  getCategory,
  getProductsByCategory,
} from "@/lib/catalog";

function toggle<T>(set: Set<T>, value: T): Set<T> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export function BoutiqueContent() {
  // La catégorie vient de l'URL (?cat=robes) — liens navbar/home. Les autres
  // filtres (matière, couleur, taille, prix, tri) sont gérés en état local et
  // appliqués CÔTÉ CLIENT (compatible export statique).
  const params = useSearchParams();
  const catParam = params.get("cat");
  const category = catParam ? getCategory(catParam) : undefined;
  const categories = getCategories();

  // Produits de la catégorie courante (ou tout le catalogue) — base de filtrage.
  const base = useMemo(
    () => (category ? getProductsByCategory(category.slug) : getAllProducts()),
    [category?.slug], // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Options de filtre DÉRIVÉES des données présentes dans la base.
  const materials = useMemo(
    () =>
      Array.from(new Set(base.flatMap((p) => p.materials))).sort((a, b) =>
        a.localeCompare(b, "fr"),
      ),
    [base],
  );
  const colors = useMemo(() => {
    const m = new Map<string, string>();
    base.forEach((p) => p.colors.forEach((c) => m.set(c.name, c.hex)));
    return Array.from(m, ([name, hex]) => ({ name, hex }));
  }, [base]);
  const sizes = useMemo(
    () =>
      Array.from(new Set(base.flatMap((p) => p.sizes))).sort(
        (a, b) => (parseInt(a) || 0) - (parseInt(b) || 0),
      ),
    [base],
  );
  const [pMin, pMax] = useMemo(() => {
    const ps = base.map((p) => p.priceNum);
    return [Math.min(...ps), Math.max(...ps)];
  }, [base]);

  // État des filtres.
  const [selMaterials, setSelMaterials] = useState<Set<string>>(new Set());
  const [selColors, setSelColors] = useState<Set<string>>(new Set());
  const [selSizes, setSelSizes] = useState<Set<string>>(new Set());
  const [price, setPrice] = useState<[number, number] | null>(null);
  const [sort, setSort] = useState("new");

  // Reset des filtres quand on change de catégorie.
  useEffect(() => {
    setSelMaterials(new Set());
    setSelColors(new Set());
    setSelSizes(new Set());
    setPrice(null);
    setSort("new");
  }, [catParam]);

  const curMin = price ? price[0] : pMin;
  const curMax = price ? price[1] : pMax;

  // Comptes par option (dans la base, indépendamment des autres filtres actifs).
  const matCount = (m: string) =>
    base.filter((p) => p.materials.includes(m)).length;
  const colCount = (name: string) =>
    base.filter((p) => p.colors.some((c) => c.name === name)).length;
  const sizeCount = (s: string) =>
    base.filter((p) => p.sizes.includes(s)).length;

  // Application des filtres + tri.
  const filtered = useMemo(() => {
    const r = base.filter(
      (p) =>
        (selMaterials.size === 0 ||
          p.materials.some((m) => selMaterials.has(m))) &&
        (selColors.size === 0 ||
          p.colors.some((c) => selColors.has(c.name))) &&
        (selSizes.size === 0 || p.sizes.some((s) => selSizes.has(s))) &&
        p.priceNum >= curMin &&
        p.priceNum <= curMax,
    );
    const arr = [...r];
    switch (sort) {
      case "price-asc":
        arr.sort((a, b) => a.priceNum - b.priceNum);
        break;
      case "price-desc":
        arr.sort((a, b) => b.priceNum - a.priceNum);
        break;
      case "alpha":
        arr.sort((a, b) => a.name.localeCompare(b.name, "fr"));
        break;
      case "new":
        arr.sort(
          (a, b) =>
            (b.badge === "Nouveau" ? 1 : 0) - (a.badge === "Nouveau" ? 1 : 0),
        );
        break;
    }
    return arr;
  }, [base, selMaterials, selColors, selSizes, curMin, curMax, sort]);

  const priceTouched =
    price !== null && (price[0] !== pMin || price[1] !== pMax);
  const activeCount =
    selMaterials.size + selColors.size + selSizes.size + (priceTouched ? 1 : 0);

  function clearAll() {
    setSelMaterials(new Set());
    setSelColors(new Set());
    setSelSizes(new Set());
    setPrice(null);
  }

  const span = pMax - pMin || 1;
  const pctMin = ((curMin - pMin) / span) * 100;
  const pctMax = ((curMax - pMin) / span) * 100;

  const heading = category ? category.title : "La collection.";

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
            <span className="ml-cat-head__count">{filtered.length} pièces</span>
          </div>
        </div>

        <div className="ml-cat-toolbar">
          <div className="ml-cat-toolbar__chips">
            {[...selMaterials].map((m) => (
              <button key={`m-${m}`} className="ml-chip" type="button" onClick={() => setSelMaterials(toggle(selMaterials, m))}>
                {m}
                <span className="ml-chip__x" aria-label="Retirer">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M6 18L18 6" /></svg>
                </span>
              </button>
            ))}
            {[...selColors].map((c) => (
              <button key={`c-${c}`} className="ml-chip" type="button" onClick={() => setSelColors(toggle(selColors, c))}>
                {c}
                <span className="ml-chip__x" aria-label="Retirer">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M6 18L18 6" /></svg>
                </span>
              </button>
            ))}
            {[...selSizes].map((s) => (
              <button key={`s-${s}`} className="ml-chip" type="button" onClick={() => setSelSizes(toggle(selSizes, s))}>
                Taille {s}
                <span className="ml-chip__x" aria-label="Retirer">
                  <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M6 18L18 6" /></svg>
                </span>
              </button>
            ))}
            {activeCount > 0 && (
              <button className="ml-chip ml-chip--ghost" type="button" onClick={clearAll}>
                Tout effacer
              </button>
            )}
          </div>
          <div className="ml-cat-toolbar__sort">
            <span>Trier par</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
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
                <Link href="/boutique" style={{ color: "inherit", textDecoration: "none", flex: 1, fontWeight: category ? 400 : 600 }}>
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
                  <span className="ml-filter__count">{getProductsByCategory(c.slug).length}</span>
                </label>
              ))}
            </FilterSection>

            {materials.length > 0 && (
              <FilterSection title="Matière">
                {materials.map((m) => (
                  <label className="ml-filter__item" key={m}>
                    <input
                      type="checkbox"
                      checked={selMaterials.has(m)}
                      onChange={() => setSelMaterials(toggle(selMaterials, m))}
                    />
                    {m}
                    <span className="ml-filter__count">{matCount(m)}</span>
                  </label>
                ))}
              </FilterSection>
            )}

            {colors.length > 0 && (
              <FilterSection title="Couleur">
                <div className="ml-filter__color">
                  {colors.map((c) => (
                    <span
                      key={c.name}
                      role="button"
                      tabIndex={0}
                      aria-pressed={selColors.has(c.name)}
                      className={`ml-swatch ${selColors.has(c.name) ? "is-active" : ""}`}
                      style={{ background: c.hex }}
                      title={`${c.name} (${colCount(c.name)})`}
                      onClick={() => setSelColors(toggle(selColors, c.name))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelColors(toggle(selColors, c.name));
                        }
                      }}
                    />
                  ))}
                </div>
              </FilterSection>
            )}

            {sizes.length > 0 && (
              <FilterSection title="Taille">
                <div className="ml-size-grid">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`ml-size-chip ${selSizes.has(s) ? "is-active" : ""}`}
                      onClick={() => setSelSizes(toggle(selSizes, s))}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </FilterSection>
            )}

            {pMax > pMin && (
              <FilterSection title="Prix">
                <div className="ml-range">
                  <div className="ml-range__track">
                    <div className="ml-range__rail" />
                    <div
                      className="ml-range__fill"
                      style={{ left: `${pctMin}%`, width: `${pctMax - pctMin}%` }}
                    />
                    <input
                      className="ml-range__input"
                      type="range"
                      min={pMin}
                      max={pMax}
                      step={10}
                      value={curMin}
                      aria-label="Prix minimum"
                      onChange={(e) =>
                        setPrice([Math.min(Number(e.target.value), curMax), curMax])
                      }
                    />
                    <input
                      className="ml-range__input"
                      type="range"
                      min={pMin}
                      max={pMax}
                      step={10}
                      value={curMax}
                      aria-label="Prix maximum"
                      onChange={(e) =>
                        setPrice([curMin, Math.max(Number(e.target.value), curMin)])
                      }
                    />
                  </div>
                  <div className="ml-range__values">
                    <span>{formatEUR(curMin)}</span>
                    <span>{formatEUR(curMax)}</span>
                  </div>
                </div>
              </FilterSection>
            )}
          </aside>

          <main>
            {filtered.length === 0 ? (
              <div style={{ padding: "56px 0", textAlign: "center" }}>
                <p className="muted" style={{ marginBottom: 12 }}>
                  Aucune pièce ne correspond à ces filtres.
                </p>
                {activeCount > 0 && (
                  <button className="ml-btn ml-btn--secondary" type="button" onClick={clearAll}>
                    Réinitialiser les filtres
                  </button>
                )}
              </div>
            ) : (
              <div className="ml-grid">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            <p className="t-caption" style={{ textAlign: "center", padding: "48px 0 24px" }}>
              {filtered.length} {filtered.length > 1 ? "pièces" : "pièce"}
            </p>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
