"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#services" },
  { label: "Skincare", href: "#skincare" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Gift Vouchers", href: "#gift" },
  { label: "Gallery", href: "#gallery" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream-100/90 backdrop-blur border-b border-sage-200">
      <div className="max-w-content mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="#"
          className="font-display text-xl sm:text-2xl font-semibold text-sage-800"
        >
          Sunshine Beauty Therapy
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 hover:text-sage-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Link href="/book" className="btn-primary hidden md:inline-flex">
          Book Now
        </Link>

        <button
          className="md:hidden text-sage-800"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream-100 border-t border-sage-200 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-ink/80 hover:text-sage-600"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/book"
            onClick={() => setOpen(false)}
            className="btn-primary w-full"
          >
            Book an Appointment
          </Link>
        </div>
      )}
    </header>
  );
}
