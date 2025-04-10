import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'storage.yandexcloud.net',
        pathname: '/**', // Разрешает все пути на домене
        // Опциональные параметры:
        port: '', // Можно указать конкретный порт если нужно
        protocol: 'https',
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
}

export default nextConfig
