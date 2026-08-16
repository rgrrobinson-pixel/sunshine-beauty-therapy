import { defineType, defineField } from 'sanity';

export const skincareProduct = defineType({
  name: 'skincareProduct',
  title: 'Skincare Product',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'imageUrl', title: 'Image URL', type: 'url' }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: { list: [{ title: 'Featured', value: 'featured' }, { title: 'Strip', value: 'strip' }] },
    }),
  ],
  orderings: [{ name: 'orderAsc', title: 'Display order', by: [{ field: 'order', direction: 'asc' }] }],
});
