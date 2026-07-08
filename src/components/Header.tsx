"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { site, nav, whatsappLink } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b border-line transition-shadow ${
        scrolled ? "shadow-soft" : ""
      }`}
    >
      <div className="flex items-center justify-between px-5 lg:px-12" style={{ height: "72px" }}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Logo className="h-11 w-auto" />
          <div>
            <div className="font-headings font-bold text-base text-navy leading-tight">
              {site.shortName}
            </div>
            <div className="text-xs text-muted-foreground font-body leading-tight">
              {site.tagline}
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-body text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href) ? "text-primary" : "text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${site.phones[0].replace(/\s/g, "")}`}
            className="font-body text-sm font-medium text-primary border border-primary px-4 py-2 rounded-xl hover:bg-secondary transition-colors"
          >
            {site.phones[0]}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-medium text-whatsapp-foreground bg-whatsapp px-5 py-2 rounded-xl flex items-center gap-2 hover:brightness-95 transition"
          >
            <WhatsAppIcon size={16} />
            WhatsApp
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-ink hover:bg-muted transition-colors"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="lg:hidden border-t border-line bg-background px-5 py-4">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-body text-sm font-medium py-2.5 px-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-secondary"
                    : "text-ink hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 mt-4">
            <a
              href={`tel:${site.phones[0].replace(/\s/g, "")}`}
              className="font-body text-sm font-medium text-primary border border-primary px-4 py-2.5 rounded-xl text-center"
            >
              {site.phones[0]}
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-medium text-whatsapp-foreground bg-whatsapp px-5 py-2.5 rounded-xl flex items-center justify-center gap-2"
            >
              <WhatsAppIcon size={16} />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
