import { Suspense } from "react";
import { SuccessView } from "@/components/booking/SuccessView";

export default async function BookingSuccessPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = await params;

  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] items-center justify-center bg-foam text-banda">
          Memuat konfirmasi…
        </div>
      }
    >
      <SuccessView tripId={tripId} />
    </Suspense>
  );
}
