import Link from "next/link";
import type { Treatment } from "@/sanity/queries";
import { TREATMENT_DETAILS } from "@/lib/treatments";

// Map Sanity treatment names to local slugs
function slugForTreatment(name: string): string | null {
  const match = TREATMENT_DETAILS.find(
    (t) => t.name.toLowerCase() === name.toLowerCase() ||
           name.toLowerCase().includes(t.slug.replace(/-/g, " "))
  );
  return match?.slug ?? null;
}

export default function Treatments({ treatments }: { treatments: Treatment[] }) {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(250, 248, 243, 1)" }} />

      <div className="relative max-w-content mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow">Signature Treatments</p>
          <h2 className="section-heading mt-3">
            Crafted for your complete rejuvenation
          </h2>
          <p className="mt-4 text-ink/80">
            Every package is designed to leave you glowing from the inside
            out. All treatments use Juniper Organic Skincare — 100% natural,
            deeply nourishing.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t) => {
            const slug = slugForTreatment(t.name);
            return (
              <div
                key={t._id}
                className="flex flex-col rounded-2xl bg-sage-600 border border-sage-500/50 p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <p className="text-xs font-semibold tracking-wide uppercase text-gold">
                  {t.duration}
                  {t.tag ? ` · ${t.tag}` : ""}
                </p>
                <h3 className="font-display text-2xl mt-2 text-white">
                  {t.name}
                </h3>
                <p className="mt-3 text-sm text-cream-100/80 flex-1 leading-relaxed">
                  {t.description}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="font-display text-xl text-white font-medium">
                    {t.price}
                  </span>
                  <div className="flex gap-2">
                    {slug && (
                      <Link
                        href={`/treatments/${slug}`}
                        className="bg-white/15 hover:bg-white/25 text-white py-2 px-4 text-xs font-semibold rounded-full tracking-wide transition-colors duration-200 border border-white/30"
                      >
                        Details
                      </Link>
                    )}
                    <Link
                      href="/book"
                      className="bg-white text-sage-700 hover:bg-cream-100 py-2 px-5 text-xs font-semibold rounded-full tracking-wide transition-colors duration-200"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-ink/60">
          All prices include GST. Gift certificates available for any
          treatment.
        </p>
      </div>
    </section>
  );
}
