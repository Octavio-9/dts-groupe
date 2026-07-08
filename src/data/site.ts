export const site = {
  name: "DTS GROUPE SARL",
  shortName: "DTS GROUPE",
  tagline: "Immobilier · Conakry",
  slogan: "Ensemble, concrétisons vos projets",
  description:
    "Vente, location, construction & gestion immobilière au cœur de Conakry, Guinée.",

  address: {
    line: "Kaporo Pont, face immeuble Braguinée, Ratoma, Conakry",
    city: "Conakry",
    country: "Guinée",
  },

  phones: ["+224 620 82 91 38", "+224 661 89 56 06"],

  // WhatsApp business line (digits only, for wa.me links)
  whatsapp: "224620972706",
  whatsappDisplay: "+224 620 97 27 06",

  email: "dtsgroupesarl@gmail.com",

  hours: "Lun–Ven  09h00–17h00",
  hoursDetail: "Lundi au vendredi, 09h00 – 17h00 · Samedi & dimanche fermé",

  socials: {
    facebook: "https://facebook.com/dtsgroupesarl",
    instagram: "https://instagram.com/dtsgroupesarl",
    tiktok: "https://tiktok.com/@dtsgroupesarl",
  },

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dtsgroupe.com",
} as const;

/** Build a wa.me link with an optional pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const nav = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Nos biens", href: "/biens" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
] as const;
