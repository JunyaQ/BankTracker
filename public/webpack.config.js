const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
 
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    new WebpackPwaManifest({
      name: 'BudgetTracker',
      short_name: 'Budget',
      description: 'An app that allows you to view upcoming food events.',
      start_url: './index.html',
      background_color: '#01579b',
      theme_color: '#ffffff',
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve('icons/icon-512x512.png'),
          sizes: [72,96,128,144,152,192,384,512],
          destination: path.join('icons')
        }
      ]
    })
  ],
  mode: 'development'
};

module.exports = config;
