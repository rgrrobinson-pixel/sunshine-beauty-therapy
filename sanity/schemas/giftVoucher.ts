import { defineType, defineField } from 'sanity';

export const giftVoucher = defineType({
  name: 'giftVoucher',
  title: 'Gift Voucher',
  type: 'document',
  fields: [
    defineField({ name: 'code', title: 'Voucher code', type: 'string' }),
    defineField({ name: 'sequenceNumber', title: 'Voucher number', type: 'number' }),
    defineField({ name: 'voucherType', title: 'Voucher type', type: 'string', options: { list: ['treatment', 'amount'] } }),
    defineField({ name: 'amount', title: 'Amount ($)', type: 'number' }),
    defineField({ name: 'treatmentName', title: 'Treatment name', type: 'string' }),
    defineField({ name: 'purchaserName', title: 'Purchaser full name', type: 'string' }),
    defineField({ name: 'purchaserFirstName', title: 'Purchaser first name', type: 'string' }),
    defineField({ name: 'purchaserEmail', title: 'Purchaser email', type: 'string' }),
    defineField({ name: 'recipientName', title: 'Recipient full name', type: 'string' }),
    defineField({ name: 'recipientFirstName', title: 'Recipient first name', type: 'string' }),
    defineField({ name: 'recipientLastName', title: 'Recipient last name', type: 'string' }),
    defineField({ name: 'recipientEmail', title: 'Recipient email', type: 'string' }),
    defineField({ name: 'message', title: 'Personal message', type: 'text' }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: ['unredeemed', 'redeemed', 'expired'] } }),
    defineField({ name: 'purchasedAt', title: 'Purchased at', type: 'datetime' }),
    defineField({ name: 'expiresAt', title: 'Expiry date', type: 'date' }),
    defineField({ name: 'paypalOrderId', title: 'PayPal order ID', type: 'string' }),
    defineField({ name: 'paypalCaptureId', title: 'PayPal capture ID', type: 'string' }),
  ],
  orderings: [{ name: 'purchasedAtDesc', title: 'Purchase date (newest first)', by: [{ field: 'purchasedAt', direction: 'desc' }] }],
});
