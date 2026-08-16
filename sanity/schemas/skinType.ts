import { defineType, defineField, defineArrayMember } from 'sanity';

export const skinType = defineType({
  name: 'skinType',
  title: 'Skin Types',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'heading' } }),
    defineField({ name: 'heading', title: 'Heading (e.g. Mature / Very Dry Skin)', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'dailyRoutinePdf', title: 'Daily Routine PDF URL', type: 'url' }),
    defineField({
      name: 'products',
      title: 'Recommended Products',
      type: 'array',
      of: [defineArrayMember({
        type: 'object',
        name: 'skinProduct',
        fields: [
          defineField({ name: 'name', title: 'Product name', type: 'string' }),
          defineField({ name: 'price', title: 'Price (e.g. $34.95)', type: 'string' }),
          defineField({ name: 'size', title: 'Size (e.g. 125ml)', type: 'string' }),
          defineField({ name: 'description', title: 'Short description', type: 'text' }),
          defineField({ name: 'keyIngredients', title: 'Key ingredients', type: 'text' }),
          defineField({ name: 'imageUrl', title: 'Image URL', type: 'url' }),
        ],
      })],
    }),
  ],
  orderings: [{ name: 'orderAsc', title: 'Display order', by: [{ field: 'order', direction: 'asc' }] }],
});
