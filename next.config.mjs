/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.amazonaws.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.178.66',
                port: '3000',
                pathname: '/**',
            },
        ]
    }
};

export default nextConfig;
