# CLAUDE.md — Contexte projet (boutique e-commerce)

> Contexte permanent lu à chaque session.

## Ce qu'est le projet

Vitrine e-commerce pour une **boutique physique** de robes de soirée et
accessoires pour femmes (**Ma Robe Soirée**, 50 rue des Lys, 91150 Étampes —
entrée pharmacie, dans le magasin Leclerc). La boutique sert de **point de
retrait** : la livraison est en **click-and-collect uniquement** (V1).
Coordonnées centralisées dans `src/data/site.ts`.

Catégories (taxonomie data-driven, les 5 existent) : **robes, sacs, chaussures,
cravates, accessoires**. Robes/sacs/accessoires sont remplis ; chaussures et
cravates ont des produits **placeholder** à enrichir.

Stack : **Next.js 16** (App Router) · TypeScript · React 19 · CSS tokens maison.
Le projet vit à la **racine** du dépôt (plus de sous-dossier `frontend/`).

## Direction visuelle (à préserver absolument)

Esthétique **inspirée d'Apple** : palette neutre (blanc, gris clair #f5f5f7,
near-black #1d1d1f), boutons arrondis « pill », ombres subtiles, flou
d'arrière-plan, typographie type Inter / SF Pro.

## Modèle de données (implémenté dans `src/data/`)

- `src/data/types.ts` — types `Product`, `Variant`, `Category`, `ProductKind`.
- `src/data/categories.ts` — la taxonomie (5 catégories).
- `src/data/products.ts` — le catalogue ; variantes (taille × couleur × matière)
  + **stock par variante** générées par `buildVariants`.
- `src/lib/catalog.ts` — **couche d'accès** (mode mock). TOUTE l'UI lit le
  catalogue via ce module, jamais directement `src/data`. La branche `api`
  (backend V2) n'est pas implémentée.
- Règle clé : ajouter une catégorie/un produit = **ajouter de la donnée**, pas
  réécrire du code. Navbar, home, footer, boutique sont data-driven.

## Contrainte de déploiement

Le site de démo se déploie sur **GitHub Pages** → hébergement **statique
uniquement** (pas de serveur, pas de BDD).

- Le build de démo doit tourner **100% en statique**, en **mode mock** (données
  produits dans des fichiers, aucun appel backend).
- Configurer le **base path** pour `https://<user>.github.io/<repo>/`.

## Conventions de travail

- **Analyser avant de modifier.** Ne pas réécrire ce qui marche.
- Garder la vitrine fonctionnelle en local à tout moment.
- Expliquer les changements importants.
- Images produits : placeholders pour l'instant ; vraies photos (détourées,
  WebP/PNG) ajoutées plus tard dans `public/images/products/<categorie>/`.

## Hors scope (pour l'instant)

- Interface admin → plus tard.
- Vrai backend, paiement réel, base de données → non.
- Point-relais et livraison à domicile → V2 (désactivés en V1).

## Commandes

- Installer : `npm install`
- Lancer en local : `npm run dev` → http://localhost:3000
- Build statique (export) : `npm run build` → dossier `out/`
- Servir le build : `npx serve out`
- Lint : `npm run lint`
- Mode mock : actif par défaut (`NEXT_PUBLIC_DATA_MODE=mock`, voir `.env.example`).
- Base path Pages : `PAGES_BASE_PATH=/<repo>` au build (réglé par le workflow).

Détails complets dans [README.md](README.md).

## Roadmap

1. ✅ Nettoyer + organiser le repo, données mock, déploiement Pages, doc.
2. Charger les vraies photos (voir `public/images/products/README.md`) et produits.
3. Coder l'interface admin.
4. V2 : brancher un backend (mode `api`) + activer point-relais / livraison.