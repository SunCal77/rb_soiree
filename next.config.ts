import path from "node:path";
import type { NextConfig } from "next";

// ─────────────────────────────────────────────────────────────────────────────
// Configuration de build — démo 100% statique pour GitHub Pages.
// ─────────────────────────────────────────────────────────────────────────────
// Un site GitHub Pages "project" est servi sous https://<user>.github.io/<repo>/
// donc le chemin de base n'est PAS "/". Le workflow Actions renseigne
// PAGES_BASE_PATH = "/<repo>" au moment du build. En local, la variable est
// absente → basePath vide → le site est servi à la racine (http://localhost:3000).
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Génère un export statique (dossier `out/`) : aucun serveur Node requis.
  output: "export",

  // Préfixe d'URL pour Pages (liens, assets). Vide en local.
  basePath,
  assetPrefix: basePath || undefined,

  // Pas d'optimiseur d'images serveur en statique.
  images: { unoptimized: true },

  // Chaque route devient /dossier/index.html → refresh direct sans 404.
  trailingSlash: true,

  // outputFileTracingRoot épingle ce dossier comme racine du workspace, sinon
  // Next.js remonte vers un package-lock.json sans rapport plus haut.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
