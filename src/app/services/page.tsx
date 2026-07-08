import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Nos services immobiliers à Conakry",
  description:
    "Vente de maisons, location d'appartements meublés, terrains, gestion immobilière, construction, plans architecturaux, baux et conseil : découvrez les services de DTS GROUPE SARL.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Ce que nous faisons"
        title="Nos services immobiliers"
        subtitle="De la recherche du bien à la signature, DTS GROUPE vous accompagne à chaque étape de votre projet immobilier à Conakry et en Guinée."
      />

      <section className="w-full px-5 lg:px-20 py-16 bg-background">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80} className="h-full">
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal>
        <CtaBanner />
      </Reveal>
    </main>
  );
}
