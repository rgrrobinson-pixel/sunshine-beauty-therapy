import Image from "next/image";
import GiftVoucherPurchase from "./GiftVoucherPurchase";

type Treatment = { _id: string; name: string; price: string };

export default function GiftVouchers({
  treatments,
}: {
  treatments: Treatment[];
}) {
  return (
    <section id="gift" className="max-w-content mx-auto px-6 py-20 sm:py-28">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden">
          <Image
            src="/gift-voucher-ribbon.png"
            alt="Sunshine Beauty Therapy gift voucher presented in an elegant envelope with sage green ribbon and frangipani flower"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="eyebrow">Gift Certificates</p>
          <h2 className="section-heading mt-3">
            Give the gift of pure indulgence
          </h2>
          <p className="mt-4 text-ink/80 leading-relaxed">
            A Sunshine Beauty Therapy gift certificate is the most thoughtful
            gift you can give — the gift of time, tranquillity, and
            transformative care.
          </p>
          <p className="mt-4 text-ink/80 leading-relaxed">
            Available for any of our treatment packages, or as a
            dollar-value certificate to let them choose their own
            experience.
          </p>
          <p className="mt-4 text-sm text-ink/60 leading-relaxed">
            All treatments can be purchased as gift vouchers. Select your
            treatment and follow the prompts through to online payment — a
            voucher will be generated and emailed to you to print or
            forward. Prefer a personal touch? Contact me by phone, SMS or
            email and I can arrange it for you. All major credit cards
            accepted.
          </p>

          <GiftVoucherPurchase treatments={treatments} />
        </div>
      </div>
    </section>
  );
}
