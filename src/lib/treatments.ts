export type TreatmentInclusion = {
  name: string;
  value: string;
};

export type TreatmentDetail = {
  slug: string;
  duration: string;
  tag: string | null;
  name: string;
  tagline: string;
  description: string;
  inclusions: TreatmentInclusion[];
  totalValue: string | null;
  price: string;
  note: string | null;
  imageUrl: string;
};

export const TREATMENT_DETAILS: TreatmentDetail[] = [
  {
    slug: "complete-skin-body",
    duration: "2.5 hrs",
    tag: null,
    name: "Complete Skin & Body Treatment",
    tagline: "The full journey — for those who want it all.",
    description:
      "The treatment starts with a Jojoba Bead Lemongrass Body Exfoliation that leaves your body feeling silky smooth. Next is a Lemongrass warm oil full body massage using rhythmic Swedish Massage movements suitable for all ages and fitness levels. Follow this with a 60 minute Organic Deluxe Facial that hydrates, plumps and combats the ageing process. Complete the treatment with a stress relieving scalp, neck & shoulder massage.",
    inclusions: [
      { name: "Lemongrass & Jojoba Bead Full Body Exfoliation", value: "$55" },
      { name: "Deep Tissue Swedish Hot Oil Aromatherapy Full Body Massage", value: "$109" },
      { name: "Deluxe Juniper Organic Facial + Skin Analysis", value: "$134" },
      { name: "Heavenly Scalp, Neck, Shoulder and Foot Massage", value: "$50" },
    ],
    totalValue: "$348.00",
    price: "A$209",
    note: "Microdermabrasion additional $10.00",
    imageUrl: "/treatment-room.jpg",
  },
  {
    slug: "platinum-organic-facial",
    duration: "75 min",
    tag: null,
    name: "Platinum Organic Facial",
    tagline: "A perfect introduction to the Sunshine Beauty experience.",
    description:
      "Our signature organic facial paired with a relaxing foot massage. Using Juniper Organic Skincare's finest botanical formulations, this treatment deeply cleanses, hydrates and revitalises your skin while a soothing foot massage melts away tension. Suitable for all skin types.",
    inclusions: [
      { name: "Juniper Organic Signature Facial", value: "" },
      { name: "Relaxing Foot Massage", value: "" },
    ],
    totalValue: null,
    price: "A$99",
    note: null,
    imageUrl: "/treatment-room.jpg",
  },
  {
    slug: "organic-pamper-package",
    duration: "90 min",
    tag: "Popular",
    name: "Organic Pamper Package",
    tagline: "The perfect balance of skin renewal and deep relaxation.",
    description:
      "Indulge in a full organic facial combined with a Swedish back massage. This popular package combines the restorative power of Juniper's certified organic skincare with the deep relaxation of a therapeutic Swedish back massage — leaving you glowing and completely at ease.",
    inclusions: [
      { name: "Juniper Full Organic Facial", value: "" },
      { name: "Swedish Back Massage", value: "" },
    ],
    totalValue: null,
    price: "A$129",
    note: null,
    imageUrl: "/treatment-room.jpg",
  },
  {
    slug: "paradise-package",
    duration: "2 hrs",
    tag: null,
    name: "Paradise Package",
    tagline: "Two hours of pure, uninterrupted bliss.",
    description:
      "A full-body Swedish massage followed by a deluxe organic facial. Lose yourself in two hours of complete relaxation as skilled hands work through every muscle group, followed by a deeply nourishing deluxe Juniper Organic Facial that leaves your skin luminous and refreshed.",
    inclusions: [
      { name: "Full Body Swedish Massage", value: "" },
      { name: "Deluxe Juniper Organic Facial", value: "" },
    ],
    totalValue: null,
    price: "A$169",
    note: null,
    imageUrl: "/treatment-room.jpg",
  },
  {
    slug: "pure-bliss",
    duration: "2 hrs",
    tag: null,
    name: "Pure Bliss",
    tagline: "Skin-transforming from head to toe.",
    description:
      "Full body exfoliation, a soothing massage, and a deluxe organic facial. This transformative package begins with a full body exfoliation to reveal fresh, smooth skin, followed by a soothing massage and a deeply nourishing Juniper Organic Facial to complete your head-to-toe renewal.",
    inclusions: [
      { name: "Full Body Exfoliation", value: "" },
      { name: "Soothing Full Body Massage", value: "" },
      { name: "Deluxe Juniper Organic Facial", value: "" },
    ],
    totalValue: null,
    price: "A$169",
    note: null,
    imageUrl: "/treatment-room.jpg",
  },
  {
    slug: "body-detox-wrap",
    duration: "2 hrs",
    tag: null,
    name: "Body Detox Wrap",
    tagline: "A complete reset for body and skin.",
    description:
      "Deep detoxifying body wrap with back massage and deluxe facial. This purifying treatment draws out toxins and deeply nourishes your skin with a professional detox wrap, followed by a therapeutic back massage to release tension and a Juniper Organic Facial to restore your natural radiance.",
    inclusions: [
      { name: "Deep Detoxifying Body Wrap", value: "" },
      { name: "Therapeutic Back Massage", value: "" },
      { name: "Deluxe Juniper Organic Facial", value: "" },
    ],
    totalValue: null,
    price: "A$169",
    note: null,
    imageUrl: "/treatment-room.jpg",
  },
  {
    slug: "ultimate-indulgence",
    duration: "2.5 hrs",
    tag: "Ultimate",
    name: "Ultimate Indulgence",
    tagline: "The pinnacle of the Sunshine Beauty experience.",
    description:
      "The pinnacle of the Sunshine Beauty experience — body exfoliation, clay detox wrap, full body massage, and a deluxe organic facial, all together. This is our most comprehensive treatment, designed for those who want a complete transformation. Every inch of your body is cared for, revitalised and renewed.",
    inclusions: [
      { name: "Full Body Exfoliation", value: "" },
      { name: "Clay Detox Wrap", value: "" },
      { name: "Full Body Massage", value: "" },
      { name: "Deluxe Juniper Organic Facial", value: "" },
    ],
    totalValue: null,
    price: "A$209",
    note: null,
    imageUrl: "/treatment-room.jpg",
  },
];

export function getTreatmentBySlug(slug: string): TreatmentDetail | undefined {
  return TREATMENT_DETAILS.find((t) => t.slug === slug);
}
