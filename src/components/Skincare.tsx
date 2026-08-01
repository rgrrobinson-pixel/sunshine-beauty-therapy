import Image from "next/image";
import Link from "next/link";
import type { SkincareProduct } from "@/sanity/queries";
import { SKIN_TYPES } from "@/lib/skincare";

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

      {/* Intro text */}
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

      {/* Bullet points */}
      <ul className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
        {FEATURES.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-ink/80">
            <span className="text-sage-500">✦</span>
            {f}
          </li>
        ))}
      </ul>

      {/* Skin type sections */}
      <div className="mt-16 space-y-12">
        <div className="text-center">
          <p className="eyebrow">Find Your Skin Type</p>
          <h3
            className="mt-2 text-[#2c4234]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 700,
            }}
          >
            Personalised routines for every skin
          </h3>
          <p className="mt-3 max-w-xl mx-auto text-sm text-ink/70 leading-relaxed">
            Juniper formulates each product range specifically for your skin type.
            Click your skin type below to explore your recommended routine and products.
          </p>
        </div>

        {SKIN_TYPES.map((skin) => (
          <div
            key={skin.slug}
            className="bg-white rounded-2xl border border-[#e8e2d9] overflow-hidden"
          >
            {/* Skin type header */}
            <div className="bg-[#f0ece6] px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h4
                className="text-[#2c4234]"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                }}
              >
                {skin.heading}
              </h4>
              <a
                href={skin.dailyRoutinePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#4d7355] hover:bg-[#3d5e44] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
              >
                Daily Routine ↓
              </a>
            </div>

            {/* Description */}
            <div className="px-8 py-6 border-b border-[#f0ece6]">
              <p className="text-sm text-[#5a5850] leading-relaxed">{skin.description}</p>
            </div>

            {/* Product grid */}
            <div className="px-8 py-6">
              <p className="text-xs font-semibold tracking-widest uppercase text-[#4d7355] mb-5">
                Recommended Products
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {skin.products.map((product) => (
                  <a
                    key={product.name}
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col bg-[#faf8f5] rounded-xl border border-[#e8e2d9] overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="relative aspect-square bg-white">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-3"
                      />
                    </div>
                    <div className="p-3 flex-1 flex flex-col">
                      <p className="text-xs font-semibold text-[#2c4234] leading-snug group-hover:text-[#4d7355] transition-colors">
                        {product.name}
                      </p>
                      {product.size && (
                        <p className="text-xs text-[#8a8880] mt-0.5">{product.size}</p>
                      )}
                      <p className="text-xs text-[#5a5850] mt-1.5 leading-relaxed line-clamp-2 flex-1">
                        {product.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm font-bold text-[#2c4234]">{product.price}</span>
                        <span className="text-xs text-[#4d7355] font-semibold group-hover:underline">
                          Details ▸
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Book a Facial CTA — at the bottom */}
      <div className="mt-14 text-center">
        <Link href="/book" className="btn-primary inline-flex">
          Book a Facial
        </Link>
      </div>

      {/* Individual Sanity product images (if any) */}
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
