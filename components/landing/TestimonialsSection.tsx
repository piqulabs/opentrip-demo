"use client";

import Image from "next/image";
import { testimonials } from "@/lib/trip-data";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function TestimonialsSection() {
  return (
    <section
      id="testimoni"
      className="border-y border-banda/8 bg-salt px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-banda sm:text-3xl">
            Kata peserta
          </h2>
          <p className="mt-2 text-[15px] text-ink/75">
            Pendek, spesifik, ada yang kurang sempurna. Itu yang bikin percaya.
          </p>
        </Reveal>

        <Stagger className="mt-8 space-y-8" stagger={0.1}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name} className="flex gap-4">
              <Image
                src={t.photo}
                alt=""
                width={48}
                height={48}
                className="mt-1 size-12 shrink-0 rounded-full object-cover"
              />
              <div>
                <blockquote className="text-[15px] leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                <p className="mt-2 text-sm font-semibold text-banda">{t.name}</p>
                <p className="text-sm text-wood">
                  {t.city} · {t.tripLabel}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
