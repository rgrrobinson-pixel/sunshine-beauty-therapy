import { defineType, defineField } from 'sanity';

export const giftVoucher = defineType({
  name: 'giftVoucher',
  title: 'Gift Voucher',
  type: 'document',
  fields: [
    defineField({ name: 'code', title: 'Voucher code', type: 'string' }),
    defineField({ name: 'amount', title: 'Amount ($)', type: 'number' }),
    defineField({ name: 'recipientName', title: 'Recipient name', type: 'string' }),
    defineField({ name: 'recipientEmail', title: 'Recipient email', type: 'string' }),
    defineField({ name: 'purchaserName', title: 'Purchaser name', type: 'string' }),
    defineField({ name: 'purchaserEmail', title: 'Purchaser email', type: 'string' }),
    defineField({ name: 'message', title: 'Personal message', type: 'text' }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['active', 'redeemed', 'expired'] } }),
    defineField({ name: 'expiryDate', title: 'Expiry date', type: 'date' }),
    defineField({ name: 'purchaseDate', title: 'Purchase date', type: 'datetime' }),
    defineField({ name: 'paypalOrderId', title: 'PayPal order ID', type: 'string' }),
  ],
});
