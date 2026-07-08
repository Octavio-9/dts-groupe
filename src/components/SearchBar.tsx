"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./Icon";

const TYPES = [
  { value: "", label: "Type de bien" },
  { value: "maison", label: "Maison" },
  { value: "appartement", label: "Appartement" },
  { value: "terrain", label: "Terrain" },
  { value: "bureau", label: "Bureau" },
];

const NEIGHBORHOODS = [
  { value: "", label: "Quartier" },
  { value: "Kaporo", label: "Kaporo" },
  { value: "Ratoma", label: "Ratoma" },
  { value: "Kipé", label: "Kipé" },
  { value: "Nongo", label: "Nongo" },
  { value: "Kaloum", label: "Kaloum" },
  { value: "Lambanyi", label: "Lambanyi" },
];

export function SearchBar() {
  const router = useRouter();
  const [transaction, setTransaction] = useState<"vente" | "location">("vente");
  const [type, setType] = useState("");
  const [quartier, setQuartier] = useState("");
  const [q, setQ] = useState("");

  const submit = () => {
    const params = new URLSearchParams();
    params.set("transaction", transaction);
    if (type) params.set("type", type);
    if (quartier) params.set("quartier", quartier);
    if (q.trim()) params.set("q", q.trim());
    router.push(`/biens?${params.toString()}`);
  };

  return (
    <div className="w-full bg-soft px-5 lg:px-20 py-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="bg-background rounded-lg border border-line p-2 flex flex-col lg:flex-row lg:items-center gap-2 shadow-soft"
      >
        {/* Transaction toggle */}
        <div className="flex rounded-md overflow-hidden border border-line self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setTransaction("vente")}
            className={`px-4 py-2.5 text-sm font-medium font-body transition-colors ${
              transaction === "vente"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            Acheter
          </button>
          <button
            type="button"
            onClick={() => setTransaction("location")}
            className={`px-4 py-2.5 text-sm font-medium font-body transition-colors ${
              transaction === "location"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            Louer
          </button>
        </div>

        <div className="hidden lg:block w-px h-8 bg-line mx-1" />

        {/* Type */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-md flex-1 text-sm text-ink font-body">
          <Icon i="home" size={15} className="text-muted-foreground shrink-0" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-transparent outline-none py-1 text-ink appearance-none cursor-pointer"
            aria-label="Type de bien"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <Icon i="chevron-down" size={14} className="ml-auto text-muted-foreground shrink-0" />
        </div>

        {/* Neighborhood */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-md flex-1 text-sm font-body">
          <Icon i="map-pin" size={15} className="text-muted-foreground shrink-0" />
          <select
            value={quartier}
            onChange={(e) => setQuartier(e.target.value)}
            className="w-full bg-transparent outline-none py-1 text-ink appearance-none cursor-pointer"
            aria-label="Quartier"
          >
            {NEIGHBORHOODS.map((n) => (
              <option key={n.value} value={n.value}>
                {n.label}
              </option>
            ))}
          </select>
          <Icon i="chevron-down" size={14} className="ml-auto text-muted-foreground shrink-0" />
        </div>

        {/* Keyword */}
        <div className="flex items-center gap-1.5 px-3 py-2.5 border border-line rounded-md flex-1 text-sm font-body">
          <Icon i="search" size={15} className="text-muted-foreground shrink-0" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un bien..."
            className="w-full bg-transparent outline-none text-ink placeholder:text-muted-foreground"
            aria-label="Rechercher un bien"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md font-body font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
        >
          <Icon i="search" size={15} />
          Rechercher
        </button>
      </form>
    </div>
  );
}
