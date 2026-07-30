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
    slug: "platinum-organic-facial",
    duration: "75 min",
    tag: null,
    name: "Platinum Organic Facial",
    tagline: "A perfect introduction to the Sunshine Beauty experience.",
    description:
      "75 minute Platinum Deluxe Organic Aromatherapy Facial with neck, shoulder, scalp and foot massage, including full skin analysis. There are specific treatments available for mature/dry skin, sensitive skin, oily-dehydrated skin, very sensitive & irritated skin, sun damaged-pigmented skin, teenage skin, and pregnancy skin.",
    inclusions: [
      { name: "Deluxe Organic Deluxe Facial", value: "$134" },
      { name: "Heavenly Scalp, Neck & Shoulder Massage", value: "$25" },
      { name: "Soothing Foot Massage", value: "$25" },
    ],
    totalValue: "$184.00",
    price: "A$99",
    note: "Includes full skin analysis.",
    imageUrl: "/treatment-room.jpg",
  },
  {
    slug: "organic-pamper-package",
    duration: "90 min",
    tag: "Popular",
    name: "Organic Pamper Package",
    tagline: "Put yourself at the top of the priority list.",
    description:
      "Put yourself at the top of the priority list for just 90 minutes. Enter your quiet enclave scented with lemongrass and the sound of soothing music. Switch off your mobile and slip into a calm and cosy atmosphere. Begin your Pamper treatment with a warm oil back massage followed by a 1 hour rejuvenating organic facial including face, neck, shoulder, scalp and stress relieving foot massage. You will leave feeling refreshed, both physically and mentally, ready to start looking after everyone else again.",
    inclusions: [
      { name: "30 min Deep Tissue Hot Oil Swedish Massage", value: "$59" },
      { name: "Scalp, Neck & Shoulder and Foot Massage", value: "$25" },
      { name: "Organic Facial to rejuvenate the skin", value: "$134" },
    ],
    totalValue: "$218.00",
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
      "Prepare yourself for the muscle melting treatment that awaits with a full body massage that leaves your body feeling wonderfully relaxed. Close your eyes and imagine the sensation of warm lemongrass oil drizzled over your body then massaged using a smooth Swedish technique. Follow this with a heavenly organic facial to rehydrate and plump your skin. Then, drift off as your scalp, neck and shoulders are gently massaged whilst your final masque is applied.",
    inclusions: [
      { name: "One Hour Full Body Deep Tissue Hot Oil Swedish Massage", value: "$109" },
      { name: "Juniper Organic Aromatherapy Facial", value: "$134" },
      { name: "Scalp, Neck, Shoulder & Foot Massage", value: "$50" },
    ],
    totalValue: "$293.00",
    price: "A$169",
    note: null,
    imageUrl: "/treatment-room.jpg",
  },
  {
    slug: "pure-bliss",
    duration: "2 hrs",
    tag: null,
    name: "Pure Bliss",
    tagline: "The ultimate skin and body treatment.",
    description:
      "Close your eyes and imagine the sensation of warm lemongrass oil drizzled over your back and then rhythmically massaged using a smooth Swedish technique. Feel your stress melt away whilst your muscles relax and tension is released. Follow this with a deluxe organic facial which hydrates, de-stresses, plumps and combats the ageing process.",
    inclusions: [
      { name: "Lemongrass Jojoba Bead Body Exfoliation", value: "$55" },
      { name: "Deep Tissue Swedish Hot Oil Aromatherapy Back Massage", value: "$59" },
      { name: "Deluxe Organic Facial with Skin Analysis", value: "$134" },
      { name: "Heavenly Scalp, Neck & Shoulder Massage", value: "$25" },
    ],
    totalValue: "$273.00",
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
      "The treatment starts with a nurturing Lemongrass full body clay wrap (Jojoba oil, aloe vera & kaolin clay) to relax your body and help release toxins. Your skin will feel firmer and hydrated. Next is a Lemongrass warm oil back massage using rhythmic Swedish Massage movements suitable for all ages and fitness levels. Follow this with a 60 minute Organic Deluxe Facial that hydrates, plumps and combats the ageing process. Complete the treatment with stress relieving scalp, neck & shoulder massage.",
    inclusions: [
      { name: "Lemongrass Body Clay Wrap", value: "$39" },
      { name: "Deep Tissue Swedish Warm Oil Back Massage", value: "$59" },
      { name: "Deluxe Juniper Organic Facial + Skin Analysis", value: "$134" },
      { name: "Heavenly Scalp, Neck, Shoulder and Foot Massage", value: "$50" },
    ],
    totalValue: "$282.00",
    price: "A$169",
    note: null,
    imageUrl: "/treatment-room.jpg",
  },
  {
    slug: "complete-skin-body",
    duration: "2.5 hrs",
    tag: null,
    name: "Complete Skin & Body",
    tagline: "The full journey — for those who want it all.",
    description:
      "The treatment starts with a Jojoba Bead Lemongrass Body Exfoliation that leaves your body feeling silky smooth. Next is a Lemongrass warm oil full body massage using rhythmic Swedish Massage movements suitable for all ages and fitness levels. Follow this with a 60 minute Organic Deluxe Facial that hydrates, plumps and combats the ageing process. Complete the treatment with stress relieving scalp, neck & shoulder massage.",
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
    slug: "ultimate-indulgence",
    duration: "2.5 hrs",
    tag: "Ultimate",
    name: "Ultimate Indulgence",
    tagline: "The pinnacle of the Sunshine Beauty experience.",
    description:
      "The treatment starts with a Jojoba Bead Lemongrass Body Exfoliation that leaves your body feeling silky smooth. Next is a nurturing Lemongrass full body clay wrap (Jojoba oil, aloe vera & kaolin clay) to relax your body and help release toxins — your skin will feel firmer and hydrated. Continue with a Lemongrass warm oil back massage using rhythmic Swedish Massage movements suitable for all ages and fitness levels. Follow this with a 60 minute Organic Deluxe Facial that hydrates, plumps and combats the ageing process. Complete the treatment with stress relieving scalp, neck & shoulder massage.",
    inclusions: [
      { name: "Lemongrass & Jojoba Bead Full Body Exfoliation", value: "$55" },
      { name: "Lemongrass Body Clay Wrap", value: "$39" },
      { name: "Deep Tissue Swedish Hot Oil Aromatherapy Back Massage", value: "$59" },
      { name: "Deluxe Juniper Organic Facial + Skin Analysis", value: "$134" },
      { name: "Heavenly Scalp, Neck, Shoulder and Foot Massage", value: "$50" },
    ],
    totalValue: "$337.00",
    price: "A$209",
    note: "Microdermabrasion additional $10.00",
    imageUrl: "/treatment-room.jpg",
  },
];

export function getTreatmentBySlug(slug: string): TreatmentDetail | undefined {
  return TREATMENT_DETAILS.find((t) => t.slug === slug);
}
