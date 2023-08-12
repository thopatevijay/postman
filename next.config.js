/** @type {import('next').NextConfig} */
const webpack = require('webpack')

const { parsed: myEnv } = require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv))
    return config
}
}

module.exports = nextConfig
