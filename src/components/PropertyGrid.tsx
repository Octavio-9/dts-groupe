import { PropertyCard } from "./PropertyCard";
import { Reveal } from "./Reveal";
import type { Property } from "@/lib/properties";

export function PropertyGrid({ properties }: { properties: Property[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((p, i) => (
        // Délai plafonné : les premières cartes cascadent, les suivantes suivent vite.
        <Reveal key={p.slug} delay={Math.min(i, 8) * 70}>
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
            illustrative
          />
        </Reveal>
      ))}
    </div>
  );
}
