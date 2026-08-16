import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroHighlight', title: 'Hero Highlight Text', type: 'string' }),
    defineField({ name: 'heroSubtext', title: 'Hero Subtext', type: 'string' }),
    defineField({ name: 'aboutIntro', title: 'About Intro', type: 'text' }),
    defineField({ name: 'aboutMassage', title: 'About Massage Text', type: 'text' }),
    defineField({ name: 'aboutBio', title: 'About Bio', type: 'text' }),
    defineField({ name: 'guaranteeQuote', title: 'Guarantee Quote', type: 'text' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'phoneHref', title: 'Phone Href (e.g. tel:0416144999)', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'bookingUrl', title: 'Booking URL', type: 'url' }),
    defineField({ name: 'giftCertificateUrl', title: 'Gift Certificate URL', type: 'url' }),
    defineField({ name: 'reviewsUrl', title: 'Reviews URL', type: 'url' }),
    defineField({ name: 'termsUrl', title: 'Terms URL', type: 'url' }),
    defineField({ name: 'logoUrl', title: 'Logo URL', type: 'url' }),
    defineField({
      name: 'portraitSize',
      title: 'Portrait Size',
      type: 'string',
      options: { list: ['standard', 'compact'] },
    }),
  ],
});
