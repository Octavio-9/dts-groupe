import { Icon } from "./Icon";
import type { Service } from "@/data/services";

/**
 * ServiceCard was not returned in the Banani payload; built here in the same
 * visual language as the rest of the design (soft icon tile + headings title).
 */
export function ServiceCard({ icon, title, description }: Service) {
  return (
    <div className="group bg-background border border-line rounded-md p-5 h-full transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="w-10 h-10 rounded-md bg-soft flex items-center justify-center mb-4">
        <Icon i={icon} size={18} className="text-primary" />
      </div>
      <div className="font-headings font-semibold text-base text-ink">{title}</div>
      <p className="font-body text-sm text-muted-foreground leading-relaxed mt-1.5">
        {description}
      </p>
    </div>
  );
}
