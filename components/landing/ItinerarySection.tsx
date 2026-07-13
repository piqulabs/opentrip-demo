"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { itinerary } from "@/lib/trip-data";

export function ItinerarySection() {
  const [openDay, setOpenDay] = useState(1);

  return (
    <section id="itinerary" className="bg-foam px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-banda sm:text-3xl">
          Itinerary hari per hari
        </h2>
        <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-ink/75">
          Jam, spot, makan, dan logistik yang biasanya ditanya di DM. Bisa bergeser
          karena cuaca atau aturan TN.
        </p>

        <div className="mt-8 space-y-3">
          {itinerary.map((day) => {
            const open = openDay === day.day;
            return (
              <div
                key={day.day}
                className="overflow-hidden rounded-[var(--radius-jn)] border border-banda/10 bg-salt"
              >
                <button
                  type="button"
                  className="flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-foam/80"
                  aria-expanded={open}
                  onClick={() => setOpenDay(open ? 0 : day.day)}
                >
                  <span className="font-mono-num mt-0.5 text-sm font-medium text-shallow">
                    H{day.day}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[15px] font-semibold text-banda">
                      {day.title}
                    </span>
                    <span className="mt-0.5 block text-sm text-wood">
                      {day.overnight}
                    </span>
                  </span>
                  <CaretDown
                    weight="bold"
                    className={`mt-1 size-4 shrink-0 text-banda/60 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {open && (
                  <ol className="border-t border-banda/10 px-4 pb-4 pt-2">
                    {day.blocks.map((block) => (
                      <li
                        key={`${day.day}-${block.time}-${block.title}`}
                        className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-banda/5 py-3 last:border-0 sm:grid-cols-[6.5rem_1fr]"
                      >
                        <span className="font-mono-num text-xs font-medium text-shallow sm:text-sm">
                          {block.time}
                        </span>
                        <div>
                          <p className="text-[15px] font-semibold text-ink">
                            {block.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-ink/70">
                            {block.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
