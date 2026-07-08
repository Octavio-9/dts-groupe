import Link from "next/link";
import type { CSSProperties } from "react";
import { Icon } from "./Icon";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { SmartImage } from "./SmartImage";
import { CountUp } from "./CountUp";
import { site, whatsappLink } from "@/data/site";

// Expected hero photo path — drop the file at /public/hero.jpg and it appears.
// Banani reference prompt: "Modern luxury villa with beautiful garden in
// Conakry Guinea West Africa, architecture, sunny day, aerial view".
const HERO_IMAGE = "/hero.jpg";

const heroGradient = (
  <div
    className="absolute inset-0"
    style={{
      background: "linear-gradient(120deg, #0a2540 0%, #123a5e 45%, #1668b0 100%)",
    }}
  />
);

// NOTE: these figures come from the Banani design and are illustrative marketing
// stats. Confirm/replace with real, verified numbers before going live.
const stats = [
  { num: "200+", label: "Biens gérés" },
  { num: "8", label: "Services" },
  { num: "5+", label: "Années d'expérience" },
  { num: "500+", label: "Clients satisfaits" },
];

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background — real photo when provided, otherwise a gradient placeholder.
          Parallax layer is oversized (-inset) so the scroll drift never reveals
          an edge; the photo itself gets a slow Ken Burns zoom. */}
      <div className="absolute inset-0">
        <div className="dts-parallax absolute -inset-[12%]">
          <SmartImage
            src={HERO_IMAGE}
            alt="Villa moderne à Conakry"
            fill
            priority
            sizes="124vw"
            className="object-cover dts-kenburns"
            fallback={heroGradient}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(10,37,64,0.82) 0%, rgba(10,37,64,0.45) 60%, rgba(10,37,64,0.30) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-5 lg:px-20 py-16 lg:py-0 lg:h-[580px]">
        <div className="max-w-2xl">
          <div
            className="dts-enter inline-flex items-center gap-2 bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-xl mb-5 font-body"
            style={{ "--enter-delay": "0ms" } as CSSProperties}
          >
            <Icon i="map-pin" size={12} />
            Agence immobilière · Conakry, Guinée
          </div>
          <h1
            className="dts-enter font-headings font-bold text-navy-foreground mb-4 text-[34px] leading-[1.1] lg:text-[50px]"
            style={{ "--enter-delay": "120ms" } as CSSProperties}
          >
            Ensemble,
            <br />
            concrétisons
            <br />
            <span className="text-accent">vos projets</span>
          </h1>
          <p
            className="dts-enter font-body text-lg text-navy-foreground/85 mb-8"
            style={{ "--enter-delay": "240ms" } as CSSProperties}
          >
            Vente, location, construction &amp; gestion immobilière
            <br className="hidden sm:block" /> au cœur de Conakry.
          </p>
          <div
            className="dts-enter flex flex-wrap items-center gap-3"
            style={{ "--enter-delay": "360ms" } as CSSProperties}
          >
            <Link
              href="/biens"
              className="font-body font-medium text-sm bg-accent text-accent-foreground px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-accent/90 transition-colors"
            >
              Voir nos biens
              <Icon i="arrow-right" size={16} />
            </Link>
            <a
              href={whatsappLink("Bonjour, je souhaite des informations sur vos services immobiliers.")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-medium text-sm bg-whatsapp text-whatsapp-foreground px-6 py-3 rounded-xl flex items-center gap-2 hover:brightness-95 transition"
            >
              <WhatsAppIcon size={16} />
              Nous contacter
            </a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 bg-background px-5 lg:px-20 py-5 flex flex-wrap items-center gap-6 lg:gap-12 border-t border-line">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex items-center gap-3">
            {i > 0 && <div className="hidden lg:block w-px h-8 bg-line" />}
            <div>
              <div className="font-headings font-bold text-2xl text-accent">
                <CountUp value={stat.num} />
              </div>
              <div className="font-body text-xs text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
        <div className="w-full lg:w-auto lg:ml-auto flex items-center gap-2 text-sm text-muted-foreground font-body">
          <Icon i="clock" size={14} />
          {site.hours}
        </div>
      </div>
    </section>
  );
}
