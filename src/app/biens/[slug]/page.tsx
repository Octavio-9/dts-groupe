import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { PropertyGallery } from "@/components/PropertyGallery";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import {
  getAllProperties,
  getPropertyBySlug,
} from "@/lib/properties";
import { formatPrice, transactionLabel } from "@/lib/format";
import { site, whatsappLink } from "@/data/site";

export function generateStaticParams() {
  return getAllProperties().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "Bien introuvable" };

  const title = `${property.title} — ${property.neighborhood}, ${property.city}`;
  const description = property.description.slice(0, 155);
  return {
    title,
    description,
    alternates: { canonical: `/biens/${property.slug}` },
    openGraph: { title, description, type: "website" },
  };
}

const TYPE_LABELS: Record<string, string> = {
  maison: "Maison",
  appartement: "Appartement",
  terrain: "Terrain",
  bureau: "Bureau",
};

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const isVente = property.transaction === "vente";
  const waMessage = `Bonjour, je suis intéressé(e) par le bien : ${property.title} (${property.neighborhood}, ${property.city}).`;

  const specs = [
    property.bedrooms > 0 && { icon: "bed", label: "Chambres", value: property.bedrooms },
    property.bathrooms > 0 && { icon: "bath", label: "Salles de bain", value: property.bathrooms },
    { icon: "ruler", label: "Surface", value: `${property.area} m²` },
    { icon: "home", label: "Type", value: TYPE_LABELS[property.type] ?? property.type },
    { icon: "check", label: "Meublé", value: property.furnished ? "Oui" : "Non" },
  ].filter(Boolean) as { icon: string; label: string; value: string | number }[];

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: property.title,
    description: property.description,
    category: TYPE_LABELS[property.type] ?? property.type,
    offers: {
      "@type": "Offer",
      priceCurrency: property.currency,
      ...(property.price != null ? { price: property.price } : {}),
      availability:
        property.status === "disponible"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "RealEstateAgent", name: site.name },
    },
  };

  return (
    <main>
      <JsonLd data={productJsonLd} />

      {/* Breadcrumb */}
      <div className="w-full px-5 lg:px-20 pt-6 bg-background">
        <nav className="flex items-center gap-2 text-sm font-body text-muted-foreground">
          <Link href="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <Link href="/biens" className="hover:text-primary">Nos biens</Link>
          <span>/</span>
          <span className="text-ink line-clamp-1">{property.title}</span>
        </nav>
      </div>

      <section className="w-full px-5 lg:px-20 py-8 bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: gallery + details */}
          <div className="lg:col-span-2">
            <PropertyGallery images={property.images} title={property.title} />

            <Reveal className="mt-8">
              <h2 className="font-headings font-bold text-2xl text-ink mb-3">
                Description
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                {property.description}
              </p>
            </Reveal>

            {property.features.length > 0 && (
              <Reveal className="mt-8">
                <h2 className="font-headings font-bold text-2xl text-ink mb-4">
                  Caractéristiques
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5 text-sm font-body text-ink">
                      <Icon i="check" size={16} className="text-primary shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* Right: sticky info card */}
          <aside className="lg:sticky lg:top-24">
            <div className="border border-line rounded-md p-6 shadow-soft bg-background">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full text-white ${
                    isVente ? "bg-accent" : "bg-primary"
                  }`}
                >
                  {transactionLabel(property.transaction)}
                </span>
                <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-navy/70 text-white">
                  Exemple
                </span>
              </div>

              <h1 className="font-headings font-bold text-xl text-ink leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-body mt-2">
                <Icon i="map-pin" size={14} className="text-accent" />
                {property.neighborhood}, {property.city}
              </div>

              <div className="font-headings font-bold text-2xl text-primary mt-4">
                {formatPrice(property.price, property.currency)}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">
                {specs.map((s) => (
                  <div key={s.label} className="flex items-center gap-2 text-sm font-body">
                    <Icon i={s.icon} size={16} className="text-primary shrink-0" />
                    <span className="text-muted-foreground">{s.label} :</span>
                    <span className="text-ink font-medium ml-auto">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 mt-6">
                <a
                  href={whatsappLink(waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body font-medium text-sm bg-whatsapp text-whatsapp-foreground px-5 py-3 rounded-xl flex items-center justify-center gap-2 hover:brightness-95 transition"
                >
                  <WhatsAppIcon size={16} />
                  Demander sur WhatsApp
                </a>
                <a
                  href={`tel:${site.phones[0].replace(/\s/g, "")}`}
                  className="font-body font-medium text-sm text-primary border border-primary px-5 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
                >
                  <Icon i="phone" size={16} />
                  {site.phones[0]}
                </a>
                <Link
                  href="/contact"
                  className="font-body font-medium text-sm text-muted-foreground hover:text-primary px-5 py-2 flex items-center justify-center gap-2 transition-colors"
                >
                  Envoyer un message
                  <Icon i="arrow-right" size={14} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
