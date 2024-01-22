const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'img', to: 'img' },
        { from: 'css', to: 'css' },
        { from: 'font', to: 'font' },
        { from: 'js', to: 'js' },
        { from: 'icon.svg', to: 'icon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'icon.png', to: 'icon.png' },
        { from: 'android-chrome-192x192.png', to: 'android-chrome-192x192.png' },
        { from: 'android-chrome-512x512.png', to: 'android-chrome-512x512.png' },
        { from: 'apple-touch-icon.png', to: 'apple-touch-icon.png' },
        { from: 'favicon-16x16.png', to: 'favicon-16x16.png' },
        { from: 'favicon-32x32.png', to: 'favicon-32x32.png' },
        { from: 'maskable_icon.png', to: 'maskable_icon.png' },
        { from: 'mstile-70x70.png', to: 'mstile-70x70.png' },
        { from: 'mstile-144x144.png', to: 'mstile-144x144.png' },
        { from: 'mstile-150x150.png', to: 'mstile-150x150.png' },
        { from: 'mstile-310x150.png', to: 'mstile-310x150.png' },
        { from: 'mstile-310x310.png', to: 'mstile-310x310.png' },
        { from: 'safari-pinned-tab.svg', to: 'safari-pinned-tab.svg' },
        { from: 'sw.js', to: 'sw.js' },
        { from: '404.html', to: '404.html' },
        { from: 'datenschutz.html', to: 'datenschutz.html' },
        { from: 'impressum.html', to: 'impressum.html' },
        { from: 'site.webmanifest', to: 'site.webmanifest' },
      ],
    }),
  ],
});
