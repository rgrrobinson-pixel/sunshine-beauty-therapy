import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GiftVoucherPurchase from "@/components/GiftVoucherPurchase";
import { getTreatments, getSiteSettings } from "@/sanity/queries";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BlissPackagePage() {
  const [settings, treatments] = await Promise.all([
    getSiteSettings(),
    getTreatments(),
  ]);

  // Find the Pure Bliss treatment
  const blissTreatment = treatments.find((t) =>
    t.name.toLowerCase().includes("bliss")
  );

  const price = blissTreatment?.price ?? "A$169";
  const duration = blissTreatment?.duration ?? "2 hrs";
  const description =
    blissTreatment?.description ??
    "Full body exfoliation, a soothing massage, and a deluxe organic facial. Skin-transforming from head to toe.";

  return (
    <>
      <Header />
      <main className="bg-cream-50 min-h-screen pt-24">
        {/* Hero Section */}
        <section className="relative bg-sage-800 py-16 sm:py-24 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.stockcake.com/public/5/5/e/55e80e3a-a648-4a79-ac8b-525d95bcd08a_large/tropical-spa-retreat-stockcake.jpg"
              alt="Relaxing tropical spa background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10 max-w-content mx-auto px-6 text-center">
            <span className="text-xs font-semibold tracking-widest uppercase text-cream-100/90 block mb-2">
              Jane&apos;s Most Popular Signature Treatment
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-white font-medium tracking-wide">
              The Pure Bliss Package
            </h1>
            <div className="w-16 h-1 bg-gold mx-auto my-6"></div>
            <p className="max-w-2xl mx-auto text-cream-100/90 sm:text-lg leading-relaxed">
              Indulge in a luxurious 2-hour, head-to-toe restoration package in a private sanctuary on the Sunshine Coast. Deeply therapeutic and skin-transforming.
            </p>
          </div>
        </section>

        {/* Core Content Grid */}
        <section className="max-w-content mx-auto px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Treatment Journey Description */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-sage-600 block">
                  The Experience
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-ink mt-2">
                  Two Hours of Pure Tranquillity
                </h2>
                <div className="flex gap-4 items-center mt-4">
                  <div className="bg-sage-100 text-sage-800 rounded-full px-4 py-1.5 text-sm font-semibold">
                    ⏱️ {duration}
                  </div>
                  <div className="bg-sage-100 text-sage-800 rounded-full px-4 py-1.5 text-sm font-semibold">
                    💰 {price}
                  </div>
                </div>
                <p className="mt-6 text-ink/80 leading-relaxed text-base sm:text-lg">
                  {description} Utilizing premium, 100% natural organic skincare by Juniper, this signature package is designed to melt away deep physical tension while leaving your skin completely radiant and revitalized.
                </p>
              </div>

              {/* Steps Timeline */}
              <div className="space-y-8 border-l-2 border-sage-200 pl-6 ml-2">
                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-sage-600 border-4 border-cream-50"></div>
                  <h3 className="font-display text-xl text-ink font-semibold">
                    Step 1: Full-Body Organic Exfoliation
                  </h3>
                  <p className="text-ink/70 mt-2 leading-relaxed">
                    A gentle, nutrient-dense sea salt and organic oil scrub to polish away dull skin cells, stimulate circulation, and prepare your skin to absorb deep hydration.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-sage-600 border-4 border-cream-50"></div>
                  <h3 className="font-display text-xl text-ink font-semibold">
                    Step 2: Soothing Aromatherapy Massage
                  </h3>
                  <p className="text-ink/70 mt-2 leading-relaxed">
                    Custom-blended organic massage oils combined with long, flowing strokes to release muscular tension in your back, neck, shoulders, and legs. Fully customized to your desired pressure.
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-sage-600 border-4 border-cream-50"></div>
                  <h3 className="font-display text-xl text-ink font-semibold">
                    Step 3: Deluxe Hydrating Facial
                  </h3>
                  <p className="text-ink/70 mt-2 leading-relaxed">
                    A customized double-cleanse, gentle exfoliation, and vitamin-rich botanical mask tailored to your specific skin needs, ending with a soothing head, neck, and shoulder massage.
                  </p>
                </div>
              </div>

              <div className="bg-sage-600 rounded-2xl p-6 sm:p-8 text-white space-y-4 shadow-md">
                <h4 className="font-display text-xl font-semibold">Looking to book this session for yourself?</h4>
                <p className="text-cream-100/90 text-sm leading-relaxed">
                  Treat yourself to Jane&apos;s flagship treatment. One-on-one sessions in our quiet Sunshine Coast retreat ensure you receive 100% focused attention.
                </p>
                <div className="pt-2">
                  <Link href="/book" className="bg-white text-sage-800 hover:bg-cream-100 px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide inline-block transition-colors">
                    Book Appointment Online
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column: Pre-Selected Gift Voucher Checkout */}
            <div className="lg:col-span-5 bg-white border border-sage-100 rounded-2xl p-6 sm:p-8 shadow-sm lg:sticky lg:top-28">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold block">
                Gift Giving Made Simple
              </span>
              <h3 className="font-display text-2xl text-ink mt-2">
                Send a Pure Bliss Voucher
              </h3>
              <p className="text-sm text-ink/70 mt-2 leading-relaxed">
                Purchase this package as an elegant digital gift certificate. It will be generated and emailed instantly, pre-filled with the treatment name and your personal message.
              </p>
              
              <div className="mt-6 border-t border-sage-50 pt-4">
                <GiftVoucherPurchase 
                  treatments={treatments} 
                  initialOpen={true}
                  initialVoucherType="treatment"
                  initialTreatmentId={blissTreatment?._id}
                />
              </div>
            </div>

          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-sage-100/50 py-16 sm:py-24">
          <div className="max-w-content mx-auto px-6 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-sage-600">
              Reviews
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-ink mt-2">
              Loved by Sunshine Coast Locals
            </h2>
            
            <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 border border-sage-100 text-left shadow-sm">
                <p className="text-ink/80 italic leading-relaxed text-base">
                  &ldquo;I was gifted the Pure Bliss package for my birthday and it was the most relaxing 2 hours of my life. Jane has absolute magic hands. The body scrub felt amazing and the organic facial left my skin glowing for days!&rdquo;
                </p>
                <div className="mt-4 border-t border-sage-50 pt-3">
                  <p className="font-semibold text-ink">Joanne M.</p>
                  <p className="text-xs text-ink/60">Noosa, QLD</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-sage-100 text-left shadow-sm">
                <p className="text-ink/80 italic leading-relaxed text-base">
                  &ldquo;Jane&apos;s studio is peaceful and immaculate. The Pure Bliss package is worth every single dollar. The massage relieved all the tension in my back, and the Juniper organic products smell heavenly.&rdquo;
                </p>
                <div className="mt-4 border-t border-sage-50 pt-3">
                  <p className="font-semibold text-ink">Sarah L.</p>
                  <p className="text-xs text-ink/60">Maroochydore, QLD</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer 
        phone={settings.phone} 
        phoneHref={settings.phoneHref} 
        email={settings.email} 
        termsUrl={settings.termsUrl} 
        logoUrl={settings.logoUrl} 
      />
    </>
  );
}
