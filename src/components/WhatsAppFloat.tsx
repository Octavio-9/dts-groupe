import { WhatsAppIcon } from "./WhatsAppIcon";
import { whatsappLink } from "@/data/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Bonjour DTS GROUPE, je souhaite un renseignement.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter DTS GROUPE sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift hover:scale-105 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp opacity-60 animate-ping" />
      <span className="relative">
        <WhatsAppIcon size={28} />
      </span>
    </a>
  );
}
