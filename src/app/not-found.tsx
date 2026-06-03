import Link from "next/link";
import { PromoBar } from "@/components/PromoBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Page 404 de marque. En export statique, Next génère aussi `404.html` à partir
// de ce composant — c'est le fallback servi par GitHub Pages.
export default function NotFound() {
  return (
    <div className="ml-screen" data-screen-label="404">
      <PromoBar />
      <Navbar active="boutique" />
      <div
        className="ml-container"
        style={{
          minHeight: "52vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 18,
          padding: "80px 0",
        }}
      >
        <p className="t-eyebrow">Erreur 404</p>
        <h1 className="t-display" style={{ fontSize: 56 }}>
          Page introuvable.
        </h1>
        <p style={{ fontSize: 17, color: "var(--fg-secondary)", maxWidth: 460 }}>
          La pièce que vous cherchez n&apos;existe pas ou a rejoint nos archives.
        </p>
        <Link href="/" className="ml-btn ml-btn--primary ml-btn--lg">
          Retour à l&apos;accueil
        </Link>
      </div>
      <Footer />
    </div>
  );
}
