import { Icon } from "./Icon";

const reasons = [
  {
    icon: "shield-check",
    title: "Expertise locale",
    desc: "Notre connaissance approfondie du marché immobilier de Conakry garantit les meilleures opportunités.",
  },
  {
    icon: "users",
    title: "Accompagnement personnalisé",
    desc: "Un conseiller dédié vous suit de la recherche jusqu'à la signature.",
  },
  {
    icon: "zap",
    title: "Réactivité & disponibilité",
    desc: "Réponse rapide par WhatsApp, disponibles du lundi au vendredi.",
  },
  {
    icon: "file-check",
    title: "Conformité juridique",
    desc: "Tous nos biens sont vérifiés, titres fonciers et documents légaux inclus.",
  },
];

// Illustrative testimonials from the Banani design — replace with real, verified
// client reviews before going live.
const testimonials = [
  {
    name: "Mamadou D.",
    role: "Client – Achat villa",
    text: "DTS GROUPE m'a trouvé la maison idéale en moins de 2 semaines. Professionnalisme irréprochable.",
  },
  {
    name: "Fatoumata S.",
    role: "Cliente – Location appartement",
    text: "Service rapide et transparent. Je recommande vivement pour toute recherche de logement à Conakry.",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function WhyUs() {
  return (
    <section className="w-full px-5 lg:px-20 py-16 bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: Why us */}
        <div>
          <div className="text-xs font-medium text-accent font-body uppercase tracking-widest mb-2">
            Pourquoi nous choisir
          </div>
          <h2 className="font-headings font-bold text-3xl text-ink mb-8">
            Votre partenaire de confiance à Conakry
          </h2>
          <div className="flex flex-col gap-5">
            {reasons.map((r) => (
              <div key={r.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-md bg-soft flex items-center justify-center shrink-0">
                  <Icon i={r.icon} size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-headings font-semibold text-base text-ink">
                    {r.title}
                  </div>
                  <div className="font-body text-sm text-muted-foreground leading-relaxed mt-1">
                    {r.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Testimonials */}
        <div>
          <div className="text-xs font-medium text-accent font-body uppercase tracking-widest mb-2">
            Avis clients
          </div>
          <h2 className="font-headings font-bold text-3xl text-ink mb-8">
            Ils nous ont fait confiance
          </h2>
          <div className="flex flex-col gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-muted border border-line rounded-md p-5">
                <div className="flex items-center gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon key={s} i="star" size={13} className="text-accent" />
                  ))}
                </div>
                <p className="font-body text-sm text-ink leading-relaxed mb-4">
                  &laquo;&nbsp;{t.text}&nbsp;&raquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-headings font-semibold text-xs shrink-0">
                    {initials(t.name)}
                  </div>
                  <div>
                    <div className="font-headings font-semibold text-sm text-ink">
                      {t.name}
                    </div>
                    <div className="font-body text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
