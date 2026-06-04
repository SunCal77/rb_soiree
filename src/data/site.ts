// ─────────────────────────────────────────────────────────────────────────────
// Configuration de la boutique — source de vérité unique.
// ─────────────────────────────────────────────────────────────────────────────
// Toute l'UI lit nom / coordonnées / horaires d'ICI. Aucune coordonnée ne doit
// être codée en dur ailleurs.

export const siteConfig = {
  name: "Ma Robe Soirée",
  tagline: "Vente de robes de soirée pour tous vos événements",

  /** Adresse = point de retrait click-and-collect. */
  address: {
    street: "50 rue des Lys",
    zip: "91150",
    city: "Étampes",
    /** Précision d'accès. */
    note: "Entrée pharmacie, dans le magasin Leclerc",
  },

  hours: {
    daysLabel: "Du mardi au samedi",
    range: "10h00 – 19h00",
    closed: "Fermé dimanche et lundi",
  },

  phone: "+33 6 12 06 97 33",

  // Email non communiqué pour l'instant — placeholder explicite.
  // TODO: remplacer par l'email réel de la boutique.
  email: "contact@marobesoiree.fr",
} as const;

/** Adresse sur une ligne : "50 rue des Lys, 91150 Étampes". */
export const addressLine = `${siteConfig.address.street}, ${siteConfig.address.zip} ${siteConfig.address.city}`;

/** Horaires sur une ligne : "Du mardi au samedi, 10h00 – 19h00". */
export const hoursLine = `${siteConfig.hours.daysLabel}, ${siteConfig.hours.range}`;

/** Lien téléphone (sans espaces) pour href="tel:". */
export const phoneHref = `tel:${siteConfig.phone.replace(/\s+/g, "")}`;

/** Lien email pour href="mailto:". */
export const emailHref = `mailto:${siteConfig.email}`;
