import { defineType, defineField } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
    defineField({ name: 'quote', title: 'Quote', type: 'text' }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
  ],
  orderings: [{ name: 'orderAsc', title: 'Display order', by: [{ field: 'order', direction: 'asc' }] }],
});
