import Image from "next/image";
import Link from "next/link";

export default function CtaSection({ phone, phoneHref }: { phone: string; phoneHref: string }) {
  return (
    <section className="relative h-96 w-full overflow-hidden">
      <Image
        src="/treatment-room.jpg"
        alt="Sunshine Beauty Therapy treatment room"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-6 text-center text-white">
        <p className="eyebrow text-cream-100/90 text-sm sm:text-base font-bold" style={{ color: "#c9a876", textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>Ready to restore?</p>
        <h2 className="section-heading mt-3 text-white" style={{ color: "white", textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.3)" }}>Your sanctuary awaits</h2>
        <p className="mt-4 max-w-md text-cream-100/90" style={{ color: "#faf8f3", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
          Book online in minutes — or call Jane directly to discuss which
          treatment is right for you.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/book" className="btn-light">
            Book Online
          </Link>
          <a href={phoneHref} className="btn-outline !border-white !text-white hover:!bg-white hover:!text-sage-700">
            Call {phone}
          </a>
        </div>
      </div>
    </section>
  );
}
