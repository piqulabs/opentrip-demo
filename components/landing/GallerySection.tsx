import Image from "next/image";
import { gallery } from "@/lib/trip-data";

export function GallerySection() {
  return (
    <section id="galeri" className="bg-foam py-14 sm:py-16">
      <div className="px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-banda sm:text-3xl">
            Dari trip sebelumnya
          </h2>
          <p className="mt-2 max-w-[40ch] text-[15px] leading-relaxed text-ink/75">
            Bukan stock photo hotel. Ini dokumentasi peserta open trip kami.
          </p>
        </div>
      </div>

      <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:px-6">
        {gallery.map((shot) => (
          <figure
            key={shot.src}
            className="w-[78vw] max-w-sm shrink-0 snap-center sm:w-[320px]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-jn)] bg-banda/10">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 78vw, 320px"
              />
            </div>
            <figcaption className="mt-2 text-sm text-wood">{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
