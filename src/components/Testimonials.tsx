import Image from "next/image";
import type { Testimonial, SkincareProduct } from "@/sanity/queries";

export default function Testimonials({
  testimonials,
  products,
  reviewsUrl,
}: {
  testimonials: Testimonial[];
  products: SkincareProduct[];
  reviewsUrl: string;
}) {
  return (
    <section id="testimonials" className="bg-sage-50 py-20 sm:py-28">
      <div className="max-w-content mx-auto px-6">
        <div className="max-w-xl">
          <p className="eyebrow">Client Reviews</p>
          <h2 className="section-heading mt-3">Trusted by those who know</h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="rounded-2xl bg-white p-6 shadow-sm border border-sage-100"
            >
              <p className="text-gold tracking-widest">★★★★★</p>
              <p className="mt-4 text-sm text-ink/80 italic leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-sage-700">
                — {t.name}, {t.location}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-sage-600 hover:text-sage-700 underline underline-offset-4"
          >
            Read all Google Reviews
          </a>
        </div>

        <div className="mt-16 text-center">
          <p className="eyebrow">Proudly using Juniper Organic Skincare</p>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-5 gap-4">
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
      </div>
    </section>
  );
}
