// Préfixe un chemin de `public/` avec le base path GitHub Pages.
//
// En statique sous https://<user>.github.io/<repo>/, un chemin absolu comme
// `/images/...` pointerait vers la racine du domaine (404). Cette fonction
// ajoute le base path (`/<repo>`), renseigné au build via NEXT_PUBLIC_BASE_PATH
// (voir next.config.ts). En local, le base path est vide → chemin inchangé.
//
// ⚠️ Toujours référencer les assets de `public/` via ce helper.
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) return path; // URL externe ou relative : on ne touche pas
  return `${base}${path}`;
}
