/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export estático: o build cospe HTML pronto em `out/`, que o Nginx serve
  // como hoje. O HTML existe NO ARQUIVO — a primeira tela não espera JS.
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
