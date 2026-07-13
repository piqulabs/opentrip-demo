"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatIDR, trip } from "@/lib/trip-data";
import { getFeaturedDepartureId } from "@/lib/store";
import { useSeatsLeft } from "@/lib/use-store";

export function StickyCta() {
  const departureId = getFeaturedDepartureId();
  const seats = useSeatsLeft(departureId);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-banda/15 bg-salt/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 sm:px-6 ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-2xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-banda">
            {formatIDR(trip.pricePerPerson)}
            <span className="font-normal text-ink/60"> /orang</span>
          </p>
          <p className="font-mono-num truncate text-xs text-shallow">
            Sisa {seats} kursi · DP {trip.dpPercent}%
          </p>
        </div>
        <Link
          href={`/booking/${trip.id}?departure=${departureId}`}
          tabIndex={visible ? 0 : -1}
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-[var(--radius-jn)] bg-banda px-4 text-sm font-semibold text-salt transition-transform active:scale-[0.98]"
        >
          Amankan Kursi
        </Link>
      </div>
    </div>
  );
}
