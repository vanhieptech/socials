
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['graph.facebook.com', 'platform-lookaside.fbsbx.com'],
  },

  transpilePackages: ["geist"],
  env: {
    FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
  }
};

export default nextConfig; 