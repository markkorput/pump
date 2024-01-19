const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: isProd ? process.env.PROD_BASE_PATH : undefined
};

export default nextConfig;
