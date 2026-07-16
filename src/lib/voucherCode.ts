// Generates a readable, hard-to-guess voucher code like SBT-7F3K-9QRX.
export function generateVoucherCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I ambiguity
  const randomBlock = () =>
    Array.from({ length: 4 }, () =>
      alphabet[Math.floor(Math.random() * alphabet.length)]
    ).join("");
  return `SBT-${randomBlock()}-${randomBlock()}`;
}
