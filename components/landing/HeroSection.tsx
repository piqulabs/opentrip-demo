"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useSeatsLeft } from "@/lib/use-store";
import { departures, formatIDR, trip } from "@/lib/trip-data";
import { getFeaturedDepartureId } from "@/lib/store";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  const departureId = getFeaturedDepartureId();
  const departure = departures.find((d) => d.id === departureId)!;
  const seatsLeft = useSeatsLeft(departureId);
  const reduce = useReducedMotion();
  const [shownSeats, setShownSeats] = useState(seatsLeft);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seatsLeft, reduce]);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden bg-banda text-salt"
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(12,61,76,0.35) 0%, rgba(12,61,76,0.55) 45%, rgba(12,61,76,0.92) 100%), url(${trip.heroImage})`,
        }}
        role="img"
        aria-label={trip.heroAlt}
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease }}
      />

      <motion.header
        className="relative z-10 flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-5"
        initial={reduce ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
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
      </motion.header>

      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-4 pb-10 pt-24 sm:px-6 sm:pb-12">
        <motion.p
          className="mb-2 text-sm text-salt/80"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          {trip.destination} · {trip.duration}
        </motion.p>

        <motion.h1
          className="font-display max-w-[16ch] text-[2.15rem] font-semibold leading-[1.12] tracking-tight sm:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18, ease }}
        >
          {trip.name}
        </motion.h1>

        <motion.p
          className="mt-3 max-w-[36ch] text-[15px] leading-relaxed text-salt/90 sm:text-base"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.28, ease }}
        >
          {departure.label} · {formatIDR(trip.pricePerPerson)}/orang ·{" "}
          {trip.vessel}
        </motion.p>

        <motion.div
          className="mt-5 flex items-stretch overflow-hidden rounded-[var(--radius-jn)] border border-salt/25 bg-banda/55 backdrop-blur-sm"
          aria-live="polite"
          initial={reduce ? false : { opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease }}
        >
          <div className="flex items-center gap-1 border-r border-dashed border-salt/30 px-4 py-3">
            <motion.span
              key={shownSeats}
              className="font-mono-num text-2xl font-semibold text-salt tabular-nums sm:text-3xl"
              initial={reduce ? false : { opacity: 0.4, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {shownSeats}
            </motion.span>
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
              <span className="live-dot ml-2 inline-block h-1.5 w-1.5 rounded-full bg-shallow align-middle" />
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-5"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.55, ease }}
        >
          <Link
            href={`/booking/${trip.id}?departure=${departureId}`}
            className="inline-flex h-12 w-full max-w-sm items-center justify-center rounded-[var(--radius-jn)] bg-salt px-6 text-[15px] font-semibold text-banda transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            Amankan Kursi
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
