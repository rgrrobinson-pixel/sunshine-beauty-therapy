import { defineType, defineField } from 'sanity';

export const order = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    defineField({ name: 'orderNumber', title: 'Order number', type: 'string' }),
    defineField({ name: 'customerName', title: 'Customer name', type: 'string' }),
    defineField({ name: 'customerEmail', title: 'Customer email', type: 'string' }),
    defineField({ name: 'amount', title: 'Amount ($)', type: 'number' }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['pending', 'completed', 'refunded'] } }),
    defineField({ name: 'paypalOrderId', title: 'PayPal order ID', type: 'string' }),
    defineField({ name: 'createdAt', title: 'Created at', type: 'datetime' }),
  ],
});
