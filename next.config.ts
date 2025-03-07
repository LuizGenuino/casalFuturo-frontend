import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true, // 🔹 Mantém essa configuração separada
};

export default withPWA({
  ...nextConfig, // 🔹 Mescla com a configuração PWA
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
