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
      {/* Load Playfair Display Bold from Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');
      `}</style>

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
            className="uppercase tracking-widest text-sm font-semibold text-white"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,1)" }}
          >
            Sunshine Coast · Private Studio
          </p>

          <h1
            className="mt-4 max-w-3xl text-white"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.6rem, 5.5vw, 4rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              textShadow: "0 4px 20px rgba(0,0,0,0.95), 0 2px 8px rgba(0,0,0,0.9), 0 1px 3px rgba(0,0,0,0.8)",
            }}
          >
            {headline}{" "}
            <span style={{ fontStyle: "italic", fontWeight: 700, color: "#fdfcf9" }}>
              {highlight}
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl text-base sm:text-lg font-semibold text-white"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,0.9)" }}
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
            className="mt-4 text-sm tracking-wide font-semibold text-white"
            style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}
          >
            ✦ 100% Organic ✦ Private &amp; One-on-One ✦ Money-Back Guarantee
          </p>
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
