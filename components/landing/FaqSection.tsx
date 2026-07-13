"use client";

import { CaretDown } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { faqs } from "@/lib/trip-data";
import { Reveal } from "@/components/motion/Reveal";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="bg-foam px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-banda sm:text-3xl">
            FAQ
          </h2>
          <p className="mt-2 text-[15px] text-ink/75">
            Pertanyaan yang sama berulang di DM. Langsung dijawab di sini.
          </p>
        </Reveal>

        <div className="mt-8 divide-y divide-banda/10 border-y border-banda/10">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-[15px] font-semibold text-banda">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.25 }}
                    className="inline-flex"
                  >
                    <CaretDown
                      weight="bold"
                      className="size-4 shrink-0 text-banda/50"
                    />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{
                        duration: reduce ? 0 : 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="overflow-hidden text-[15px] leading-relaxed text-ink/75"
                    >
                      <span className="block pb-4">{item.a}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
