import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.nintendo.com" },
      { protocol: "https", hostname: "pokeflip.com" },
      { protocol: "https", hostname: "cdn.wccftech.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "juegosdemesayrol.com" },
      { protocol: "https", hostname: "imaginaire.com" },
      { protocol: "https", hostname: "www.minecraft.net" },
      { protocol: "https", hostname: "www.magisnet.com" },
      { protocol: "https", hostname: "gaming-cdn.com" },
      { protocol: "https", hostname: "larepublica.cronosmedia.glr.pe" },
      { protocol: "https", hostname: "www.nintendo.com" },
      { protocol: "https", hostname: "s1.ppllstatics.com" },
      { protocol: "https", hostname: "imagenes.hobbyconsolas.com" },
      { protocol: "https", hostname: "catnessgames.com" },
    ],
  },
};

export default nextConfig;
