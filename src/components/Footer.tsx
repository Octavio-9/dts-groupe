import Link from "next/link";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { site, nav } from "@/data/site";
import { services } from "@/data/services";

function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.48 17.52 2 12 2S2 6.48 2 12.06c0 5.02 3.66 9.19 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.75 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const contactRows = [
    { icon: "map-pin", text: site.address.line },
    { icon: "phone", text: site.phones[0] },
    { icon: "phone", text: site.phones[1] },
    { icon: "mail", text: site.email },
    { icon: "clock", text: site.hours },
  ];

  return (
    <footer className="w-full bg-navy px-5 lg:px-20 pt-12 pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white rounded-md p-1.5 inline-flex shrink-0">
              <Logo className="h-9 w-auto" />
            </div>
            <div className="font-headings font-bold text-navy-foreground text-base">
              {site.name}
            </div>
          </div>
          <p className="font-body text-sm leading-relaxed mb-5 text-white/60">
            Ensemble, concrétisons vos projets immobiliers à Conakry et en Guinée.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={site.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-navy-foreground"
            >
              <FacebookIcon size={14} />
            </a>
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-navy-foreground"
            >
              <InstagramIcon size={14} />
            </a>
            <a
              href={site.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-navy-foreground"
            >
              <Icon i="video" size={14} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <div className="font-headings font-semibold text-navy-foreground text-sm mb-4">
            Services
          </div>
          <div className="flex flex-col gap-2.5">
            {services.slice(0, 6).map((s) => (
              <Link
                key={s.title}
                href="/services"
                className="font-body text-sm text-white/60 hover:text-white transition-colors"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div className="font-headings font-semibold text-navy-foreground text-sm mb-4">
            Navigation
          </div>
          <div className="flex flex-col gap-2.5">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="font-body text-sm text-white/60 hover:text-white transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="font-headings font-semibold text-navy-foreground text-sm mb-4">
            Contact
          </div>
          <div className="flex flex-col gap-3">
            {contactRows.map((c, i) => (
              <div key={i} className="flex items-start gap-2">
                <Icon i={c.icon} size={13} className="text-accent mt-0.5 shrink-0" />
                <span className="font-body text-sm text-white/60">{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="font-body text-xs text-white/40">
          © {year} {site.name} — Tous droits réservés
        </p>
        <div className="flex items-center gap-1 font-body text-xs text-white/40">
          <Icon i="map-pin" size={11} />
          Conakry, Guinée
        </div>
      </div>
    </footer>
  );
}
