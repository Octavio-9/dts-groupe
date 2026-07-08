import { site } from "@/data/site";

/** JSON-LD describing the agency — injected once in the root layout. */
export function realEstateAgentJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: site.name,
    description: site.description,
    url: site.siteUrl,
    email: site.email,
    telephone: site.phones,
    image: `${site.siteUrl}/og-image.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line,
      addressLocality: site.address.city,
      addressCountry: "GN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.6412,
      longitude: -13.6153,
    },
    areaServed: "Conakry, Guinée",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs: [site.socials.facebook, site.socials.instagram, site.socials.tiktok],
  };
}
