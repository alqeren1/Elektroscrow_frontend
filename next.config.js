/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    output: "export",
    images: {
        unoptimized: true, // Disable Image Optimization API
    },
}

module.exports = nextConfig
