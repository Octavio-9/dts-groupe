import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { Services } from "@/components/Services";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { WhyUs } from "@/components/WhyUs";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Reveal>
        <SearchBar />
      </Reveal>
      {/* Services & FeaturedProperties gèrent leur reveal en interne
          (en-tête + cartes en cascade) pour éviter un double-fondu. */}
      <Services />
      <FeaturedProperties />
      <Reveal>
        <WhyUs />
      </Reveal>
      <Reveal>
        <CtaBanner />
      </Reveal>
    </main>
  );
}
