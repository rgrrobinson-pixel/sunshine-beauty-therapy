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
};

export async function getTreatments(): Promise<Treatment[]> {
  return client.fetch(
    `*[_type == "treatment"] | order(order asc){ _id, name, duration, tag, description, price }`,
    {},
    { cache: "no-store" }
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] | order(order asc){ _id, quote, name, location }`,
    {},
    { cache: "no-store" }
  );
}

export async function getSkincareProducts(): Promise<SkincareProduct[]> {
  return client.fetch(
    `*[_type == "skincareProduct"] | order(order asc){ _id, name, "imageUrl": coalesce(image.asset->url, imageUrl), section }`,
    {},
    { cache: "no-store" }
  );
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return client.fetch(`*[_type == "siteSettings"][0]`, {}, { cache: "no-store" });
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return client.fetch(
    `*[_type == "galleryImage"] | order(order asc){ _id, caption, featured, "imageUrl": image.asset->url }`,
    {},
    { cache: "no-store" }
  );
}
