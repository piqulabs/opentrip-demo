"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import {
  departures,
  formatIDR,
  trip,
} from "@/lib/trip-data";
import {
  resetDemo,
  setAdminAuthed,
} from "@/lib/store";
import { useBookingStore } from "@/lib/use-store";

const ADMIN_USER = "admin";
const ADMIN_PASS = "jelajah";

export function AdminApp() {
  const state = useBookingStore();

  if (!state.adminAuthed) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
}

function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      setAdminAuthed(true);
      return;
    }
    setError("Salah. Coba admin / jelajah");
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-foam px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-[var(--radius-jn)] border border-banda/12 bg-salt p-6"
      >
        <p className="font-display text-lg font-semibold text-banda">
          {trip.brand} Admin
        </p>
        <p className="mt-1 text-sm text-ink/65">
          Mock login. Username <span className="font-mono-num">admin</span>,
          password <span className="font-mono-num">jelajah</span>.
        </p>

        <label htmlFor="user" className="mt-6 block text-sm font-semibold text-banda">
          Username
        </label>
        <input
          id="user"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="mt-2 h-11 w-full rounded-[var(--radius-jn)] border border-banda/15 bg-foam px-3 text-[15px]"
          autoComplete="username"
        />

        <label htmlFor="pass" className="mt-4 block text-sm font-semibold text-banda">
          Password
        </label>
        <input
          id="pass"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="mt-2 h-11 w-full rounded-[var(--radius-jn)] border border-banda/15 bg-foam px-3 text-[15px]"
          autoComplete="current-password"
        />

        {error && (
          <p className="mt-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 flex h-11 w-full items-center justify-center rounded-[var(--radius-jn)] bg-banda text-sm font-semibold text-salt"
        >
          Masuk
        </button>

        <Link
          href="/"
          className="mt-4 block text-center text-sm text-shallow hover:underline"
        >
          ← Kembali ke landing
        </Link>
      </form>
    </div>
  );
}

function AdminDashboard() {
  const { bookings, seats } = useBookingStore();
  const liveBookings = useMemo(
    () => bookings.filter((b) => b.id.startsWith("BK-LIVE")),
    [bookings],
  );

  return (
    <div className="min-h-[100dvh] bg-foam pb-16">
      <header className="border-b border-banda/10 bg-salt px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <div>
            <p className="font-display text-sm font-semibold text-banda">
              {trip.brand} Admin
            </p>
            <p className="text-xs text-ink/55">Demo · tanpa database</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => resetDemo()}
              className="text-xs font-medium text-wood hover:underline"
            >
              Reset demo
            </button>
            <button
              type="button"
              onClick={() => setAdminAuthed(false)}
              className="text-xs font-medium text-banda hover:underline"
            >
              Keluar
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        {liveBookings.length > 0 && (
          <div className="mb-8 rounded-[var(--radius-jn)] border border-shallow/40 bg-shallow/10 px-4 py-3">
            <p className="text-sm font-semibold text-banda">
              Booking baru dari demo flow
            </p>
            <p className="mt-1 text-sm text-ink/75">
              {liveBookings.length} booking live masuk setelah DP. Kuota di
              landing sudah ikut turun. Ini mekanismenya.
            </p>
          </div>
        )}

        <h1 className="font-display text-2xl font-semibold tracking-tight text-banda">
          Kuota per tanggal
        </h1>
        <p className="mt-1 text-[15px] text-ink/70">
          Auto-berkurang tiap DP lunas. Nggak perlu update Notes / spreadsheet.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {departures.map((d) => {
            const left = seats[d.id] ?? 0;
            const taken = d.seatsTotal - left;
            return (
              <div
                key={d.id}
                className="rounded-[var(--radius-jn)] border border-banda/12 bg-salt p-4"
              >
                <p className="text-sm font-semibold text-banda">{d.label}</p>
                <p className="font-mono-num mt-3 text-3xl font-semibold text-banda">
                  {left}
                  <span className="text-base font-normal text-ink/45">
                    /{d.seatsTotal}
                  </span>
                </p>
                <p className="mt-1 text-xs text-ink/60">
                  {taken} kursi terisi · {left} sisa
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-foam">
                  <div
                    className="h-full rounded-full bg-shallow"
                    style={{
                      width: `${Math.min(100, (taken / d.seatsTotal) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <h2 className="font-display mt-12 text-xl font-semibold text-banda">
          Booking masuk
        </h2>
        <p className="mt-1 text-[15px] text-ink/70">
          Nama, jumlah orang, status DP. Reminder pelunasan lewat wa.me
          (pre-filled).
        </p>

        <ul className="mt-5 divide-y divide-banda/10 overflow-hidden rounded-[var(--radius-jn)] border border-banda/12 bg-salt">
          {bookings.map((b) => {
            const dep = departures.find((d) => d.id === b.departureId);
            const isLive = b.id.startsWith("BK-LIVE");
            const phone = b.contactPhone.replace(/\D/g, "").replace(/^0/, "62");
            const remindMsg = encodeURIComponent(
              `Halo ${b.contactName}, ini Jelajah Nusa. Reminder pelunasan sisa trip Komodo ${dep?.label ?? ""}. Total ${formatIDR(b.total)}, DP sudah ${formatIDR(b.dpAmount)}. Sisa ${formatIDR(b.total - b.dpAmount)} dilunasi H-7. Transfer ke rekening yang sama ya.`,
            );
            const waUrl = `https://wa.me/${phone}?text=${remindMsg}`;

            return (
              <li
                key={b.id}
                className={`px-4 py-4 ${isLive ? "bg-shallow/5" : ""}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-[15px] font-semibold text-banda">
                      {b.contactName}
                      {isLive && (
                        <span className="ml-2 rounded bg-shallow/20 px-1.5 py-0.5 font-mono-num text-[10px] font-medium uppercase text-shallow">
                          baru
                        </span>
                      )}
                    </p>
                    <p className="mt-0.5 text-sm text-ink/65">
                      {b.guestCount} orang · {dep?.label}
                    </p>
                    <p className="mt-0.5 text-xs text-wood">
                      {b.guestNames.join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${
                        b.status === "dp_lunas"
                          ? "bg-scrub/15 text-scrub"
                          : "bg-wood/15 text-wood"
                      }`}
                    >
                      {b.status === "dp_lunas" ? "DP lunas" : "Pending"}
                    </span>
                    <p className="font-mono-num mt-1 text-sm text-ink">
                      {formatIDR(b.dpAmount)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-jn)] border border-banda/15 bg-foam px-3 text-xs font-semibold text-banda"
                  >
                    <WhatsappLogo weight="fill" className="size-4 text-[#25D366]" />
                    Kirim reminder WA
                  </a>
                  <span className="font-mono-num self-center text-[11px] text-ink/40">
                    {b.id}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-[var(--radius-jn)] border border-banda/20 bg-salt text-sm font-semibold text-banda"
          >
            Lihat landing (kuota live)
          </Link>
          <Link
            href={`/booking/${trip.id}`}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-[var(--radius-jn)] bg-banda text-sm font-semibold text-salt"
          >
            Simulasikan booking lagi
          </Link>
        </div>
      </main>
    </div>
  );
}
