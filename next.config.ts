import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 일단 모든 외부 이미지를 허용 (추후 특정 도메인으로 제한 권장)
      },
    ],
    // Apify 서버에서 이미지를 가져올 때 최적화가 필요하다면 아래 설정도 유용합니다.
    formats: ["image/avif", "image/webp"],
  },
}

export default nextConfig
