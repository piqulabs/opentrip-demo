"use client";

import Image from "next/image";
import { gallery } from "@/lib/trip-data";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function GallerySection() {
  return (
    <section id="galeri" className="bg-foam py-14 sm:py-16">
      <div className="px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-banda sm:text-3xl">
            Dari trip sebelumnya
          </h2>
          <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-ink/75">
            Bukan stock photo hotel. Ini dokumentasi peserta open trip kami.
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:px-6">
        {gallery.map((shot) => (
          <StaggerItem
            key={shot.src}
            className="w-[78vw] max-w-sm shrink-0 snap-center sm:w-[320px]"
          >
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-jn)] bg-banda/10">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                  sizes="(max-width: 640px) 78vw, 320px"
                />
              </div>
              <figcaption className="mt-2 text-sm text-wood">
                {shot.caption}
              </figcaption>
            </figure>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
