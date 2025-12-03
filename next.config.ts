/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // ⚠️ Ignore les erreurs ESLint pendant le build
        ignoreDuringBuilds: true,
    },
    typescript: {
        // ⚠️ Ignore les erreurs TypeScript (si nécessaire)
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
}

module.exports = nextConfig