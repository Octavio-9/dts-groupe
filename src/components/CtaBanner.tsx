import Link from "next/link";
import { Icon } from "./Icon";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { whatsappLink } from "@/data/site";

export function CtaBanner() {
  return (
    <section className="w-full px-5 lg:px-20 py-14 bg-navy flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div>
        <div className="font-headings font-bold text-3xl text-navy-foreground mb-3">
          Vous avez un projet immobilier ?
        </div>
        <p className="font-body text-base text-navy-foreground/70">
          Contactez-nous dès aujourd&apos;hui — nos conseillers vous répondent
          rapidement.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4 shrink-0">
        <Link
          href="/contact"
          className="font-body font-medium text-sm bg-accent text-accent-foreground px-7 py-3 rounded-xl flex items-center gap-2 hover:bg-accent/90 transition-colors"
        >
          Prendre contact
          <Icon i="arrow-right" size={16} />
        </Link>
        <a
          href={whatsappLink("Bonjour, j'ai un projet immobilier et je souhaite en discuter.")}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body font-medium text-sm bg-whatsapp text-whatsapp-foreground px-7 py-3 rounded-xl flex items-center gap-2 hover:brightness-95 transition"
        >
          <WhatsAppIcon size={16} />
          WhatsApp direct
        </a>
      </div>
    </section>
  );
}
