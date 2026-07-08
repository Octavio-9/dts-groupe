import Link from "next/link";
import { Icon } from "./Icon";
import { PropertyCard } from "./PropertyCard";
import { Reveal } from "./Reveal";
import { getFeatured } from "@/lib/properties";

export function FeaturedProperties() {
  const featured = getFeatured();

  return (
    <section className="w-full px-5 lg:px-20 py-16 bg-muted">
      <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <div className="text-xs font-medium text-accent font-body uppercase tracking-widest mb-2">
            Sélection du moment
          </div>
          <h2 className="font-headings font-bold text-3xl text-ink">Biens en vedette</h2>
          <p className="font-body text-muted-foreground text-base mt-2">
            Une sélection de biens à vendre et à louer à Conakry.
          </p>
        </div>
        <Link
          href="/biens"
          className="font-body text-sm font-medium text-primary border border-primary px-5 py-2.5 rounded-xl flex items-center gap-2 self-start shrink-0 hover:bg-secondary transition-colors"
        >
          Voir tout le catalogue <Icon i="arrow-right" size={14} />
        </Link>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <PropertyCard
              slug={p.slug}
              title={p.title}
              transaction={p.transaction}
              type={p.type}
              neighborhood={p.neighborhood}
              city={p.city}
              bedrooms={p.bedrooms}
              bathrooms={p.bathrooms}
              area={p.area}
              price={p.price}
              currency={p.currency}
              image={p.images[0]}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
