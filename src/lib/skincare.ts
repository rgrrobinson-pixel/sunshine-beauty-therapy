export type SkinProduct = {
  name: string;
  price: string;
  size: string;
  description: string;
  keyIngredients: string;
  imageUrl: string;
  productUrl: string;
};

export type SkinType = {
  slug: string;
  heading: string;
  description: string;
  dailyRoutinePdf: string;
  products: SkinProduct[];
};

export const SKIN_TYPES: SkinType[] = [
  {
    slug: "mature-very-dry",
    heading: "Mature / Very Dry Skin",
    description:
      "Mature/Very Dry skin is the result of the aging process, degeneration of collagen and elasticity fibres. Noticeable changes to the skin varies greatly in every individual. Mature skin can be identified by its texture — it tends to be very dry and thin looking. The skin care routine Juniper recommends consists of Vitamins A and C to hydrate, regenerate and repair ageing skin. Certified organic rose otto, sandalwood, frankincense and carrot oil to revitalise aging skin, treat thread veins and soften fine lines.",
    dailyRoutinePdf:
      "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Juniper_MatureSkin.pdf",
    products: [
      {
        name: "Nourishing Cream Cleanser",
        price: "$34.95",
        size: "125ml",
        description:
          "A luxurious cream cleanser that gently removes makeup and impurities while nourishing and hydrating mature, dry skin.",
        keyIngredients:
          "Rose Otto, Sandalwood, Frankincense, Carrot Oil, Vitamins A & C",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Nourishing_Cream_Cleanser-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/nourishing-cream-cleanser-125ml/",
      },
      {
        name: "Rose Otto Hydrating Mist",
        price: "$28.95",
        size: "125ml",
        description:
          "A soothing hydrating mist with certified organic rose otto to tone, hydrate and revitalise mature skin.",
        keyIngredients: "Rose Otto, Aloe Vera, Rosewater",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Rose_Otto_Hydrating_Mist-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/rose-otto-hydrating-mist-125ml/",
      },
      {
        name: "Pure Rejuvenation Oil",
        price: "$49.95",
        size: "30ml",
        description:
          "A potent facial oil blended with certified organic botanicals to deeply nourish, plump and restore radiance to mature skin.",
        keyIngredients:
          "Frankincense, Rose Otto, Carrot Oil, Sandalwood, Vitamin E",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Pure_Rejuvenation_Oil-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/pure-rejuvenation-oil-30ml/",
      },
      {
        name: "Rich Hydrating Cream",
        price: "$49.95",
        size: "50ml",
        description:
          "A deeply nourishing daytime moisturiser that hydrates, plumps and protects mature and very dry skin throughout the day.",
        keyIngredients:
          "Rose Otto, Shea Butter, Jojoba Oil, Vitamins A & C, SPF protection",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Rich_Hydrating_Cream-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/rich-hydrating-cream-50ml/",
      },
      {
        name: "Ultra Calm Replenishing Cream",
        price: "$49.95",
        size: "50ml",
        description:
          "A rich evening moisturiser that works overnight to replenish lost moisture, regenerate skin cells and soften fine lines.",
        keyIngredients:
          "Frankincense, Rose Otto, Carrot Oil, Shea Butter, Vitamin A",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Ultra_Calm_Replenishing_Cream-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/ultra-calm-replenishing-cream-50ml/",
      },
    ],
  },
  {
    slug: "normal-dry",
    heading: "Normal / Dry Skin",
    description:
      "Dry skin is the result of either aging or underactivity of the sebaceous (oil) gland; it is also aggravated by sun, wind, heat, soap, detergents and harsh skincare and diet. Dry skin can be identified by its texture — it tends to be very fine and thin looking and the pores are almost invisible. The skin care routine Juniper recommends consists of certified organic Rose-Otto and Palmarosa essential oils along with various oils containing high amounts of Vitamins A and C to hydrate, regenerate and repair.",
    dailyRoutinePdf:
      "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Juniper_Normal-DrySkin.pdf",
    products: [
      {
        name: "Nourishing Cream Cleanser",
        price: "$34.95",
        size: "125ml",
        description:
          "A gentle, nourishing cream cleanser that removes impurities without stripping the skin's natural moisture barrier.",
        keyIngredients: "Rose Otto, Palmarosa, Jojoba Oil, Aloe Vera",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Nourishing_Cream_Cleanser-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/nourishing-cream-cleanser-125ml/",
      },
      {
        name: "Rose Otto Hydrating Mist",
        price: "$28.95",
        size: "125ml",
        description:
          "A refreshing hydrating mist that tones and prepares skin for moisturising. Ideal after cleansing or throughout the day.",
        keyIngredients: "Rose Otto, Palmarosa, Aloe Vera, Rosewater",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Rose_Otto_Hydrating_Mist-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/rose-otto-hydrating-mist-125ml/",
      },
      {
        name: "Rich Hydrating Cream",
        price: "$49.95",
        size: "50ml",
        description:
          "A beautifully nourishing daytime moisturiser that hydrates and protects normal to dry skin all day long.",
        keyIngredients: "Rose Otto, Palmarosa, Shea Butter, Vitamins A & C",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Rich_Hydrating_Cream-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/rich-hydrating-cream-50ml/",
      },
      {
        name: "Ultra Calm Replenishing Cream",
        price: "$49.95",
        size: "50ml",
        description:
          "A rich evening moisturiser to deeply nourish and repair normal to dry skin overnight.",
        keyIngredients: "Rose Otto, Palmarosa, Carrot Oil, Vitamin A",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Ultra_Calm_Replenishing_Cream-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/ultra-calm-replenishing-cream-50ml/",
      },
    ],
  },
  {
    slug: "oily-dehydrated",
    heading: "Oily / Dehydrated Skin",
    description:
      "Oily skin or Seborrhoea is the name given to excessively oily skin. Seborrhoea is due to the overactive sebaceous (oil) gland and results in overproduction of sebum — it can be identified by its shiny, thick and firm appearance, often with enlarged pores and blemishes. It is a mistake to use harsh skincare products containing alcohol or strong astringents, as this will stimulate the production of more sebum. The skin care routine Juniper recommends consists of certified organic geranium and lavender for their antibacterial properties and regulation of sebum production. The Purifying range also contains Australian Wattleseed for its pore refining and anti-inflammatory properties. An oil-free moisturiser is important to keep skin hydrated and balance the acid mantle.",
    dailyRoutinePdf:
      "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Juniper_Oily-DehydratedSkin.pdf",
    products: [
      {
        name: "Oil Balancing Cleanser",
        price: "$26.95",
        size: "125ml",
        description:
          "A purifying aloe vera based cleansing lotion enriched with vitamins, minerals and antioxidants with astringent, toning, pore refining and oil balancing properties.",
        keyIngredients:
          "Aloe Vera, Jojoba Oil, Grapefruit Seed Extract, Wattleseed Extract, Geranium, Witch Hazel",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Oil_Balancing_Cleanser-1-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/oil-balancing-cleanser-125ml/",
      },
      {
        name: "Purifying Facial Exfoliant",
        price: "$34.95",
        size: "100g",
        description:
          "An indulgent exfoliating lotion with non-abrasive jojoba beads that unclog pores, remove dead cells and balance oil production. Leaves skin smooth, toned and refreshed.",
        keyIngredients:
          "Aloe Vera, Jojoba Wax Beads, Apricot Oil, Wattleseed Extract, Lemon, Geranium",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Purifying_Facial_Exfoliant-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/purifying-faical-exfoliant-100g/",
      },
      {
        name: "Oil Purifying Treatment Toner",
        price: "$28.95",
        size: "125ml",
        description:
          "A balancing treatment toner that refines pores, removes excess oil and primes skin for moisturising.",
        keyIngredients: "Aloe Vera, Witch Hazel, Geranium, Lavender, Wattleseed",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Oil_Purifying_Treatment_Toner-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/oil-purifying-treatment-toner-125ml/",
      },
      {
        name: "Oil Free Moisturiser",
        price: "$39.95",
        size: "50ml",
        description:
          "A lightweight, oil-free moisturiser that hydrates without adding shine — essential for balancing oily and dehydrated skin.",
        keyIngredients: "Aloe Vera, Geranium, Lavender, Wattleseed, Vitamin E",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Oil_Free_Moisturiser-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/oil-free-moisturiser-50ml/",
      },
    ],
  },
  {
    slug: "sensitive",
    heading: "Sensitive Skin",
    description:
      "Sensitive skin varies in its appearance depending on how sensitive the individual is and whether the symptom is hereditary, environmental or caused by lifestyle choices. Someone with sensitive skin without a diagnosed condition tends to have a youthful appearance with delicate skin that is almost translucent. Sensitive skin can become dry, itchy and red. The skin care routine Juniper recommends consists of certified organic essential oils of Rose-Otto, which has an astringent effect on capillaries and is used to reduce redness and broken capillaries. Juniper's Sensitive range is also formulated with Calendula to soothe irritated sensitive skin and protect the lipid and barrier function of the skin.",
    dailyRoutinePdf:
      "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Juniper_SensitiveSkin.pdf",
    products: [
      {
        name: "Calming Makeup Remover",
        price: "$42.95",
        size: "100ml",
        description:
          "A gentle, soothing makeup remover specially formulated for sensitive skin. Removes all traces of makeup without irritation.",
        keyIngredients: "Rose Otto, Calendula, Aloe Vera, Chamomile",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Calming_Makeup_Remover-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/calming-makeup-remover-100ml/",
      },
      {
        name: "Sensitive Cream Cleanser",
        price: "$34.95",
        size: "125ml",
        description:
          "A deeply calming cream cleanser that gently removes impurities while soothing redness and protecting the skin barrier.",
        keyIngredients: "Rose Otto, Calendula, Chamomile, Aloe Vera",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Sensitive_Cream_Cleanser-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/sensitive-cream-cleanser-125ml/",
      },
      {
        name: "Sensitive Skin Hydrating Mist",
        price: "$28.95",
        size: "125ml",
        description:
          "A soothing hydrating mist that calms redness, reduces irritation and tones sensitive skin after cleansing.",
        keyIngredients: "Rose Otto, Calendula, Aloe Vera, Rosewater",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Sensitive_Hydrating_Mist-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/sensitive-skin-hydrating-mist-125ml/",
      },
      {
        name: "Ultra Calm Replenishing Cream",
        price: "$49.95",
        size: "50ml",
        description:
          "A rich, soothing moisturiser that calms sensitivity, reduces redness and restores the skin's protective barrier.",
        keyIngredients: "Rose Otto, Calendula, Chamomile, Shea Butter",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Ultra_Calm_Replenishing_Cream-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/ultra-calm-replenishing-cream-50ml/",
      },
    ],
  },
  {
    slug: "teen",
    heading: "Teen Skin",
    description:
      "A teenager's skin will be going through various changes on a hormonal level that is sometimes frustrating when pimples and acne develop. They become desperate to clear this up and tend to use harsh products that 'zap' the pimple but also strip the skin of its natural acid mantle — causing the sebum glands to overproduce oil to compensate, making the problem worse and creating a cycle. Juniper offers an alternative to chemical-loaded products that will calm the skin and regulate sebum production to prevent further problems occurring.",
    dailyRoutinePdf:
      "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Juniper_TeenSkin.pdf",
    products: [
      {
        name: "Teen Cleanser",
        price: "$26.95",
        size: "125ml",
        description:
          "A gentle yet effective cleanser formulated specifically for teenage skin. Clears blemishes and balances oil without harsh chemicals.",
        keyIngredients:
          "Aloe Vera, Geranium, Lavender, Wattleseed Extract, Tea Tree",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Teen_Cleanser-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/teen-cleanser-125ml/",
      },
      {
        name: "Teen Exfoliant",
        price: "$34.95",
        size: "100g",
        description:
          "A gentle exfoliating lotion with non-abrasive jojoba beads that unclogs pores and removes dead skin cells without irritation.",
        keyIngredients: "Aloe Vera, Jojoba Wax Beads, Geranium, Wattleseed",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Teen_Exfoliant-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/teen-exfoliant-100g/",
      },
      {
        name: "Teen Treatment Mist",
        price: "$28.95",
        size: "125ml",
        description:
          "A balancing treatment mist that tones, purifies and calms teenage skin. Use after cleansing or throughout the day.",
        keyIngredients: "Aloe Vera, Geranium, Lavender, Tea Tree, Wattleseed",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Teen_Treatment_Mist-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/teen-treatment-mist-125ml/",
      },
      {
        name: "Teen Moisturiser",
        price: "$34.95",
        size: "50ml",
        description:
          "A lightweight oil-free moisturiser that hydrates, calms and balances teenage skin without adding shine or clogging pores.",
        keyIngredients: "Aloe Vera, Geranium, Lavender, Tea Tree, Vitamin E",
        imageUrl:
          "https://juniperaustralia.com.au/wp-content/uploads/2020/05/Teen_Moisturiser-300x300.jpg",
        productUrl:
          "https://juniperaustralia.com.au/product/teen-moisturiser-50ml/",
      },
    ],
  },
];

export function getSkinTypeBySlug(slug: string): SkinType | undefined {
  return SKIN_TYPES.find((s) => s.slug === slug);
}
