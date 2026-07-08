import propertiesData from "@/data/properties.json";

export type Transaction = "vente" | "location";
export type PropertyType = "maison" | "appartement" | "terrain" | "bureau";
export type PropertyStatus = "disponible" | "vendu" | "loue";

export type Property = {
  id: string;
  slug: string;
  title: string;
  transaction: Transaction;
  type: PropertyType;
  price: number | null;
  currency: string;
  neighborhood: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  furnished: boolean;
  featured: boolean;
  status: PropertyStatus;
  description: string;
  features: string[];
  images: string[];
  createdAt: string;
};

const properties = propertiesData as Property[];

export function getAllProperties(): Property[] {
  return properties;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeatured(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getNeighborhoods(): string[] {
  return Array.from(new Set(properties.map((p) => p.neighborhood))).sort();
}

export type PropertyFilter = {
  transaction?: string;
  type?: string;
  neighborhood?: string;
  q?: string;
};

export function filterProperties(filter: PropertyFilter): Property[] {
  const q = filter.q?.trim().toLowerCase();
  return properties.filter((p) => {
    if (filter.transaction && p.transaction !== filter.transaction) return false;
    if (filter.type && p.type !== filter.type) return false;
    if (filter.neighborhood && p.neighborhood !== filter.neighborhood) return false;
    if (q) {
      const haystack = `${p.title} ${p.description} ${p.neighborhood} ${p.city} ${p.type}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}
