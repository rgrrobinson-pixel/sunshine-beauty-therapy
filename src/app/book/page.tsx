import type { Metadata } from "next";
import BookRedirect from "@/components/BookRedirect";
import { getSiteSettings } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Booking — Sunshine Beauty Therapy",
};

export const dynamic = "force-dynamic";

export default async function BookPage() {
  const settings = await getSiteSettings();
  return (
    <BookRedirect bookingUrl={settings.bookingUrl} logo={settings.logoUrl} />
  );
}
