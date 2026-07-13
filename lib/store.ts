"use client";

import { departures, TRIP_ID } from "./trip-data";

export type BookingStatus = "dp_lunas" | "pending";

export type Booking = {
  id: string;
  tripId: string;
  departureId: string;
  guestCount: number;
  guestNames: string[];
  contactName: string;
  contactPhone: string;
  total: number;
  dpAmount: number;
  status: BookingStatus;
  createdAt: string;
  waGroupSent: boolean;
};

type SeatMap = Record<string, number>;

export type StoreState = {
  seats: SeatMap;
  bookings: Booking[];
  adminAuthed: boolean;
};

const STORAGE_KEY = "jelajah-nusa-demo-v1";

function initialSeats(): SeatMap {
  return Object.fromEntries(
    departures.map((d) => [d.id, d.seatsInitialAvailable]),
  );
}

function seedBookings(): Booking[] {
  return [
    {
      id: "BK-2401",
      tripId: TRIP_ID,
      departureId: "2026-08-12",
      guestCount: 2,
      guestNames: ["Andi Wijaya", "Maya Sari"],
      contactName: "Andi Wijaya",
      contactPhone: "081234567001",
      total: 5_900_000,
      dpAmount: 1_770_000,
      status: "dp_lunas",
      createdAt: "2026-07-08T09:12:00+07:00",
      waGroupSent: true,
    },
    {
      id: "BK-2402",
      tripId: TRIP_ID,
      departureId: "2026-08-12",
      guestCount: 1,
      guestNames: ["Putri Lestari"],
      contactName: "Putri Lestari",
      contactPhone: "081298765432",
      total: 2_950_000,
      dpAmount: 885_000,
      status: "dp_lunas",
      createdAt: "2026-07-10T14:40:00+07:00",
      waGroupSent: true,
    },
    {
      id: "BK-2398",
      tripId: TRIP_ID,
      departureId: "2026-08-19",
      guestCount: 3,
      guestNames: ["Budi Santoso", "Rina Santoso", "Ayu Santoso"],
      contactName: "Budi Santoso",
      contactPhone: "08111222333",
      total: 8_850_000,
      dpAmount: 2_655_000,
      status: "pending",
      createdAt: "2026-07-11T11:05:00+07:00",
      waGroupSent: false,
    },
  ];
}

function defaultState(): StoreState {
  return {
    seats: initialSeats(),
    bookings: seedBookings(),
    adminAuthed: false,
  };
}

function loadState(): StoreState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as Partial<StoreState>;
    return {
      seats: { ...initialSeats(), ...parsed.seats },
      bookings: parsed.bookings?.length ? parsed.bookings : seedBookings(),
      adminAuthed: Boolean(parsed.adminAuthed),
    };
  } catch {
    return defaultState();
  }
}

function persist(next: StoreState) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        seats: next.seats,
        bookings: next.bookings,
        adminAuthed: next.adminAuthed,
      }),
    );
  } catch {
    // ignore quota errors in demo
  }
}

let state: StoreState = defaultState();
let hydrated = false;

if (typeof window !== "undefined") {
  state = loadState();
  hydrated = true;
}

type Listener = () => void;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((l) => l());
}

function setState(next: StoreState) {
  state = next;
  persist(next);
  emit();
}

/** Call once from a client root to hydrate from sessionStorage. */
export function hydrateStore() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  state = loadState();
  emit();
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): StoreState {
  return state;
}

export function getSeatsLeft(departureId: string): number {
  return state.seats[departureId] ?? 0;
}

export function getFeaturedDepartureId(): string {
  return "2026-08-12";
}

export function setAdminAuthed(authed: boolean) {
  setState({ ...state, adminAuthed: authed });
}

export function resetDemo() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(STORAGE_KEY);
  }
  setState({
    ...defaultState(),
    adminAuthed: state.adminAuthed,
  });
}

export type PayDpInput = {
  departureId: string;
  guestNames: string[];
  contactName: string;
  contactPhone: string;
  total: number;
  dpAmount: number;
};

export type PayDpResult =
  | { ok: true; booking: Booking; seatsBefore: number; seatsAfter: number }
  | { ok: false; error: string };

export function payDp(input: PayDpInput): PayDpResult {
  const seatsBefore = state.seats[input.departureId] ?? 0;
  const guestCount = input.guestNames.length;

  if (guestCount < 1) {
    return { ok: false, error: "Minimal 1 peserta." };
  }
  if (seatsBefore < guestCount) {
    return {
      ok: false,
      error: `Kursi tidak cukup. Sisa ${seatsBefore} kursi untuk tanggal ini.`,
    };
  }

  const seatsAfter = seatsBefore - guestCount;
  const booking: Booking = {
    id: `BK-LIVE-${Date.now().toString(36).toUpperCase()}`,
    tripId: TRIP_ID,
    departureId: input.departureId,
    guestCount,
    guestNames: input.guestNames,
    contactName: input.contactName,
    contactPhone: input.contactPhone,
    total: input.total,
    dpAmount: input.dpAmount,
    status: "dp_lunas",
    createdAt: new Date().toISOString(),
    waGroupSent: true,
  };

  setState({
    ...state,
    seats: { ...state.seats, [input.departureId]: seatsAfter },
    bookings: [booking, ...state.bookings],
  });

  return { ok: true, booking, seatsBefore, seatsAfter };
}
