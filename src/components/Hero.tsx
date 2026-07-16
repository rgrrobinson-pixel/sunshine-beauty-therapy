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
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/20" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="eyebrow text-cream-100/90" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>
            Sunshine Coast · Private Studio
          </p>

          <h1 className="section-heading mt-4 max-w-3xl text-white" style={{ color: "white", textShadow: "0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.3)" }}>
            {headline}{" "}
            <span className="italic font-medium text-cream-100" style={{ color: "#fdfcf9" }}>
              {highlight}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-cream-100/90" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
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


          <p className="mt-4 text-sm tracking-wide text-cream-100/80">
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
