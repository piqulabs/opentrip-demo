import Link from "next/link";
import { trip } from "@/lib/trip-data";
import { FaqSection } from "@/components/landing/FaqSection";
import { GallerySection } from "@/components/landing/GallerySection";
import { HeroSection } from "@/components/landing/HeroSection";
import { IncludesSection } from "@/components/landing/IncludesSection";
import { ItinerarySection } from "@/components/landing/ItinerarySection";
import { LogisticsStrip } from "@/components/landing/LogisticsStrip";
import { StickyCta } from "@/components/landing/StickyCta";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogisticsStrip />
      <ItinerarySection />
      <IncludesSection />
      <GallerySection />
      <TestimonialsSection />
      <FaqSection />

      <footer className="border-t border-banda/10 bg-salt px-4 pb-28 pt-10 sm:px-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-lg font-semibold text-banda">
              {trip.brand}
            </p>
            <p className="mt-1 max-w-[36ch] text-sm text-ink/65">
              Operator open trip yang jujur. Kuota transparan, itinerary detail,
              nggak ada biaya tersembunyi.
            </p>
          </div>
          <Link
            href="/admin"
            className="text-sm font-medium text-shallow underline-offset-2 hover:underline"
          >
            Panel admin (demo)
          </Link>
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-xs text-ink/40">
          Demo sales · state booking di session (Reset demo di admin).
        </p>
      </footer>

      <StickyCta />
    </>
  );
}
