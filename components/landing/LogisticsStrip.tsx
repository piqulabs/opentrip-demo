"use client";

import { Boat, ForkKnife, MapPin, MoonStars } from "@phosphor-icons/react";
import { trip } from "@/lib/trip-data";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const facts = [
  {
    icon: Boat,
    label: "Kapal",
    value: "Phinisi superior, kabin twin share AC",
  },
  {
    icon: MoonStars,
    label: "Menginap",
    value: "2 malam live on board di kapal",
  },
  {
    icon: ForkKnife,
    label: "Makan",
    value: "Fullboard di kapal (3x/hari)",
  },
  {
    icon: MapPin,
    label: "Meeting point",
    value: trip.meetingPoint,
  },
];

export function LogisticsStrip() {
  return (
    <section className="border-b border-banda/8 bg-salt px-4 py-8 sm:px-6">
      <Stagger className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
        {facts.map((f) => (
          <StaggerItem key={f.label} className="flex gap-3">
            <f.icon
              weight="duotone"
              className="mt-0.5 size-5 shrink-0 text-shallow"
              aria-hidden
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-wood">
                {f.label}
              </p>
              <p className="mt-0.5 text-[15px] leading-snug text-ink">{f.value}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <Reveal delay={0.15} className="mx-auto mt-5 max-w-3xl">
        <p className="text-sm leading-relaxed text-ink/65">{trip.meetingNote}</p>
      </Reveal>
    </section>
  );
}
