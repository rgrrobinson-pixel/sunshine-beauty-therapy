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
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="eyebrow">Juniper Organic Skincare</p>
          <h2 className="section-heading mt-3">
            Nature&apos;s finest, on your skin
          </h2>
          <p className="mt-4 text-ink/80 leading-relaxed">
            Every treatment at Sunshine Beauty Therapy uses Juniper Organic
            Skincare — a range crafted from pure botanical ingredients, free
            from parabens, SLS, and never tested on animals.
          </p>
          <p className="mt-4 text-ink/80 leading-relaxed">
            The results speak for themselves: deeply nourished, glowing,
            restored skin. We also carry Juniper products for home use, so
            you can extend that salon-fresh feeling every day.
          </p>

          <ul className="mt-6 space-y-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-ink/80">
                <span className="text-sage-500 mt-0.5">✦</span>
                {f}
              </li>
            ))}
          </ul>

          <Link href="/book" className="btn-primary mt-8 inline-flex">
            Book a Facial
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="relative aspect-square rounded-xl overflow-hidden bg-white border border-sage-100"
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
      </div>

      <div className="relative mt-14 h-64 sm:h-80 w-full overflow-hidden rounded-2xl">
        <Image
          src="/juniper-collage.png"
          alt="Juniper organic skincare products beautifully arranged with natural botanicals"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
