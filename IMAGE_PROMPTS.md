# Prompts IA — images produits (sacs, chaussures, cravates, accessoires)

> **But** : générer les vraies photos des produits non-robes et les déposer dans
> `public/images/products/<categorie>/` avec **le nom exact** indiqué.
> Le code est **déjà câblé** : dès qu'un fichier au bon nom existe, il s'affiche
> (sinon, silhouette de repli — aucune image cassée). Rien d'autre à coder.

## ⏱️ Plan express (30 min)
1. **Priorité 1 — les couvertures** (fichiers `…-1.png`) : 8 images, une par
   produit → chaque carte du catalogue devient réelle.
2. **Priorité 2 — les vues secondaires** (`…-2.png`, `…-3.png`) pour la galerie.
3. `npm run build` puis push (voir bas de page).

## 🎨 Style commun — À COLLER EN TÊTE DE CHAQUE PROMPT
```
Photorealistic e-commerce product photography of a single luxury item, centered,
isolated on a transparent background (export PNG with alpha) — or a pure seamless
very light grey #F5F5F7 backdrop if transparency is unavailable. Soft diffused
studio lighting, subtle soft shadow beneath the product, 4:5 portrait ratio,
ultra high resolution, sharp focus, minimalist Parisian luxury boutique aesthetic.
No text, no logo, no props, no hands or people. Color-accurate.
```
> Format de sortie : **PNG**, fond **transparent** de préférence (sinon #F5F5F7),
> cadrage **portrait 4:5**, produit bien centré.

---

## 👜 Sacs

### `public/images/products/sacs/sac-aurore-1.png` — couverture
```
…[style commun]… A structured top-handle women's handbag in tan (fawn) grained
calfskin leather, gold-tone clasp, clean architectural shape, front view,
standing upright.
```
### `public/images/products/sacs/sac-aurore-2.png`
```
…[style commun]… Same tan grained leather top-handle handbag, three-quarter
angle view showing the side gusset and depth, gold-tone hardware.
```
### `public/images/products/sacs/sac-aurore-3.png`
```
…[style commun]… Macro close-up of the same tan grained calfskin handbag,
focusing on the grained leather texture and the gold-tone clasp detail.
```

### `public/images/products/sacs/sac-emilie-1.png` — couverture
```
…[style commun]… A minimalist women's handbag in smooth black calfskin leather,
clean structured shape, subtle sheen, front view, standing upright.
```
### `public/images/products/sacs/sac-emilie-2.png`
```
…[style commun]… Same smooth black leather handbag, three-quarter angle view
showing side profile and depth.
```
### `public/images/products/sacs/sac-emilie-3.png`
```
…[style commun]… Same black leather handbag shown slightly open, revealing a
neutral cupro lining interior, elegant.
```

---

## 👠 Chaussures

### `public/images/products/chaussures/escarpin-vesane-1.png` — couverture
```
…[style commun]… A single women's high-heel pump in black patent leather,
pointed toe, 85mm stiletto heel, side profile view.
```
### `public/images/products/chaussures/escarpin-vesane-2.png`
```
…[style commun]… Same black patent leather pump, three-quarter front angle view.
```
### `public/images/products/chaussures/escarpin-vesane-3.png`
```
…[style commun]… A pair of the same black patent pumps, one standing upright and
one gently tilted to show the sole and heel.
```

### `public/images/products/chaussures/sandale-laetitia-1.png` — couverture
```
…[style commun]… A single women's heeled sandal in nude suede, thin delicate
ankle strap, 70mm heel, side profile view.
```
### `public/images/products/chaussures/sandale-laetitia-2.png`
```
…[style commun]… Same nude suede sandal, three-quarter front angle view showing
the straps.
```
### `public/images/products/chaussures/sandale-laetitia-3.png`
```
…[style commun]… Close-up detail of the same nude suede sandal, focusing on the
ankle strap and slim buckle.
```

---

## 👔 Cravates

### `public/images/products/cravates/cravate-augustin-1.png` — couverture
```
…[style commun]… A men's necktie in midnight navy blue woven silk, laid flat
vertically and fully extended, subtle diagonal weave texture, soft sheen.
```
### `public/images/products/cravates/cravate-augustin-2.png`
```
…[style commun]… The same midnight navy woven silk necktie tied in a neat
four-in-hand knot, close-up on the knot.
```

### `public/images/products/cravates/noeud-papillon-leon-1.png` — couverture
```
…[style commun]… A men's bow tie in black silk jacquard, pre-tied, front view,
symmetrical, subtle jacquard pattern.
```
### `public/images/products/cravates/noeud-papillon-leon-2.png`
```
…[style commun]… Close-up detail of the same black silk jacquard bow tie,
focusing on the woven jacquard texture and the adjustable neck band.
```

---

## 💍 Accessoires

### `public/images/products/accessoires/carre-aria-1.png` — couverture
```
…[style commun]… A women's silk scarf in champagne gold tone, folded into a neat
flat square, hand-rolled edges, soft sheen, flat lay top view.
```
### `public/images/products/accessoires/carre-aria-2.png`
```
…[style commun]… The same champagne silk scarf loosely draped and softly knotted,
showing its fluid drape and sheen.
```
### `public/images/products/accessoires/carre-aria-3.png`
```
…[style commun]… Macro close-up of the same champagne silk scarf, focusing on the
hand-rolled edge and the satin weave.
```

### `public/images/products/accessoires/bracelet-iris-1.png` — couverture
```
…[style commun]… An 18-carat yellow gold women's bangle bracelet, simple elegant
rounded form, polished surface, front view.
```
### `public/images/products/accessoires/bracelet-iris-2.png`
```
…[style commun]… The same 18ct yellow gold bracelet at a three-quarter angle,
showing the band profile and clasp.
```
### `public/images/products/accessoires/bracelet-iris-3.png`
```
…[style commun]… Macro close-up of the same 18ct yellow gold bracelet, focusing
on the polished gold surface and the clasp detail.
```

---

## ✅ Une fois les images déposées
```bash
npm run build          # vérifie que tout passe
git add -A
git commit -m "Add real product photos (sacs, chaussures, cravates, accessoires)"
git push
```
Le déploiement GitHub Pages se relance tout seul au push sur `main`.

### Récapitulatif des fichiers attendus (22 images)
| Catégorie | Produit | Fichiers |
|---|---|---|
| sacs | Sac Aurore | `sac-aurore-1..3.png` |
| sacs | Sac Émilie | `sac-emilie-1..3.png` |
| chaussures | Escarpin Vésane | `escarpin-vesane-1..3.png` |
| chaussures | Sandale Lætitia | `sandale-laetitia-1..3.png` |
| cravates | Cravate Augustin | `cravate-augustin-1..2.png` |
| cravates | Nœud papillon Léon | `noeud-papillon-leon-1..2.png` |
| accessoires | Carré Aria | `carre-aria-1..3.png` |
| accessoires | Bracelet Iris | `bracelet-iris-1..3.png` |
