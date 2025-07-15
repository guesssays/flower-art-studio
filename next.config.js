/** @type {import('next').NextConfig} */
const nextConfig = {
         // Собирает полностью статический сайт в папку out
  distDir: 'out',          // Куда складывать собранный сайт (Netlify любит out/)
  trailingSlash: true,     // Все пути будут с / на конце (пример: /gallery/)
  images: {
    unoptimized: true      // Next.js НЕ будет использовать оптимизацию картинок (чтобы работали локальные картинки на Netlify)
  }
};

module.exports = nextConfig;
