/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",                       // required for static export
  basePath: isProd ? "/your-repo-name" : "",  // replace with your GitHub repo name
};

module.exports = nextConfig;
