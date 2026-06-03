"use client";

import { getCategories } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="ml-footer">
      <div className="ml-container ml-footer__inner">
        <div>
          <p className="t-eyebrow">Boutique</p>
          <ul>
            {getCategories().map((c) => (
              <li key={c.slug}>
                <a href={`/boutique?cat=${c.slug}`}>{c.label}</a>
              </li>
            ))}
            <li><a href="/boutique?sort=new">Nouveautés</a></li>
          </ul>
        </div>
        <div>
          <p className="t-eyebrow">Aide</p>
          <ul>
            <li><a href="#">Livraison &amp; retrait</a></li>
            <li><a href="#">Retours</a></li>
            <li><a href="#">Guide des tailles</a></li>
            <li><a href="#">Entretien des matières</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="t-eyebrow">Maison Lior</p>
          <ul>
            <li><a href="#">L&apos;atelier</a></li>
            <li><a href="#">Le magasin</a></li>
            <li><a href="#">Carrières</a></li>
            <li><a href="#">Presse</a></li>
          </ul>
        </div>
        <div>
          <p className="t-eyebrow">Lettre</p>
          <p className="ml-footer__news">
            Recevez nos nouveautés, deux fois par saison. Sans bruit.
          </p>
          <form className="ml-footer__form" onSubmit={(e) => e.preventDefault()}>
            <input className="ml-input" placeholder="vous@exemple.fr" />
            <button className="ml-btn ml-btn--primary ml-btn--sm" type="submit">
              S&apos;inscrire
            </button>
          </form>
        </div>
      </div>
      <div className="ml-container ml-footer__legal">
        <span>© 2026 Maison Lior — 12 rue d&apos;Aboukir, 75002 Paris</span>
        <span>
          <a href="#">Mentions légales</a> · <a href="#">CGV</a> ·{" "}
          <a href="#">Confidentialité</a> · <a href="#">Cookies</a>
        </span>
      </div>
    </footer>
  );
}
