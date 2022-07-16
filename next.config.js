/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY:
      "AIzaSyBpOcRfRThrmZuWk2DGsDDLrKnXn_scSnE",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "camotocode-42585.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_DATABASE_URL:
      "https://camotocode-42585-default-rtdb.firebaseio.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "camotocode-42585",
  },
};

module.exports = nextConfig;
