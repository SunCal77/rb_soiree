"use client";

import { getCategories } from "@/lib/catalog";
import { siteConfig, addressLine, hoursLine, phoneHref, emailHref } from "@/data/site";

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
          <p className="t-eyebrow">Boutique &amp; retrait</p>
          <address className="ml-footer__contact">
            <p className="ml-footer__addr">{addressLine}</p>
            <p>{siteConfig.address.note}</p>
            <p className="ml-footer__contact-row">
              {hoursLine}
              <br />
              {siteConfig.hours.closed}
            </p>
            <p>
              <a href={phoneHref}>{siteConfig.phone}</a>
            </p>
            <p>
              <a href={emailHref}>{siteConfig.email}</a>
            </p>
          </address>
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
        <span>© 2026 {siteConfig.name} — {addressLine}</span>
        <span>
          <a href="#">Mentions légales</a> · <a href="#">CGV</a> ·{" "}
          <a href="#">Confidentialité</a> · <a href="#">Cookies</a>
        </span>
      </div>
    </footer>
  );
}
