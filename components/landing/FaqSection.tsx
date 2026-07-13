"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { faqs } from "@/lib/trip-data";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-foam px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-banda sm:text-3xl">
          FAQ
        </h2>
        <p className="mt-2 text-[15px] text-ink/75">
          Pertanyaan yang sama berulang di DM. Langsung dijawab di sini.
        </p>

        <div className="mt-8 divide-y divide-banda/10 border-y border-banda/10">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-[15px] font-semibold text-banda">
                    {item.q}
                  </span>
                  <CaretDown
                    weight="bold"
                    className={`size-4 shrink-0 text-banda/50 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-4 text-[15px] leading-relaxed text-ink/75">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
