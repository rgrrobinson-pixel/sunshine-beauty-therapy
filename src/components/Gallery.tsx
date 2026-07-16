"use client";

import Image from "next/image";
import { useState } from "react";
import type { GalleryImage } from "@/sanity/queries";

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const active = activeIndex !== null ? images[activeIndex] : null;

  // Images arrive pre-sorted by display order. If one is marked featured,
  // it gets a larger banner treatment above the rest of the grid; if
  // several are marked featured, the first by order wins.
  const indexed = images.map((img, i) => ({ img, i }));
  const featuredEntry = indexed.find((e) => e.img.featured);
  const restEntries = featuredEntry
    ? indexed.filter((e) => e.i !== featuredEntry.i)
    : indexed;

  return (
    <section id="gallery" className="max-w-content mx-auto px-6 py-20 sm:py-28">
      <div className="max-w-2xl">
        <p className="eyebrow">Gallery</p>
        <h2 className="section-heading mt-3">A glimpse of the studio</h2>
        <p className="mt-4 text-ink/80">
          A few photos of the space, treatments and products — click any
          image to view it larger.
        </p>
      </div>

      {featuredEntry && (
        <button
          onClick={() => setActiveIndex(featuredEntry.i)}
          className="relative mt-12 w-full aspect-[16/7] rounded-2xl overflow-hidden bg-white border border-sage-100 group block"
        >
          <Image
            src={featuredEntry.img.imageUrl}
            alt={featuredEntry.img.caption || "Sunshine Beauty Therapy"}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          {featuredEntry.img.caption && (
            <span className="absolute bottom-4 left-4 rounded-full bg-sage-900/70 px-4 py-1.5 text-sm text-white">
              {featuredEntry.img.caption}
            </span>
          )}
        </button>
      )}

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {restEntries.map(({ img, i }) => (
          <button
            key={img._id}
            onClick={() => setActiveIndex(i)}
            className="relative aspect-square rounded-xl overflow-hidden bg-white border border-sage-100 group"
          >
            <Image
              src={img.imageUrl}
              alt={img.caption || "Sunshine Beauty Therapy"}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-sage-900/90 px-6 py-10"
          onClick={() => setActiveIndex(null)}
        >
          <button
            className="absolute top-6 right-6 text-white text-3xl leading-none"
            onClick={() => setActiveIndex(null)}
            aria-label="Close"
          >
            &times;
          </button>
          <div className="relative w-full max-w-3xl aspect-[4/3]">
            <Image
              src={active.imageUrl}
              alt={active.caption || "Sunshine Beauty Therapy"}
              fill
              className="object-contain"
            />
          </div>
          {active.caption && (
            <p className="absolute bottom-8 text-center text-cream-100/90 text-sm">
              {active.caption}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
