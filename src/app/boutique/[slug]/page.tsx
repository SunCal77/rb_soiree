import { notFound } from "next/navigation";
import { PromoBar } from "@/components/PromoBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { PDPInteractive } from "@/components/PDPInteractive";
import { getAllProducts, getProduct } from "@/lib/catalog";

type Params = Promise<{ slug: string }>;

// Génère une page statique par produit (requis pour l'export GitHub Pages).
export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export default async function PDPPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const cross = getAllProducts().filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="ml-screen ml-screen--pdp" data-screen-label="03 Fiche produit">
      <PromoBar />
      <Navbar active={product.categorySlug} />

      <div className="ml-container">
        <PDPInteractive product={product} />

        <section
          className="ml-section ml-section--tight"
          style={{ borderTop: "1px solid var(--border)", padding: "72px 0" }}
        >
          <header className="ml-section__head ml-section__head--row">
            <div className="col" style={{ gap: 6 }}>
              <p className="t-eyebrow">Vous aimerez aussi</p>
              <h2 className="t-h1" style={{ fontSize: 40 }}>
                Pour aller avec.
              </h2>
            </div>
            <a href="/boutique" className="ml-link-blue" style={{ fontSize: 15 }}>
              Voir tout
            </a>
          </header>
          <div className="ml-grid">
            {cross.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
