"use client";

import { useState, type ReactNode } from "react";
import Image, { type ImageProps } from "next/image";

/**
 * next/image that gracefully falls back to `fallback` if the file is missing
 * (404) — lets us pre-wire expected image paths without broken images while
 * the real photos are being added to /public.
 */
export function SmartImage({
  fallback,
  ...props
}: Omit<ImageProps, "onError"> & { fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <>{fallback}</>;
  return <Image {...props} onError={() => setFailed(true)} />;
}
