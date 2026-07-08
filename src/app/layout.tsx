import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLd } from "@/components/JsonLd";
import { realEstateAgentJsonLd } from "@/lib/seo";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dtsgroupe.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "DTS GROUPE SARL — Agence immobilière à Conakry | Vente, Location & Construction",
    template: "%s | DTS GROUPE SARL",
  },
  description:
    "DTS GROUPE SARL, votre partenaire immobilier à Conakry : vente et location de maisons, terrains et appartements meublés, gestion et construction.",
  openGraph: {
    type: "website",
    locale: "fr_GN",
    siteName: "DTS GROUPE SARL",
    title: "DTS GROUPE SARL — Agence immobilière à Conakry",
    description:
      "Vente, location, construction et gestion immobilière au cœur de Conakry, Guinée.",
    url: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      // Le script inline ajoute la classe `js` sur <html> avant l'hydratation.
      suppressHydrationWarning
    >
      <body className="bg-background font-body text-ink">
        {/* Marque JS actif avant le premier paint : les révélations au scroll
            ne s'activent qu'avec JS (sans JS, le contenu reste visible). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <JsonLd data={realEstateAgentJsonLd()} />
        <Header />
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
