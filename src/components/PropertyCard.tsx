import Link from "next/link";
import { Icon } from "./Icon";
import { SmartImage } from "./SmartImage";
import { formatPrice, transactionLabel } from "@/lib/format";

export type PropertyCardData = {
  slug: string;
  title: string;
  transaction: "vente" | "location";
  type: string;
  neighborhood: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  price: number | null;
  currency?: string;
  image?: string;
  illustrative?: boolean;
};

/**
 * PropertyCard was not returned in the Banani payload; built to the brief's spec
 * (orange badge = vente, blue = location) in the design's visual language.
 * The image area is an intentional placeholder until real photos are provided.
 */
export function PropertyCard(p: PropertyCardData) {
  const isVente = p.transaction === "vente";
  return (
    <Link
      href={`/biens/${p.slug}`}
      className="group block bg-background border border-line rounded-md overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      {/* Image (real photo when provided, otherwise placeholder) */}
      <div className="relative h-52 bg-soft flex items-center justify-center overflow-hidden">
        {p.image ? (
          <SmartImage
            src={p.image}
            alt={p.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fallback={<Icon i="building" size={44} className="text-primary/30" />}
          />
        ) : (
          <Icon i="building" size={44} className="text-primary/30" />
        )}
        {/* Transaction badge */}
        <span
          className={`absolute top-3 left-3 text-xs font-medium px-3 py-1 rounded-full text-white ${
            isVente ? "bg-accent" : "bg-primary"
          }`}
        >
          {transactionLabel(p.transaction)}
        </span>
        {p.illustrative && (
          <span className="absolute top-3 right-3 text-[11px] font-medium px-2.5 py-1 rounded-full bg-navy/70 text-white">
            Exemple
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
          <Icon i="map-pin" size={13} className="text-accent shrink-0" />
          {p.neighborhood}, {p.city}
        </div>
        <h3 className="font-headings font-semibold text-base text-ink mt-1 line-clamp-1">
          {p.title}
        </h3>

        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground font-body">
          {p.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Icon i="bed" size={15} /> {p.bedrooms}
            </span>
          )}
          {p.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Icon i="bath" size={15} /> {p.bathrooms}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Icon i="ruler" size={15} /> {p.area} m²
          </span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-line">
          <span className="font-headings font-bold text-base text-primary">
            {formatPrice(p.price, p.currency)}
          </span>
          <span className="text-sm font-medium text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
            Voir <Icon i="arrow-right" size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
