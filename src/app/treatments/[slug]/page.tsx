import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTreatmentDetail, getTreatments } from "@/sanity/queries";
import { getTreatmentBySlug, TREATMENT_DETAILS } from "@/lib/treatments";
import { SITE } from "@/lib/data";
import GiftVoucherPurchase from "@/components/GiftVoucherPurchase";

export function generateStaticParams() {
  return TREATMENT_DETAILS.map((t) => ({ slug: t.slug }));
}

export const dynamic = "force-dynamic";

export default async function TreatmentPage({
  params,
}: {
  params: { slug: string };
}) {
  // Static data (name, duration, price, image) from local file
  const local = getTreatmentBySlug(params.slug);
  if (!local) notFound();

  // Rich content (description, inclusions, terms) from Sanity
  const [detail, allTreatments] = await Promise.all([
    getTreatmentDetail(params.slug),
    getTreatments(),
  ]);

  // Find the matching Sanity treatment ID for pre-filling the voucher form
  const sanityTreatment = allTreatments.find(
    (t) => t.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === params.slug ||
           t.name === local.name
  );

  const bookingUrl = SITE.bookingUrl;

  // Use Sanity data where available, fall back to local
  const tagline = detail?.tagline ?? local.tagline;
  const description = detail?.description ?? local.description;
  const inclusions = detail?.inclusions ?? local.inclusions.map((inc, i) => ({
    _key: `i${i}`,
    name: inc.name,
    value: inc.value,
  }));
  const totalValue = detail?.totalValue ?? local.totalValue;
  const note = detail?.note ?? local.note;
  const terms = detail?.terms ?? [
    { _key: "t1", text: "Gift vouchers purchased for treatments that are on sale or discounted from the normal price are valid for 12 months from date of issue." },
    { _key: "t2", text: "Cancellations of bookings within 72 hours of confirmed appointments will invalidate vouchers." },
    { _key: "t3", text: "All prices include GST." },
  ];

  return (
    <div className="min-h-screen bg-[#f6f3ee]">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-sm text-[#4d7355] hover:text-[#2c4234] transition-colors"
        >
          ← Back to treatments
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-10 pb-20">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#c49a3a] mb-3">
            {local.duration}{local.tag ? ` · ${local.tag}` : ""}
          </p>
          <h1
            className="text-[#2c4234]"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              lineHeight: 1.15,
            }}
          >
            {local.name}
          </h1>
          <p className="mt-3 text-lg text-[#5a5850] italic">{tagline}</p>
        </div>

        {/* Hero image */}
        <div className="relative w-full overflow-hidden rounded-2xl mb-10" style={{ height: "400px" }}>
          <Image
            src={local.imageUrl}
            alt={local.name}
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-[#e8e2d9] p-8 mb-6">
          <h2
            className="text-[#2c4234] mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", fontWeight: 700 }}
          >
            About this treatment
          </h2>
          <p className="text-[#5a5850] leading-relaxed">{description}</p>
        </div>

        {/* What's included */}
        {inclusions.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#e8e2d9] p-8 mb-6">
            <h2
              className="text-[#2c4234] mb-5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.4rem", fontWeight: 700 }}
            >
              What&apos;s included
            </h2>
            <ul className="divide-y divide-[#f0ece6]">
              {inclusions.map((inc) => (
                <li key={inc._key} className="flex items-center justify-between py-3">
                  <span className="flex items-center gap-3 text-[#3d5e44]">
                    <span className="text-[#4d7355]">✦</span>
                    <span className="text-sm font-medium">{inc.name}</span>
                  </span>
                  {inc.value && (
                    <span className="text-sm text-[#8a8880] font-medium">Value {inc.value}</span>
                  )}
                </li>
              ))}
            </ul>
            {totalValue && (
              <div className="mt-5 pt-4 border-t border-[#e8e2d9] flex items-center justify-between">
                <span className="font-semibold text-[#2c4234]">Total value</span>
                <span className="font-semibold text-[#2c4234]">{totalValue}</span>
              </div>
            )}
          </div>
        )}

        {/* Pricing + CTA */}
        <div className="bg-[#2c4234] rounded-2xl p-8 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="text-[#c8d8c8] text-sm uppercase tracking-widest mb-1">Treatment price</p>
              <p
                style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2.8rem", fontWeight: 800, lineHeight: 1 }}
              >
                {local.price}
              </p>
              {note && (
                <p className="text-[#c8d8c8] text-sm mt-2">{note}</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={bookingUrl}
                className="inline-flex items-center justify-center bg-[#c49a3a] hover:bg-[#b08a2c] text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm"
              >
                Book this treatment
              </a>
              <a
                href="#gift-voucher"
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-7 py-3 rounded-full transition-colors border border-white/30 text-sm"
              >
                Buy as gift voucher
              </a>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-6 bg-white rounded-2xl border border-[#e8e2d9] p-6">
          <h3 className="text-sm font-semibold text-[#2c4234] mb-3">Important notes</h3>
          <ul className="space-y-2 text-xs text-[#8a8880] leading-relaxed">
            {terms.map((term) => (
              <li key={term._key}>✦ {term.text}</li>
            ))}
          </ul>
        </div>

        {/* Gift voucher section */}
        <div id="gift-voucher" className="mt-10 scroll-mt-8">
          <div className="mb-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#c49a3a] mb-1">Give the gift of wellness</p>
            <h2
              className="text-[#2c4234]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6rem", fontWeight: 700 }}
            >
              Buy a {local.name} Gift Voucher
            </h2>
            <p className="text-sm text-[#5a5850] mt-1">
              The perfect gift for someone special. Purchase online and receive the voucher by email instantly.
            </p>
          </div>
          <GiftVoucherPurchase
            treatments={allTreatments}
            initialOpen={true}
            initialVoucherType="treatment"
            initialTreatmentId={sanityTreatment?._id}
          />
        </div>

      </article>
    </div>
  );
}
