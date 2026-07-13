import { Suspense } from "react";
import { BookingForm } from "@/components/booking/BookingForm";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] items-center justify-center bg-foam text-banda">
          Memuat form…
        </div>
      }
    >
      <BookingForm tripId={tripId} />
    </Suspense>
  );
}
