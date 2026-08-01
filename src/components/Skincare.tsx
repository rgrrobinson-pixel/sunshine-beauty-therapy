import Image from "next/image";
import Link from "next/link";
import type { SkincareProduct, SkinType } from "@/sanity/queries";

const FEATURES = [
  "100% organic, botanical ingredients",
  "No parabens, no SLS, no nasties",
  "Cruelty-free & not animal tested",
  "Available for in-salon purchase",
];

export default function Skincare({
  products,
  skinTypes,
}: {
  products: SkincareProduct[];
  skinTypes: SkinType[];
}) {
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
          restored skin. We carry the full Juniper range for home use —
          available for purchase in-salon at your next appointment.
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

      {/* Skin type sections — from Sanity */}
      {skinTypes.length > 0 && (
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
              Explore your recommended routine and products below.
            </p>
          </div>

          {skinTypes.map((skin) => (
            <div
              key={skin._id}
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
                {skin.dailyRoutinePdf && (
                  <a
                    href={skin.dailyRoutinePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#4d7355] hover:bg-[#3d5e44] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap"
                  >
                    Daily Routine ↓
                  </a>
                )}
              </div>

              {/* Description */}
              <div className="px-8 py-6 border-b border-[#f0ece6]">
                <p className="text-sm text-[#5a5850] leading-relaxed">{skin.description}</p>
              </div>

              {/* Product grid */}
              {skin.products && skin.products.length > 0 && (
                <div className="px-8 py-6">
                  <p className="text-xs font-semibold tracking-widest uppercase text-[#4d7355] mb-5">
                    Recommended Products
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {skin.products.map((product) => (
                      <div
                        key={product._key}
                        className="flex flex-col bg-[#faf8f5] rounded-xl border border-[#e8e2d9] overflow-hidden"
                      >
                        {product.imageUrl && (
                          <div className="relative aspect-square bg-white">
                            <Image
                              src={product.imageUrl}
                              alt={product.name}
                              fill
                              className="object-contain p-3"
                            />
                          </div>
                        )}
                        <div className="p-3 flex-1 flex flex-col">
                          <p className="text-xs font-semibold text-[#2c4234] leading-snug">
                            {product.name}
                          </p>
                          {product.size && (
                            <p className="text-xs text-[#8a8880] mt-0.5">{product.size}</p>
                          )}
                          {product.description && (
                            <p className="text-xs text-[#5a5850] mt-1.5 leading-relaxed line-clamp-3 flex-1">
                              {product.description}
                            </p>
                          )}
                          <div className="mt-3 pt-2 border-t border-[#f0ece6] flex items-center justify-between">
                            <span className="text-sm font-bold text-[#2c4234]">{product.price}</span>
                            <span className="text-xs text-[#8a8880] italic">In-salon only</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Book a Facial CTA */}
      <div className="mt-14 text-center">
        <p className="text-sm text-ink/60 mb-4">
          All Juniper products are available for purchase in-salon — ask Jane at your next appointment.
        </p>
        <Link href="/book" className="btn-primary inline-flex">
          Book a Facial
        </Link>
      </div>

      {/* Sanity product strip (if any) */}
      {products.length > 0 && (
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="relative aspect-square rounded-xl overflow-hidden bg-white border border-sage-100 hover:shadow-md transition-shadow duration-200"
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
