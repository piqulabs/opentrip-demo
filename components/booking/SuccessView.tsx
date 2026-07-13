"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, WhatsappLogo } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { departures, formatIDR, trip } from "@/lib/trip-data";
import { getSnapshot } from "@/lib/store";

const ease = [0.16, 1, 0.3, 1] as const;

export function SuccessView({ tripId }: { tripId: string }) {
  const search = useSearchParams();
  const bookingId = search.get("booking") ?? "";
  const before = Number(search.get("before") ?? "0");
  const after = Number(search.get("after") ?? "0");
  const departureId = search.get("departure") ?? "";
  const departure = departures.find((d) => d.id === departureId);
  const booking = getSnapshot().bookings.find((b) => b.id === bookingId);

  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? 3 : 0);
  const [displaySeats, setDisplaySeats] = useState(before);

  useEffect(() => {
    if (reduce) {
      setStep(3);
      setDisplaySeats(after);
      return;
    }

    const t1 = window.setTimeout(() => setStep(1), 200);
    const t2 = window.setTimeout(() => setStep(2), 900);
    const t3 = window.setTimeout(() => setStep(3), 1600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [reduce, after]);

  useEffect(() => {
    if (reduce || step < 2) return;
    if (displaySeats === after) return;
    const id = window.setInterval(() => {
      setDisplaySeats((prev) => {
        if (prev <= after) {
          window.clearInterval(id);
          return after;
        }
        return prev - 1;
      });
    }, 140);
    return () => window.clearInterval(id);
  }, [step, after, reduce, displaySeats]);

  return (
    <div className="min-h-[100dvh] bg-foam">
      <header className="border-b border-banda/10 bg-salt px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <Link href="/" className="font-display text-sm font-semibold text-banda">
            {trip.brand}
          </Link>
          <span className="font-mono-num text-xs text-scrub">DP lunas</span>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-10 sm:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={
            step >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
          }
          transition={{ duration: 0.55, ease }}
        >
          <motion.div
            initial={reduce ? false : { scale: 0.6, opacity: 0 }}
            animate={
              step >= 1 ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }
            }
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <CheckCircle
              weight="fill"
              className="size-10 text-scrub"
              aria-hidden
            />
          </motion.div>
          <h1 className="font-display mt-4 text-2xl font-semibold tracking-tight text-banda">
            Kursi kepegang.
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
            DP masuk. Peserta otomatis masuk sistem. Kamu nggak perlu balas DM
            atau cek mutasi rekening.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 overflow-hidden rounded-[var(--radius-jn)] border border-banda/15 bg-banda text-salt"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={
            step >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{ duration: 0.55, ease }}
        >
          <div className="border-b border-salt/15 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-salt/70">
              Yang baru terjadi di sistem
            </p>
          </div>
          <div className="grid grid-cols-2 gap-px bg-salt/15">
            <div className="bg-banda px-4 py-4">
              <p className="text-xs text-salt/65">Kuota sebelum</p>
              <p className="font-mono-num mt-1 text-3xl font-semibold">
                {before}
              </p>
            </div>
            <div className="bg-banda px-4 py-4">
              <p className="text-xs text-salt/65">Kuota sekarang</p>
              <motion.p
                key={displaySeats}
                className="font-mono-num mt-1 text-3xl font-semibold text-shallow"
                initial={reduce ? false : { opacity: 0.35, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {displaySeats}
              </motion.p>
            </div>
          </div>
          <div className="space-y-2 px-4 py-4 text-sm leading-relaxed text-salt/90">
            <p>
              Landing page sekarang nulis{" "}
              <span className="font-mono-num font-semibold text-salt">
                Sisa {after} dari {departure?.seatsTotal ?? 15} kursi
              </span>
              . Orang berikutnya lihat angka yang lebih kecil.
            </p>
            <p className="text-salt/70">
              {departure?.label}
              {bookingId ? ` · ${bookingId}` : ""}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 rounded-[var(--radius-jn)] border border-banda/12 bg-salt p-4"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={
            step >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
          }
          transition={{ duration: 0.55, ease }}
        >
          <p className="text-sm font-semibold text-banda">Grup WA trip</p>
          <p className="mt-1 text-sm text-ink/70">
            Langsung dikirim ke peserta. Di situ briefing, driver H-1, dan update
            cuaca.
          </p>
          {booking && (
            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-ink/60">Pemesan</dt>
                <dd className="font-medium text-ink">{booking.contactName}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink/60">Peserta</dt>
                <dd className="text-right text-ink">
                  {booking.guestNames.join(", ")}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink/60">DP dibayar</dt>
                <dd className="font-mono-num font-medium text-ink">
                  {formatIDR(booking.dpAmount)}
                </dd>
              </div>
            </dl>
          )}
          <a
            href={trip.waGroupMock}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-jn)] bg-[#25D366] text-sm font-semibold text-white transition-transform hover:scale-[1.01] active:scale-[0.98]"
          >
            <WhatsappLogo weight="fill" className="size-5" />
            Buka grup WA trip
          </a>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={
            step >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
          }
          transition={{ duration: 0.55, delay: 0.08, ease }}
        >
          <p className="text-sm font-semibold text-banda">
            Buat owner yang lagi nonton demo ini
          </p>
          <p className="mt-1 text-[15px] leading-relaxed text-ink/75">
            Buka admin. Booking baru sudah masuk, status DP lunas, kuota
            auto-berkurang. Itu yang kamu beli, bukan fotonya.
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Link
              href="/admin"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-[var(--radius-jn)] bg-banda text-sm font-semibold text-salt transition-transform hover:scale-[1.01] active:scale-[0.98]"
            >
              Lihat di Admin
            </Link>
            <Link
              href="/"
              className="inline-flex h-11 flex-1 items-center justify-center rounded-[var(--radius-jn)] border border-banda/20 bg-salt text-sm font-semibold text-banda transition-transform hover:scale-[1.01] active:scale-[0.98]"
            >
              Cek landing (kuota turun)
            </Link>
          </div>
        </motion.div>

        <p className="mt-10 text-center text-xs text-ink/45">
          Trip ID: {tripId} · mock payment
        </p>
      </main>
    </div>
  );
}
