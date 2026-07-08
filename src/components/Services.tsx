import Link from "next/link";
import { Icon } from "./Icon";
import { ServiceCard } from "./ServiceCard";
import { Reveal } from "./Reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <section className="w-full px-5 lg:px-20 py-16 bg-background">
      <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div>
          <div className="text-xs font-medium text-accent font-body uppercase tracking-widest mb-2">
            Ce que nous faisons
          </div>
          <h2 className="font-headings font-bold text-3xl text-ink">Nos services</h2>
          <p className="font-body text-muted-foreground text-base mt-2 max-w-lg">
            De la recherche du bien à la signature, nous vous accompagnons à chaque
            étape de votre projet immobilier.
          </p>
        </div>
        <Link
          href="/services"
          className="font-body text-sm font-medium text-primary border border-primary px-5 py-2.5 rounded-xl flex items-center gap-2 self-start shrink-0 hover:bg-secondary transition-colors"
        >
          Tous les services <Icon i="arrow-right" size={14} />
        </Link>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 80} className="h-full">
            <ServiceCard {...s} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
