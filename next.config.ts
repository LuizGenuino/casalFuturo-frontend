import type { NextConfig } from "next";
import withPWA from "next-pwa";

const isProd = process.env.NODE_ENV === "production";

// 🔹 Apenas a configuração do Next.js (NÃO inclui `pwa` aqui)
const nextConfig: NextConfig = {
  reactStrictMode: true, 
};

export default withPWA({
  ...nextConfig, // 🔹 Mergemos apenas o que é relevante para Next.js
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: !isProd, // 🔹 O PWA só será ativado na produção
  },
});
