/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.ctfassets.net" },
      { protocol: "https", hostname: "cdn2.bigcommerce.com" },
      { protocol: "https", hostname: "www.sunshinebeautytherapy.com.au" },
      { protocol: "https", hostname: "images.stockcake.com" },
      { protocol: "https", hostname: "juniperaustralia.com.au" },
      { protocol: "https", hostname: "sunshinebeautytherapy.pplx.app" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
