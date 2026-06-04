import Link from "next/link";
import Image from "next/image";
import { PromoBar } from "@/components/PromoBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Carousel } from "@/components/Carousel";
import { asset } from "@/lib/asset";
import {
  getAllProducts,
  getFeaturedCategories,
  getProductsByCategory,
  countByCategory,
} from "@/lib/catalog";

// La robe de référence (la plus belle) — ouvre la box « Robes ».
const REFERENCE_DRESS = "/images/home/editorial.png";

// Images défilantes d'une grande box « univers ».
function universImages(slug: string): string[] {
  const prods = getProductsByCategory(slug);
  if (slug === "robes") {
    return [
      REFERENCE_DRESS,
      ...prods.map((p) => p.images[0]).filter(Boolean),
    ].slice(0, 6);
  }
  // Sacs / accessoires : on fait défiler plusieurs vues.
  return prods.flatMap((p) => p.images).slice(0, 6);
}

// Images d'accessoires pour le bloc éditorial du bas.
function accessoryImages(): string[] {
  return getProductsByCategory("accessoires")
    .flatMap((p) => p.images)
    .slice(0, 6);
}

export default function HomePage() {
  const products = getAllProducts();
  const newProducts = [products[0], products[1], products[3], products[5]];
  const featured = getFeaturedCategories();
  return (
    <div className="ml-screen ml-screen--home" data-screen-label="01 Home">
      <PromoBar />
      <Navbar active="boutique" />

      <section className="ml-hero">
        <div className="ml-hero__bg" aria-hidden="true">
          <Image
            src={asset("/images/hero/hero.png")}
            alt=""
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "right center" }}
          />
        </div>
        <div className="ml-hero__content">
          <p className="ml-hero__eyebrow">Collection hiver 2026</p>
          <h1 className="ml-hero__title">La nouvelle collection.</h1>
          <p className="ml-hero__sub">
            Pièces d&apos;exception, en quantités limitées.
            <br />
            Confectionnées à Paris.
          </p>
          <div className="ml-hero__cta">
            <Link href="/boutique" className="ml-btn ml-btn--apple-blue ml-btn--lg">
              Découvrir
            </Link>
            <Link href="/boutique" className="ml-btn ml-btn--apple-blue-outline ml-btn--lg">
              Boutique
            </Link>
          </div>
        </div>
      </section>

      <section className="ml-section">
        <div className="ml-container">
          <header className="ml-section__head">
            <p className="t-eyebrow">Nos univers</p>
            <h2 className="t-h1" style={{ fontSize: 48 }}>
              Trois maisons, une signature.
            </h2>
          </header>
          <div className="ml-univers">
            {featured.map((c, i) => (
              <Link
                key={c.slug}
                className="ml-univers__tile"
                href={`/boutique?cat=${c.slug}`}
              >
                <div className="ml-univers__art">
                  <Carousel
                    images={universImages(c.slug)}
                    alt={c.label}
                    mode="auto"
                    fit="cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    interval={3000 + i * 700}
                    priority={i === 0}
                  />
                </div>
                <div className="ml-univers__label">
                  <span className="ml-univers__name">{c.label}</span>
                  <span className="ml-univers__sub">
                    {countByCategory(c.slug)} pièces
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ml-section ml-section--alt">
        <div className="ml-container">
          <header className="ml-section__head ml-section__head--row">
            <div className="col" style={{ gap: 6 }}>
              <p className="t-eyebrow">Nouveautés</p>
              <h2 className="t-h1" style={{ fontSize: 48 }}>
                Arrivages de la semaine.
              </h2>
            </div>
            <Link href="/boutique?sort=new" className="ml-link-blue" style={{ fontSize: 15 }}>
              Voir tout
            </Link>
          </header>
          <div className="ml-grid">
            {newProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="ml-section">
        <div className="ml-container ml-edito">
          <div className="ml-edito__art">
            <Carousel
              images={accessoryImages()}
              alt="Accessoires — Ma Robe Soirée"
              mode="auto"
              fit="cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              interval={3600}
              showDots
            />
          </div>
          <div className="ml-edito__body">
            <p className="t-eyebrow">L&apos;atelier</p>
            <h2 className="t-display" style={{ fontSize: 48 }}>
              Une pièce, une signature.
            </h2>
            <p className="ml-edito__copy">
              Chaque robe est confectionnée à Paris, dans notre atelier rue
              d&apos;Aboukir. Coupes droites, finitions main, étoffes choisies
              chez les tisseurs italiens et lyonnais. Numérotées, livrées
              dans leur écrin.
            </p>
            <div className="row">
              <button className="ml-btn ml-btn--primary" type="button">
                Visiter l&apos;atelier
              </button>
              <a href="#" className="ml-link-blue" style={{ fontSize: 15 }}>
                Notre savoir-faire ›
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
