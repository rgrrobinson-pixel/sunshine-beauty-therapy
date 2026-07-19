import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import SanctuaryBanner from "@/components/SanctuaryBanner";
import Treatments from "@/components/Treatments";
import Skincare from "@/components/Skincare";
import Testimonials from "@/components/Testimonials";
import GiftVouchers from "@/components/GiftVouchers";
import Gallery from "@/components/Gallery";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import {
  getSiteSettings,
  getTreatments,
  getTestimonials,
  getSkincareProducts,
  getGalleryImages,
} from "@/sanity/queries";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, treatments, testimonials, products, galleryImages] =
    await Promise.all([
      getSiteSettings(),
      getTreatments(),
      getTestimonials(),
      getSkincareProducts(),
      getGalleryImages(),
    ]);

  const featuredProducts = products.filter((p) => p.section === "featured");
  const stripProducts = products.filter((p) => p.section === "strip");

  return (
    <>
      <Header />
      <main>
        <Hero
          headline={settings.heroHeadline}
          highlight={settings.heroHighlight}
          subtext={settings.heroSubtext}
          logoUrl={settings.logoUrl}
        />
        <About
          intro={settings.aboutIntro}
          massage={settings.aboutMassage}
          bio={settings.aboutBio}
          guaranteeQuote={settings.guaranteeQuote}
          phone={settings.phone}
          phoneHref={settings.phoneHref}
          email={settings.email}
          portraitSize={settings.portraitSize}
        />
        <SanctuaryBanner />
        <Treatments treatments={treatments} />
        <Skincare products={featuredProducts} />
        <Testimonials
          testimonials={testimonials}
          products={stripProducts}
          reviewsUrl={settings.reviewsUrl}
        />
        <GiftVouchers treatments={treatments} />
        <Gallery images={galleryImages} />
        <CtaSection phone={settings.phone} phoneHref={settings.phoneHref} />
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
