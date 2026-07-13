"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  calcDp,
  calcTotal,
  departures,
  formatIDR,
  trip,
  TRIP_ID,
} from "@/lib/trip-data";
import { payDp } from "@/lib/store";
import { useSeatsLeft } from "@/lib/use-store";

const ease = [0.16, 1, 0.3, 1] as const;

export function BookingForm({ tripId }: { tripId: string }) {
  const reduce = useReducedMotion();
  const router = useRouter();
  const search = useSearchParams();
  const initialDep =
    search.get("departure") ?? departures[0]?.id ?? "2026-08-12";

  const [departureId, setDepartureId] = useState(initialDep);
  const [guestCount, setGuestCount] = useState(1);
  const [names, setNames] = useState<string[]>([""]);
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  const seatsLeft = useSeatsLeft(departureId);
  const departure = departures.find((d) => d.id === departureId);

  const total = useMemo(
    () => calcTotal(trip.pricePerPerson, guestCount),
    [guestCount],
  );
  const dp = useMemo(
    () => calcDp(trip.pricePerPerson, guestCount),
    [guestCount],
  );
  const remaining = total - dp;

  function updateGuestCount(n: number) {
    const next = Math.max(1, Math.min(n, Math.max(seatsLeft, 1)));
    setGuestCount(next);
    setNames((prev) => {
      const copy = [...prev];
      while (copy.length < next) copy.push("");
      return copy.slice(0, next);
    });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (tripId !== TRIP_ID) {
      setError("Trip tidak ditemukan.");
      return;
    }
    if (!contactName.trim() || !contactPhone.trim()) {
      setError("Isi nama dan nomor WA pemesan.");
      return;
    }
    if (names.some((n) => !n.trim())) {
      setError("Isi nama semua peserta.");
      return;
    }
    if (guestCount > seatsLeft) {
      setError(`Sisa kursi cuma ${seatsLeft}. Kurangi jumlah peserta.`);
      return;
    }

    setPaying(true);
    const result = payDp({
      departureId,
      guestNames: names.map((n) => n.trim()),
      contactName: contactName.trim(),
      contactPhone: contactPhone.trim(),
      total,
      dpAmount: dp,
    });

    if (!result.ok) {
      setPaying(false);
      setError(result.error);
      return;
    }

    const params = new URLSearchParams({
      booking: result.booking.id,
      before: String(result.seatsBefore),
      after: String(result.seatsAfter),
      departure: departureId,
    });
    router.push(`/booking/${tripId}/success?${params.toString()}`);
  }

  if (tripId !== TRIP_ID) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <p className="text-banda">Trip tidak ditemukan.</p>
        <Link href="/" className="mt-4 inline-block text-shallow">
          Kembali
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-foam pb-16">
      <header className="border-b border-banda/10 bg-salt px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href="/" className="font-display text-sm font-semibold text-banda">
            ← {trip.brand}
          </Link>
          <span className="font-mono-num text-xs text-wood">Booking</span>
        </div>
      </header>

      <motion.form
        onSubmit={onSubmit}
        className="mx-auto max-w-lg px-4 pt-8 sm:px-6"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
      >
        <h1 className="font-display text-2xl font-semibold tracking-tight text-banda">
          Amankan kursi
        </h1>
        <p className="mt-1 text-[15px] text-ink/70">
          {trip.name}. Bayar DP {trip.dpPercent}%, sisa dilunasi H-7.
        </p>

        <fieldset className="mt-8">
          <legend className="text-sm font-semibold text-banda">
            Tanggal keberangkatan
          </legend>
          <div className="mt-3 space-y-2">
            {departures.map((d) => (
              <DepartureOption
                key={d.id}
                id={d.id}
                label={d.label}
                seatsTotal={d.seatsTotal}
                selected={departureId === d.id}
                onSelect={() => {
                  setDepartureId(d.id);
                  setGuestCount(1);
                  setNames([""]);
                }}
              />
            ))}
          </div>
        </fieldset>

        <div className="mt-8">
          <label htmlFor="guestCount" className="text-sm font-semibold text-banda">
            Jumlah peserta
          </label>
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-[var(--radius-jn)] border border-banda/20 bg-salt text-banda disabled:opacity-40"
              onClick={() => updateGuestCount(guestCount - 1)}
              disabled={guestCount <= 1}
              aria-label="Kurangi peserta"
            >
              −
            </button>
            <span className="font-mono-num w-8 text-center text-lg font-semibold text-banda">
              {guestCount}
            </span>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-[var(--radius-jn)] border border-banda/20 bg-salt text-banda disabled:opacity-40"
              onClick={() => updateGuestCount(guestCount + 1)}
              disabled={guestCount >= seatsLeft}
              aria-label="Tambah peserta"
            >
              +
            </button>
            <span className="text-sm text-ink/60">
              max {seatsLeft} (sisa kursi)
            </span>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <p className="text-sm font-semibold text-banda">Nama peserta</p>
          {names.map((name, i) => (
            <div key={i}>
              <label htmlFor={`guest-${i}`} className="sr-only">
                Nama peserta {i + 1}
              </label>
              <input
                id={`guest-${i}`}
                value={name}
                onChange={(e) => {
                  const next = [...names];
                  next[i] = e.target.value;
                  setNames(next);
                }}
                placeholder={`Peserta ${i + 1} (sesuai KTP)`}
                className="h-11 w-full rounded-[var(--radius-jn)] border border-banda/15 bg-salt px-3 text-[15px] text-ink placeholder:text-ink/40"
                autoComplete="name"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="contactName" className="text-sm font-semibold text-banda">
              Nama pemesan
            </label>
            <input
              id="contactName"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="mt-2 h-11 w-full rounded-[var(--radius-jn)] border border-banda/15 bg-salt px-3 text-[15px] text-ink"
              autoComplete="name"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="contactPhone" className="text-sm font-semibold text-banda">
              Nomor WhatsApp
            </label>
            <input
              id="contactPhone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="08…"
              className="mt-2 h-11 w-full rounded-[var(--radius-jn)] border border-banda/15 bg-salt px-3 text-[15px] text-ink placeholder:text-ink/40"
              inputMode="tel"
              autoComplete="tel"
            />
          </div>
        </div>

        <div className="mt-8 rounded-[var(--radius-jn)] border border-banda/12 bg-salt p-4">
          <h2 className="text-sm font-semibold text-banda">Ringkasan</h2>
          <dl className="mt-3 space-y-2 text-[15px]">
            <div className="flex justify-between gap-4">
              <dt className="text-ink/65">Trip</dt>
              <dd className="text-right font-medium text-ink">
                {departure?.label}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink/65">
                {guestCount} × {formatIDR(trip.pricePerPerson)}
              </dt>
              <dd className="font-mono-num font-medium text-ink">
                {formatIDR(total)}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-banda/10 pt-2">
              <dt className="font-semibold text-banda">
                DP {trip.dpPercent}% sekarang
              </dt>
              <dd className="font-mono-num font-semibold text-banda">
                {formatIDR(dp)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink/65">Sisa dilunasi H-7</dt>
              <dd className="font-mono-num text-ink">{formatIDR(remaining)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-xs leading-relaxed text-wood">
            Ini demo. Tombol bayar tidak terhubung payment gateway. Kursi langsung
            berkurang di sistem.
          </p>
        </div>

        {error && (
          <p className="mt-4 text-sm font-medium text-red-700" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={paying || seatsLeft < 1}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-[var(--radius-jn)] bg-banda text-[15px] font-semibold text-salt transition-transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
        >
          {paying ? "Memproses…" : `Bayar DP ${formatIDR(dp)}`}
        </button>
      </motion.form>
    </div>
  );
}

function DepartureOption({
  id,
  label,
  seatsTotal,
  selected,
  onSelect,
}: {
  id: string;
  label: string;
  seatsTotal: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const seats = useSeatsLeft(id);
  const soldOut = seats < 1;

  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-[var(--radius-jn)] border px-3 py-3 ${
        selected
          ? "border-shallow bg-shallow/10"
          : "border-banda/12 bg-salt"
      } ${soldOut ? "opacity-50" : ""}`}
    >
      <input
        type="radio"
        name="departure"
        value={id}
        checked={selected}
        disabled={soldOut}
        onChange={onSelect}
        className="size-4 accent-shallow"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium text-banda">{label}</span>
        <span className="font-mono-num text-xs text-ink/60">
          {soldOut
            ? "Habis"
            : `Sisa ${seats} dari ${seatsTotal} kursi`}
        </span>
      </span>
    </label>
  );
}
