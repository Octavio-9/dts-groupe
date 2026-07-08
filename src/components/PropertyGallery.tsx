"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "./Icon";

export function PropertyGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);

  // No photo available yet (or file missing) — show a neutral placeholder.
  if (!images || images.length === 0 || failed) {
    return (
      <div className="relative aspect-[16/10] w-full rounded-md bg-soft border border-line flex flex-col items-center justify-center gap-3">
        <Icon i="building" size={56} className="text-primary/30" />
        <span className="text-sm font-body text-muted-foreground">
          Photo à venir
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[16/10] w-full rounded-md overflow-hidden bg-soft">
        <Image
          src={images[active]}
          alt={`${title} — photo ${active + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover"
          priority
          onError={() => setFailed(true)}
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-[4/3] rounded-md overflow-hidden border-2 transition-colors ${
                i === active ? "border-primary" : "border-transparent"
              }`}
            >
              <Image
                src={src}
                alt={`${title} — miniature ${i + 1}`}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
