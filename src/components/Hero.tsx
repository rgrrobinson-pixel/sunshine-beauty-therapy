import Image from "next/image";
import Link from "next/link";

const BADGES = [
  "100% Organic Products",
  "Private One-on-One Sessions",
  "Guaranteed Your Satisfaction",
  "Cruelty-Free — No Parabens or SLS",
];

export default function Hero({
  subtext,
}: {
  headline?: string;
  highlight?: string;
  subtext: string;
  logoUrl?: string;
}) {
  return (
    <section className="relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap');
      `}</style>

      <div className="relative w-full overflow-hidden" style={{ height: "92vh", minHeight: "660px" }}>
        <Image
          src="/hero-bg.jpg"
          alt="Serene spa garden sanctuary with water feature"
          fill
          priority
          className="object-cover object-top"
          style={{ filter: "brightness(1.25) saturate(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />

        <div className="relative z-10 flex h-full flex-col px-6 text-center text-white">

          {/* Text block — upper 55% */}
          <div className="flex flex-col items-center justify-center px-6 text-center" style={{ flex: "0 0 50%" }}>
            <h1
              className="text-white"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.8rem, 6vw, 4.4rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                textShadow: "0 4px 20px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9)",
              }}
            >
              Sunshine Beauty Therapy
            </h1>

            {/* Subtitle — plain (not italic) */}
            <p
              className="mt-8 text-white"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                fontStyle: "normal",
                lineHeight: 1.2,
                textShadow: "0 3px 16px rgba(0,0,0,0.95), 0 2px 6px rgba(0,0,0,0.9)",
                color: "#fdfcf9",
              }}
            >
              Certified Organic Skincare
            </p>

            <p
              className="mt-8 max-w-xl text-base sm:text-lg font-semibold text-white"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.9)" }}
            >
              {subtext}
            </p>
          </div>

          {/* Buttons — lower 45%, pinned to very bottom */}
          <div className="flex flex-col items-center justify-end gap-4 pb-6" style={{ flex: "0 0 50%" }}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book" className="btn-primary">
                Book Your Treatment
              </Link>
              <a href="#services" className="btn-light">
                Explore Treatments
              </a>
            </div>
            <p
              className="text-sm tracking-wide font-semibold text-white"
              style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
            >
              ✦ 100% Organic ✦ Private &amp; One-on-One ✦ Money-Back Guarantee
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-sage-100">
        <div className="max-w-content mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-8">
          {BADGES.map((badge) => (
            <p key={badge} className="text-center text-sm font-medium text-sage-700">
              {badge}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
