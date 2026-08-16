import { defineType, defineField } from 'sanity';

export const treatment = defineType({
  name: 'treatment',
  title: 'Treatment',
  type: 'document',
  fields: [
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'duration', title: 'Duration (e.g. 75 min)', type: 'string' }),
    defineField({ name: 'tag', title: 'Tag (e.g. Popular)', type: 'string' }),
    defineField({ name: 'description', title: 'Short description', type: 'text' }),
    defineField({ name: 'price', title: 'Price (e.g. A$99)', type: 'string' }),
    defineField({ name: 'image', title: 'Treatment photo', type: 'image', options: { hotspot: true } }),
  ],
  orderings: [{ name: 'orderAsc', title: 'Display order', by: [{ field: 'order', direction: 'asc' }] }],
});
