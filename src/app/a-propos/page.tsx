import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "À propos de DTS GROUPE SARL",
  description:
    "DTS GROUPE SARL est une agence immobilière à Conakry : vente, location, gestion et construction. Découvrez notre mission et nos valeurs.",
  alternates: { canonical: "/a-propos" },
};

const values = [
  {
    icon: "shield-check",
    title: "Confiance & transparence",
    desc: "Des transactions claires, des biens vérifiés et un accompagnement honnête à chaque étape.",
  },
  {
    icon: "users",
    title: "Proximité",
    desc: "Une équipe locale, disponible et à l'écoute de vos besoins à Conakry et en Guinée.",
  },
  {
    icon: "file-check",
    title: "Rigueur juridique",
    desc: "Baux, titres fonciers et documents officiels conformes à la réglementation.",
  },
  {
    icon: "lightbulb",
    title: "Conseil",
    desc: "Un accompagnement personnalisé pour réussir votre achat, location ou investissement.",
  },
];

export default function AProposPage() {
  return (
    <main>
      <PageHero
        eyebrow="À propos"
        title="Ensemble, concrétisons vos projets"
        subtitle="DTS GROUPE SARL est une agence immobilière basée à Conakry, spécialisée dans la vente, la location, la gestion et la construction."
      />

      <section className="w-full px-5 lg:px-20 py-16 bg-background">
        <Reveal className="max-w-3xl">
          <h2 className="font-headings font-bold text-2xl text-ink mb-4">
            Qui sommes-nous ?
          </h2>
          <div className="font-body text-base text-muted-foreground leading-relaxed space-y-4">
            <p>
              DTS GROUPE SARL accompagne particuliers et entreprises dans tous
              leurs projets immobiliers à Conakry : achat et vente de maisons,
              location d&apos;appartements meublés, terrains, gestion locative,
              construction et rénovation.
            </p>
            <p>
              Notre objectif est simple : vous offrir un service fiable,
              transparent et réactif, de la recherche du bien jusqu&apos;à la
              signature — et au-delà, grâce à notre service de gestion.
            </p>
          </div>

          {/* Honest placeholder: to be completed by the agency */}
          <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground font-body bg-muted border border-line rounded-md p-4">
            <Icon i="info" size={15} className="text-primary mt-0.5 shrink-0" />
            <span>
              <strong className="text-ink">À compléter par DTS GROUPE :</strong>{" "}
              année de création, agrément officiel, historique et chiffres clés
              vérifiés. Ces informations ne sont pas encore affichées pour éviter
              toute affirmation non confirmée.
            </span>
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <h2 className="font-headings font-bold text-2xl text-ink mb-8">
            Nos valeurs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-background border border-line rounded-md p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="w-10 h-10 rounded-md bg-soft flex items-center justify-center mb-4">
                  <Icon i={v.icon} size={18} className="text-primary" />
                </div>
                <div className="font-headings font-semibold text-base text-ink">
                  {v.title}
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mt-1.5">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Quick contact facts */}
        <Reveal className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 border border-line rounded-md p-5">
            <Icon i="map-pin" size={18} className="text-accent mt-0.5 shrink-0" />
            <div>
              <div className="font-headings font-semibold text-sm text-ink">Adresse</div>
              <p className="font-body text-sm text-muted-foreground mt-1">{site.address.line}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-line rounded-md p-5">
            <Icon i="clock" size={18} className="text-accent mt-0.5 shrink-0" />
            <div>
              <div className="font-headings font-semibold text-sm text-ink">Horaires</div>
              <p className="font-body text-sm text-muted-foreground mt-1">{site.hoursDetail}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 border border-line rounded-md p-5">
            <Icon i="mail" size={18} className="text-accent mt-0.5 shrink-0" />
            <div>
              <div className="font-headings font-semibold text-sm text-ink">Email</div>
              <p className="font-body text-sm text-muted-foreground mt-1">{site.email}</p>
            </div>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <CtaBanner />
      </Reveal>
    </main>
  );
}
