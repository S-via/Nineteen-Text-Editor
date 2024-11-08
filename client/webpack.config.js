const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //added html
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Nineteen'
      }),

      // added inject manifest
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // added wepackmanifest // reference to mini proj
      new WebpackPwaManifest({
        name: 'Text Editor',
        short_name: 'Nineteen',
        description: 'Offline Text Editor',
        backround_color: '#bfa0da',
        theme_color: '#bfa0da',
        start_url: './',
        publicPath: './',

        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            size: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),

          },

        ],
      }),

    ],

    module: {
      rules: [
        // added from mini project 19 
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_module/,

          //  added babel-loader
          use: {
            loader: 'babel-loader',
            option: {
              presets: ['@babel/preset-env'],

            }
          }
        }


      ],
    },
  };
};
