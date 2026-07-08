import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/MapEmbed";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site, whatsappLink } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact — DTS GROUPE SARL à Conakry",
  description:
    "Contactez DTS GROUPE SARL à Conakry : Kaporo Pont, face immeuble Braguinée, Ratoma. Téléphone, WhatsApp, email et formulaire de contact.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const contactItems = [
    { icon: "map-pin", label: "Adresse", value: site.address.line },
    { icon: "phone", label: "Téléphone", value: site.phones.join(" · ") },
    { icon: "mail", label: "Email", value: site.email },
    { icon: "clock", label: "Horaires", value: site.hoursDetail },
  ];

  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        subtitle="Une question, une visite, un projet ? Notre équipe vous répond rapidement par téléphone, WhatsApp ou email."
      />

      <section className="w-full px-5 lg:px-20 py-16 bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: info + map */}
          <Reveal>
            <h2 className="font-headings font-bold text-2xl text-ink mb-6">
              Nos coordonnées
            </h2>
            <div className="flex flex-col gap-5 mb-8">
              {contactItems.map((c) => (
                <div key={c.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-soft flex items-center justify-center shrink-0">
                    <Icon i={c.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-headings font-semibold text-sm text-ink">
                      {c.label}
                    </div>
                    <p className="font-body text-sm text-muted-foreground mt-0.5">
                      {c.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={whatsappLink("Bonjour DTS GROUPE, je souhaite un renseignement.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex font-body font-medium text-sm text-whatsapp-foreground bg-whatsapp px-6 py-3 rounded-xl items-center gap-2 hover:brightness-95 transition mb-8"
            >
              <WhatsAppIcon size={16} />
              Discuter sur WhatsApp ({site.whatsappDisplay})
            </a>

            <MapEmbed />
          </Reveal>

          {/* Right: form */}
          <Reveal delay={120}>
            <h2 className="font-headings font-bold text-2xl text-ink mb-6">
              Envoyez-nous un message
            </h2>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
