"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function BookRedirect({
  bookingUrl,
  logo,
}: {
  bookingUrl: string;
  logo: string;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = bookingUrl;
    }, 2000);
    return () => clearTimeout(timer);
  }, [bookingUrl]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream-100 px-6">
      <div className="text-center max-w-sm">
        <div className="relative h-16 w-16 mx-auto">
          <Image
            src={logo}
            alt="Sunshine Beauty Therapy logo"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="font-display text-2xl text-sage-800 mt-6">
          Taking you to our booking calendar…
        </h1>
        <p className="mt-3 text-sm text-ink/70">
          You&apos;ll be redirected to our online booking system in just a
          moment.
        </p>
        <a href={bookingUrl} className="btn-primary mt-6 inline-flex">
          Open Booking Calendar
        </a>
      </div>
    </main>
  );
}
