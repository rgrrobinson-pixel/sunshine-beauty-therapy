import Image from "next/image";
import Link from "next/link";

const BADGES = [
  "100% Organic Products",
  "Private One-on-One Sessions",
  "Guaranteed Your Satisfaction",
  "Cruelty-Free — No Parabens or SLS",
];

export default function Hero({
  headline,
  highlight,
  subtext,
  logoUrl,
}: {
  headline: string;
  highlight: string;
  subtext: string;
  logoUrl: string;
}) {
  return (
    <section className="relative">
      <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
        <Image
          src="/hero-bg.jpg"
          alt="Serene spa garden sanctuary with water feature"
          fill
          priority
          className="object-cover object-top"
          style={{ filter: "brightness(1.25) saturate(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p
            className="eyebrow text-cream-100 tracking-widest uppercase text-sm font-semibold"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.9)" }}
          >
            Sunshine Coast · Private Studio
          </p>

          <h1
            className="mt-4 max-w-3xl font-bold text-white"
            style={{
              fontFamily: "var(--font-display, Georgia, serif)",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              lineHeight: 1.15,
              textShadow: "0 3px 16px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8), 0 1px 3px rgba(0,0,0,0.7)",
            }}
          >
            {headline}{" "}
            <span className="italic font-semibold" style={{ color: "#fdfcf9" }}>
              {highlight}
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl text-lg sm:text-xl font-medium text-white"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8)" }}
          >
            {subtext}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/book" className="btn-primary">
              Book Your Treatment
            </Link>
            <a href="#services" className="btn-light">
              Explore Treatments
            </a>
          </div>

          <p
            className="mt-4 text-sm tracking-wide font-medium text-white"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}
          >
            ✦ 100% Organic ✦ Private &amp; One-on-One ✦ Money-Back Guarantee
          </p>
        </div>
      </div>

      <div className="bg-white border-b border-sage-100">
        <div className="max-w-content mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-8">
          {BADGES.map((badge) => (
            <p
              key={badge}
              className="text-center text-sm font-medium text-sage-700"
            >
              {badge}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
