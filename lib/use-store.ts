"use client";

import { useSyncExternalStore } from "react";
import {
  getSnapshot,
  subscribe,
  type Booking,
  type StoreState,
} from "@/lib/store";

function getServerSnapshot(): StoreState {
  return getSnapshot();
}

export function useBookingStore(): StoreState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useSeatsLeft(departureId: string): number {
  const state = useBookingStore();
  return state.seats[departureId] ?? 0;
}

export function useBookings(): Booking[] {
  return useBookingStore().bookings;
}
