import { client } from "./client";

export type Treatment = {
  _id: string;
  name: string;
  duration: string;
  tag: string | null;
  description: string;
  price: string;
};

export type Testimonial = {
  _id: string;
  quote: string;
  name: string;
  location: string;
};

export type SkincareProduct = {
  _id: string;
  name: string;
  imageUrl: string;
  section: "featured" | "strip";
};

export type GalleryImage = {
  _id: string;
  caption: string | null;
  imageUrl: string;
  featured: boolean;
};

export type SiteSettings = {
  heroHeadline: string;
  heroHighlight: string;
  heroSubtext: string;
  aboutIntro: string;
  aboutMassage: string;
  aboutBio: string;
  guaranteeQuote: string;
  phone: string;
  phoneHref: string;
  email: string;
  bookingUrl: string;
  giftCertificateUrl: string;
  reviewsUrl: string;
  termsUrl: string;
  logoUrl: string;
  portraitSize?: "standard" | "compact";
};

// Safe fallback used when Sanity is unavailable (e.g. expired token)
const DEFAULT_SETTINGS: SiteSettings = {
  heroHeadline: "Sunshine Beauty Therapy",
  heroHighlight: "",
  heroSubtext: "Certified Organic Skincare",
  aboutIntro: "Welcome to Sunshine Beauty Therapy",
  aboutMassage: "",
  aboutBio: "",
  guaranteeQuote: "",
  phone: "0416 144 999",
  phoneHref: "tel:0416144999",
  email: "jane@sunshinebeautytherapy.com.au",
  bookingUrl: "https://smartscheduling.com/janeguthrie",
  giftCertificateUrl: "",
  reviewsUrl: "",
  termsUrl: "",
  logoUrl: "",
  portraitSize: "standard",
};

async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    const result = await fn();
    return result ?? fallback;
  } catch (err) {
    console.error("[Sanity] Query failed, using fallback:", err);
    return fallback;
  }
}

export async function getTreatments(): Promise<Treatment[]> {
  return safeQuery(
    () =>
      client.fetch(
        `*[_type == "treatment"] | order(order asc){ _id, name, duration, tag, description, price }`,
        {},
        { cache: "no-store" }
      ),
    []
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return safeQuery(
    () =>
      client.fetch(
        `*[_type == "testimonial"] | order(order asc){ _id, quote, name, location }`,
        {},
        { cache: "no-store" }
      ),
    []
  );
}

export async function getSkincareProducts(): Promise<SkincareProduct[]> {
  return safeQuery(
    () =>
      client.fetch(
        `*[_type == "skincareProduct"] | order(order asc){ _id, name, "imageUrl": coalesce(image.asset->url, imageUrl), section }`,
        {},
        { cache: "no-store" }
      ),
    []
  );
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return safeQuery(
    () =>
      client.fetch(`*[_type == "siteSettings"][0]`, {}, { cache: "no-store" }),
    DEFAULT_SETTINGS
  );
}

export type SkinProduct = {
  _key: string;
  name: string;
  price: string;
  size: string;
  description: string;
  keyIngredients: string;
  imageUrl: string;
};

export type SkinType = {
  _id: string;
  slug: string;
  order: number;
  heading: string;
  description: string;
  dailyRoutinePdf: string;
  products: SkinProduct[];
};

export type TreatmentInclusion = {
  _key: string;
  name: string;
  value: string;
};

export type TreatmentDetailSanity = {
  _id: string;
  slug: string;
  tagline: string;
  description: string;
  inclusions: TreatmentInclusion[];
  totalValue: string | null;
  note: string | null;
  terms: { _key: string; text: string }[];
};

export async function getTreatmentDetail(slug: string): Promise<TreatmentDetailSanity | null> {
  return safeQuery(
    () =>
      client.fetch(
        `*[_type == "treatmentDetail" && slug.current == $slug][0]{
          _id,
          "slug": slug.current,
          tagline,
          description,
          "inclusions": inclusions[]{ _key, name, value },
          totalValue,
          note,
          "terms": terms[]{ _key, text }
        }`,
        { slug },
        { cache: "no-store" }
      ),
    null
  );
}

export async function getSkinTypes(): Promise<SkinType[]> {
  return safeQuery(
    () =>
      client.fetch(
        `*[_type == "skinType"] | order(order asc){
          _id,
          "slug": slug.current,
          order,
          heading,
          description,
          dailyRoutinePdf,
          "products": products[]{
            _key,
            name,
            price,
            size,
            description,
            keyIngredients,
            "imageUrl": imageUrl
          }
        }`,
        {},
        { cache: "no-store" }
      ),
    []
  );
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return safeQuery(
    () =>
      client.fetch(
        `*[_type == "galleryImage"] | order(order asc){ _id, caption, featured, "imageUrl": image.asset->url }`,
        {},
        { cache: "no-store" }
      ),
    []
  );
}
