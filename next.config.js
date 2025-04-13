/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // This is to handle the canvas.node native module issue
    if (!isServer) {
      // Don't resolve 'fs' module on the client to prevent this error
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        canvas: false,
        encoding: false,
        bufferutil: false,
        'utf-8-validate': false,
        'pdfjs-dist': false,
      };
    }

    // Handle canvas module specifically
    config.module.rules.push({
      test: /node_modules[\/\\]canvas[\/\\].*\.js/,
      use: 'null-loader',
    });

    return config;
  },
};

module.exports = nextConfig;