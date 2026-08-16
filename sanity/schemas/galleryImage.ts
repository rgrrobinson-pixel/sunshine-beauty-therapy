import { defineType, defineField } from 'sanity';

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
  ],
  orderings: [{ name: 'orderAsc', title: 'Display order', by: [{ field: 'order', direction: 'asc' }] }],
});
