"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";
import { useSeatsLeft } from "@/lib/use-store";
import { departures, formatIDR, trip } from "@/lib/trip-data";
import { getFeaturedDepartureId } from "@/lib/store";

export function HeroSection() {
  const departureId = getFeaturedDepartureId();
  const departure = departures.find((d) => d.id === departureId)!;
  const seatsLeft = useSeatsLeft(departureId);
  const reduce = usePrefersReducedMotion();
  const [shownSeats, setShownSeats] = useState(seatsLeft);
  const [ready, setReady] = useState(reduce);

  useEffect(() => {
    if (reduce) {
      setReady(true);
      return;
    }
    const t = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (reduce) {
      setShownSeats(seatsLeft);
      return;
    }
    let current = shownSeats;
    if (current === seatsLeft) return;
    const id = window.setInterval(() => {
      current += current > seatsLeft ? -1 : 1;
      setShownSeats(current);
      if (current === seatsLeft) window.clearInterval(id);
    }, 120);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animate only when seatsLeft changes
  }, [seatsLeft, reduce]);

  return (
    <section id="hero" className="relative min-h-[100dvh] overflow-hidden bg-banda text-salt">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(12,61,76,0.35) 0%, rgba(12,61,76,0.55) 45%, rgba(12,61,76,0.92) 100%), url(${trip.heroImage})`,
        }}
        role="img"
        aria-label={trip.heroAlt}
      />

      <header className="relative z-10 flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-5">
        <p className="font-display text-[15px] font-semibold tracking-tight text-salt">
          {trip.brand}
        </p>
        <nav className="flex items-center gap-4 text-sm text-salt/85">
          <a href="#itinerary" className="hover:text-salt">
            Itinerary
          </a>
          <a href="#biaya" className="hidden hover:text-salt sm:inline">
            Biaya
          </a>
          <Link href="/admin" className="hover:text-salt">
            Admin
          </Link>
        </nav>
      </header>

      <div
        className={`relative z-10 flex min-h-[100dvh] flex-col justify-end px-4 pb-10 pt-24 sm:px-6 sm:pb-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          ready ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <p className="mb-2 text-sm text-salt/80">
          {trip.destination} · {trip.duration}
        </p>
        <h1 className="font-display max-w-[16ch] text-[2.15rem] font-semibold leading-[1.12] tracking-tight sm:text-5xl">
          {trip.name}
        </h1>
        <p className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-salt/90 sm:text-base">
          {departure.label} · {formatIDR(trip.pricePerPerson)}/orang ·{" "}
          {trip.vessel}
        </p>

        <div
          className={`mt-5 flex items-stretch overflow-hidden rounded-[var(--radius-jn)] border border-salt/25 bg-banda/55 backdrop-blur-sm transition-all delay-150 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          aria-live="polite"
        >
          <div className="flex items-center gap-1 border-r border-dashed border-salt/30 px-4 py-3">
            <span className="font-mono-num text-2xl font-semibold text-salt tabular-nums sm:text-3xl">
              {shownSeats}
            </span>
            <span className="font-mono-num text-sm text-salt/70">
              /{departure.seatsTotal}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center px-4 py-3">
            <p className="text-sm font-medium text-salt">
              Sisa {shownSeats} dari {departure.seatsTotal} kursi
            </p>
            <p className="font-mono-num text-xs text-salt/75">
              {departure.label} · live
              <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-shallow align-middle" />
            </p>
          </div>
        </div>

        <div
          className={`mt-5 transition-all delay-300 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <Link
            href={`/booking/${trip.id}?departure=${departureId}`}
            className="inline-flex h-12 w-full max-w-sm items-center justify-center rounded-[var(--radius-jn)] bg-salt px-6 text-[15px] font-semibold text-banda transition-transform active:scale-[0.98] sm:w-auto"
          >
            Amankan Kursi
          </Link>
        </div>
      </div>
    </section>
  );
}
