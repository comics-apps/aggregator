require('dotenv').config();

const path = require('path')
const Dotenv = require('dotenv-webpack')

const withSass = require('@zeit/next-sass');

module.exports = withSass({
  webpack(config, options) {
    // based on "next-fonts" package
    // next-fonts has very small limit for file size
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          fallback: "file-loader",
          publicPath: "/_next/",
          outputPath: "static/fonts/",
          name: "[name]-[hash].[ext]"
        }
      }
    });

    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ];

    return config
  }
});
