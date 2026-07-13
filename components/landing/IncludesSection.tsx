"use client";

import { Check, X } from "@phosphor-icons/react";
import { excluded, included } from "@/lib/trip-data";

export function IncludesSection() {
  return (
    <section
      id="biaya"
      className="border-y border-banda/8 bg-salt px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-banda sm:text-3xl">
          Yang termasuk & tidak
        </h2>
        <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-ink/75">
          Blak-blakan. Banyak operator nyembunyiin biaya di DM. Kami tulis di
          sini biar kamu nggak kaget di kapal.
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-10">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-scrub">
              Termasuk
            </h3>
            <ul className="mt-3 space-y-2.5">
              {included.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[15px] leading-snug text-ink"
                >
                  <Check
                    weight="bold"
                    className="mt-0.5 size-4 shrink-0 text-scrub"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-wood">
              Tidak termasuk
            </h3>
            <ul className="mt-3 space-y-2.5">
              {excluded.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[15px] leading-snug text-ink"
                >
                  <X
                    weight="bold"
                    className="mt-0.5 size-4 shrink-0 text-wood"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
