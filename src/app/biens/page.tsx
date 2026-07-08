import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertyGrid } from "@/components/PropertyGrid";
import { Icon } from "@/components/Icon";
import { filterProperties, getNeighborhoods } from "@/lib/properties";

export const metadata: Metadata = {
  title: "Nos biens à vendre et à louer à Conakry",
  description:
    "Catalogue des biens immobiliers DTS GROUPE à Conakry : maisons, appartements meublés, terrains et bureaux à vendre ou à louer. Filtrez par type, quartier et transaction.",
  alternates: { canonical: "/biens" },
};

type SearchParams = {
  transaction?: string;
  type?: string;
  quartier?: string;
  q?: string;
};

export default async function BiensPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const results = filterProperties({
    transaction: sp.transaction,
    type: sp.type,
    neighborhood: sp.quartier,
    q: sp.q,
  });
  const neighborhoods = getNeighborhoods();

  return (
    <main>
      <PageHero
        eyebrow="Catalogue"
        title="Nos biens"
        subtitle="Maisons, appartements meublés, terrains et bureaux à vendre ou à louer à Conakry. Les biens ci-dessous sont des exemples illustratifs."
      />

      <section className="w-full px-5 lg:px-20 py-10 bg-soft">
        <Suspense fallback={<div className="h-16" />}>
          <PropertyFilters neighborhoods={neighborhoods} />
        </Suspense>
      </section>

      <section className="w-full px-5 lg:px-20 py-12 bg-background">
        <div className="flex items-center justify-between mb-6">
          <p className="font-body text-sm text-muted-foreground">
            {results.length} bien{results.length > 1 ? "s" : ""} trouvé
            {results.length > 1 ? "s" : ""}
          </p>
        </div>

        {results.length > 0 ? (
          <PropertyGrid properties={results} />
        ) : (
          <div className="border border-line rounded-md bg-muted py-16 px-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-soft flex items-center justify-center mb-4">
              <Icon i="search" size={22} className="text-primary" />
            </div>
            <h2 className="font-headings font-semibold text-lg text-ink mb-1">
              Aucun bien ne correspond à votre recherche
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-md">
              Essayez d&apos;élargir vos critères, ou contactez-nous directement :
              nous avons peut-être le bien qu&apos;il vous faut.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
