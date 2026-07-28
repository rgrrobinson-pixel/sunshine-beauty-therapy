import Image from "next/image";
import Link from "next/link";
import type { SkincareProduct } from "@/sanity/queries";

const FEATURES = [
  "100% organic, botanical ingredients",
  "No parabens, no SLS, no nasties",
  "Cruelty-free & not animal tested",
  "Available to purchase for home use",
];

export default function Skincare({ products }: { products: SkincareProduct[] }) {
  return (
    <section id="skincare" className="max-w-content mx-auto px-6 py-20 sm:py-28">

      {/* Eyebrow + Heading */}
      <p className="eyebrow text-center">Juniper Organic Skincare</p>
      <h2 className="section-heading mt-3 text-center">
        Nature&apos;s finest, on your skin
      </h2>

      {/* Collage image directly under heading */}
      <div className="relative mt-8 w-full overflow-hidden rounded-2xl" style={{ height: "360px" }}>
        <Image
          src="/juniper-collage.png"
          alt="Juniper organic skincare products beautifully arranged with natural botanicals"
          fill
          className="object-cover"
        />
      </div>

      {/* Text paragraphs */}
      <div className="mt-8 max-w-2xl mx-auto text-center">
        <p className="text-ink/80 leading-relaxed">
          Every treatment at Sunshine Beauty Therapy uses Juniper Organic
          Skincare — a range crafted from pure botanical ingredients, free
          from parabens, SLS, and never tested on animals.
        </p>
        <p className="mt-4 text-ink/80 leading-relaxed">
          The results speak for themselves: deeply nourished, glowing,
          restored skin. We also carry Juniper products for home use, so
          you can extend that salon-fresh feeling every day.
        </p>
      </div>

      {/* Bullet points — horizontal row */}
      <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
        {FEATURES.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-ink/80">
            <span className="text-sage-500">✦</span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <Link href="/book" className="btn-primary inline-flex">
          Book a Facial
        </Link>
      </div>

      {/* Individual product images */}
      {products.length > 0 && (
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="relative aspect-square rounded-xl overflow-hidden bg-white border border-sage-100 cursor-pointer hover:shadow-md transition-shadow duration-200"
              title={p.name}
            >
              <Image
                src={p.imageUrl}
                alt={p.name}
                fill
                className="object-contain p-3"
              />
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
