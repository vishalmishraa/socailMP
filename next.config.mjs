/** @type {import('next').NextConfig} */
const nextConfig = {
    
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.blob.core.windows.net',
                port: '',
                pathname: '/**',
            },
          ],
    },
};

export default nextConfig;

/*
https://i0.wp.com/chemmatcars.uchicago.edu/wp-content/uploads/2021/03/default-placeholder-image-1024x1024-1.png?ssl=1
images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'soaidalleapiprodscus.blob.core.windows.net',
          port: '',
          pathname: '/private/**',
        },
      ],
    },      

    */
