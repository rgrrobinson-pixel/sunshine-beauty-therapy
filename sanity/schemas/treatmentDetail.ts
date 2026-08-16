import { defineType, defineField, defineArrayMember } from 'sanity';

export const treatmentDetail = defineType({
  name: 'treatmentDetail',
  title: 'Treatment Detail',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'tagline' } }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'description', title: 'Full description', type: 'text' }),
    defineField({
      name: 'inclusions',
      title: "What's included",
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        name: 'inclusion',
        fields: [
          defineField({ name: 'name', title: 'Inclusion name', type: 'string' }),
          defineField({ name: 'value', title: 'Value (e.g. $55)', type: 'string' }),
        ],
      })],
    }),
    defineField({ name: 'totalValue', title: 'Total value (e.g. $348.00)', type: 'string' }),
    defineField({ name: 'note', title: 'Note (e.g. Microdermabrasion additional $10)', type: 'string' }),
    defineField({
      name: 'terms',
      title: 'Terms & conditions',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        name: 'term',
        fields: [
          defineField({ name: 'text', title: 'Term text', type: 'text' }),
        ],
      })],
    }),
  ],
});
