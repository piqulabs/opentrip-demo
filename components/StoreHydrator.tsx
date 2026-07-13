"use client";

import { useEffect } from "react";
import { hydrateStore } from "@/lib/store";

export function StoreHydrator({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    hydrateStore();
  }, []);

  return children;
}
