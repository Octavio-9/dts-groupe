"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "./Icon";

const TYPES = [
  { value: "", label: "Tous les types" },
  { value: "maison", label: "Maison" },
  { value: "appartement", label: "Appartement" },
  { value: "terrain", label: "Terrain" },
  { value: "bureau", label: "Bureau" },
];

const TRANSACTIONS = [
  { value: "", label: "Tout" },
  { value: "vente", label: "Acheter" },
  { value: "location", label: "Louer" },
];

export function PropertyFilters({ neighborhoods }: { neighborhoods: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") ?? "");

  const current = {
    transaction: searchParams.get("transaction") ?? "",
    type: searchParams.get("type") ?? "",
    quartier: searchParams.get("quartier") ?? "",
    q: searchParams.get("q") ?? "",
  };

  const apply = (patch: Partial<typeof current>) => {
    const next = { ...current, ...patch };
    const params = new URLSearchParams();
    if (next.transaction) params.set("transaction", next.transaction);
    if (next.type) params.set("type", next.type);
    if (next.quartier) params.set("quartier", next.quartier);
    if (next.q.trim()) params.set("q", next.q.trim());
    const qs = params.toString();
    router.push(qs ? `/biens?${qs}` : "/biens", { scroll: false });
  };

  const hasFilters =
    current.transaction || current.type || current.quartier || current.q;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        apply({ q });
      }}
      className="bg-background rounded-lg border border-line p-2 flex flex-col lg:flex-row lg:items-center gap-2 shadow-soft"
    >
      {/* Transaction toggle */}
      <div className="flex rounded-md overflow-hidden border border-line self-start lg:self-auto">
        {TRANSACTIONS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => apply({ transaction: t.value })}
            className={`px-4 py-2.5 text-sm font-medium font-body transition-colors ${
              current.transaction === t.value
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="hidden lg:block w-px h-8 bg-line mx-1" />

      {/* Type */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 border border-line rounded-md flex-1 text-sm font-body">
        <Icon i="home" size={15} className="text-muted-foreground shrink-0" />
        <select
          value={current.type}
          onChange={(e) => apply({ type: e.target.value })}
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
          value={current.quartier}
          onChange={(e) => apply({ quartier: e.target.value })}
          className="w-full bg-transparent outline-none py-1 text-ink appearance-none cursor-pointer"
          aria-label="Quartier"
        >
          <option value="">Tous les quartiers</option>
          {neighborhoods.map((n) => (
            <option key={n} value={n}>
              {n}
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

      {hasFilters && (
        <button
          type="button"
          onClick={() => {
            setQ("");
            router.push("/biens", { scroll: false });
          }}
          className="text-sm font-medium text-muted-foreground hover:text-accent px-3 py-2.5 whitespace-nowrap transition-colors"
        >
          Réinitialiser
        </button>
      )}
    </form>
  );
}
